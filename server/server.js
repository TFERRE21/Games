const express=require('express');
const cors=require('cors');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Database=require('better-sqlite3');
const path=require('path');

const app=express();
const PORT=process.env.PORT||3000;
const JWT_SECRET=process.env.JWT_SECRET||'dev-only-change-me';
const db=new Database(path.join(__dirname,'games.db'));
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS users(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 email TEXT UNIQUE NOT NULL,
 password_hash TEXT NOT NULL,
 role TEXT NOT NULL DEFAULT 'user',
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS favorites(
 user_id INTEGER NOT NULL,
 game_id TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(user_id,game_id)
);
CREATE TABLE IF NOT EXISTS scores(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 user_id INTEGER NOT NULL,
 game_id TEXT NOT NULL,
 score INTEGER NOT NULL DEFAULT 0,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_scores_game_score ON scores(game_id,score DESC);
`);

const adminEmail=process.env.ADMIN_EMAIL;
const adminPassword=process.env.ADMIN_PASSWORD;
if(adminEmail&&adminPassword){
 const exists=db.prepare('SELECT id FROM users WHERE email=?').get(adminEmail);
 if(!exists){
  const hash=bcrypt.hashSync(adminPassword,12);
  db.prepare('INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,?)').run('Administrador',adminEmail,hash,'admin');
 }
}

app.use(cors({origin:process.env.CORS_ORIGIN||'*'}));
app.use(express.json({limit:'100kb'}));

function token(user){return jwt.sign({id:user.id,email:user.email,role:user.role},JWT_SECRET,{expiresIn:'7d'})}
function auth(req,res,next){
 try{const h=req.headers.authorization||'';if(!h.startsWith('Bearer '))throw 0;req.user=jwt.verify(h.slice(7),JWT_SECRET);next()}
 catch(e){res.status(401).json({error:'Não autenticado'})}
}
function admin(req,res,next){if(req.user?.role!=='admin')return res.status(403).json({error:'Acesso ADM negado'});next()}

app.get('/api/health',(req,res)=>res.json({ok:true,service:'games-online-api'}));

app.post('/api/register',(req,res)=>{
 const name=String(req.body.name||'').trim().slice(0,40);
 const email=String(req.body.email||'').trim().toLowerCase();
 const password=String(req.body.password||'');
 if(name.length<2||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)||password.length<6)return res.status(400).json({error:'Nome, e-mail válido e senha com 6+ caracteres são obrigatórios'});
 try{
  const hash=bcrypt.hashSync(password,12);
  const info=db.prepare('INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,?)').run(name,email,hash,'user');
  const user={id:info.lastInsertRowid,name,email,role:'user'};
  res.json({user,token:token(user)});
 }catch(e){res.status(409).json({error:'Este e-mail já está cadastrado'})}
});

app.post('/api/login',(req,res)=>{
 const email=String(req.body.email||'').trim().toLowerCase();
 const password=String(req.body.password||'');
 const u=db.prepare('SELECT * FROM users WHERE email=?').get(email);
 if(!u||!bcrypt.compareSync(password,u.password_hash))return res.status(401).json({error:'E-mail ou senha inválidos'});
 res.json({user:{id:u.id,name:u.name,email:u.email,role:u.role},token:token(u)});
});

app.get('/api/me',auth,(req,res)=>{
 const u=db.prepare('SELECT id,name,email,role,created_at FROM users WHERE id=?').get(req.user.id);
 if(!u)return res.status(404).json({error:'Usuário não encontrado'});
 res.json({user:u});
});

app.get('/api/favorites',auth,(req,res)=>{
 res.json({favorites:db.prepare('SELECT game_id FROM favorites WHERE user_id=? ORDER BY created_at DESC').all(req.user.id).map(x=>x.game_id)});
});
app.post('/api/favorites/:gameId',auth,(req,res)=>{
 const id=String(req.params.gameId).slice(0,80);
 db.prepare('INSERT OR IGNORE INTO favorites(user_id,game_id) VALUES(?,?)').run(req.user.id,id);
 res.json({ok:true});
});
app.delete('/api/favorites/:gameId',auth,(req,res)=>{
 db.prepare('DELETE FROM favorites WHERE user_id=? AND game_id=?').run(req.user.id,String(req.params.gameId));
 res.json({ok:true});
});

app.post('/api/scores',auth,(req,res)=>{
 const gameId=String(req.body.gameId||'').slice(0,80);
 const score=Math.max(0,Math.min(100000000,Math.floor(Number(req.body.score)||0)));
 if(!gameId)return res.status(400).json({error:'gameId obrigatório'});
 db.prepare('INSERT INTO scores(user_id,game_id,score) VALUES(?,?,?)').run(req.user.id,gameId,score);
 const best=db.prepare('SELECT MAX(score) best FROM scores WHERE user_id=? AND game_id=?').get(req.user.id,gameId).best||0;
 res.json({ok:true,best});
});

app.get('/api/ranking',(req,res)=>{
 const rows=db.prepare(`
 SELECT s.game_id, MAX(s.score) score, u.name
 FROM scores s JOIN users u ON u.id=s.user_id
 GROUP BY s.game_id,u.id
 ORDER BY score DESC LIMIT 100
 `).all();
 res.json({ranking:rows});
});

app.get('/api/admin/stats',auth,admin,(req,res)=>{
 const users=db.prepare('SELECT COUNT(*) n FROM users').get().n;
 const scores=db.prepare('SELECT COUNT(*) n FROM scores').get().n;
 const favorites=db.prepare('SELECT COUNT(*) n FROM favorites').get().n;
 res.json({users,scores,favorites});
});
app.get('/api/admin/users',auth,admin,(req,res)=>{
 res.json({users:db.prepare('SELECT id,name,email,role,created_at FROM users ORDER BY id DESC LIMIT 500').all()});
});
app.delete('/api/admin/users/:id',auth,admin,(req,res)=>{
 const id=Number(req.params.id);
 if(id===req.user.id)return res.status(400).json({error:'Não remova sua própria conta ADM'});
 db.prepare('DELETE FROM favorites WHERE user_id=?').run(id);
 db.prepare('DELETE FROM scores WHERE user_id=?').run(id);
 db.prepare('DELETE FROM users WHERE id=?').run(id);
 res.json({ok:true});
});

app.listen(PORT,()=>console.log('Games API on port '+PORT));
