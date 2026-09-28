const games=[
{id:'platformer',name:'Super Jump',cat:'arcade',icon:'🦘',desc:'Plataforma infinita e obstáculos.'},
{id:'snake',name:'Snake',cat:'classic',icon:'🐍',desc:'Coma, cresça e sobreviva.'},
{id:'blocks',name:'Block Master',cat:'classic',icon:'🧱',desc:'Empilhe blocos no tempo certo.'},
{id:'racer',name:'Neon Racer',cat:'arcade',icon:'🏎️',desc:'Desvie do trânsito.'},
{id:'memory',name:'Memory Cards',cat:'puzzle',icon:'🃏',desc:'Encontre todos os pares.'},
{id:'clicker',name:'Coin Clicker',cat:'arcade',icon:'🪙',desc:'Clique e compre melhorias.'},
{id:'pong',name:'Pong',cat:'sports',icon:'🏓',desc:'Bata a bola e marque pontos.'},
{id:'breakout',name:'Brick Breaker',cat:'arcade',icon:'🧱',desc:'Quebre todos os blocos.'},
{id:'flappy',name:'Flappy Sky',cat:'arcade',icon:'🐦',desc:'Passe pelos obstáculos.'},
{id:'tictactoe',name:'Jogo da Velha',cat:'classic',icon:'❌',desc:'Jogue contra o computador.'},
{id:'mines',name:'Campo Minado',cat:'puzzle',icon:'💣',desc:'Abra as casas sem encontrar minas.'},
{id:'math',name:'Math Challenge',cat:'puzzle',icon:'🧮',desc:'Resolva contas contra o relógio.'},
{id:'whack',name:'Whack a Mole',cat:'arcade',icon:'🔨',desc:'Acerte o alvo o mais rápido possível.'},
{id:'typing',name:'Typing Speed',cat:'puzzle',icon:'⌨️',desc:'Teste sua velocidade de digitação.'},
{id:'car',name:'Simulador de Carro',cat:'sim',icon:'🚗',desc:'Velocidade, RPM e combustível.'},
{id:'flight',name:'Simulador de Voo',cat:'sim',icon:'✈️',desc:'Altitude, potência e velocidade.'},
{id:'bus',name:'Simulador de Ônibus',cat:'sim',icon:'🚌',desc:'Velocidade, passageiros e combustível.'},
{id:'truck',name:'Simulador de Caminhão',cat:'sim',icon:'🚚',desc:'Carga, consumo e velocidade.'},
{id:'farm',name:'Simulador de Fazenda',cat:'sim',icon:'🚜',desc:'Plante, colha e administre.'},
{id:'parking',name:'Simulador de Estacionamento',cat:'sim',icon:'🅿️',desc:'Controle o carro e estacione.'},
{id:'train',name:'Simulador de Trem',cat:'sim',icon:'🚆',desc:'Controle velocidade e freios.'},
{id:'fishing',name:'Simulador de Pesca',cat:'sim',icon:'🎣',desc:'Lance a linha e pesque.'},
{id:'space',name:'Simulador Espacial',cat:'sim',icon:'🚀',desc:'Controle combustível e altitude.'},
{id:'superplumber',name:'Super Plumber',cat:'arcade',icon:'🍄',desc:'Plataforma original com moedas e obstáculos.'},
{id:'kartrush',name:'Kart Rush',cat:'sports',icon:'🏁',desc:'Corrida de kart arcade original.'},
{id:'citydriver',name:'City Driver',cat:'arcade',icon:'🌆',desc:'Direção urbana em uma cidade fictícia.'},
{id:'spacebattle',name:'Space Battle',cat:'arcade',icon:'👾',desc:'Nave contra ondas de inimigos.'},
{id:'goalkeeper',name:'Goal Keeper',cat:'sports',icon:'🥅',desc:'Defenda o gol e faça sua pontuação.'},
{id:'princessdress',name:'Princess Dress Up',cat:'girls',icon:'👗',desc:'Monte looks e crie combinações.'},
{id:'fashionstudio',name:'Fashion Studio',cat:'girls',icon:'💄',desc:'Monte seu estilo e escolha acessórios.'},
{id:'petcare',name:'Pet Care',cat:'girls',icon:'🐶',desc:'Cuide, alimente e divirta seu pet.'},
{id:'colorfun',name:'Color Fun',cat:'coloring',icon:'🎨',desc:'Pinte desenhos com várias cores.'},
{id:'coloranimals',name:'Colorir Animais',cat:'coloring',icon:'🦄',desc:'Pinte animais e criaturas fofas.'},
{id:'colorcars',name:'Colorir Carros',cat:'coloring',icon:'🚗',desc:'Pinte carros de corrida.'},
{id:'masterchef',name:'Master Chef Junior',cat:'cooking',icon:'👨‍🍳',desc:'Prepare receitas e complete desafios.'},
{id:'pizzamaker',name:'Pizza Maker',cat:'cooking',icon:'🍕',desc:'Monte sua pizza e acerte os ingredientes.'},
{id:'bakery',name:'Bakery Star',cat:'cooking',icon:'🧁',desc:'Prepare doces e organize sua confeitaria.'},
{id:'flightacademy',name:'Flight Academy',cat:'flight',icon:'🛩️',desc:'Aprenda controles básicos de voo.'},
{id:'airport',name:'Airport Manager',cat:'flight',icon:'🛫',desc:'Organize pousos e decolagens.'},
{id:'speedrace',name:'Speed Race',cat:'racing',icon:'🏎️',desc:'Corrida rápida contra o relógio.'},
{id:'motorcycle',name:'Moto Rush',cat:'racing',icon:'🏍️',desc:'Desvie de obstáculos em alta velocidade.'}
];
const grid=document.querySelector('#grid'),modal=document.querySelector('#modal'),area=document.querySelector('#gameArea');
function render(filter='all',q=''){grid.innerHTML=games.filter(g=>(filter==='all'||g.cat===filter)&&g.name.toLowerCase().includes(q.toLowerCase())).map(g=>`<article class="card" data-launch="${g.id}"><button class="fav-btn" onclick="toggleFavorite('${g.id}',event)">${state.favorites.includes(g.id)?'❤️':'🤍'}</button><div class="thumb">${g.icon}</div><h3>${g.name}</h3><p>${g.desc}</p><div class="tag">${g.cat.toUpperCase()} • JOGAR</div></article>`).join('');document.querySelectorAll('[data-launch]').forEach(b=>b.onclick=()=>launch(b.dataset.launch))}
document.querySelectorAll('.navbtn').forEach(b=>b.onclick=()=>{document.querySelectorAll('.navbtn').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter,document.querySelector('#search').value)});
document.querySelector('#search').oninput=e=>render(document.querySelector('.navbtn.active').dataset.filter,e.target.value);
function closeGame(){modal.classList.add('hidden');area.innerHTML=''}
document.querySelector('#close').onclick=closeGame;modal.onclick=e=>{if(e.target===modal)closeGame()};
function launch(id){const g=games.find(x=>x.id===id);document.querySelector('#gameCategory').textContent=g.cat.toUpperCase();document.querySelector('#gameTitle').textContent=g.name;modal.classList.remove('hidden');({platformer,snake,blocks,racer,memory,clicker,pong,breakout,flappy,tictactoe,mines,math,whack,typing,car:simCar,flight:simFlight,bus,truck,farm,parking,train,fishing,space,superplumber:platformer,kartrush:racer,citydriver:racer,spacebattle,goalkeeper,princessdress:colorGame,fashionstudio:colorGame,petcare:petGame,colorfun:colorGame,coloranimals:colorGame,colorcars:colorGame,masterchef:chefGame,pizzamaker:chefGame,bakery:chefGame,flightacademy:simFlight,airport:flightGame,speedrace:racer,motorcycle:racer}[id]||clicker)()}
function canvasGame(h=420){area.innerHTML=`<div class="game-wrap"><canvas id="game" width="760" height="${h}"></canvas><div id="score" class="score"></div><div class="controls">Teclado: setas / espaço • Clique e toque também funcionam quando indicado.</div></div>`;return[document.querySelector('#game'),document.querySelector('#score')]}
function platformer(){const[c,s]=canvasGame(400),x=c.getContext('2d');let p={x:70,y:300,vx:0,vy:0},obs=[],score=0,over=false,k={};for(let i=0;i<8;i++)obs.push({x:220+i*110,y:250+Math.random()*80,w:70,h:18});const kd=e=>k[e.key]=1,ku=e=>k[e.key]=0;addEventListener('keydown',kd);addEventListener('keyup',ku);function loop(){x.fillStyle='#101b30';x.fillRect(0,0,c.width,c.height);x.fillStyle='#18d6a0';x.fillRect(0,350,c.width,50);x.fillStyle='#6d5dfc';x.fillRect(p.x,p.y,28,36);if(k.ArrowLeft)p.vx=-4;if(k.ArrowRight)p.vx=4;if((k[' ']||k.ArrowUp)&&p.y>=314)p.vy=-10;p.vy+=.5;p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=0;if(p.x>730)p.x=730;if(p.y>314){p.y=314;p.vy=0}obs.forEach(o=>{o.x-=2;if(o.x<-90){o.x=800;score++;o.y=250+Math.random()*80}x.fillStyle='#f59e0b';x.fillRect(o.x,o.y,o.w,o.h);if(p.x<o.x+o.w&&p.x+28>o.x&&p.y+36>o.y&&p.y<o.y+o.h)over=true});s.textContent=over?'💥 Fim de jogo':'Pontos: '+score;if(!over)requestAnimationFrame(loop)}loop()}
function snake(){const[c,s]=canvasGame(420),x=c.getContext('2d'),N=21,sz=20;let a=[{x:10,y:10}],d={x:1,y:0},food={x:5,y:5},over=false,sc=0;const key=e=>{if(e.key==='ArrowUp'&&d.y===0)d={x:0,y:-1};if(e.key==='ArrowDown'&&d.y===0)d={x:0,y:1};if(e.key==='ArrowLeft'&&d.x===0)d={x:-1,y:0};if(e.key==='ArrowRight'&&d.x===0)d={x:1,y:0}};addEventListener('keydown',key);function loop(){let h={x:a[0].x+d.x,y:a[0].y+d.y};if(h.x<0||h.y<0||h.x>=N||h.y>=N||a.some(q=>q.x===h.x&&q.y===h.y))over=true;a.unshift(h);if(h.x===food.x&&h.y===food.y){sc++;food={x:Math.floor(Math.random()*N),y:Math.floor(Math.random()*N)}}else a.pop();x.fillStyle='#08101b';x.fillRect(0,0,c.width,c.height);x.fillStyle='#18d6a0';a.forEach(q=>x.fillRect(q.x*sz,q.y*sz,sz-2,sz-2));x.fillStyle='#ff4d6d';x.fillRect(food.x*sz,food.y*sz,sz-2,sz-2);s.textContent=over?'💥 Fim de jogo':'Pontos: '+sc;if(!over)setTimeout(()=>requestAnimationFrame(loop),105)}loop()}
function blocks(){const[c,s]=canvasGame(420),x=c.getContext('2d');let y=380,stack=0;function loop(){x.fillStyle='#080e19';x.fillRect(0,0,c.width,c.height);let w=120,px=(Date.now()/3)%(760-w);if(Math.floor(Date.now()/900)%2)px=760-w-px;x.fillStyle='#6d5dfc';x.fillRect(px,y,w,18);s.textContent='Altura: '+stack;requestAnimationFrame(loop)}loop();c.onclick=()=>{stack++;y=Math.max(80,y-18)}}
function racer(){const[c,s]=canvasGame(420),x=c.getContext('2d');let car=350,obs=[],score=0,k={};for(let i=0;i<5;i++)obs.push({x:190+Math.random()*350,y:-i*120});addEventListener('keydown',e=>k[e.key]=1);addEventListener('keyup',e=>k[e.key]=0);function loop(){x.fillStyle='#111';x.fillRect(0,0,c.width,c.height);x.fillStyle='#333';x.fillRect(170,0,420,c.height);x.fillStyle='#fff';for(let y=0;y<420;y+=60)x.fillRect(375,y+(Date.now()/8%60),8,30);if(k.ArrowLeft)car-=6;if(k.ArrowRight)car+=6;car=Math.max(180,Math.min(550,car));x.fillStyle='#18d6a0';x.fillRect(car,330,42,65);let hit=false;obs.forEach(o=>{o.y+=5;if(o.y>430){o.y=-80;o.x=190+Math.random()*360;score++}x.fillStyle='#ff4d6d';x.fillRect(o.x,o.y,42,65);if(car<o.x+42&&car+42>o.x&&330<o.y+65&&395>o.y)hit=true});s.textContent=hit?'💥 Bateu! Pontos: '+score:'Pontos: '+score;if(!hit)requestAnimationFrame(loop)}loop()}
function memory(){area.innerHTML='<div class="game-wrap"><div id="mem" class="grid"></div><div id="score" class="score">Tentativas: 0</div></div>';let vals=['🍎','🚀','🎮','⚽','🐱','⭐','🍕','🎯'],deck=[...vals,...vals].sort(()=>Math.random()-.5),first=null,lock=false,tries=0,found=0,m=document.querySelector('#mem'),sc=document.querySelector('#score');m.style.gridTemplateColumns='repeat(4,1fr)';deck.forEach(v=>{let b=document.createElement('button');b.style.cssText='height:80px;font-size:30px;background:#151f31;border:1px solid #253149;border-radius:10px;color:white';b.textContent='?';b.onclick=()=>{if(lock||b.dataset.done)return;b.textContent=v;if(!first)first={b,v};else{tries++;if(first.v===v){first.b.dataset.done=b.dataset.done=1;found+=2;first=null}else{lock=true;let f=first;first=null;setTimeout(()=>{f.b.textContent=b.textContent='?';lock=false},450)}}sc.textContent=found===16?'🏆 Concluído! Tentativas: '+tries:'Tentativas: '+tries};m.appendChild(b)})}
function clicker(){area.innerHTML='<div class="game-wrap"><div id="coin" style="font-size:90px;cursor:pointer">🪙</div><div id="coins" class="score">0 moedas</div><button class="primary" id="upgrade">Melhoria: 10 moedas</button></div>';let n=0,p=1;coin.onclick=()=>{n+=p;coins.textContent=n+' moedas • +'+p+'/clique'};upgrade.onclick=()=>{if(n>=10*p){n-=10*p;p++;upgrade.textContent='Melhoria: '+10*p+' moedas';coins.textContent=n+' moedas • +'+p+'/clique'}}}
function pong(){const[c,s]=canvasGame(420),x=c.getContext('2d');let py=170,by=200,bx=380,vx=5,vy=3,score=0,k={};addEventListener('keydown',e=>k[e.key]=1);addEventListener('keyup',e=>k[e.key]=0);function loop(){x.fillStyle='#050912';x.fillRect(0,0,c.width,c.height);if(k.ArrowUp)py-=6;if(k.ArrowDown)py+=6;py=Math.max(0,Math.min(340,py));by+=vy;bx+=vx;if(by<8||by>412)vy*=-1;if(bx<45&&by>py&&by<py+80)vx=Math.abs(vx);if(bx>715){score++;bx=380;vx=-5}if(bx<0){s.textContent='Fim! Pontos: '+score;return}x.fillStyle='#18d6a0';x.fillRect(20,py,20,80);x.fillRect(720,by-40,20,80);x.beginPath();x.arc(bx,by,9,0,7);x.fill();s.textContent='Pontos: '+score;requestAnimationFrame(loop)}loop()}
function breakout(){const[c,s]=canvasGame(430),x=c.getContext('2d');let px=330,b={x:380,y:360,vx:4,vy:-4},br=[];for(let r=0;r<4;r++)for(let j=0;j<8;j++)br.push({x:50+j*85,y:40+r*30,on:1});addEventListener('mousemove',e=>{let q=c.getBoundingClientRect();px=(e.clientX-q.left)-55});function loop(){x.fillStyle='#080d17';x.fillRect(0,0,c.width,c.height);if(b.x<8||b.x>752)b.vx*=-1;if(b.y<8)b.vy*=-1;b.x+=b.vx;b.y+=b.vy;if(b.y>390&&b.x>px&&b.x<px+110)b.vy=-Math.abs(b.vy);br.forEach(z=>{if(z.on&&b.x>z.x&&b.x<z.x+75&&b.y>z.y&&b.y<z.y+20){z.on=0;b.vy*=-1}});br.forEach(z=>{if(z.on){x.fillStyle='#6d5dfc';x.fillRect(z.x,z.y,75,20)}});x.fillStyle='#18d6a0';x.fillRect(px,400,110,15);x.fillStyle='#fff';x.beginPath();x.arc(b.x,b.y,8,0,7);x.fill();s.textContent='Blocos restantes: '+br.filter(z=>z.on).length;if(b.y>430)return;requestAnimationFrame(loop)}loop()}
function flappy(){const[c,s]=canvasGame(420),x=c.getContext('2d');let y=200,vy=0,obs=[],sc=0,over=false;for(let i=0;i<4;i++)obs.push({x:600+i*220,g:120+Math.random()*160});const flap=()=>{vy=-7};c.onclick=flap;addEventListener('keydown',e=>{if(e.key===' '||e.key==='ArrowUp')flap()});function loop(){x.fillStyle='#13213a';x.fillRect(0,0,c.width,c.height);vy+=.35;y+=vy;x.fillStyle='#ffd166';x.fillRect(100,y,30,22);obs.forEach(o=>{o.x-=3;if(o.x<-70){o.x=800;sc++;o.g=120+Math.random()*170}x.fillStyle='#18d6a0';x.fillRect(o.x,0,60,o.g-65);x.fillRect(o.x,o.g+65,60,420);if(100<o.x+60&&130>o.x&&(y<o.g-65||y+22>o.g+65))over=true});if(y<0||y>400)over=true;s.textContent=over?'💥 Fim!':'Pontos: '+sc;if(!over)requestAnimationFrame(loop)}loop()}
function tictactoe(){area.innerHTML='<div class="game-wrap"><div id="ttt" style="display:grid;grid-template-columns:repeat(3,90px);gap:8px;justify-content:center"></div><div id="ttts" class="score">Sua vez: X</div></div>';let board=Array(9).fill(''),m=document.querySelector('#ttt'),out=document.querySelector('#ttts');const win=a=>[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some(q=>q.every(i=>a[i]===a[q[0]]&&a[i]));function draw(){m.innerHTML='';board.forEach((v,i)=>{let b=document.createElement('button');b.textContent=v;b.style.cssText='height:90px;font-size:35px;background:#151f31;color:white;border:1px solid #33405a;border-radius:10px';b.onclick=()=>{if(board[i]||win(board))return;board[i]='X';if(win(board)){out.textContent='🏆 Você venceu!';draw();return}let e=board.map((v,j)=>v?null:j).filter(v=>v!==null);if(e.length){board[e[Math.floor(Math.random()*e.length)]]='O';if(win(board))out.textContent='🤖 O computador venceu!'}else out.textContent='Empate';draw()};m.appendChild(b)})}draw()}
function mines(){area.innerHTML='<div class="game-wrap"><p>Clique nas casas. Evite 10 minas.</p><div id="mine" style="display:grid;grid-template-columns:repeat(8,40px);gap:4px;justify-content:center"></div><div id="ms" class="score">Minas restantes: 10</div></div>';let m=document.querySelector('#mine'),mines=new Set();while(mines.size<10)mines.add(Math.floor(Math.random()*64));let safe=0;for(let i=0;i<64;i++){let b=document.createElement('button');b.textContent='?';b.style.cssText='width:40px;height:40px;background:#151f31;color:white;border:1px solid #33405a';b.onclick=()=>{if(mines.has(i)){b.textContent='💣';document.querySelector('#ms').textContent='💥 Fim de jogo';m.querySelectorAll('button').forEach((q,j)=>{if(mines.has(j))q.textContent='💣'})}else{b.textContent='✓';b.disabled=true;safe++;document.querySelector('#ms').textContent=safe===54?'🏆 Campo limpo!':'Casas seguras: '+safe}};m.appendChild(b)}}
function math(){area.innerHTML='<div class="game-wrap"><h3 id="eq"></h3><input id="ans" type="number" placeholder="Resposta"><button class="primary" id="go">Responder</button><div id="mt" class="score">Acertos: 0 • Tempo: 30</div></div>';let a,b,op,correct=0,time=30;const eq=document.querySelector('#eq'),ans=document.querySelector('#ans'),mt=document.querySelector('#mt');function next(){a=2+Math.floor(Math.random()*20);b=2+Math.floor(Math.random()*15);op=Math.random()<.5?'+':'-';eq.textContent=a+' '+op+' '+b+' = ?';ans.value='';ans.focus()}go.onclick=()=>{if(+ans.value===(op==='+'?a+b:a-b))correct++;next()};next();let t=setInterval(()=>{time--;mt.textContent='Acertos: '+correct+' • Tempo: '+time;if(time<=0){clearInterval(t);go.disabled=true;eq.textContent='⏱️ Fim! Acertos: '+correct}},1000)}
function whack(){area.innerHTML='<div class="game-wrap"><div id="hole" style="font-size:70px;text-align:center;cursor:pointer">🕳️</div><div id="ws" class="score">Pontos: 0 • Tempo: 20</div></div>';let score=0,time=20,h=document.querySelector('#hole'),s=document.querySelector('#ws');let t=setInterval(()=>{time--;s.textContent='Pontos: '+score+' • Tempo: '+time;if(time<=0){clearInterval(t);h.textContent='🏁';h.onclick=null}},1000);h.onclick=()=>{score++;h.textContent=Math.random()>.5?'🐹':'🕳️'}}
function typing(){area.innerHTML='<div class="game-wrap"><p id="word"></p><input id="type" placeholder="Digite a frase"><div id="ts" class="score">Acertos: 0 • 30s</div></div>';let words=['velocidade','javascript','arcade','simulador','gameplay','computador','aventura'],w,score=0,time=30;const p=document.querySelector('#word'),inp=document.querySelector('#type'),s=document.querySelector('#ts');function next(){w=words[Math.floor(Math.random()*words.length)];p.textContent=w;inp.value='';inp.focus()}inp.oninput=()=>{if(inp.value===w){score++;next()}};next();let t=setInterval(()=>{time--;s.textContent='Acertos: '+score+' • '+time+'s';if(time<=0){clearInterval(t);inp.disabled=true;p.textContent='🏆 Resultado: '+score}},1000)}
function simPanel(title,emoji,fields){area.innerHTML='<div class="sim-panel"><div class="box"><h3>'+emoji+' '+title+'</h3>'+fields.map(f=>'<p>'+f[0]+': <b id="'+f[1]+'">'+f[2]+'</b></p>').join('')+'<input id="control" type="range" min="0" max="100" value="50"><button id="reset">Resetar</button></div><div class="box"><h3>Controles</h3><p>Use o controle para alterar a operação do veículo.</p><div style="font-size:100px;text-align:center;padding:20px">'+emoji+'</div></div></div>'}
function simCar(){simPanel('Simulador de Carro','🚗',[['Velocidade','v','0 km/h'],['RPM','rpm','800'],['Combustível','fuel','100%']]);let v=0,f=100;const tick=setInterval(()=>{if(!document.querySelector('#control'))return;let t=+control.value;v+=(t-v/2)*.02;f=Math.max(0,f-t*.0008);document.querySelector('#v').textContent=v.toFixed(0)+' km/h';document.querySelector('#rpm').textContent=Math.round(800+v*55);document.querySelector('#fuel').textContent=f.toFixed(1)+'%'},100);reset.onclick=()=>{v=0;f=100}}
function simFlight(){simPanel('Simulador de Voo','✈️',[['Altitude','v','3000 ft'],['Velocidade','rpm','180 kt'],['Combustível','fuel','100%']]);let alt=3000,spd=180,f=100;setInterval(()=>{if(!control)return;let p=+control.value;spd+=(p-55)*.05;alt+=(p-50)*.3;f=Math.max(0,f*.999);v.textContent=Math.round(alt)+' ft';rpm.textContent=Math.round(spd)+' kt';fuel.textContent=f.toFixed(1)+'%'},100);reset.onclick=()=>{alt=3000;spd=180;f=100}}
function vehicle(title,emoji,max,consume){simPanel(title,emoji,[['Velocidade','v','0 km/h'],['Combustível','fuel','100%'],['Carga','load','50%']]);let v=0,f=100;setInterval(()=>{if(!control)return;let t=+control.value;v=Math.min(max,v+(t-v/2)*.02);f=Math.max(0,f-t*consume);document.querySelector('#v').textContent=v.toFixed(0)+' km/h';document.querySelector('#fuel').textContent=f.toFixed(1)+'%';document.querySelector('#load').textContent=t+'%'},100);reset.onclick=()=>{v=0;f=100}}
function bus(){vehicle('Simulador de Ônibus','🚌',120,.0007)}
function truck(){vehicle('Simulador de Caminhão','🚚',100,.001)}
function train(){vehicle('Simulador de Trem','🚆',240,.0004)}
function parking(){simPanel('Estacionamento','🅿️',[['Distância','v','0 m'],['Ângulo','rpm','0°'],['Tentativas','fuel','3']]);let d=0,a=0,tries=3;control.oninput=()=>{d=+control.value;v.textContent=d+' m';rpm.textContent=(d-50)+'°'};reset.onclick=()=>{d=0;a=0;tries=3;v.textContent='0 m';rpm.textContent='0°';fuel.textContent='3'}}
function farm(){area.innerHTML='<div class="game-wrap"><h3>🚜 Fazenda</h3><p>🌱 Terreno: <b id="crop">0</b> • 🪙 Dinheiro: <b id="money">100</b></p><button class="primary" id="plant">Plantar</button> <button class="primary" id="harvest">Colher</button></div>';let crop=0,money=100;plant.onclick=()=>{if(money>=10){money-=10;crop++;moneyEl()}};harvest.onclick=()=>{money+=crop*18;crop=0;moneyEl()};function moneyEl(){document.querySelector('#crop').textContent=crop;document.querySelector('#money').textContent=money}}
function fishing(){area.innerHTML='<div class="game-wrap"><div style="font-size:100px;cursor:pointer;text-align:center" id="fish">🎣</div><div id="fs" class="score">Peixes: 0 • Clique para lançar</div></div>';let n=0;fish.onclick=()=>{if(Math.random()>.35){n++;fs.textContent='🐟 Peixes: '+n+' • Boa pescaria!'}else fs.textContent='🌊 Nada fisgou. Tente de novo.'}}
function space(){vehicle('Simulador Espacial','🚀',900,.0002)}

// ===== PERFIL, FAVORITOS, RECENTES E RECORDES =====
const STORE='games_online_v2';
const state=JSON.parse(localStorage.getItem(STORE)||'{}');
state.user=state.user||null; state.favorites=state.favorites||[]; state.recent=state.recent||[]; state.records=state.records||{};
function saveState(){localStorage.setItem(STORE,JSON.stringify(state));updateDashboard()}
function updateDashboard(){
 const vals=Object.values(state.records); const best=vals.length?Math.max(...vals):0;
 document.querySelector('#bestScore').textContent=best;
 document.querySelector('#playedCount').textContent=state.recent.length;
 document.querySelector('#favCount').textContent=state.favorites.length;
 document.querySelector('#navProfile').textContent=state.user?'👤 '+state.user:'👤 Entrar';
 const bar=document.querySelector('#accountBar'); if(state.user){bar.classList.remove('hidden');bar.textContent='Olá, '+state.user+'! Seus dados estão salvos neste navegador.'}else bar.classList.add('hidden');
}
async function toggleFavorite(id,e){
 e.stopPropagation();
 const i=state.favorites.indexOf(id);
 if(apiToken){
  try{
   if(i>=0){await api('/api/favorites/'+encodeURIComponent(id),{method:'DELETE'});state.favorites.splice(i,1)}
   else{await api('/api/favorites/'+encodeURIComponent(id),{method:'POST'});state.favorites.push(id)}
  }catch(err){authMessage(err.message)}
 }else{
  if(i>=0)state.favorites.splice(i,1);else state.favorites.push(id);
 }
 saveState();render(document.querySelector('.navbtn.active')?.dataset.filter||'all',document.querySelector('#search').value)
}
function showGames(list,title){document.querySelector('#viewTitle').classList.remove('hidden');document.querySelector('#viewTitle').textContent=title;const active=document.querySelector('.navbtn.active');render(active?active.dataset.filter:'all','');const grid=document.querySelector('#grid');grid.innerHTML=list.map(g=>`<article class="card" data-launch="${g.id}"><button class="fav-btn" onclick="toggleFavorite('${g.id}',event)">${state.favorites.includes(g.id)?'❤️':'🤍'}</button><div class="thumb">${g.icon}</div><h3>${g.name}</h3><p>${g.desc}</p><div class="tag">${g.cat.toUpperCase()} • JOGAR</div></article>`).join('');document.querySelectorAll('[data-launch]').forEach(b=>b.onclick=()=>launch(b.dataset.launch))}
function addRecent(id){state.recent=[id,...state.recent.filter(x=>x!==id)].slice(0,12);saveState()}
function openPanel(id){document.querySelectorAll('.feature-panel').forEach(x=>x.classList.add('hidden'));document.querySelector(id).classList.remove('hidden');document.querySelector(id).scrollIntoView({behavior:'smooth'})}
document.querySelector('#navProfile').onclick=()=>openPanel('#loginPanel');
document.querySelector('#loginBtn').onclick=()=>{const n=document.querySelector('#loginName').value.trim();if(n){state.user=n;saveState();document.querySelector('#loginPanel').classList.add('hidden')}};
document.querySelector('#showRecent').onclick=()=>showGames(state.recent.map(id=>games.find(g=>g.id===id)).filter(Boolean),'🕘 Jogos recentes');
document.querySelector('#showFavorites').onclick=()=>showGames(state.favorites.map(id=>games.find(g=>g.id===id)).filter(Boolean),'❤️ Meus favoritos');
document.querySelector('#showRanking').onclick=()=>{const rows=Object.entries(state.records).sort((a,b)=>b[1]-a[1]).slice(0,20);document.querySelector('#rankingList').innerHTML=rows.length?rows.map((r,i)=>`<div class="rank-row"><div class="rank-pos">#${i+1}</div><div class="rank-name">${(games.find(g=>g.id===r[0])||{name:r[0]}).name}</div><div class="rank-score">${r[1]} pts</div></div>`).join(''):'<p class="panel-note">Jogue para criar seus primeiros recordes.</p>';openPanel('#rankingPanel')};
document.querySelectorAll('[data-close-panel]').forEach(b=>b.onclick=()=>b.closest('.feature-panel').classList.add('hidden'));
const originalLaunch=launch;
launch=function(id){addRecent(id);originalLaunch(id);setTimeout(()=>observeScore(id),80)};
function observeScore(id){
 const el=document.querySelector('#score');if(!el)return;
 const collect=()=>{const m=el.textContent.match(/Pontos:\s*(\d+)/i);if(m){const n=+m[1];state.records[id]=Math.max(state.records[id]||0,n);saveState()}};
 collect();new MutationObserver(collect).observe(el,{childList:true,subtree:true,characterData:true});
}
updateDashboard();
render();


// ===== API REAL: LOGIN, CADASTRO, RANKING GLOBAL E ADM =====
const API=(window.GAMES_API_URL||'').replace(/\/$/,'');
let apiToken=localStorage.getItem('games_api_token')||'';
let apiUser=JSON.parse(localStorage.getItem('games_api_user')||'null');
let authMode='login';
async function api(path,options={}){const headers={'Content-Type':'application/json',...(options.headers||{})};if(apiToken)headers.Authorization='Bearer '+apiToken;const res=await fetch(API+path,{...options,headers});const data=await res.json().catch(()=>({}));if(!res.ok)throw new Error(data.error||'Erro de comunicação');return data}
function setApiSession(data){apiToken=data.token;apiUser=data.user;localStorage.setItem('games_api_token',apiToken);localStorage.setItem('games_api_user',JSON.stringify(apiUser));state.user=apiUser.name;saveState();document.querySelector('#authMsg').textContent='Login realizado com sucesso!'}
function authMessage(t){const e=document.querySelector('#authMsg');if(e)e.textContent=t}
function setAuthMode(mode){authMode=mode;document.querySelector('#tabLogin')?.classList.toggle('active',mode==='login');document.querySelector('#tabRegister')?.classList.toggle('active',mode==='register');document.querySelector('#loginName').style.display=mode==='register'?'block':'none';document.querySelector('#loginBtn').textContent=mode==='register'?'Criar conta':'Entrar no Games'}
document.querySelector('#tabLogin')?.addEventListener('click',()=>setAuthMode('login'));
document.querySelector('#tabRegister')?.addEventListener('click',()=>setAuthMode('register'));
document.querySelector('#loginBtn')?.addEventListener('click',async()=>{
 const name=document.querySelector('#loginName').value.trim(),email=document.querySelector('#loginEmail').value.trim(),password=document.querySelector('#loginPassword').value;
 try{
  const data=await api(authMode==='register'?'/api/register':'/api/login',{method:'POST',body:JSON.stringify(authMode==='register'?{name,email,password}:{email,password})});
  setApiSession(data);document.querySelector('#loginPanel').classList.add('hidden');
  if(apiUser.role==='admin')showAdmin();
 }catch(e){authMessage(e.message)}
});
async function syncFavoritesFromApi(){
 if(!apiToken)return;
 try{const d=await api('/api/favorites');state.favorites=d.favorites;saveState()}catch(e){}
}
async function sendScore(id,n){
 if(!apiToken||n<=0)return;
 try{await api('/api/scores',{method:'POST',body:JSON.stringify({gameId:id,score:n})})}catch(e){}
}
const oldCollect=typeof observeScore==='function'?observeScore:null;
observeScore=function(id){
 const el=document.querySelector('#score');if(!el)return;
 const collect=()=>{const m=el.textContent.match(/Pontos:\s*(\d+)/i);if(m){const n=+m[1];state.records[id]=Math.max(state.records[id]||0,n);saveState();sendScore(id,n)}};
 collect();new MutationObserver(collect).observe(el,{childList:true,subtree:true,characterData:true});
}
async function loadGlobalRanking(){
 try{const d=await api('/api/ranking');document.querySelector('#rankingList').innerHTML=d.ranking.length?d.ranking.map((r,i)=>`<div class="rank-row"><div class="rank-pos">#${i+1}</div><div class="rank-name">${r.name} — ${r.game_id}</div><div class="rank-score">${r.score} pts</div></div>`).join(''):'<p class="panel-note">Ainda não há recordes globais.</p>'}
 catch(e){document.querySelector('#rankingList').innerHTML='<p class="panel-note">Faça login para consultar o ranking global.</p>'}
}
const rankBtn=document.querySelector('#showRanking');if(rankBtn)rankBtn.onclick=()=>{openPanel('#rankingPanel');loadGlobalRanking()};
async function showAdmin(){
 if(!apiUser||apiUser.role!=='admin')return;
 openPanel('#adminPanel');
 try{
  const [s,u]=await Promise.all([api('/api/admin/stats'),api('/api/admin/users')]);
  document.querySelector('#admUsers').textContent=s.users;document.querySelector('#admScores').textContent=s.scores;document.querySelector('#admFavorites').textContent=s.favorites;
  document.querySelector('#adminUsers').innerHTML=u.users.map(x=>`<tr><td>${x.id}</td><td>${x.name}</td><td>${x.email}</td><td>${x.role}</td><td>${x.role==='admin'?'—':`<button class="admin-delete" onclick="deleteAdminUser(${x.id})">Excluir</button>`}</td></tr>`).join('');
 }catch(e){document.querySelector('#adminUsers').innerHTML='<tr><td colspan="5">Sessão ADM inválida ou API indisponível.</td></tr>'}
}
async function deleteAdminUser(id){if(!confirm('Excluir este usuário e seus dados?'))return;try{await api('/api/admin/users/'+id,{method:'DELETE'});showAdmin()}catch(e){alert(e.message)}}
const oldProfile=document.querySelector('#navProfile');if(oldProfile)oldProfile.onclick=()=>{if(apiUser){authMessage('Conta: '+apiUser.email+' • Perfil: '+apiUser.role);document.querySelector('#loginPanel').classList.remove('hidden');if(apiUser.role==='admin')showAdmin()}else openPanel('#loginPanel')};
setAuthMode('login');syncFavoritesFromApi();

function colorGame(){area.innerHTML='<div class="game-wrap"><h3>🎨 Oficina de Cores</h3><p>Escolha uma cor e clique no desenho para pintar.</p><div id="palette" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:15px"></div><div id="canvasColor" style="font-size:130px;cursor:pointer;background:#151f31;border-radius:20px;padding:25px">🦄</div><div id="colorMsg" class="score">Cores: 0</div></div>';let colors=['#ff4d6d','#ffcc00','#18d6a0','#6d5dfc','#ff8a3d','#48a9ff','#fff'];let n=0,pal=document.querySelector('#palette'),draw=document.querySelector('#canvasColor'),msg=document.querySelector('#colorMsg');colors.forEach(c=>{let b=document.createElement('button');b.style.cssText='width:38px;height:38px;border-radius:50%;border:2px solid white;background:'+c;b.onclick=()=>draw.style.textShadow='0 8px 0 '+c;pal.appendChild(b)});draw.onclick=()=>{n++;msg.textContent='Pinturas: '+n+' 🎨'}}

function petGame(){area.innerHTML='<div class="game-wrap"><div style="font-size:120px">🐶</div><h3>Pet Care</h3><p id="petStatus">O pet está esperando!</p><button class="primary" id="feed">🍖 Alimentar</button> <button class="primary" id="play">🎾 Brincar</button><div id="petScore" class="score">Carinho: 0</div></div>';let n=0;feed.onclick=()=>{n++;petStatus.textContent='O pet adorou a comida! ❤️';petScore.textContent='Carinho: '+n};play.onclick=()=>{n++;petStatus.textContent='O pet está brincando! 🎉';petScore.textContent='Carinho: '+n}}

function chefGame(){area.innerHTML='<div class="game-wrap"><h3>👨‍🍳 Desafio de Cozinha</h3><p>Escolha os ingredientes corretos para completar a receita.</p><div id="ingredients" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"></div><div id="recipe" class="score">Receita: Pizza</div></div>';let selected=[],need=['🍅','🧀','🍞'];let ing=['🍅','🧀','🍞','🍫','🥕','🍓','🥚','🥩'];ingredients.innerHTML=ing.map(x=>'<button style="font-size:40px;background:#151f31;color:white;border:1px solid #33405a;border-radius:12px;padding:12px;cursor:pointer">'+x+'</button>').join('');ingredients.querySelectorAll('button').forEach(b=>b.onclick=()=>{selected.push(b.textContent);recipe.textContent=selected.length===3&&need.every(x=>selected.includes(x))?'👨‍🍳 Receita concluída! +100 pontos':selected.length>=3?'❌ Ingredientes incorretos. Tente novamente.':'Ingredientes: '+selected.join(' ')})}

function flightGame(){area.innerHTML='<div class="game-wrap"><h3>🛫 Aeroporto</h3><p>Controle o tráfego e mantenha os aviões separados.</p><div style="font-size:90px">🛩️ ↔️ 🛫</div><input id="traffic" type="range" min="0" max="100" value="50"><div id="flightScore" class="score">Tráfego: 50%</div></div>';traffic.oninput=()=>flightScore.textContent='Tráfego: '+traffic.value+'% — '+(traffic.value<70?'Operação segura':'Atenção ao tráfego!')}

function heroGameCard(id,title,icon,text){return '<article class="featured-game" data-launch="'+id+'"><div class="featured-icon">'+icon+'</div><div><span class="eyebrow">DESTAQUE</span><h3>'+title+'</h3><p>'+text+'</p><button class="primary">JOGAR</button></div></article>'}
