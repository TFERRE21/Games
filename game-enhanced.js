/* Games Online — Enhanced Game Pack v3 */
(function(){
'use strict';
const area=document.querySelector('#gameArea'), modal=document.querySelector('#modal'), closeBtn=document.querySelector('#close');
let cleanup=()=>{}, audio=null;

function stop(){try{cleanup()}catch(e){} cleanup=()=>{}}
function sound(freq=440,dur=.07,type='sine'){
  try{
    audio=audio||new (window.AudioContext||window.webkitAudioContext)();
    const o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.value=freq;g.gain.value=.035;
    o.connect(g);g.connect(audio.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+dur);o.stop(audio.currentTime+dur);
  }catch(e){}
}
function shell(icon,title,sub){
 stop();
 area.innerHTML='<div class="game-wrap gox"><div class="gox-top"><div><div class="gox-icon">'+icon+'</div><h3>'+title+'</h3><p>'+sub+'</p></div><div id="goxHud" class="score"></div></div><div id="goxBody"></div></div>';
 return document.querySelector('#goxBody');
}
function controls(text){return '<div class="gox-controls">'+text+'</div>'}
function canvas(w=760,h=430){
 const b=document.querySelector('#goxBody');b.innerHTML='<canvas id="goxCanvas" width="'+w+'" height="'+h+'"></canvas><div id="goxInfo" class="score"></div>';
 return [document.querySelector('#goxCanvas'),document.querySelector('#goxInfo')];
}
function hud(level,score,lives){
 const h=document.querySelector('#goxHud'); if(h)h.textContent='FASE '+level+' • ⭐ '+score+' • ❤️ '+lives;
}
function reward(id,level,stars){
 try{if(typeof addRPGReward==='function')addRPGReward(id,level,stars)}catch(e){}
}
function endScreen(title,score,onRestart){
 const b=document.querySelector('#goxBody');b.innerHTML='<div class="gox-end"><div style="font-size:76px">💥</div><h2>'+title+'</h2><p>Pontuação: <b>'+score+'</b></p><button id="goxRestart" class="primary">🔄 JOGAR NOVAMENTE</button><button id="goxNext" class="primary">➡️ PRÓXIMA FASE</button></div>';
 document.querySelector('#goxRestart').onclick=onRestart;
 document.querySelector('#goxNext').onclick=onRestart;
}
function winScreen(title,score,onNext){
 const b=document.querySelector('#goxBody');b.innerHTML='<div class="gox-end"><div style="font-size:76px">🏆</div><h2>'+title+'</h2><p>Pontuação: <b>'+score+'</b></p><button id="goxNext" class="primary">➡️ PRÓXIMA FASE</button></div>';
 document.querySelector('#goxNext').onclick=onNext;
 sound(880,.12,'triangle');
}
function keyboard(obj){
 const kd=e=>{obj[e.key]=1},ku=e=>{obj[e.key]=0};addEventListener('keydown',kd);addEventListener('keyup',ku);
 return ()=>{removeEventListener('keydown',kd);removeEventListener('keyup',ku)}
}
function commonCanvasGame(id,level,mode){
 let score=0,lives=3,raf=0,stopped=false,keys={};
 const [c,info]=canvas(),x=c.getContext('2d'),W=c.width,H=c.height;
 const unkey=keyboard(keys);
 cleanup=()=>{stopped=true;cancelAnimationFrame(raf);unkey();};
 hud(level,score,lives);
 const finish=(won=false)=>{
   if(stopped)return;stopped=true;cancelAnimationFrame(raf);unkey();
   if(won){reward(id,level,3);winScreen('Fase '+level+' concluída!',score,()=>startGame(id,level+1))}
   else endScreen('Você perdeu!',score,()=>startGame(id,level));
 };
 function startGame(){ }
 return {c,x,W,H,info,keys,unkey,finish,score,lives,raf};
}

/* PLATFORMER */
function platformer(id='platformer',level=1){
 const b=shell('🦘','Super Jump','Atravesse o percurso, pegue moedas e chegue ao portal. Fase '+level);
 b.innerHTML='<div class="gox-levelbar"><span>❤️❤️❤️</span><span id="coins">🪙 0</span></div><canvas id="goxCanvas" width="760" height="400"></canvas>'+controls('← → mover • ↑/Espaço pular • toque no canvas para pular');
 const c=document.querySelector('#goxCanvas'),x=c.getContext('2d'),coinsEl=document.querySelector('#coins'),W=760,H=400;
 let p={x:45,y:320,vx:0,vy:0,on:1},coins=0,lives=3,done=false,keys={},raf=0;
 const plats=[]; for(let i=0;i<8;i++)plats.push({x:100+i*95,y:290-Math.min(100,Math.floor(i/2)*25),w:75,h:14});
 const foes=[];for(let i=0;i<Math.min(2+level,5);i++)foes.push({x:260+i*120,y:250-(i%2)*40,v:1+level*.15});
 const unkey=keyboard(keys);
 function jump(){if(p.on){p.vy=-10;p.on=0;sound(520)}}
 c.addEventListener('pointerdown',jump);
 function die(){lives--;sound(120,.15,'sawtooth');if(lives<=0){stop();endScreen('💥 Raposinha perdeu todas as vidas!',coins,()=>platformer(id,level));return}p.x=45;p.y=320;p.vx=0;p.vy=0}
 function loop(){
  x.clearRect(0,0,W,H);x.fillStyle='#101b30';x.fillRect(0,0,W,H);
  x.fillStyle=['#69b86d','#d6a24a','#9ad7ff','#342b55','#c94b38','#8ecae6'][level%6];x.fillRect(0,340,W,60);
  p.vx=(keys.ArrowRight?4:0)-(keys.ArrowLeft?4:0);if(keys[' ']||keys.ArrowUp){jump();keys[' ']=keys.ArrowUp=0}
  p.vy+=.48;p.x+=p.vx;p.y+=p.vy;p.x=Math.max(0,Math.min(W-30,p.x));p.on=0;
  if(p.y>320){p.y=320;p.vy=0;p.on=1}
  plats.forEach(q=>{q.x-=1+level*.12;if(q.x+q.w<0)q.x=W+Math.random()*100; x.fillStyle='#7c5cff';x.fillRect(q.x,q.y,q.w,q.h);
   if(p.vy>=0&&p.x+25>q.x&&p.x<q.x+q.w&&p.y+34>=q.y&&p.y+34<=q.y+15){p.y=q.y-34;p.vy=0;p.on=1}
  });
  foes.forEach(f=>{f.x-=f.v;if(f.x<-30)f.x=W+Math.random()*160;x.font='30px sans-serif';x.fillText('👾',f.x,f.y);
   if(p.x<f.x+28&&p.x+28>f.x&&p.y<f.y&&p.y+34>f.y-30)die()
  });
  if(Math.random()<.025+level*.002){coins++;coinsEl.textContent='🪙 '+coins}
  x.font='30px sans-serif';x.fillText('🦊',p.x,p.y+30);x.fillText('🚪',700,315);
  if(p.x>675){reward(id,level,Math.min(3,1+Math.floor(coins/3)));winScreen('🏆 Portal alcançado!',coins,()=>platformer(id,level>=10?1:level+1));return}
  if(p.y>H+20)die();
  info.textContent='Fase '+level+' • obstáculos '+foes.length+' • moedas '+coins;
  raf=requestAnimationFrame(loop)
 }
 cleanup=()=>{cancelAnimationFrame(raf);unkey();c.removeEventListener('pointerdown',jump)};loop();
}

/* SNAKE */
function snake(id='snake',level=1){
 const b=shell('🐍','Snake','Coma as frutas, cresça e alcance a meta da fase '+level);
 const [c,info]=canvas(620,420),x=c.getContext('2d'),N=20,S=20;let body=[{x:10,y:10}],d={x:1,y:0},next={...d},food={x:5,y:5},score=0,t=0,over=false,raf=0,keys={};
 const unkey=keyboard(keys);
 const kd=e=>{if(e.key==='ArrowUp'&&d.y===0)next={x:0,y:-1};if(e.key==='ArrowDown'&&d.y===0)next={x:0,y:1};if(e.key==='ArrowLeft'&&d.x===0)next={x:-1,y:0};if(e.key==='ArrowRight'&&d.x===0)next={x:1,y:0}};addEventListener('keydown',kd);
 function finish(won){stop();if(won)winScreen('🐍 Meta alcançada!',score,()=>snake(id,level>=10?1:level+1));else endScreen('💥 A cobra bateu!',score,()=>snake(id,level))}
 function loop(){
  t++;if(t%(Math.max(3,8-level))===0){d=next;let h={x:body[0].x+d.x,y:body[0].y+d.y};
   if(h.x<0||h.y<0||h.x>=N||h.y>=N||body.some(q=>q.x===h.x&&q.y===h.y)){finish(false);return}
   body.unshift(h);if(h.x===food.x&&h.y===food.y){score++;sound(620);food={x:Math.floor(Math.random()*N),y:Math.floor(Math.random()*N)};if(score>=4+level) {reward(id,level,3);finish(true);return}}else body.pop()}
  x.fillStyle='#07111d';x.fillRect(0,0,c.width,c.height);x.fillStyle='#18d6a0';body.forEach(q=>x.fillRect(q.x*S,q.y*S,S-2,S-2));x.font='18px sans-serif';x.fillText('🍎',food.x*S,food.y*S+18);info.textContent='Frutas '+score+'/'+(4+level)+' • velocidade '+(1+level);raf=requestAnimationFrame(loop)
 }
 cleanup=()=>{cancelAnimationFrame(raf);unkey();removeEventListener('keydown',kd)};loop();
}

/* RACER */
function racerGame(id,level=1,icon='🏎️',title='Neon Racer'){
 const b=shell(icon,title,'Desvie do trânsito e complete '+(300+level*70)+' metros.');const[c,info]=canvas(),x=c.getContext('2d');let car=350,dist=0,score=0,over=false,raf=0,keys={},obs=[];
 for(let i=0;i<4+level;i++)obs.push({x:190+Math.random()*360,y:-i*130-100,v:4+level*.4});
 const unkey=keyboard(keys);
 function loop(){x.fillStyle='#111827';x.fillRect(0,0,760,430);x.fillStyle='#30343b';x.fillRect(160,0,440,430);x.fillStyle='#e8e8e8';for(let y=-20;y<430;y+=70)x.fillRect(375,y+(dist%70),8,35);
  if(keys.ArrowLeft)car-=6;if(keys.ArrowRight)car+=6;car=Math.max(175,Math.min(550,car));x.font='42px sans-serif';x.fillText(icon,car,385);
  obs.forEach(o=>{o.y+=o.v;if(o.y>450){o.y=-80-Math.random()*100;o.x=185+Math.random()*360;score+=10}
   x.fillText(['🚗','🚕','🚙'][Math.floor(o.x)%3],o.x,o.y);
   if(car<o.x+42&&car+42>o.x&&340<o.y+50&&385>o.y-35)over=true});
  dist+=.7+level*.12;info.textContent='Distância '+Math.floor(dist)+'m • Pontos '+score;
  if(over){stop();endScreen('💥 Colisão!',score,()=>racerGame(id,level,icon,title));return}
  if(dist>=300+level*70){reward(id,level,3);stop();winScreen('🏁 Chegada!',score,()=>racerGame(id,level>=10?1:level+1,icon,title));return}
  raf=requestAnimationFrame(loop)}
 cleanup=()=>{cancelAnimationFrame(raf);unkey()};loop();
}

/* BLOCKS */
function blocksGame(id='blocks',level=1){
 const b=shell('🧱','Block Master','Empilhe blocos e alcance altura '+(8+level)+' • clique/toque para soltar.');
 const[c,info]=canvas(760,420),x=c.getContext('2d');let y=380,stack=0,w=Math.max(45,110-level*5),dir=1,px=0,raf=0;
 function loop(){x.fillStyle='#080e19';x.fillRect(0,0,760,420);px+=dir*(3+level*.3);if(px<0||px>760-w)dir*=-1;x.fillStyle='#6d5dfc';x.fillRect(px,y,w,18);x.fillStyle='#18d6a0';x.fillRect(250,390,260,12);info.textContent='Altura '+stack+'/'+(8+level)+' • Clique para encaixar';raf=requestAnimationFrame(loop)}
 c.onclick=()=>{const target=250+Math.random()*200;if(Math.abs(px-target)<w*.65){stack++;sound(500);y-=22;if(stack>=8+level){stop();reward(id,level,3);winScreen('🏆 Torre concluída!',stack,()=>blocksGame(id,level>=10?1:level+1))}}else{stop();endScreen('💥 Bloco caiu!',stack,()=>blocksGame(id,level))}};
 cleanup=()=>cancelAnimationFrame(raf);loop();
}

/* PUZZLE / CLASSICS */
function memoryGame(id='memory',level=1){
 const b=shell('🃏','Memory Cards','Encontre '+(4+Math.min(4,level))+' pares.');let n=4+Math.min(4,level),vals=['🍎','🚀','🎮','⚽','🐱','⭐','🍕','🎯','🦊','🌈'],deck=vals.slice(0,n).concat(vals.slice(0,n)).sort(()=>Math.random()-.5),first=null,lock=false,found=0,tries=0;
 b.innerHTML='<div id="memG" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:560px;margin:auto"></div><div id="memI" class="score">Pares 0/'+n+' • Tentativas 0</div>';const m=document.querySelector('#memG'),info=document.querySelector('#memI');
 deck.forEach(v=>{let q=document.createElement('button');q.textContent='❓';q.style.cssText='height:78px;font-size:30px;background:#151f31;border:1px solid #33405a;border-radius:12px;color:#fff';q.onclick=()=>{if(lock||q.dataset.done)return;q.textContent=v;if(!first)first={q,v};else{tries++;if(first.v===v){first.q.dataset.done=q.dataset.done=1;found++;sound(700);first=null}else{lock=true;let f=first;first=null;setTimeout(()=>{f.q.textContent=q.textContent='❓';lock=false},450)}}info.textContent='Pares '+found+'/'+n+' • Tentativas '+tries;if(found===n){reward(id,level,3);winScreen('🧠 Memória perfeita!',tries,()=>memoryGame(id,level>=10?1:level+1))}};m.appendChild(q)});cleanup=()=>{};
}
function clickerGame(id='clicker',level=1){
 const b=shell('🪙','Coin Clicker','Faça '+(30+level*15)+' moedas.');let coins=0,power=1,target=30+level*15;
 b.innerHTML='<button id="bigCoin" style="font-size:105px;background:none;border:0;cursor:pointer">🪙</button><div id="ci" class="score">0/'+target+' moedas • poder +'+power+'</div><button id="up" class="primary">⚡ Melhorar ('+(8*level)+')</button>';
 const coin=document.querySelector('#bigCoin'),info=document.querySelector('#ci'),up=document.querySelector('#up');coin.onclick=()=>{coins+=power;sound(500,.03);info.textContent=coins+'/'+target+' moedas • poder +'+power;if(coins>=target){reward(id,level,3);winScreen('🪙 Meta atingida!',coins,()=>clickerGame(id,level>=10?1:level+1))}};up.onclick=()=>{let cost=8*power;if(coins>=cost){coins-=cost;power++;up.textContent='⚡ Melhorar ('+(8*power)+')';info.textContent=coins+'/'+target+' moedas • poder +'+power}};
}

/* SPORTS */
function pongGame(id='pong',level=1){
 const b=shell('🏓','Pong','Vença o computador: marque '+(3+level)+' pontos.');const[c,info]=canvas(),x=c.getContext('2d');let py=170,by=210,bx=380,vx=4+level*.3,vy=3,me=0,ai=0,raf=0,keys={};const un=keyboard(keys);
 function loop(){x.fillStyle='#050912';x.fillRect(0,0,760,430);if(keys.ArrowUp)py-=7;if(keys.ArrowDown)py+=7;py=Math.max(0,Math.min(350,py));by+=vy;bx+=vx;if(by<8||by>422)vy*=-1;let ap=by-40;ap=Math.max(0,Math.min(350,ap));if(bx>560)py=py; if(bx<55&&by>py&&by<py+80){vx=Math.abs(vx)+.15;sound(600)}if(bx>705){me++;bx=380;vx=-Math.abs(vx)}if(bx<0){ai++;bx=380;vx=Math.abs(vx)}x.fillStyle='#18d6a0';x.fillRect(20,py,18,80);x.fillStyle='#ff4d6d';x.fillRect(720,ap,18,80);x.fillStyle='#fff';x.beginPath();x.arc(bx,by,9,0,7);x.fill();info.textContent='Você '+me+' × '+ai+' CPU';if(me>=3+level){stop();reward(id,level,3);winScreen('🏆 Você venceu!',me,()=>pongGame(id,level>=10?1:level+1));return}if(ai>=3+level){stop();endScreen('🤖 O CPU venceu!',me,()=>pongGame(id,level));return}raf=requestAnimationFrame(loop)}
 cleanup=()=>{cancelAnimationFrame(raf);un()};loop();
}
function breakoutGame(id='breakout',level=1){
 const b=shell('🧱','Brick Breaker','Quebre todos os blocos.');const[c,info]=canvas(),x=c.getContext('2d');let px=325,b={x:380,y:350,vx:4+level*.3,vy:-4},br=[],raf=0,keys={};for(let r=0;r<3+Math.floor(level/3);r++)for(let j=0;j<8;j++)br.push({x:50+j*85,y:35+r*28,on:1});const un=keyboard(keys);
 const move=e=>{let q=c.getBoundingClientRect();px=e.clientX-q.left-55};c.addEventListener('pointermove',move);
 function loop(){x.fillStyle='#080d17';x.fillRect(0,0,760,430);if(keys.ArrowLeft)px-=7;if(keys.ArrowRight)px+=7;px=Math.max(0,Math.min(650,px));if(b.x<8||b.x>752)b.vx*=-1;if(b.y<8)b.vy*=-1;b.x+=b.vx;b.y+=b.vy;if(b.y>390&&b.x>px&&b.x<px+110)b.vy=-Math.abs(b.vy);br.forEach(z=>{if(z.on&&b.x>z.x&&b.x<z.x+75&&b.y>z.y&&b.y<z.y+20){z.on=0;b.vy*=-1;sound(520)}});br.forEach(z=>{if(z.on){x.fillStyle='#6d5dfc';x.fillRect(z.x,z.y,75,20)}});x.fillStyle='#18d6a0';x.fillRect(px,400,110,15);x.fillStyle='#fff';x.beginPath();x.arc(b.x,b.y,8,0,7);x.fill();let left=br.filter(z=>z.on).length;info.textContent='Blocos restantes '+left;if(!left){stop();reward(id,level,3);winScreen('🏆 Arena limpa!',level,()=>breakoutGame(id,level>=10?1:level+1));return}if(b.y>440){stop();endScreen('💥 Bola perdida!',0,()=>breakoutGame(id,level));return}raf=requestAnimationFrame(loop)}
 cleanup=()=>{cancelAnimationFrame(raf);un();c.removeEventListener('pointermove',move)};loop();
}
function flappyGame(id='flappy',level=1){
 const b=shell('🐦','Flappy Sky','Passe por '+(8+level)+' portais.');const[c,info]=canvas(),x=c.getContext('2d');let y=200,vy=0,obs=[],sc=0,raf=0,dead=false;for(let i=0;i<4;i++)obs.push({x:500+i*220,g:100+Math.random()*190});const flap=()=>{if(!dead){vy=-7;sound(500,.03)}};c.onclick=flap;const un=keyboard({});const kd=e=>{if(e.key===' '||e.key==='ArrowUp')flap()};addEventListener('keydown',kd);
 function loop(){x.fillStyle='#13213a';x.fillRect(0,0,760,430);vy+=.35;y+=vy;x.font='30px sans-serif';x.fillText('🐦',100,y+20);obs.forEach(o=>{o.x-=3+level*.25;if(o.x<-60){o.x=800;sc++;o.g=100+Math.random()*190;sound(700,.02)}x.fillStyle='#18d6a0';x.fillRect(o.x,0,60,o.g-65);x.fillRect(o.x,o.g+65,60,430);if(100<o.x+60&&130>o.x&&(y<o.g-65||y+22>o.g+65))dead=true});if(y<0||y>410)dead=true;info.textContent='Portais '+sc+'/'+(8+level);if(dead){stop();endScreen('💥 Voo encerrado!',sc,()=>flappyGame(id,level));return}if(sc>=8+level){stop();reward(id,level,3);winScreen('🐦 Céu conquistado!',sc,()=>flappyGame(id,level>=10?1:level+1));return}raf=requestAnimationFrame(loop)}
 cleanup=()=>{cancelAnimationFrame(raf);removeEventListener('keydown',kd)};loop();
}

/* TIC TAC TOE / MINES / MATH / WHACK / TYPING */
function tttGame(id='tictactoe',level=1){
 const b=shell('❌','Jogo da Velha','Você é X • vença o computador.');b.innerHTML='<div id="tttG" style="display:grid;grid-template-columns:repeat(3,90px);gap:8px;justify-content:center"></div><div id="tttI" class="score">Sua vez</div>';let board=Array(9).fill(''),m=document.querySelector('#tttG'),info=document.querySelector('#tttI');
 const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],win=a=>wins.some(q=>q.every(i=>a[i]&&a[i]===a[q[0]]));
 function draw(){m.innerHTML='';board.forEach((v,i)=>{let q=document.createElement('button');q.textContent=v;q.style.cssText='height:90px;font-size:35px;background:#151f31;color:#fff;border:1px solid #33405a;border-radius:10px';q.onclick=()=>{if(board[i]||win(board))return;board[i]='X';if(win(board)){reward(id,level,3);info.textContent='🏆 Você venceu!';draw();return}let e=board.map((v,j)=>v?null:j).filter(v=>v!==null);if(e.length){board[e[Math.floor(Math.random()*e.length)]]='O';if(win(board))info.textContent='🤖 CPU venceu';else info.textContent='Sua vez'}else info.textContent='Empate';draw()};m.appendChild(q)})}draw();cleanup=()=>{};
}
function minesGame(id='mines',level=1){
 const n=8, total=8+level, b=shell('💣','Campo Minado','Abra as casas seguras • '+total+' minas.');b.innerHTML='<div id="mineG" style="display:grid;grid-template-columns:repeat(8,40px);gap:4px;justify-content:center"></div><div id="mineI" class="score">Casas seguras: 0</div>';let m=document.querySelector('#mineG'),info=document.querySelector('#mineI'),mines=new Set();while(mines.size<total)mines.add(Math.floor(Math.random()*64));let safe=0,done=false;
 for(let i=0;i<64;i++){let q=document.createElement('button');q.textContent='?';q.style.cssText='width:40px;height:40px;background:#151f31;color:#fff;border:1px solid #33405a';q.onclick=()=>{if(done)return;if(mines.has(i)){done=true;q.textContent='💣';m.querySelectorAll('button').forEach((z,j)=>{if(mines.has(j))z.textContent='💣'});stop();endScreen('💥 Mina encontrada!',safe,()=>minesGame(id,level));return}q.textContent='✓';q.disabled=true;safe++;info.textContent='Casas seguras '+safe+'/'+(64-total);if(safe===64-total){done=true;reward(id,level,3);stop();winScreen('🏆 Campo limpo!',safe,()=>minesGame(id,level>=10?1:level+1))}};m.appendChild(q)}cleanup=()=>{};
}
function mathGame(id='math',level=1){
 const b=shell('🧮','Math Challenge','Acerte '+(6+level)+' contas em 30 segundos.');b.innerHTML='<h2 id="eq"></h2><input id="ans" type="number" inputmode="numeric" placeholder="Resposta"><button id="go" class="primary">RESPONDER</button><div id="mt" class="score">Acertos 0 • 30s</div>';let a,bv,op,correct=0,time=30,target=6+level,finished=false,tm;const eq=document.querySelector('#eq'),ans=document.querySelector('#ans'),go=document.querySelector('#go'),mt=document.querySelector('#mt');
 function next(){a=2+Math.floor(Math.random()*(10+level*3));bv=1+Math.floor(Math.random()*(8+level*2));op=Math.random()<.5?'+':'-';eq.textContent=a+' '+op+' '+bv+' = ?';ans.value='';ans.focus()}
 go.onclick=()=>{if(finished)return;let ok=Number(ans.value)===(op==='+'?a+bv:a-bv);if(ok){correct++;sound(700)}else sound(180,.05,'square');if(correct>=target){finished=true;clearInterval(tm);stop();reward(id,level,3);winScreen('🧮 Conta fechada!',correct,()=>mathGame(id,level>=10?1:level+1));return}next()};
 ans.onkeydown=e=>{if(e.key==='Enter')go.click()};next();tm=setInterval(()=>{time--;mt.textContent='Acertos '+correct+'/'+target+' • '+time+'s';if(time<=0){finished=true;clearInterval(tm);stop();endScreen('⏱️ Tempo esgotado!',correct,()=>mathGame(id,level))}},1000);cleanup=()=>clearInterval(tm);
}
function whackGame(id='whack',level=1){
 const b=shell('🔨','Whack a Mole','Acerte '+(10+level*2)+' aparições em 25 segundos.');b.innerHTML='<div id="holes" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:520px;margin:auto"></div><div id="wi" class="score">Pontos 0 • 25s</div>';let h=document.querySelector('#holes'),info=document.querySelector('#wi'),score=0,time=25,active=true,current=-1,t1,t2;
 for(let i=0;i<9;i++){let q=document.createElement('button');q.textContent='🕳️';q.style.cssText='height:100px;font-size:48px;background:#151f31;border:1px solid #33405a;border-radius:14px';q.onclick=()=>{if(active&&i===current){score++;sound(600,.03);show()}};h.appendChild(q)}
 const qs=[...h.children];function show(){qs.forEach(q=>q.textContent='🕳️');current=Math.floor(Math.random()*9);qs[current].textContent='🐹';info.textContent='Pontos '+score+' • '+time+'s';if(score>=10+level*2){active=false;clearInterval(t1);clearTimeout(t2);stop();reward(id,level,3);winScreen('🔨 Excelente!',score,()=>whackGame(id,level>=10?1:level+1))}else t2=setTimeout(show,Math.max(300,850-level*40))}
 show();t1=setInterval(()=>{time--;info.textContent='Pontos '+score+' • '+time+'s';if(time<=0){active=false;clearInterval(t1);clearTimeout(t2);stop();endScreen('⏱️ Fim!',score,()=>whackGame(id,level))}},1000);cleanup=()=>{clearInterval(t1);clearTimeout(t2)};
}
function typingGame(id='typing',level=1){
 const b=shell('⌨️','Typing Speed','Digite '+(8+level)+' palavras antes de 30 segundos.');b.innerHTML='<h2 id="tw"></h2><input id="ti" placeholder="Digite aqui"><div id="tys" class="score">0/'+(8+level)+' • 30s</div>';let words=['velocidade','javascript','arcade','aventura','computador','desafio','corrida','jogador','internet','pontuacao'],w,score=0,time=30,target=8+level,done=false,tm;const p=document.querySelector('#tw'),inp=document.querySelector('#ti'),info=document.querySelector('#tys');function next(){w=words[Math.floor(Math.random()*words.length)];p.textContent=w;inp.value='';inp.focus()}inp.oninput=()=>{if(inp.value.trim().toLowerCase()===w){score++;sound(650,.025);if(score>=target){done=true;clearInterval(tm);stop();reward(id,level,3);winScreen('⌨️ Meta alcançada!',score,()=>typingGame(id,level>=10?1:level));return}next()}};next();tm=setInterval(()=>{time--;info.textContent=score+'/'+target+' • '+time+'s';if(time<=0){done=true;clearInterval(tm);stop();endScreen('⏱️ Tempo esgotado!',score,()=>typingGame(id,level))}},1000);cleanup=()=>clearInterval(tm);
}

/* GIRLS / COLORING / COOKING */
function dressGame(id='princessdress',level=1){
 const b=shell('👗','Princess Dress Up','Complete o look pedido na fase '+level+'.');let sets=[['👱‍♀️','👗','👠','👑'],['👩‍🦰','🥻','👟','🎀'],['🧑‍🎤','👚','🥾','👜']],target=sets[(level-1)%sets.length],sel=[];
 b.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px"><div id="model" style="min-height:280px;border-radius:18px;background:#f5d9ea;display:flex;align-items:center;justify-content:center;font-size:70px">👱‍♀️<br>👗</div><div id="opts"></div></div><p id="di" class="score">Pedido: '+target.join(' ')+'</p>';const model=document.querySelector('#model'),opts=document.querySelector('#opts'),info=document.querySelector('#di');const groups=[['Cabelo',['👱‍♀️','👩‍🦰','🧑‍🎤']],['Roupa',['👗','🥻','👚']],['Calçado',['👠','👟','🥾']],['Acessório',['👑','🎀','👜']]];groups.forEach((g,i)=>{let d=document.createElement('div');d.innerHTML='<b>'+g[0]+'</b> ';g[1].forEach(v=>{let q=document.createElement('button');q.className='primary';q.textContent=v;q.onclick=()=>{sel[i]=v;model.textContent=sel.join(' ');if(sel.length===4){let ok=target.every((v,j)=>sel[j]===v);info.textContent=ok?'🏆 Look perfeito!':'❌ Ajuste o look conforme o pedido.';if(ok){reward(id,level,3);winScreen('✨ Look perfeito!',level,()=>dressGame(id,level>=10?1:level+1))}}};d.appendChild(q)});opts.appendChild(d)});cleanup=()=>{};
}
function colorGame(id,level,kind){
 const b=shell(kind==='cars'?'🏎️':kind==='animals'?'🦄':'🎨','Colorir '+(kind==='cars'?'Carros':kind==='animals'?'Animais':'Fun'),'Complete '+(5+level)+' pinturas.');let icons=kind==='cars'?['🏎️','🚗','🚙','🚕','🛻','🏍️']:kind==='animals'?['🦄','🐱','🦋','🐶','🐼','🐰']:['🌈','⭐','🎈','🌸','🍭','🎮'];let done=0,color='#ff4d6d';b.innerHTML='<div id="palette" style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap"></div><div id="paintG" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:600px;margin:15px auto"></div><div id="pi" class="score">0/'+(5+level)+'</div>';const pal=document.querySelector('#palette'),pg=document.querySelector('#paintG'),info=document.querySelector('#pi');['#ff4d6d','#ffd43b','#18d6a0','#4dabf7','#b36cff'].forEach((c,i)=>{let q=document.createElement('button');q.className='primary';q.textContent=['🔴','🟡','🟢','🔵','🟣'][i];q.onclick=()=>color=c;pal.appendChild(q)});for(let i=0;i<6;i++){let q=document.createElement('button');q.textContent=icons[i];q.style.cssText='font-size:55px;height:105px;background:#fff;border:3px solid #ddd;border-radius:16px';q.onclick=()=>{if(q.dataset.painted)return;q.dataset.painted=1;q.style.background=color;q.style.borderColor=color;done++;info.textContent=done+'/'+(5+level);sound(500);if(done>=5+level){reward(id,level,3);winScreen('🎨 Obra concluída!',done,()=>colorGame(id,level>=10?1:level,kind))}};pg.appendChild(q)}cleanup=()=>{};
}
function petGame(id='petcare',level=1){
 const b=shell('🐶','Pet Care','Mantenha o pet feliz por '+(20+level*3)+' segundos.');b.innerHTML='<div id="pet" style="font-size:100px;text-align:center">🐶</div><div id="ps" class="score"></div><div style="display:flex;gap:8px;justify-content:center"><button id="feed" class="primary">🍖 Alimentar</button><button id="bath" class="primary">🛁 Banho</button><button id="play" class="primary">🎾 Brincar</button></div>';let food=75,happy=75,time=20+level*3,tm,ended=false;const pet=document.querySelector('#pet'),ps=document.querySelector('#ps');function draw(){ps.textContent='🍖 '+food+' • 😊 '+happy+' • ⏱️ '+time;if(food<25||happy<25){ended=true;clearInterval(tm);stop();endScreen('🥺 O pet ficou triste!',Math.max(0,food+happy),()=>petGame(id,level));return}if(time<=0){ended=true;clearInterval(tm);stop();reward(id,level,3);winScreen('🐶 Pet muito feliz!',food+happy,()=>petGame(id,level>=10?1:level+1))}}document.querySelector('#feed').onclick=()=>{food=Math.min(100,food+20);happy=Math.min(100,happy+3);sound(600);draw()};document.querySelector('#bath').onclick=()=>{happy=Math.min(100,happy+14);sound(520);draw()};document.querySelector('#play').onclick=()=>{happy=Math.min(100,happy+20);food=Math.max(0,food-8);sound(700);draw()};draw();tm=setInterval(()=>{time--;food-=2;happy-=1;draw()},1000);cleanup=()=>clearInterval(tm);
}
function cookingGame(id,level,type){
 const names=type==='pizza'?['🍅','🧀','🌶️']:['🍞','🧀','🥓'];let order=[...names].sort(()=>Math.random()-.5).slice(0,Math.min(2+Math.floor(level/3),names.length));const b=shell(type==='pizza'?'🍕':'👨‍🍳',type==='pizza'?'Pizza Maker':'Master Chef','Siga o pedido da fase '+level+'.');b.innerHTML='<h3>Pedido: '+order.join(' ')+'</h3><div id="ings" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"></div><p id="cookI" class="score">0/'+order.length+'</p>';let got=[];const ing=document.querySelector('#ings'),info=document.querySelector('#cookI');['🍅','🧀','🌶️','🍍','🥓','🍄','🫑','🍞'].forEach(v=>{let q=document.createElement('button');q.className='primary';q.textContent=v;q.onclick=()=>{if(got.includes(v))return;if(order.includes(v)){got.push(v);sound(600);info.textContent=got.length+'/'+order.length;if(got.length===order.length){reward(id,level,3);winScreen('👨‍🍳 Pedido perfeito!',got.length,()=>cookingGame(id,level>=10?1:level,type))}}else{sound(150,.06,'square');info.textContent='❌ Ingrediente errado!'}};ing.appendChild(q)});cleanup=()=>{};
}
function bakeryGame(id='bakery',level=1){cookingGame(id,level,'bakery')}

/* FLIGHT / MANAGEMENT */
function flightGame(id='flightacademy',level=1){
 const b=shell('✈️','Flight Academy','Faça uma aterrissagem suave. Ajuste potência e altitude.');const[c,info]=canvas(),x=c.getContext('2d');let alt=220,spd=150,pow=50,raf=0,keys={};const un=keyboard(keys);
 function loop(){x.fillStyle='#78bce8';x.fillRect(0,0,760,330);x.fillStyle='#4c8a45';x.fillRect(0,330,760,100);x.fillStyle='#555';x.fillRect(500,320,180,12);if(keys.ArrowUp)pow=Math.min(100,pow+1);if(keys.ArrowDown)pow=Math.max(0,pow-1);alt+=((pow-52)*.025);spd+=(pow-55)*.012;alt=Math.max(0,alt);x.font='40px sans-serif';x.fillText('✈️',100,Math.max(35,330-alt*.6));info.textContent='Altitude '+Math.round(alt)+' ft • Velocidade '+Math.round(spd)+' kt • Potência '+pow+'%';if(alt<=2){stop();if(spd>=80&&spd<=180&&pow<60){reward(id,level,3);winScreen('🛬 Pouso perfeito!',level,()=>flightGame(id,level>=10?1:level+1))}else endScreen('💥 Pouso difícil!',Math.round(spd),()=>flightGame(id,level));return}raf=requestAnimationFrame(loop)}cleanup=()=>{cancelAnimationFrame(raf);un()};loop();
}
function landingGame(id,title,icon,level=1){
 const b=shell(icon,title,'Controle o veículo e complete a missão da fase '+level);const[c,info]=canvas(),x=c.getContext('2d');let progress=0,speed=50,energy=100,raf=0,keys={},good=0;const un=keyboard(keys),target=500+level*120;
 function loop(){x.fillStyle='#101820';x.fillRect(0,0,760,430);x.fillStyle='#273447';x.fillRect(0,330,760,100);if(keys.ArrowUp||keys.w)speed=Math.min(120,speed+1.2);if(keys.ArrowDown||keys.s)speed=Math.max(0,speed-1.5);if(keys.ArrowLeft)good=Math.max(-40,good-1);if(keys.ArrowRight)good=Math.min(40,good+1);progress+=speed*.03;energy=Math.max(0,energy-speed*.0015);x.font='46px sans-serif';x.fillText(icon,100+Math.sin(progress/30)*good,320);info.textContent='Progresso '+Math.floor(progress)+'/'+target+' • Velocidade '+Math.floor(speed)+' • Energia '+Math.floor(energy);if(energy<=0){stop();endScreen('🔋 Combustível/energia acabou!',Math.floor(progress),()=>landingGame(id,title,icon,level));return}if(progress>=target){stop();reward(id,level,3);winScreen('🏆 Missão concluída!',Math.floor(progress),()=>landingGame(id,title,icon,level>=10?1:level+1));return}raf=requestAnimationFrame(loop)}cleanup=()=>{cancelAnimationFrame(raf);un()};loop();
}
function parkingGame(id='parking',level=1){
 const b=shell('🅿️','Parking Challenge','Estacione dentro da vaga sem encostar nos cones.');const[c,info]=canvas(),x=c.getContext('2d');let px=80,py=340,ang=0,keys={},raf=0;const un=keyboard(keys);
 function loop(){x.fillStyle='#1c232c';x.fillRect(0,0,760,430);x.strokeStyle='#fff';x.lineWidth=4;x.strokeRect(540,260,140,100);x.font='45px sans-serif';x.fillText('🚗',px,py);if(keys.ArrowLeft){px-=2;ang-=1}if(keys.ArrowRight){px+=2;ang+=1}if(keys.ArrowUp)py-=2;if(keys.ArrowDown)py+=2;px=Math.max(20,Math.min(700,px));py=Math.max(50,Math.min(400,py));info.textContent='Vaga: x 540–680 • seu carro: '+Math.floor(px)+','+Math.floor(py);if(px>540&&px<650&&py>300&&py<370){stop();reward(id,level,3);winScreen('🅿️ Estacionamento perfeito!',level,()=>parkingGame(id,level>=10?1:level+1));return}raf=requestAnimationFrame(loop)}cleanup=()=>{cancelAnimationFrame(raf);un()};loop();
}
function farmGame(id='farm',level=1){
 const b=shell('🚜','Farm Challenge','Plante, espere crescer e colha '+(5+level)+' sacas.');b.innerHTML='<div id="farmG" style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;max-width:600px;margin:auto"></div><div id="farmI" class="score"></div>';let goal=5+level,harvest=0,plots=[];const g=document.querySelector('#farmG'),info=document.querySelector('#farmI');for(let i=0;i<25;i++){let q=document.createElement('button');q.textContent='🟫';q.style.cssText='height:70px;font-size:32px;background:#9a6b3a;border:1px solid #54391f;border-radius:8px';q.onclick=()=>{if(q.dataset.state==='ready'){q.textContent='🌾';q.dataset.state='done';harvest++;sound(600)}else if(!q.dataset.state){q.textContent='🌱';q.dataset.state='growing';setTimeout(()=>{if(q.dataset.state==='growing'){q.textContent='🌾';q.dataset.state='ready'}},800+Math.random()*1200)}info.textContent='Colheita '+harvest+'/'+goal;if(harvest>=goal){stop();reward(id,level,3);winScreen('🚜 Colheita concluída!',harvest,()=>farmGame(id,level>=10?1:level+1))}};g.appendChild(q)}cleanup=()=>{};
}
function fishingGame(id='fishing',level=1){
 const b=shell('🎣','Fishing Challenge','Clique quando o peixe estiver na área verde.');b.innerHTML='<div style="max-width:600px;margin:auto"><div style="height:44px;background:#26344d;border-radius:20px;overflow:hidden"><div id="fishBar" style="height:100%;width:18%;background:#18d6a0"></div></div><button id="fishBtn" class="primary" style="margin-top:18px">🎣 PUXAR</button><div id="fishI" class="score">Peixes 0/'+(3+level)+'</div></div>';let pos=0,dir=1,caught=0,target=3+level,raf=0;const bar=document.querySelector('#fishBar'),info=document.querySelector('#fishI'),btn=document.querySelector('#fishBtn');function loop(){pos+=dir*(1+level*.08);if(pos>82||pos<0)dir*=-1;bar.style.marginLeft=pos+'%';raf=requestAnimationFrame(loop)}btn.onclick=()=>{if(pos>35&&pos<58){caught++;sound(700)}else sound(160,.05,'square');info.textContent='Peixes '+caught+'/'+target;if(caught>=target){stop();reward(id,level,3);winScreen('🎣 Pescaria concluída!',caught,()=>fishingGame(id,level>=10?1:level))}};cleanup=()=>cancelAnimationFrame(raf);loop();
}
function spaceGame(id='space',level=1){
 const b=shell('🚀','Space Dock','Atravesse o campo e acople na estação.');const[c,info]=canvas(),x=c.getContext('2d');let px=80,py=210,dx=0,dy=0,keys={},raf=0;const un=keyboard(keys);
 function loop(){x.fillStyle='#050611';x.fillRect(0,0,760,430);for(let i=0;i<35;i++){x.fillStyle='#fff';x.fillRect((i*97)%760,(i*53)%430,2,2)}x.font='42px sans-serif';x.fillText('🚀',px,py);x.font='50px sans-serif';x.fillText('🛰️',650,220);if(keys.ArrowLeft)px-=2;if(keys.ArrowRight)px+=2;if(keys.ArrowUp)py-=2;if(keys.ArrowDown)py+=2;info.textContent='Distância '+Math.floor(Math.hypot(650-px,220-py))+' • Use as setas';if(Math.hypot(650-px,220-py)<55){stop();reward(id,level,3);winScreen('🛰️ Acoplamento perfeito!',level,()=>spaceGame(id,level>=10?1:level+1));return}raf=requestAnimationFrame(loop)}cleanup=()=>{cancelAnimationFrame(raf);un()};loop();
}
function airportGame(id='airport',level=1){
 const b=shell('🛫','Airport Manager','Pouse os aviões na pista antes que saiam do aeroporto.');const[c,info]=canvas(),x=c.getContext('2d');let planes=[],safe=0,raf=0;for(let i=0;i<3+Math.floor(level/2);i++)planes.push({x:-i*150,y:70+i*55,v:1.5+level*.12});function loop(){x.fillStyle='#183a2b';x.fillRect(0,0,760,430);x.fillStyle='#555';x.fillRect(300,200,400,35);planes.forEach(p=>{p.x+=p.v;x.font='35px sans-serif';x.fillText('✈️',p.x,p.y)});info.textContent='Pousos '+safe+'/'+(3+Math.floor(level/2))+' • Clique no avião quando estiver sobre a pista';if(planes.some(p=>p.x>760)){stop();endScreen('💥 Avião saiu do aeroporto!',safe,()=>airportGame(id,level));return}raf=requestAnimationFrame(loop)}c.onclick=e=>{let q=c.getBoundingClientRect(),mx=e.clientX-q.left,my=e.clientY-q.top,i=planes.findIndex(p=>mx>p.x&&mx<p.x+45&&my>p.y-35&&my<p.y+5&&p.y>150&&p.y<250);if(i>=0){planes.splice(i,1);safe++;sound(700);if(!planes.length){stop();reward(id,level,3);winScreen('🛬 Aeroporto organizado!',safe,()=>airportGame(id,level>=10?1:level+1))}}};cleanup=()=>cancelAnimationFrame(raf);loop();
}

/* GAME MAP */
const map={
 platformer:()=>platformer('platformer',1),snake:()=>snake('snake',1),blocks:()=>blocksGame('blocks',1),racer:()=>racerGame('racer',1,'🏎️','Neon Racer'),
 memory:()=>memoryGame('memory',1),clicker:()=>clickerGame('clicker',1),pong:()=>pongGame('pong',1),breakout:()=>breakoutGame('breakout',1),flappy:()=>flappyGame('flappy',1),
 tictactoe:()=>tttGame('tictactoe',1),mines:()=>minesGame('mines',1),math:()=>mathGame('math',1),whack:()=>whackGame('whack',1),typing:()=>typingGame('typing',1),
 car:()=>racerGame('car',1,'🚗','City Car Challenge'),bus:()=>racerGame('bus',1,'🚌','Bus Route Challenge'),truck:()=>racerGame('truck',1,'🚚','Truck Route Challenge'),
 train:()=>racerGame('train',1,'🚆','Train Control'),motorcycle:()=>racerGame('motorcycle',1,'🏍️','Moto Rush'),kartrush:()=>racerGame('kartrush',1,'🏎️','Kart Rush'),
 citydriver:()=>racerGame('citydriver',1,'🚗','City Driver'),speedrace:()=>racerGame('speedrace',1,'🏎️','Speed Race'),
 flight:()=>flightGame('flight',1),flightacademy:()=>flightGame('flightacademy',1),parking:()=>parkingGame('parking',1),farm:()=>farmGame('farm',1),fishing:()=>fishingGame('fishing',1),space:()=>spaceGame('space',1),spacebattle:()=>racerGame('spacebattle',1,'🚀','Space Battle'),
 goalkeeper:()=>goalkeeperGame('goalkeeper',1),princessdress:()=>dressGame('princessdress',1),fashionstudio:()=>dressGame('fashionstudio',1),
 petcare:()=>petGame('petcare',1),colorfun:()=>colorGame('colorfun',1,'fun'),coloranimals:()=>colorGame('coloranimals',1,'animals'),colorcars:()=>colorGame('colorcars',1,'cars'),
 masterchef:()=>cookingGame('masterchef',1,'chef'),pizzamaker:()=>cookingGame('pizzamaker',1,'pizza'),bakery:()=>cookingGame('bakery',1,'bakery'),airport:()=>airportGame('airport',1)
};
function goalkeeperGame(id='goalkeeper',level=1){
 const b=shell('🥅','Goal Keeper','Defenda '+(6+level)+' cobranças. Clique na bola quando ela entrar na área.');b.innerHTML='<div id="goalG" style="position:relative;height:330px;border-radius:18px;overflow:hidden;background:linear-gradient(#72c8f2 0 58%,#4caf50 58%);border:2px solid #2c405d"><div id="goalBall" style="position:absolute;font-size:44px;left:47%;top:12px">⚽</div><div style="position:absolute;left:25%;right:25%;bottom:25px;height:100px;border:5px solid #fff"></div></div><div id="goalI" class="score">Defesas 0 • 0/'+(6+level)+'</div>';let saves=0,shots=0,active=true,timer;const ball=document.querySelector('#goalBall'),info=document.querySelector('#goalI');function shot(){if(!active)return;shots++;ball.style.left=(30+Math.random()*40)+'%';ball.style.top=(45+Math.random()*40)+'%';info.textContent='Defesas '+saves+' • '+shots+'/'+(6+level)}ball.onclick=()=>{if(!active)return;saves++;sound(760);info.textContent='🧤 DEFESA! '+saves+' • '+shots+'/'+(6+level);if(saves>=6+level){active=false;clearInterval(timer);stop();reward(id,level,3);winScreen('🥅 Gol fechado!',saves,()=>goalkeeperGame(id,level>=10?1:level+1))}};shot();timer=setInterval(shot,1100);cleanup=()=>clearInterval(timer);
}
const originalLaunch=window.launch;
window.launch=function(id){
 stop();
 const g=(window.games||[]).find?.(x=>x.id===id);
 if(g){document.querySelector('#gameCategory').textContent=g.cat.toUpperCase();document.querySelector('#gameTitle').textContent=g.name}
 modal.classList.remove('hidden');
 if(map[id]){try{map[id]()}catch(e){console.error(e);area.innerHTML='<div class="gox-end"><h2>Erro ao iniciar</h2><button class="primary" onclick="location.reload()">RECARREGAR</button></div>'}}
 else if(originalLaunch){originalLaunch(id)}else{area.innerHTML='<div class="gox-end"><h2>Jogo indisponível</h2></div>'}
};
closeBtn.onclick=()=>{stop();modal.classList.add('hidden');area.innerHTML=''};
modal.addEventListener('click',e=>{if(e.target===modal){stop();modal.classList.add('hidden');area.innerHTML=''}});
document.querySelectorAll('[data-launch]').forEach(el=>el.onclick=e=>{e.preventDefault();e.stopPropagation();window.launch(el.dataset.launch)});
})();
