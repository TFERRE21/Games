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
function launch(id){const g=games.find(x=>x.id===id)||games[0];document.querySelector('#gameCategory').textContent=g.cat.toUpperCase();document.querySelector('#gameTitle').textContent=g.name;modal.classList.remove('hidden');campaignGame(id)}
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
function setAuthMode(mode){
 authMode=mode;
 const register=mode==='register';
 document.querySelector('#tabLogin')?.classList.toggle('active',!register);
 document.querySelector('#tabRegister')?.classList.toggle('active',register);
 document.querySelector('#registerFields')?.classList.toggle('hidden',!register);
 document.querySelector('#confirmPasswordWrap')?.classList.toggle('hidden',!register);
 document.querySelector('#authTitle').textContent=register?'Criar sua conta':'Entrar no Games';
 document.querySelector('#loginBtn').textContent=register?'🚀 Criar conta grátis':'🔐 Entrar no Games';
 document.querySelector('#loginPassword').autocomplete=register?'new-password':'current-password';
 if(register)document.querySelector('#loginName')?.focus();
}
document.querySelector('#tabLogin')?.addEventListener('click',()=>setAuthMode('login'));
document.querySelector('#tabRegister')?.addEventListener('click',()=>setAuthMode('register'));
document.querySelector('#loginBtn')?.addEventListener('click',async()=>{
 const name=document.querySelector('#loginName')?.value.trim(),email=document.querySelector('#loginEmail').value.trim(),password=document.querySelector('#loginPassword').value;
 const confirm=document.querySelector('#loginPasswordConfirm')?.value||'';
 if(authMode==='register'){
  if(!name)return authMessage('Digite seu nome ou apelido.');
  if(name.length<2)return authMessage('O nome precisa ter pelo menos 2 caracteres.');
  if(!email)return authMessage('Digite seu e-mail.');
  if(password.length<6)return authMessage('A senha precisa ter pelo menos 6 caracteres.');
  if(password!==confirm)return authMessage('As senhas não conferem.');
 }
 if(authMode==='login'&&(!email||!password))return authMessage('Informe e-mail e senha.');
 const btn=document.querySelector('#loginBtn');btn.disabled=true;btn.textContent=authMode==='register'?'Criando sua conta...':'Entrando...';
 try{
  const data=await api(authMode==='register'?'/api/register':'/api/login',{method:'POST',body:JSON.stringify(authMode==='register'?{name,email,password}:{email,password})});
  setApiSession(data);document.querySelector('#loginPanel').classList.add('hidden');btn.disabled=false;
  if(apiUser.role==='admin')showAdmin();
  syncRPG();syncPortal();
 }catch(e){btn.disabled=false;setAuthMode(authMode);authMessage(e.message)}
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

// ===== CAMPANHA DE 100 FASES =====
const CAMPAIGN_KEY='games_campaign_v1';
const campaignState=JSON.parse(localStorage.getItem(CAMPAIGN_KEY)||'{}');
function getProgress(id){return Math.max(1,Math.min(100,Number(campaignState[id]||1)))}
function saveProgress(id,level){campaignState[id]=Math.min(100,Math.max(1,level));localStorage.setItem(CAMPAIGN_KEY,JSON.stringify(campaignState))}
function campaignTheme(g){
  if(g.cat==='girls')return ['👗','Desafio de Estilo'];
  if(g.cat==='coloring')return ['🎨','Desafio de Cores'];
  if(g.cat==='cooking')return ['👨‍🍳','Desafio de Cozinha'];
  if(g.cat==='flight')return ['✈️','Missão de Voo'];
  if(g.cat==='racing')return ['🏁','Desafio de Corrida'];
  if(g.cat==='sim')return [g.icon,'Missão de Simulação'];
  if(g.cat==='puzzle')return ['🧩','Desafio Mental'];
  if(g.cat==='sports')return ['🏆','Desafio Esportivo'];
  return ['🎮','Desafio Arcade'];
}
function campaignGame(id){
  const g=games.find(x=>x.id===id)||games[0], level=getProgress(id), [emoji,kind]=campaignTheme(g);
  area.innerHTML=`<div class="game-wrap campaign-wrap">
    <div class="campaign-head"><div><span class="eyebrow">CAMPANHA • MUNDO ${worldForPhase(level)}</span><h3>${emoji} ${g.name}</h3><p>${kind} • 100 fases</p></div><div class="campaign-level">FASE <b id="campaignLevel">${level}</b>/100</div></div>
    <div id="rpgHud" class="rpg-hud"></div>
    <div class="campaign-progress"><span id="campaignBar" style="width:${level}%"></span></div>
    <div class="campaign-body"><div class="campaign-icon">${g.icon}</div>
      <h3 id="campaignTitle">Fase ${level} — ${campaignMission(id,level)}</h3>
      <p>Complete a missão para ganhar ⭐, 🪙 e XP. A cada 10 fases você desbloqueia um novo mundo.</p>
      <div id="campaignChallenge"></div>
      <div class="campaign-actions"><button class="primary" id="campaignCheck">CONCLUIR FASE</button><button class="primary" id="campaignNext" disabled>PRÓXIMA FASE ▶</button></div>
      <div id="campaignScore" class="score">Progresso: ${level-1}/100 • Mundo ${worldForPhase(level)}</div>
    </div>
  </div>`;
  addRPGHudFallback(); buildCampaignChallenge(id,level);
}
function addRPGHudFallback(){updateRPGHud()}

function campaignMission(id,l){
  const g=games.find(x=>x.id===id);
  if(g?.cat==='cooking')return 'prepare os ingredientes certos';
  if(g?.cat==='flight')return 'controle altitude e rota';
  if(g?.cat==='racing')return 'supere o tempo-alvo';
  if(g?.cat==='coloring')return 'complete a pintura';
  if(g?.cat==='girls')return 'monte a combinação pedida';
  if(g?.cat==='puzzle')return 'resolva o desafio';
  if(g?.cat==='sports')return 'alcance a pontuação mínima';
  return 'complete o objetivo da missão';
}
function buildCampaignChallenge(id,l){
  const box=document.querySelector('#campaignChallenge'),g=games.find(x=>x.id===id)||games[0];
  window.campaignRun={id,phase:l,started:Date.now(),failed:false,completed:false};
  const target=5+Math.floor(l*1.5);
  const difficulty=l<=10?'FÁCIL':l<=30?'NORMAL':l<=60?'DIFÍCIL':'ÉPICO';
  const intro='<div class="phase-info"><span>🎯 OBJETIVO</span><span>⚔️ '+difficulty+'</span><span>🌎 MUNDO '+worldForPhase(l)+'</span></div>';
  if(g.cat==='cooking'){
    const ingredients=['🍅','🧀','🍞','🍫','🥕','🍓','🥚','🥩'],need=[ingredients[l%8],ingredients[(l+2)%8],ingredients[(l+4)%8]];
    box.innerHTML=intro+'<p>Monte a receita escolhendo <b>3 ingredientes</b>. Observe a combinação do pedido e reproduza corretamente.</p><div class="campaign-options">'+ingredients.map(x=>'<button type="button" data-v="'+x+'">'+x+'</button>').join('')+'</div><div class="mission-hint">Pedido do cliente: <b>'+need.join(' • ')+'</b></div>';
    box.dataset.need=JSON.stringify(need);
    box.querySelectorAll('button').forEach(b=>b.onclick=()=>b.classList.toggle('selected'));
  }else if(g.cat==='coloring'||g.cat==='girls'){
    const total=Math.min(10,3+Math.floor(l/10));
    box.innerHTML=intro+'<p>Crie uma combinação com <b>'+total+' escolhas diferentes</b>.</p><div class="campaign-options">'+['❤️','💙','💚','💜','💛','🩷','🖤','🤍'].map(x=>'<button type="button" data-v="'+x+'">'+x+'</button>').join('')+'</div><div id="choiceCount">0 / '+total+'</div>';
    const chosen=new Set();box.querySelectorAll('button').forEach(b=>b.onclick=()=>{chosen.has(b.dataset.v)?chosen.delete(b.dataset.v):chosen.add(b.dataset.v);b.classList.toggle('selected',chosen.has(b.dataset.v));document.querySelector('#choiceCount').textContent=chosen.size+' / '+total});
    box.dataset.target=total;
  }else if(g.cat==='flight'||g.cat==='sim'){
    const targetValue=35+((l*13)%46);
    box.innerHTML=intro+'<p>Ajuste o controle para <b>'+targetValue+'%</b> (tolerância ±5).</p><input id="missionControl" class="mission-range" type="range" min="0" max="100" value="50"><div class="control-readout">Controle <b id="missionValue">50</b>%</div>';
    box.dataset.target=targetValue;
    box.querySelector('#missionControl').oninput=e=>document.querySelector('#missionValue').textContent=e.target.value;
  }else if(g.cat==='racing'){
    const targetTime=Math.max(6,16-Math.floor(l/10));
    box.innerHTML=intro+'<p>Complete a volta entre <b>'+targetTime+' e '+(targetTime+7)+' segundos</b>.</p><button type="button" class="primary" id="raceStart">🏁 LARGAR</button><div id="raceTimer" class="race-timer">Pronto para largar</div>';
    let timer=null,start=0;
    box.querySelector('#raceStart').onclick=()=>{
      if(timer)return;start=Date.now();box.querySelector('#raceStart').disabled=true;box.querySelector('#raceStart').textContent='🏎️ CORRENDO...';
      timer=setInterval(()=>{const sec=(Date.now()-start)/1000;box.querySelector('#raceTimer').textContent=sec.toFixed(1)+'s';if(sec>=targetTime+7){clearInterval(timer);timer=null;box.dataset.raceTime=sec.toFixed(1);box.querySelector('#raceTimer').textContent='⏱️ '+sec.toFixed(1)+'s — tente novamente mais rápido';box.querySelector('#raceStart').disabled=false;box.querySelector('#raceStart').textContent='🏁 NOVA TENTATIVA'}},100);
    };
  }else if(g.cat==='puzzle'){
    const a=2+(l%12),b=3+((l*3)%17),ans=a+b;
    box.innerHTML=intro+'<p>Resolva sem calculadora: <b>'+a+' + '+b+' = ?</b></p><input id="missionAnswer" type="number" inputmode="numeric" placeholder="Sua resposta"><div class="mission-hint">Uma resposta correta conclui a fase.</div>';
    box.dataset.answer=ans;
  }else{
    box.innerHTML=intro+'<p>Complete o desafio para avançar.</p><button type="button" class="primary" id="missionTap">🎯 FAZER AÇÃO</button><div id="tapCount" class="score">0 / '+target+'</div>';
    let n=0;box.querySelector('#missionTap').onclick=()=>{n++;document.querySelector('#tapCount').textContent=n+' / '+target;if(n>=target)box.querySelector('#missionTap').textContent='✅ OBJETIVO ATINGIDO'};
    box.dataset.target=target;
  }
  document.querySelector('#campaignCheck').onclick=()=>completeCampaignPhase(id,l);
}
function completeCampaignPhase(id,l){
  const g=games.find(x=>x.id===id)||games[0],box=document.querySelector('#campaignChallenge');let ok=false;
  if(g.cat==='puzzle')ok=Number(box.querySelector('#missionAnswer')?.value)===Number(box.dataset.answer);
  else if(g.cat==='cooking'){const selected=[...box.querySelectorAll('.selected')].map(b=>b.dataset.v),need=JSON.parse(box.dataset.need||'[]');ok=selected.length===3&&need.every(x=>selected.includes(x))}
  else if(g.cat==='coloring'||g.cat==='girls')ok=(Number(box.querySelector('#choiceCount')?.textContent?.split('/')[0])||0)>=Number(box.dataset.target||1);
  else if(g.cat==='flight'||g.cat==='sim'){const v=Number(box.querySelector('#missionControl')?.value||0),t=Number(box.dataset.target||50);ok=Math.abs(v-t)<=5}
  else if(g.cat==='racing'){const t=Number(box.dataset.raceTime||0),min=Math.max(6,16-Math.floor(l/10)),max=min+7;ok=t>=min&&t<=max}
  else ok=(Number(box.querySelector('#tapCount')?.textContent?.split('/')[0])||0)>=Number(box.dataset.target||1);
  if(!ok){
    window.campaignRun.failed=true;
    if(!loseLife()){document.querySelector('#campaignScore').textContent='💔 Sem vidas. Use o bônus diário ou volte depois para recuperar.'}
    else{document.querySelector('#campaignScore').textContent='❌ Desafio não concluído. −1 vida. Revise o objetivo e tente novamente.';document.querySelector('#campaignCheck').classList.add('shake')}
    return;
  }
  const attempts=window.campaignRun.failed?2:1;
  const stars=attempts===1?3:2;
  const next=Math.min(100,l+1);saveProgress(id,next);addRPGReward(id,l,stars);
  document.querySelector('#campaignScore').textContent=l===100?'🏆 CAMPANHA COMPLETA! 100 FASES!':'✅ Fase '+l+' concluída! '+('⭐'.repeat(stars))+' • +'+(stars*10)+' 🪙 • +'+(stars*25)+' XP';
  document.querySelector('#campaignCheck').disabled=true;document.querySelector('#campaignNext').disabled=false;document.querySelector('#campaignNext').onclick=()=>campaignGame(id);document.querySelector('#campaignBar').style.width=l+'%';updateRPGHud();
}

(function injectCampaignStyle(){if(document.querySelector('#campaignStyle'))return;const s=document.createElement('style');s.id='campaignStyle';s.textContent=`
.campaign-wrap{max-width:900px;margin:auto}.campaign-head{display:flex;justify-content:space-between;gap:20px;align-items:center}.campaign-level{font-size:20px;padding:12px 16px;border:1px solid #33405a;border-radius:12px}.campaign-progress{height:12px;background:#182338;border-radius:20px;overflow:hidden;margin:14px 0 24px}.campaign-progress span{display:block;height:100%;background:#18d6a0;transition:width .3s}.campaign-body{text-align:center;padding:18px}.campaign-icon{font-size:90px}.campaign-options{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:18px}.campaign-options button{font-size:34px;padding:10px 15px;background:#151f31;color:white;border:1px solid #33405a;border-radius:12px;cursor:pointer}.campaign-options button.selected{outline:3px solid #18d6a0;transform:scale(1.06)}.campaign-actions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:22px}.campaign-actions button:disabled{opacity:.45;cursor:not-allowed}`;document.head.appendChild(s)})();

// ===== SISTEMA DE PROGRESSAO RPG =====
const RPG_KEY='games_rpg_progress_v1';
const rpg=JSON.parse(localStorage.getItem(RPG_KEY)||'{}');
rpg.lives=Number.isFinite(rpg.lives)?rpg.lives:5;
rpg.coins=Number.isFinite(rpg.coins)?rpg.coins:0;
rpg.xp=Number.isFinite(rpg.xp)?rpg.xp:0;
rpg.level=Number.isFinite(rpg.level)?rpg.level:1;
rpg.stars=rpg.stars||{};
rpg.worlds=rpg.worlds||{};
rpg.phaseScores=rpg.phaseScores||{};
rpg.nextLifeAt=Number(rpg.nextLifeAt)||0;
function saveRPG(){localStorage.setItem(RPG_KEY,JSON.stringify(rpg));updateRPGHud()}
function recoverLives(){if(rpg.lives>=5||!rpg.nextLifeAt)return;const now=Date.now();while(rpg.lives<5&&rpg.nextLifeAt&&now>=rpg.nextLifeAt){rpg.lives++;rpg.nextLifeAt=rpg.lives<5?now+60000:0}saveRPG()}
function gameSound(type){try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const a=gameSound.ctx||(gameSound.ctx=new A()),o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=type==='win'?720:type==='fail'?150:420;g.gain.setValueAtTime(.0001,a.currentTime);g.gain.exponentialRampToValueAtTime(.08,a.currentTime+.01);g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+.16);o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+.18)}catch(e){}}
function xpForLevel(l){return 100+(l-1)*50}
function recalcLevel(){while(rpg.xp>=xpForLevel(rpg.level)){rpg.xp-=xpForLevel(rpg.level);rpg.level++}}
function addRPGReward(id,phase,stars){
  const key=id+':'+phase, old=rpg.stars[key]||0;
  if(stars>old)rpg.stars[key]=stars;
  rpg.coins+=stars*10;
  rpg.xp+=stars*25;
  recalcLevel(); saveRPG();
  if(apiToken)api('/api/scores',{method:'POST',body:JSON.stringify({gameId:id+'-phase-'+phase,score:stars*100+phase})}).catch(()=>{});
}
async function loseLife(){
 recoverLives();if(!rpg.lives)return false;
 rpg.lives--;if(!rpg.nextLifeAt)rpg.nextLifeAt=Date.now()+60000;saveRPG();gameSound('fail');
 if(apiToken)api('/api/rpg/life/lose',{method:'POST'}).then(d=>{if(d.player){rpg.lives=d.player.lives;rpg.coins=d.player.coins;rpg.xp=d.player.xp;rpg.level=d.player.level;rpg.nextLifeAt=d.player.next_life_at||0;saveRPG();updateRPGHud()}}).catch(()=>{});
 return true
}
function restoreLife(){rpg.lives=Math.min(5,rpg.lives+1);rpg.nextLifeAt=rpg.lives<5?Date.now()+60000:0;saveRPG();gameSound('bonus')}
function updateRPGHud(){
  const el=document.querySelector('#rpgHud');if(!el)return;
  const need=xpForLevel(rpg.level);
  el.innerHTML='❤️ '.repeat(rpg.lives)+'🤍 '.repeat(5-rpg.lives)+' &nbsp; 🪙 '+rpg.coins+' &nbsp; ⭐ '+Object.values(rpg.stars).reduce((a,b)=>a+b,0)+' &nbsp; ⚡ Nível '+rpg.level+' &nbsp; XP '+rpg.xp+'/'+need;
}
function worldForPhase(p){return Math.min(10,Math.floor((p-1)/10)+1)}
function phaseStars(id,p,success){
  if(!success)return 0;
  const world=worldForPhase(p), difficulty=p%10;
  return difficulty<=3?3:difficulty<=7?2:1;
}
function addRPGPanel(){
  if(document.querySelector('#rpgHud'))return;
  const hud=document.createElement('div');hud.id='rpgHud';hud.className='rpg-hud';
  const target=document.querySelector('.game-wrap');if(target)target.prepend(hud);updateRPGHud();
}

(function injectRPGStyle(){if(document.querySelector('#rpgStyle'))return;const s=document.createElement('style');s.id='rpgStyle';s.textContent=`
.rpg-hud{margin:10px 0;padding:12px 16px;background:#101a2b;border:1px solid #33405a;border-radius:12px;text-align:center;font-weight:700;line-height:1.8}.campaign-head{position:relative}.campaign-level{white-space:nowrap}.campaign-body{min-height:320px}.campaign-actions{gap:12px}.campaign-progress span{background:linear-gradient(90deg,#18d6a0,#6d5dfc)}`;
document.head.appendChild(s)})();


// ===== CHEFES E EVENTOS ESPECIAIS =====
const WORLD_EVENTS=[
 {world:1,name:'Festival da Floresta',icon:'🌳',desc:'Plataformas mais rápidas e moedas bônus.',bonus:'🪙 Moedas em dobro'},
 {world:2,name:'Noite Neon',icon:'🌃',desc:'Trânsito acelerado e ritmo extra.',bonus:'⚡ Velocidade +20%'},
 {world:3,name:'Tempestade do Deserto',icon:'🏜️',desc:'A margem de erro fica menor.',bonus:'⭐ Estrela protegida'},
 {world:4,name:'Festival de Gelo',icon:'❄️',desc:'Controles mais escorregadios.',bonus:'❤️ Vida bônus'},
 {world:5,name:'Operação Orbital',icon:'🚀',desc:'Ondas maiores de inimigos.',bonus:'💥 Dano bônus'},
 {world:6,name:'Vulcão em Fúria',icon:'🌋',desc:'Modo extremo com decisões rápidas.',bonus:'🔥 XP em dobro'},
 {world:7,name:'Ilha Tropical',icon:'🏝️',desc:'Evento de coleta com moedas extras.',bonus:'🪙 +100 moedas'},
 {world:8,name:'Castelo Sombrio',icon:'🏰',desc:'Desafio mais preciso e chefe especial.',bonus:'👑 Recompensa épica'},
 {world:9,name:'Galáxia Perdida',icon:'🌌',desc:'Eventos surpresa durante a missão.',bonus:'🌟 Multiplicador de estrelas'},
 {world:10,name:'Coroação Final',icon:'👑',desc:'Todos os mundos se unem na batalha final.',bonus:'🏆 Recompensa lendária'}
];
const BOSS_EVENTS={
 10:{name:'Guardião da Floresta',icon:'🌳👹',type:'survival',desc:'Sobreviva às ondas de obstáculos e atravesse o portal.'},
 20:{name:'Rei Neon',icon:'👑🌃',type:'race',desc:'Corra contra o chefe e mantenha sua faixa.'},
 30:{name:'Titã do Deserto',icon:'🏜️👹',type:'precision',desc:'Acerte a zona segura enquanto o Titã se move.'},
 40:{name:'Rainha de Gelo',icon:'❄️👑',type:'race',desc:'Supere o circuito congelado antes do tempo acabar.'},
 50:{name:'Comandante Orbital',icon:'🚀👾',type:'space',desc:'Derrote a formação orbital antes que ela escape.'},
 60:{name:'Lorde do Vulcão',icon:'🌋🔥',type:'survival',desc:'Resista ao modo extremo e chegue ao portal.'},
 70:{name:'Capitão da Ilha',icon:'🏝️🏴‍☠️',type:'collect',desc:'Colete moedas durante a contagem regressiva.'},
 80:{name:'Rei do Castelo',icon:'🏰👑',type:'precision',desc:'Acerte a janela certa para derrotar o chefe.'},
 90:{name:'Devorador de Estrelas',icon:'🌌🐉',type:'space',desc:'Destrua a última onda espacial.'},
 100:{name:'CHEFE FINAL',icon:'👑🐉',type:'final',desc:'A batalha final reúne mecânicas de todos os mundos.'}
};
function worldEventForPhase(phase){return WORLD_EVENTS[Math.min(9,Math.floor((phase-1)/10))]}
function showSpecialIntro(phase){
 const ev=worldEventForPhase(phase),boss=BOSS_EVENTS[phase]; if(!ev)return;
 document.querySelector('#premiumInfo').innerHTML='<b>'+(boss?'👹 BATALHA DE CHEFE':'🎉 EVENTO DO MUNDO')+'</b> • '+(boss?boss.desc:ev.desc)+' • <strong>'+ev.bonus+'</strong>';
}
function launchBossOrPremium(g,p){return BOSS_EVENTS[p]?premiumBoss(g,p,BOSS_EVENTS[p]):premiumGameCore(g,p)}
function bossVictory(g,p,boss,score,onDone){
 const info=document.querySelector('#premiumInfo'), actions=document.querySelector('#premiumActions');
 if(!info||!actions)return;
 info.innerHTML='<div class="boss-victory"><div class="boss-victory-icon">🏆</div><div class="boss-victory-title">'+(p===100?'CAMPANHA CONCLUÍDA!':'CHEFE DERROTADO!')+'</div><div class="boss-victory-boss">'+boss.icon+' '+boss.name+'</div><div class="boss-victory-stars">⭐⭐⭐</div><div class="boss-victory-score">'+score+' pontos</div><p>'+(p===100?'Você venceu o chefe final e completou os 100 desafios!':'O mundo foi conquistado. Prepare-se para o próximo!')+'</p></div>';
 actions.innerHTML='';
 const b=document.createElement('button');b.className='primary';b.textContent=p===100?'🏆 VER RESULTADO FINAL':'✨ CONTINUAR AVENTURA';b.onclick=()=>{if(p===100){info.innerHTML='<b>👑 CAMPEÃO DA CAMPANHA</b><br>100 fases concluídas • '+score+' pontos';actions.innerHTML='<button class="primary" onclick="closeGame()">FECHAR</button>'}else launch(g.id)};actions.appendChild(b);
}
function premiumBoss(g,p,boss){
 const[c,s,info]=premiumCanvas(g.name,'👹 '+boss.name+' • Fase '+p),x=c.getContext('2d');
 let k={},done=false,score=0,time=0,player=390,shots=[],enemies=[],hp=3,bossHp=5,inv=0,phase=1;
 const key=e=>{k[e.key.toLowerCase()]=1;if(e.key===' ')e.preventDefault()},up=e=>k[e.key.toLowerCase()]=0;
 addEventListener('keydown',key);addEventListener('keyup',up);
 if(boss.type==='space'||boss.type==='final')for(let i=0;i<7+(p===100?3:0);i++)enemies.push({x:80+(i%5)*150,y:70+Math.floor(i/5)*65,hp:p>=50?2:1});
 function bar(label,val,max){const w=Math.max(0,Math.min(100,val/max*100));return '<div class="boss-bar-wrap"><b>'+label+'</b><div class="boss-bar"><span style="width:'+w+'%"></span></div></div>'}
 function drawHud(){
  info.innerHTML=bar('👹 '+boss.name,bossHp,5)+bar('❤️ JOGADOR',hp,3)+'<span class="boss-phase">ETAPA '+phase+'/3</span>';
 }
 function hitPlayer(){
  if(inv>0)return;hp--;inv=45;gameSound('fail');if(hp<=0){done=true;info.innerHTML='<b>💥 DERROTA</b><br>O chefe venceu. Tente novamente.';return true}return false;
 }
 function loop(){
  if(done)return;time++;inv=Math.max(0,inv-1);
  x.fillStyle=boss.type==='final'?'#120719':'#071226';x.fillRect(0,0,820,460);
  // arena comum
  x.fillStyle='#172238';x.fillRect(0,350,820,110);
  if(boss.type==='race'){
   x.fillStyle='#30343b';x.fillRect(150,0,520,350);x.fillStyle='#fff';for(let y=-40+(time*6%80);y<350;y+=80)x.fillRect(405,y,8,40);
   if(k.a||k.arrowleft)player=Math.max(175,player-6);if(k.d||k.arrowright)player=Math.min(645,player+6);
   const bx=410+Math.sin(time/(24-phase*3))*220;
   x.fillStyle='#e85d5d';x.fillRect(bx-22,90,44,65);x.fillStyle='#20d6a0';x.fillRect(player-25,365,50,80);
   if(Math.abs(player-bx)<48&&time%70<3){bossHp--;score+=100;if(bossHp===3)phase=2;if(bossHp===1)phase=3}
   if(Math.abs(player-bx)<40&&time%90<4)hitPlayer();
  }else if(boss.type==='precision'){
   x.fillStyle='#26374d';x.fillRect(0,0,820,460);const tx=410+Math.sin(time/(14-phase*2))*300,ty=180+Math.cos(time/19)*100;
   x.fillStyle='#ffd166';x.beginPath();x.arc(tx,ty,45,0,7);x.fill();x.fillStyle=inv?'#8ff':'#20d6a0';x.fillRect(player-18,385,36,45);
   if(k.a||k.arrowleft)player-=5;if(k.d||k.arrowright)player+=5;player=Math.max(20,Math.min(800,player));
   if((k[' ']||k.w)&&Math.abs(player-tx)<55&&time>30){bossHp--;score+=180;if(bossHp===3)phase=2;if(bossHp===1)phase=3}
   if(time%85===0&&Math.abs(player-tx)>100)hitPlayer();
  }else if(boss.type==='collect'){
   x.fillStyle='#16704a';x.fillRect(0,0,820,460);x.fillStyle='#ffd166';
   for(let i=0;i<12;i++){const cx=(i*137+time*2)%780+20,cy=80+(i*67)%300;x.beginPath();x.arc(cx,cy,10,0,7);x.fill()}
   if(k.a||k.arrowleft)player-=6;if(k.d||k.arrowright)player+=6;player=Math.max(20,Math.min(800,player));
   if(time%12===0)score+=40;if(time%100===0){bossHp--;phase=Math.min(3,6-bossHp)}
  }else{
   if(k.a||k.arrowleft)player-=6;if(k.d||k.arrowright)player+=6;player=Math.max(25,Math.min(795,player));
   if(k[' ']&&shots.length<10)shots.push({x:player,y:390});shots.forEach(q=>q.y-=10);shots=shots.filter(q=>q.y>0);
   enemies.forEach(e=>shots.forEach(q=>{if(Math.abs(q.x-e.x)<35&&Math.abs(q.y-e.y)<30){e.hp--;q.y=-99;if(e.hp<=0){e.dead=true;score+=130;bossHp=Math.max(0,bossHp-.35)}}}));
   enemies=enemies.filter(e=>!e.dead);enemies.forEach(e=>{e.x+=Math.sin(time/20+e.y)*.8;e.y+=Math.sin(time/18+e.x)*.15});
   x.fillStyle='#ff5266';enemies.forEach(e=>x.fillRect(e.x-24,e.y-18,48,36));x.fillStyle='#22d3ee';x.beginPath();x.moveTo(player,365);x.lineTo(player-22,415);x.lineTo(player+22,415);x.fill();x.fillStyle='#ffd166';shots.forEach(q=>x.fillRect(q.x-2,q.y,4,12));
   if(time%110===0)hitPlayer();if(enemies.length<Math.ceil((7+(p===100?3:0))/2))phase=2;if(enemies.length<=2)phase=3;
  }
  if(bossHp<=0||(!enemies.length&&(boss.type==='space'||boss.type==='final'))){done=true;score=Math.min(1000,Math.max(850,score+300));gameSound('win');premiumFinish(g.id,p,score,true);bossVictory(g,p,boss,score);return}
  if((boss.type==='race'&&time>600)||(boss.type==='precision'&&time>750)||(boss.type==='collect'&&time>600)||(boss.type!=='race'&&boss.type!=='precision'&&boss.type!=='collect'&&time>1100)){done=true;info.innerHTML='<b>💥 DERROTA</b><br>O tempo acabou. Tente novamente.';gameSound('fail');return}
  drawHud();s.textContent=Math.min(1000,score)+' pts • ⏱️ '+Math.floor(time/10)+'s';requestAnimationFrame(loop);
 }
 drawHud();info.innerHTML='<b>👹 '+boss.name+'</b><br>Derrote o chefe em 3 etapas! • Setas/WASD para mover • Espaço para ação';setTimeout(loop,600);
}

// ===== MOTOR DOS JOGOS PREMIUM =====
function premiumCanvas(title,subtitle){
  area.innerHTML='<div class="game-wrap premium-wrap">'+
    '<div id="premiumInfo" class="premium-info"></div>'+
    '<canvas id="premiumGameCanvas" width="820" height="460" style="display:block;width:100%;max-width:820px;margin:auto;border-radius:14px;background:#08101b"></canvas>'+
    '<div id="premiumScore" class="score">0 pts</div>'+
    '<div id="premiumActions" class="campaign-actions"></div>'+
    '<div class="controls">'+subtitle+'</div>'+
  '</div>';
  const c=document.querySelector('#premiumGameCanvas');
  const s=document.querySelector('#premiumScore');
  const info=document.querySelector('#premiumInfo');
  const actions=document.querySelector('#premiumActions');
  return[c,s,info,actions];
}
function premiumFinish(id,phase,score=0,success=true){
  if(!success)return;
  const next=Math.min(100,phase+1);
  saveProgress(id,next);
  const stars=phaseStars(id,phase,true)||3;
  addRPGReward(id,phase,stars);
  const info=document.querySelector('#premiumInfo'),actions=document.querySelector('#premiumActions'),s=document.querySelector('#premiumScore');
  if(!info||!actions)return;
  if(s)s.textContent=score+' pts • '+('⭐'.repeat(stars));
  info.innerHTML='<b>🏆 FASE '+phase+' CONCLUÍDA!</b><br>'+('⭐'.repeat(stars))+' • +'+(stars*10)+' 🪙 • +'+(stars*25)+' XP';
  actions.innerHTML='';
  if(phase<100){
    const b=document.createElement('button');
    b.className='primary';
    b.textContent='PRÓXIMA FASE ▶';
    b.onclick=()=>premiumGame(id);
    actions.appendChild(b);
  }else{
    const b=document.createElement('button');
    b.className='primary';
    b.textContent='🏆 CAMPANHA COMPLETA';
    b.onclick=()=>{info.innerHTML='<b>👑 PARABÉNS!</b><br>Você concluiu as 100 fases.'};
    actions.appendChild(b);
  }
  gameSound('win');
  updateRPGHud();
}
function premiumGameCore(g,p){
  switch(g.id){
    case 'superplumber': return premiumPlumber(g,p);
    case 'kartrush':
    case 'speedrace': return premiumRace(g,p);
    case 'citydriver': return premiumCity(g,p);
    case 'spacebattle': return premiumSpace(g,p);
    case 'masterchef': return premiumChef(g,p);
    case 'flightacademy': return premiumFlight(g,p);
    default: return campaignGame(g.id);
  }
}
function premiumGame(id){
  const g=games.find(x=>x.id===id)||games[0];
  const p=getProgress(id);
  if(typeof showSpecialIntro==='function' && typeof BOSS_EVENTS!=='undefined' && BOSS_EVENTS[p]){
    // O chefe cria seu próprio HUD e arena.
    launchBossOrPremium(g,p);
    return;
  }
  premiumGameCore(g,p);
  if(typeof showSpecialIntro==='function')showSpecialIntro(p);
}
function premiumPlumber(g,p){
 const [c,s,info,actions]=premiumCanvas(g.name,'FASE '+p+' • mundo '+Math.ceil(p/10)+' • câmera acompanha',);
 const x=c.getContext('2d'),W=820,H=460;
 const themes=[
  {name:'Floresta Encantada',sky:'#78d6ff',ground:'#7a4b24',grass:'#54bd45',accent:'#18d6a0',enemy:'#c83f52',deco:'🌳'},
  {name:'Deserto Dourado',sky:'#f7c978',ground:'#a65c2b',grass:'#d99b38',accent:'#ff7b35',enemy:'#8f3b2f',deco:'🌵'},
  {name:'Vale Congelado',sky:'#bdeeff',ground:'#6d8fa8',grass:'#dff7ff',accent:'#4fc3f7',enemy:'#4267a8',deco:'❄️'},
  {name:'Noite Mágica',sky:'#17254c',ground:'#253354',grass:'#445c91',accent:'#b36cff',enemy:'#ef476f',deco:'🌙'},
  {name:'Vulcão',sky:'#351b25',ground:'#5b3025',grass:'#d95b35',accent:'#ffb000',enemy:'#8e2034',deco:'🌋'},
  {name:'Ilhas nas Nuvens',sky:'#8ed9ff',ground:'#8c765d',grass:'#d7f5ff',accent:'#7c5cff',enemy:'#d94f70',deco:'☁️'},
  {name:'Cavernas',sky:'#111827',ground:'#3c4658',grass:'#65748b',accent:'#38d9c5',enemy:'#9b59b6',deco:'💎'},
  {name:'Cidade Neon',sky:'#10162d',ground:'#20283d',grass:'#3bd6b4',accent:'#ff4fd8',enemy:'#ff6b6b',deco:'🏙️'},
  {name:'Reino Doce',sky:'#ffd9ed',ground:'#9d5b67',grass:'#ff9bc2',accent:'#7c5cff',enemy:'#a855f7',deco:'🍭'},
  {name:'Galáxia',sky:'#050816',ground:'#202a49',grass:'#5369a8',accent:'#36e0ff',enemy:'#ff5c8a',deco:'🪐'}
 ];
 const t=themes[(Math.floor((p-1)/10))%themes.length];
 const difficulty=Math.min(1.8,p/100);
 const worldW=3000+Math.min(3200,p*34);
 let player={x:90,y:300,w:34,h:42,vx:0,vy:0,onGround:false,inv:0};
 let cam=0,coins=0,score=0,done=false,won=false,k={},musicStarted=false,audio=null;
 const gravity=.62,speed=4.5+difficulty*.8,jump=-12.2;
 const rng=(n)=>{const z=Math.sin(n*12.9898+p*78.233)*43758.5453;return z-Math.floor(z)};
 
 // Fases realmente diferentes: padrão, altura, buracos e elementos mudam conforme a fase.
 const platforms=[{x:0,y:410,w:420,h:50,type:'solid'}];
 let cursor=420;
 const moving=[];
 const falseFloors=[];
 for(let i=0;i<14+Math.floor(p/6);i++){
   const gap=55+Math.floor(rng(i+2)*115)+Math.floor(difficulty*35);
   const w=150+Math.floor(rng(i+8)*180);
   cursor+=gap;
   const y=335-Math.floor(rng(i+15)*(70+Math.min(80,p))) + (i%4===0?20:0);
   const type=(i%5===2?'false':'solid');
   platforms.push({x:cursor,y,w,h:24,type,broken:false});
   if(type==='false') falseFloors.push(platforms[platforms.length-1]);
   if(i%4===1){
     const mp={x:cursor+w/2,y:y-70-Math.floor(rng(i+22)*55),base:cursor+w/2,range:45+Math.floor(rng(i+31)*75),w:105,h:18,phase:rng(i+40)*6.28};
     moving.push(mp);
   }
   cursor+=w;
 }
 platforms.push({x:worldW-520,y:360,w:520,h:100,type:'solid'});
 
 const coinsList=[];
 for(let i=0;i<platforms.length;i++){
   const q=platforms[i];
   if(q.w>100) for(let j=0;j<2+(i%3);j++) coinsList.push({x:q.x+45+j*48,y:q.y-35-(j%2)*18,taken:false,bob:rng(i*9+j)});
 }
 const enemies=[];
 for(let i=0;i<10+Math.floor(p/8);i++){
   const q=platforms[1+(i*3)%Math.max(2,platforms.length-2)];
   enemies.push({x:q.x+50,y:q.y-34,w:30,h:34,vx:(i%2?1:-1)*(1.1+difficulty*.6),min:q.x+10,max:q.x+q.w-40,alive:true,phase:rng(i+55)*6});
 }
 const hazards=[];
 for(let i=0;i<platforms.length;i++){
   const q=platforms[i];
   if(q.type==='solid'&&q.w>150&&(i+p)%3===0) hazards.push({x:q.x+q.w*.55,y:q.y-16,w:30,h:16});
 }
 const particles=[];
 const key=e=>{k[e.key]=true;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','w','a','s','d'].includes(e.key))e.preventDefault();startMusic()};
 const up=e=>{k[e.key]=false};
 addEventListener('keydown',key);addEventListener('keyup',up);
 c.addEventListener('pointerdown',startMusic);
 
 function startMusic(){
   if(musicStarted)return;
   musicStarted=true;
   try{
     const C=window.AudioContext||window.webkitAudioContext;
     if(!C)return;
     audio=new C();
     const notes=[261.63,329.63,392,329.63,293.66,349.23,440,349.23];
     let beat=0;
     const play=()=>{
       if(done||!audio)return;
       const o=audio.createOscillator(),gain=audio.createGain();
       o.type='sine';o.frequency.value=notes[beat%notes.length];
       gain.gain.setValueAtTime(.0001,audio.currentTime);
       gain.gain.exponentialRampToValueAtTime(.025,audio.currentTime+.03);
       gain.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+.42);
       o.connect(gain);gain.connect(audio.destination);o.start();o.stop(audio.currentTime+.45);
       beat++;setTimeout(play,430);
     };
     play();
   }catch(e){}
 }
 function stopMusic(){try{if(audio)audio.close()}catch(e){}}
 function rectHit(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y}
 function spawnParticles(px,py){
   for(let i=0;i<8;i++)particles.push({x:px,y:py,vx:(rng(Date.now()+i)-.5)*4,vy:-rng(Date.now()+i+4)*4-1,life:30});
 }
 function loseLife(){
   if(player.inv>0)return;
   player.inv=100;
   player.x=Math.max(50,player.x-180);player.y=260;player.vy=0;
   score=Math.max(0,score-50);spawnParticles(player.x,player.y);
 }
 function drawBackground(){
   x.fillStyle=t.sky;x.fillRect(0,0,W,H);
   // Fundo animado em camadas para cada mundo.
   const tm=Date.now()/1000;
   x.globalAlpha=.28;
   for(let i=0;i<9;i++){
     const bx=((i*180-cam*.12+tm*(10+i))%(W+220))-110;
     const by=55+(i%4)*62;
     x.fillStyle=t.accent;
     x.beginPath();x.arc(bx,by,22+(i%3)*8,0,Math.PI*2);x.fill();
   }
   x.globalAlpha=1;
   x.font='34px sans-serif';
   for(let i=0;i<7;i++){
     const dx=((i*330-cam*.2)%(W+300))-120;
     x.fillText(t.deco,dx,70+(i%3)*55);
   }
   if((Math.floor(p/10))%3===2){
     x.fillStyle='rgba(255,255,255,.65)';
     for(let i=0;i<45;i++){const sx=(i*97-cam*.45)%W;const sy=(i*53)%H;x.fillRect((sx+W)%W,sy,2,2)}
   }
 }
 function drawPlayer(){
   const px=player.x-cam,py=player.y;
   x.save();x.translate(px,py);
   if(player.inv%8>4)x.globalAlpha=.45;
   // Raposinha aventureira: corpo, barriga, orelhas, olhos e cauda.
   x.fillStyle='#f28c38';x.fillRect(7,10,25,29);
   x.fillStyle='#fff1d6';x.fillRect(13,22,13,14);
   x.fillStyle='#f28c38';x.beginPath();x.moveTo(7,13);x.lineTo(8,0);x.lineTo(16,9);x.fill();
   x.beginPath();x.moveTo(24,9);x.lineTo(31,0);x.lineTo(32,14);x.fill();
   x.fillStyle='#18202c';x.fillRect(13,15,4,4);x.fillRect(25,15,4,4);
   x.fillStyle='#e85d3f';x.fillRect(18,20,6,4);
   x.strokeStyle='#f28c38';x.lineWidth=9;x.beginPath();x.moveTo(8,30);x.quadraticCurveTo(-9,22,-4,10);x.stroke();
   x.fillStyle='#fff1d6';x.beginPath();x.arc(-3,10,5,0,Math.PI*2);x.fill();
   x.restore();
 }
 function draw(){
   drawBackground();
   x.save();x.translate(-cam,0);
   // Plataformas e falsos pisos.
   platforms.forEach(q=>{
     if(q.x+q.w<cam-40||q.x>cam+W+40)return;
     x.fillStyle=q.type==='false'?'#8a5b32':t.ground;x.fillRect(q.x,q.y,q.w,q.h);
     x.fillStyle=q.type==='false'?'#ffb347':t.grass;x.fillRect(q.x,q.y,q.w,8);
     if(q.type==='false'){
       x.strokeStyle='#ff6b35';x.lineWidth=2;x.setLineDash([8,8]);x.strokeRect(q.x,q.y,q.w,24);x.setLineDash([]);
     }
   });
   moving.forEach(m=>{
     m.x=m.base+Math.sin(Date.now()/650+m.phase)*m.range;
     x.fillStyle=t.accent;x.fillRect(m.x,m.y,m.w,m.h);x.fillStyle='#fff';x.fillRect(m.x+12,m.y+4,m.w-24,3);
   });
   hazards.forEach(h=>{
     x.fillStyle='#e63946';
     for(let j=0;j<3;j++){x.beginPath();x.moveTo(h.x+j*10,h.y+16);x.lineTo(h.x+5+j*10,h.y);x.lineTo(h.x+10+j*10,h.y+16);x.fill()}
   });
   coinsList.forEach(q=>{
     if(q.taken)return;
     const yy=q.y+Math.sin(Date.now()/280+q.bob*6)*5;
     x.fillStyle='#ffd43b';x.beginPath();x.arc(q.x,yy,9,0,Math.PI*2);x.fill();x.fillStyle='#fff4a3';x.fillRect(q.x-2,yy-6,3,6);
   });
   enemies.forEach(e=>{
     if(!e.alive)return;
     e.x+=e.vx;
     if(e.x<e.min||e.x>e.max)e.vx*=-1;
     const ey=e.y+Math.sin(Date.now()/240+e.phase)*4;
     x.fillStyle=t.enemy;x.fillRect(e.x,ey,e.w,e.h);
     x.fillStyle='#fff';x.fillRect(e.x+6,ey+8,6,6);x.fillRect(e.x+19,ey+8,6,6);
     x.fillStyle='#222';x.fillRect(e.x+8,ey+10,3,3);x.fillRect(e.x+21,ey+10,3,3);
   });
   // Portal final.
   const portalX=worldW-210;
   x.fillStyle='rgba(124,92,255,.25)';x.beginPath();x.arc(portalX,315,45,0,Math.PI*2);x.fill();
   x.strokeStyle=t.accent;x.lineWidth=8;x.beginPath();x.arc(portalX,315,32,0,Math.PI*2);x.stroke();
   x.fillStyle='#fff';x.font='18px sans-serif';x.fillText('FIM',portalX-18,320);
   drawPlayer();
   particles.forEach(q=>{x.fillStyle=t.accent;x.fillRect(q.x,q.y,4,4)});
   x.restore();
   s.textContent=''+score+' pts • 🪙 '+coins+' • '+Math.round((player.x/worldW)*100)+'%';
   info.textContent='FASE '+p+' • '+t.name+' • 🦊 Raposinha • '+(falseFloors.length)+' pisos falsos';
 }
 function loop(){
   if(done)return;
   const left=k.ArrowLeft||k.a,right=k.ArrowRight||k.d;
   if(left)player.vx=-speed;else if(right)player.vx=speed;else player.vx*=.78;
   if((k.ArrowUp||k.w||k[' '])&&player.onGround){player.vy=jump;player.onGround=false}
   player.vy+=gravity;player.x+=player.vx;player.y+=player.vy;
   player.x=Math.max(0,Math.min(worldW-player.w,player.x));
   player.onGround=false;
   const now=Date.now();
   platforms.forEach(q=>{
     if(player.vy>=0&&player.x+player.w>q.x&&player.x<q.x+q.w&&player.y+player.h>=q.y&&player.y+player.h<=q.y+q.h+12){
       player.y=q.y-player.h;player.vy=0;player.onGround=true;
       if(q.type==='false'&&!q.broken){q.broken=true;setTimeout(()=>q.broken=true,380)}
     }
   });
   moving.forEach(m=>{
     if(player.vy>=0&&player.x+player.w>m.x&&player.x<m.x+m.w&&player.y+player.h>=m.y&&player.y+player.h<=m.y+m.h+12){player.y=m.y-player.h;player.vy=0;player.onGround=true}
   });
   falseFloors.forEach(q=>{if(q.broken&&player.onGround&&player.x+player.w>q.x&&player.x<q.x+q.w)player.onGround=false});
   hazards.forEach(h=>{if(rectHit(player,h))loseLife()});
   enemies.forEach(e=>{if(!e.alive)return;const eb={x:e.x,y:e.y,w:e.w,h:e.h};if(rectHit(player,eb)){if(player.vy>2&&player.y+player.h<e.y+18){e.alive=false;player.vy=-8;score+=150;spawnParticles(e.x,e.y)}else loseLife()}});
   coinsList.forEach(q=>{if(!q.taken&&Math.hypot(player.x+17-q.x,player.y+20-q.y)<28){q.taken=true;coins++;score+=25}});
   particles.forEach(q=>{q.x+=q.vx;q.y+=q.vy;q.vy+=.15;q.life--});for(let i=particles.length-1;i>=0;i--)if(particles[i].life<=0)particles.splice(i,1);
   if(player.inv>0)player.inv--;
   if(player.y>H+100)loseLife();
   cam=Math.max(0,Math.min(worldW-W,player.x-W*.38));
   if(player.x>worldW-255){done=true;won=true;score+=500+p*10;draw();addRPGReward(g.id,p,Math.min(3,1+Math.floor(coins/5)));stopMusic();return}
   draw();requestAnimationFrame(loop);
 }
 actions.innerHTML='<button class="primary" id="jumpBtn">⬆️ PULAR</button><button class="primary" id="leftBtn">⬅️</button><button class="primary" id="rightBtn">➡️</button>';
 actions.querySelector('#jumpBtn').onclick=()=>{startMusic();if(player.onGround){player.vy=jump;player.onGround=false}};
 actions.querySelector('#leftBtn').onpointerdown=()=>{k.ArrowLeft=true;startMusic()};actions.querySelector('#leftBtn').onpointerup=()=>k.ArrowLeft=false;
 actions.querySelector('#rightBtn').onpointerdown=()=>{k.ArrowRight=true;startMusic()};actions.querySelector('#rightBtn').onpointerup=()=>k.ArrowRight=false;
 draw();loop();
}
function premiumRace(g,p){
 const[c,s,info]=premiumCanvas(g.name,'Circuito longo • Fase '+p+' • câmera acompanha',);const x=c.getContext('2d');const W=820,H=460;
 const worldW=5200+p*18;let carX=260,carY=350,vy=0,cam=0,dist=0,score=0,lives=3,done=false,k={};
 const obstacles=[];for(let i=0;i<18+Math.floor(p/5);i++)obstacles.push({x:500+i*250+(p*31%90),y:290-(i%3)*20,w:42,h:68,lane:i%3,hit:false});
 const key=e=>{k[e.key]=1;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key))e.preventDefault()},up=e=>k[e.key]=0;addEventListener('keydown',key);addEventListener('keyup',up);
 function loop(){
  if(done)return;
  const targetY=350+(k.ArrowUp?-3:k.ArrowDown?3:0);carY+=(targetY-carY)*.15;
  if(k.ArrowLeft)carX-=5;if(k.ArrowRight)carX+=5;carX=Math.max(190,Math.min(worldW-190,carX));
  dist=Math.max(dist,carX-260);cam=Math.max(0,Math.min(worldW-W,carX-W*.38));
  x.fillStyle='#78b9e8';x.fillRect(0,0,820,460);x.save();x.translate(-cam,0);
  x.fillStyle='#26313b';x.fillRect(0,0,worldW,460);x.fillStyle='#3e4650';x.fillRect(170,0,worldW-340,460);
  x.fillStyle='#f2f2f2';for(let xx=210;xx<worldW;xx+=220)x.fillRect(xx,0,5,460);
  x.fillStyle='#1e2329';for(let i=0;i<20;i++){let bx=120+i*300;x.fillRect(bx,80+(i%3)*35,55,90);x.fillStyle='#ffd166';x.fillRect(bx+10,95+(i%3)*35,10,12);x.fillRect(bx+30,95+(i%3)*35,10,12);x.fillStyle='#1e2329'}
  obstacles.forEach(o=>{x.fillStyle='#ef5b5b';x.fillRect(o.x,o.y,o.w,o.h);x.fillStyle='#fff';x.fillRect(o.x+8,o.y+10,8,8);x.fillRect(o.x+26,o.y+10,8,8);if(!o.hit&&Math.abs(o.x-carX)<45&&Math.abs(o.y-carY)<55){o.hit=true;lives--;score=Math.max(0,score-120);carX=Math.max(260,carX-180);gameSound('fail');if(lives<=0){done=true;info.textContent='💥 Sem vidas. Tente a fase novamente.'}}});
  x.fillStyle='#20d6a0';x.fillRect(carX-25,carY,50,80);x.fillStyle='#10202a';x.fillRect(carX-16,carY+10,32,22);
  x.fillStyle='#ffd447';x.fillRect(worldW-180,270,55,90);x.restore();
  score=Math.max(score,Math.floor(dist*.75));s.textContent=score+' pts • 🚗 '+Math.floor(dist/worldW*100)+'% • ❤️ '+lives;
  info.textContent='Desvie dos carros e alcance a chegada • ← → mover';
  if(carX>=worldW-200){done=true;premiumFinish(g.id,p,Math.min(2500,score+500),true);info.textContent='🏁 CHEGADA! Fase concluída.'}
  if(!done)requestAnimationFrame(loop);
 }loop();
}
function premiumCity(g,p){
 const[c,s,info]=premiumCanvas(g.name,'Cidade aberta • Fase '+p+' • câmera livre',);const x=c.getContext('2d');const W=820,H=460;
 const worldW=4200+p*15,worldH=900;let car={x:120,y:420,w:38,h:58},camX=0,camY=180,fuel=100,score=0,done=false,k={};
 const targets=[...Array(6)].map((_,i)=>({x:500+i*570+(p*37%120),y:120+(i%3)*230,done:false}));
 const traffic=[...Array(14)].map((_,i)=>({x:300+i*280,y:100+(i%4)*180,v:i%2?1.2:-1.2}));
 const key=e=>k[e.key]=1,up=e=>k[e.key]=0;addEventListener('keydown',key);addEventListener('keyup',up);
 function loop(){if(done)return;
  let dx=(k.ArrowRight||k.d?3.8:0)-(k.ArrowLeft||k.a?3.8:0),dy=(k.ArrowDown||k.s?3.8:0)-(k.ArrowUp||k.w?3.8:0);
  car.x=Math.max(40,Math.min(worldW-car.w,car.x+dx));car.y=Math.max(40,Math.min(worldH-car.h,car.y+dy));fuel=Math.max(0,fuel-.012*(Math.abs(dx)+Math.abs(dy)+.5));
  targets.forEach(t=>{if(!t.done&&Math.hypot(car.x-t.x,car.y-t.y)<65){t.done=true;score+=180;gameSound('coin')}});
  traffic.forEach(t=>{t.x+=t.v;if(t.x<80||t.x>worldW-80)t.v*=-1});
  camX=Math.max(0,Math.min(worldW-W,car.x-W*.4));camY=Math.max(0,Math.min(worldH-H,car.y-H*.45));
  x.fillStyle='#74b9e8';x.fillRect(0,0,W,H);x.save();x.translate(-camX,-camY);
  x.fillStyle='#4b9b50';x.fillRect(0,0,worldW,worldH);
  for(let xx=0;xx<worldW;xx+=360){x.fillStyle='#343a42';x.fillRect(xx,0,100,worldH);x.fillRect(0,xx*.18,worldW,90)}
  for(let i=0;i<targets.length;i++){let t=targets[i];x.fillStyle=t.done?'#28d17c':'#ffd34d';x.beginPath();x.arc(t.x,t.y,24,0,Math.PI*2);x.fill();x.fillStyle='#17202b';x.font='bold 14px system-ui';x.fillText(t.done?'✓':String(i+1),t.x-5,t.y+5)}
  traffic.forEach(t=>{x.fillStyle='#d94b55';x.fillRect(t.x,t.y,38,58)});
  x.fillStyle='#27c7ff';x.fillRect(car.x,car.y,car.w,car.h);x.fillStyle='#14202b';x.fillRect(car.x+6,car.y+8,26,20);x.restore();
  const doneCount=targets.filter(t=>t.done).length;s.textContent=score+' pts • 🎯 '+doneCount+'/'+targets.length+' • ⛽ '+fuel.toFixed(0)+'%';info.textContent='Visite todos os marcadores amarelos • WASD/setas';
  if(doneCount===targets.length){done=true;premiumFinish(g.id,p,Math.min(2500,score+500),true)}else if(fuel<=0){done=true;info.textContent='⛽ Combustível esgotado. Tente novamente.'}else requestAnimationFrame(loop);
 }loop();
}
function premiumSpace(g,p){
 const[c,s,info]=premiumCanvas(g.name,'Arena espacial • Fase '+p+' • ondas de inimigos',);const x=c.getContext('2d');const W=820,H=460;
 let ship={x:410,y:390,w:28,h:34},shots=[],enemies=[],score=0,wave=1,done=false,k={},cool=0;
 const total=6+Math.min(18,Math.floor(p/4));for(let i=0;i<total;i++)enemies.push({x:70+(i%9)*90,y:60+Math.floor(i/9)*65,hp:1+(p>35?1:0),vx:i%2?1:-1,alive:true});
 const key=e=>{k[e.key]=1;if(e.key===' ')e.preventDefault()},up=e=>k[e.key]=0;addEventListener('keydown',key);addEventListener('keyup',up);
 function loop(){if(done)return;x.fillStyle='#050816';x.fillRect(0,0,W,H);
  for(let i=0;i<90;i++){x.fillStyle='#fff';x.fillRect((i*83)%W,(i*47+Date.now()/18)%H,2,2)}
  if(k.ArrowLeft||k.a)ship.x-=6;if(k.ArrowRight||k.d)ship.x+=6;if(k.ArrowUp||k.w)ship.y-=4;if(k.ArrowDown||k.s)ship.y+=4;ship.x=Math.max(20,Math.min(W-20,ship.x));ship.y=Math.max(250,Math.min(H-30,ship.y));
  if(k[' ']&&cool<=0){shots.push({x:ship.x,y:ship.y-15});cool=10}cool--;
  shots.forEach(q=>q.y-=9);shots=shots.filter(q=>q.y>-10);
  enemies.forEach(e=>{e.x+=e.vx;if(e.x<25||e.x>W-25)e.vx*=-1;e.y+=Math.sin(Date.now()/600+e.x)*.15;shots.forEach(q=>{if(e.alive&&Math.abs(q.x-e.x)<25&&Math.abs(q.y-e.y)<22){e.hp--;q.y=-99;if(e.hp<=0){e.alive=false;score+=100}}})});
  x.fillStyle='#24d4ff';x.beginPath();x.moveTo(ship.x,ship.y-20);x.lineTo(ship.x-20,ship.y+18);x.lineTo(ship.x+20,ship.y+18);x.fill();
  enemies.forEach(e=>{if(!e.alive)return;x.fillStyle='#e94f65';x.fillRect(e.x-18,e.y-14,36,28);x.fillStyle='#ffd166';x.fillRect(e.x-7,e.y-5,14,10)});
  x.fillStyle='#ffe36e';shots.forEach(q=>x.fillRect(q.x-2,q.y,4,13));
  const left=enemies.filter(e=>e.alive).length;s.textContent=score+' pts • 👾 '+left+' inimigos • 🌊 Onda '+wave;info.textContent='WASD/setas mover • ESPAÇO atirar';
  if(!left){done=true;premiumFinish(g.id,p,Math.min(2500,score),true)}else requestAnimationFrame(loop);
 }loop();
}
function premiumChef(g,p){
 const[c,s,info]=premiumCanvas(g.name,'Cozinha profissional • Pedido '+p);const x=c.getContext('2d');let order=['🍅','🧀','🍞'][p%3],picked=null,score=0,done=false;const items=['🍅','🧀','🍞','🥕','🍓','🥚'];x.fillStyle='#171f30';x.fillRect(0,0,820,460);x.font='42px sans-serif';x.fillText('PEDIDO DO CLIENTE',280,70);x.font='64px sans-serif';x.fillText(order,375,145);info.textContent='Escolha o ingrediente correto';items.forEach((it,i)=>{const b=document.createElement('button');b.textContent=it;b.className='chef-choice';b.onclick=()=>{picked=it;document.querySelectorAll('.chef-choice').forEach(z=>z.classList.remove('selected'));b.classList.add('selected');if(it===order){score=900;s.textContent=score+' pts';info.textContent='👨‍🍳 Perfeito!';if(!done){done=true;premiumFinish(g.id,p,score,true)}}else{score=150;s.textContent=score+' pts';info.textContent='❌ Ingrediente errado — tente novamente';gameSound('fail')}};document.querySelector('#premiumActions').appendChild(b)});s.textContent='0 pts';
}
function premiumFlight(g,p){
 const[c,s,info]=premiumCanvas(g.name,'Treinamento de voo • Fase '+p);const x=c.getContext('2d');let alt=2500,spd=150,fuel=100,k={},done=false;const key=e=>k[e.key]=1,up=e=>k[e.key]=0;addEventListener('keydown',key);addEventListener('keyup',up);
 function loop(){if(done)return;x.fillStyle='#78b9e6';x.fillRect(0,0,820,300);x.fillStyle='#1f5d38';x.fillRect(0,300,820,160);x.fillStyle='#fff';x.fillRect(630,260,90,5);if(k.ArrowUp)alt+=12;if(k.ArrowDown)alt-=12;if(k.ArrowRight)spd+=1;if(k.ArrowLeft)spd-=1;alt=Math.max(500,Math.min(6000,alt));spd=Math.max(80,Math.min(300,spd));fuel-=.025;const targetAlt=1500+((p*317)%3000),targetSpd=130+((p*29)%100);x.fillStyle='#fff';x.font='20px system-ui';x.fillText('ALT '+Math.round(alt)+' ft',25,35);x.fillText('SPD '+Math.round(spd)+' kt',25,62);x.fillText('ALVO '+targetAlt+' ft / '+targetSpd+' kt',25,90);s.textContent='Precisão '+Math.max(0,100-Math.floor(Math.abs(alt-targetAlt)/30+Math.abs(spd-targetSpd)/2))+'%';info.textContent='Ajuste altitude e velocidade ao alvo';if(Math.abs(alt-targetAlt)<100&&Math.abs(spd-targetSpd)<8){done=true;premiumFinish(g.id,p,900,true)}else if(fuel<=0){done=true;info.textContent='⛽ Combustível esgotado.'}else requestAnimationFrame(loop)}loop();
}
const PREMIUM_GAMES=new Set(['superplumber','kartrush','citydriver','spacebattle','masterchef','flightacademy','speedrace']);
const originalLaunchPremium=launch;
launch=function(id){if(PREMIUM_GAMES.has(id)){const g=games.find(x=>x.id===id)||games[0];document.querySelector('#gameCategory').textContent=g.cat.toUpperCase();document.querySelector('#gameTitle').textContent=g.name;modal.classList.remove('hidden');premiumGame(id);return}originalLaunchPremium(id)};

// ===== PORTAL COMPLETO: PERFIL, LOJA, MISSOES, CONQUISTAS E SALAS =====
const PORTAL_KEY='games_portal_v2';
const portal=JSON.parse(localStorage.getItem(PORTAL_KEY)||'{}');
let portalSyncBusy=false;
portal.nickname=portal.nickname||'Jogador';
portal.purchases=portal.purchases||[];
portal.achievements=portal.achievements||[];
portal.daily=portal.daily||{date:'',claimed:false};
portal.missions=portal.missions||{};
async function syncPortal(){
 if(!apiToken||portalSyncBusy)return;
 portalSyncBusy=true;
 try{const d=await api('/api/portal');const remote=d.portal||{};const hasRemote=(remote.purchases||[]).length||(remote.achievements||[]).length||remote.nickname&&remote.nickname!=='Jogador'||remote.daily&&remote.daily.date||remote.missions&&Object.keys(remote.missions).length;
  if(!hasRemote&&((portal.purchases||[]).length||(portal.achievements||[]).length||portal.nickname!=='Jogador'||Object.keys(portal.missions||{}).length)){await persistPortal();return}
  portal.nickname=remote.nickname||portal.nickname||'Jogador';portal.purchases=[...new Set([...(portal.purchases||[]),...(remote.purchases||[])])];portal.achievements=[...new Set([...(portal.achievements||[]),...(remote.achievements||[])])];portal.daily=remote.daily&&remote.daily.date?remote.daily:portal.daily;portal.missions=remote.missions&&Object.keys(remote.missions).length?remote.missions:portal.missions;savePortal();
 }catch(e){}finally{portalSyncBusy=false}
}
async function persistPortal(){if(!apiToken)return;try{await api('/api/portal',{method:'POST',body:JSON.stringify({portal})})}catch(e){}}
function savePortal(){localStorage.setItem(PORTAL_KEY,JSON.stringify(portal));if(apiToken&&!portalSyncBusy)persistPortal()}
function totalStars(){return Object.values(rpg.stars||{}).reduce((a,b)=>a+b,0)}
function totalPhases(){return Object.keys(rpg.stars||{}).filter(k=>(rpg.stars[k]||0)>0).length}
const ACH=[
 ['first','🎮 Primeira fase','Conclua 1 fase',1],
 ['ten','🔟 10 fases','Conclua 10 fases',10],
 ['fifty','🏅 50 fases','Conclua 50 fases',50],
 ['hundred','💯 Centena','Conclua 100 fases',100],
 ['stars','⭐ Colecionador','Consiga 50 estrelas',50],
 ['coins','🪙 Rico','Junte 1.000 moedas',1000],
 ['level5','⚡ Nível 5','Alcance o nível 5',5],
 ['level10','👑 Nível 10','Alcance o nível 10',10],
 ['world5','🌎 Explorador','Chegue ao Mundo 5',5],
 ['world10','🚀 Mestre','Chegue ao Mundo 10',10]
];
function refreshAchievements(){
 const vals={first:totalPhases()>=1,ten:totalPhases()>=10,fifty:totalPhases()>=50,hundred:totalPhases()>=100,stars:totalStars()>=50,coins:rpg.coins>=1000,level5:rpg.level>=5,level10:rpg.level>=10,world5:Object.values(rpg.stars||{}).some((_,i)=>false)||totalPhases()>=41,world10:totalPhases()>=91};
 ACH.forEach(a=>{if(vals[a[0]]&&!portal.achievements.includes(a[0]))portal.achievements.push(a[0])});savePortal();
}
function renderProgress(){
 refreshAchievements();
 const wm=document.querySelector('#worldMap'),ag=document.querySelector('#achievementGrid');if(!wm||!ag)return;
 wm.innerHTML=Array.from({length:10},(_,i)=>{const start=i*10+1,done=Object.keys(rpg.stars||{}).filter(k=>{const p=+k.split(':')[1];return p>=start&&p<start+10}).length;const unlocked=i===0||done>0||totalPhases()>=i*10;return '<div class="world-card '+(unlocked?'unlocked':'locked')+'"><div class="world-icon">'+(unlocked?['🌳','🌆','🏜️','❄️','🚀','🌋','🏝️','🏰','🌌','👑'][i]:'🔒')+'</div><b>Mundo '+(i+1)+'</b><small>Fases '+start+'–'+(start+9)+'</small><span>'+done+'/10 concluídas</span></div>'}).join('');
 ag.innerHTML=ACH.map(a=>'<div class="achievement '+(portal.achievements.includes(a[0])?'unlocked':'')+'"><div>'+a[1]+'</div><small>'+a[2]+'</small></div>').join('');
}
function claimDaily(){
 const today=new Date().toISOString().slice(0,10);
 if(portal.daily.date===today){document.querySelector('#dailyBonus').innerHTML='<div class="bonus-box">🎁 Bônus de hoje já coletado. Volte amanhã!</div>';return}
 portal.daily={date:today,claimed:true};rpg.coins+=100;rpg.xp+=50;recalcLevel();saveRPG();savePortal();if(apiToken)api('/api/rpg/daily',{method:'POST'}).then(d=>{if(d.player){rpg.lives=d.player.lives;rpg.coins=d.player.coins;rpg.xp=d.player.xp;rpg.level=d.player.level;rpg.nextLifeAt=d.player.next_life_at||0;saveRPG();updateRPGHud()}}).catch(()=>{});
 document.querySelector('#dailyBonus').innerHTML='<div class="bonus-box">🎉 +100 🪙 e +50 XP recebidos!</div>';
}
function renderMissions(){
 const date=new Date().toISOString().slice(0,10), m=portal.missions[date]||{phases:0,games:0,stars:0};
 const goals=[['🎯','Concluir 3 fases',m.phases,3,80],['🎮','Jogar 3 jogos diferentes',m.games,3,100],['⭐','Ganhar 5 estrelas',m.stars,5,120]];
 document.querySelector('#dailyBonus').innerHTML='<div class="bonus-box"><b>🎁 Bônus diário</b><p>Entre todos os dias para ganhar 100 moedas + 50 XP.</p><button class="primary" id="claimDaily">COLETAR BÔNUS</button></div>';
 document.querySelector('#claimDaily').onclick=claimDaily;
 document.querySelector('#missionGrid').innerHTML=goals.map(g=>'<div class="mission-card"><b>'+g[0]+' '+g[1]+'</b><div class="mission-bar"><span style="width:'+Math.min(100,g[2]/g[3]*100)+'%"></span></div><small>'+g[2]+'/'+g[3]+' • Recompensa '+g[4]+' 🪙</small></div>').join('');
}
const SHOP=[
 ['avatar1','🦊','Avatar Raposa',200],['avatar2','🐲','Avatar Dragão',300],['theme','🌈','Tema Colorido',500],
 ['frame','💎','Moldura Diamante',750],['car','🏎️','Skin Turbo',400],['pet','🐱','Pet Companheiro',350],
 ['crown','👑','Coroa de Campeão',1000],['rocket','🚀','Efeito Foguete',600]
];
function renderShop(){
 const el=document.querySelector('#shopGrid');if(!el)return;
 el.innerHTML=SHOP.map(x=>{const owned=portal.purchases.includes(x[0]);return '<div class="shop-item"><div class="shop-art">'+x[1]+'</div><b>'+x[2]+'</b><small>'+x[3]+' 🪙</small><button class="primary" data-buy="'+x[0]+'" '+(owned?'disabled':'')+'>'+(owned?'ADQUIRIDO':'COMPRAR')+'</button></div>'}).join('');
 el.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const x=SHOP.find(y=>y[0]===b.dataset.buy);if(!x||portal.purchases.includes(x[0]))return;if(rpg.coins<x[3]){alert('Moedas insuficientes.');return}if(apiToken){
  api('/api/rpg/purchase',{method:'POST',body:JSON.stringify({item:x[0],cost:x[3]})}).then(d=>{if(!d.purchased){alert('Compra não realizada.');return}rpg.coins=d.player.coins;rpg.xp=d.player.xp;rpg.level=d.player.level;portal.purchases.push(x[0]);saveRPG();savePortal();renderShop();renderProfile()}).catch(()=>alert('Não foi possível concluir a compra.'));
 }else{
  rpg.coins-=x[3];portal.purchases.push(x[0]);saveRPG();savePortal();renderShop();renderProfile()
 }});
}
function renderProfile(){
 const el=document.querySelector('#profileCard');if(!el)return;
 const need=xpForLevel(rpg.level), name=portal.nickname||state.user||'Jogador';
 el.innerHTML='<div class="profile-avatar">'+(portal.purchases.includes('crown')?'👑':'🎮')+'</div><div><h2>'+name+'</h2><p>Nível '+rpg.level+' • '+rpg.xp+'/'+need+' XP</p><div class="profile-stats"><span>❤️ '+rpg.lives+'</span><span>🪙 '+rpg.coins+'</span><span>⭐ '+totalStars()+'</span><span>🎯 '+totalPhases()+' fases</span></div><input id="nicknameInput" value="'+name.replace(/"/g,'&quot;')+'" maxlength="30"><button class="primary" id="saveNick">Salvar nome</button></div>';
 el.querySelector('#saveNick').onclick=()=>{portal.nickname=el.querySelector('#nicknameInput').value.trim()||'Jogador';savePortal();persistPortal();renderProfile()};
 renderShop();
}
function updateMissionProgress(id,stars){
 const date=new Date().toISOString().slice(0,10),m=portal.missions[date]||{phases:0,games:0,stars:0,played:{}};
 m.phases++;m.stars+=stars;m.played=m.played||{};m.played[id]=1;m.games=Object.keys(m.played).length;portal.missions[date]=m;savePortal();persistPortal();
}
const oldAddRPGReward=addRPGReward;
addRPGReward=function(id,phase,stars){oldAddRPGReward(id,phase,stars);updateMissionProgress(id,stars);refreshAchievements()};
document.addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b||b.classList.contains('navbtn'))return;document.querySelectorAll('.navbtn').forEach(x=>x.classList.remove('active'));const n=document.querySelector('.navbtn[data-filter="'+b.dataset.filter+'"]');if(n)n.classList.add('active');render(b.dataset.filter,'');window.scrollTo({top:document.querySelector('#grid').offsetTop-80,behavior:'smooth'})});
document.querySelector('#showProgress')?.addEventListener('click',()=>{openPanel('#progressPanel');renderProgress()});
document.querySelector('#showMissions')?.addEventListener('click',()=>{openPanel('#missionsPanel');renderMissions()});
document.querySelector('#showProfile')?.addEventListener('click',()=>{openPanel('#profilePanel');renderProfile()});
document.querySelector('#showMultiplayer')?.addEventListener('click',()=>openPanel('#multiplayerPanel'));

// ===== MULTIPLAYER E SINCRONIZACAO =====
let currentRoom='';
let rpgSyncBusy=false;
async function syncRPG(){
 if(!apiToken||rpgSyncBusy)return;
 rpgSyncBusy=true;
 try{
  const d=await api('/api/progress');
  const p=d.player||{lives:5,coins:0,xp:0,level:1,next_life_at:0};
  const serverHasProgress=Number(p.coins)>0||Number(p.xp)>0||Number(p.level)>1||(d.phases||[]).length>0;
  const localHasProgress=rpg.coins>0||rpg.xp>0||rpg.level>1||Object.keys(rpg.stars||{}).length>0;
  if(!serverHasProgress&&localHasProgress){await persistRPGState();return}
  rpg.lives=Math.max(0,Math.min(5,Number(p.lives)||5));
  rpg.coins=Math.max(0,Number(p.coins)||0);
  rpg.xp=Math.max(0,Number(p.xp)||0);
  rpg.level=Math.max(1,Number(p.level)||1);
  rpg.nextLifeAt=Number(p.next_life_at)||0;
  (d.phases||[]).forEach(q=>{const k=q.game_id+':'+q.phase;rpg.stars[k]=Math.max(rpg.stars[k]||0,Number(q.stars)||0);rpg.phaseScores[k]=Math.max(rpg.phaseScores[k]||0,Number(q.score)||0)});
  saveRPG();refreshAchievements();
 }catch(e){}finally{rpgSyncBusy=false}
}
async function persistRPGState(){
 if(!apiToken||rpgSyncBusy)return;
 try{
  rpgSyncBusy=true;
  await api('/api/progress',{method:'POST',body:JSON.stringify({player:{lives:rpg.lives,coins:rpg.coins,xp:rpg.xp,level:rpg.level,nextLifeAt:rpg.nextLifeAt||0}})});
 }catch(e){}finally{rpgSyncBusy=false}
}
async function persistRPGPhase(id,phase,stars,score=0){
 if(!apiToken)return;
 try{
  const d=await api('/api/rpg/reward',{method:'POST',body:JSON.stringify({gameId:id,phase,stars,score})});
  if(d.player){rpg.lives=d.player.lives;rpg.coins=d.player.coins;rpg.xp=d.player.xp;rpg.level=d.player.level;rpg.nextLifeAt=d.player.next_life_at||0;saveRPG();updateRPGHud()}
 }catch(e){}
}
setInterval(()=>{if(apiToken)persistRPGState()},30000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&apiToken)persistRPGState()});
const prevReward=addRPGReward;
addRPGReward=function(id,phase,stars){prevReward(id,phase,stars);persistRPGPhase(id,phase,stars,stars*100+phase)};
document.querySelector('#createRoom')?.addEventListener('click',async()=>{
 if(!apiToken){document.querySelector('#roomMsg').textContent='Faça login para criar uma sala.';return}
 try{const d=await api('/api/rooms',{method:'POST',body:JSON.stringify({gameId:'tictactoe'})});currentRoom=d.code;document.querySelector('#roomMsg').textContent='Sala '+d.code+' criada. Compartilhe o código.';pollRoom()}catch(e){document.querySelector('#roomMsg').textContent=e.message}
});
document.querySelector('#joinRoom')?.addEventListener('click',async()=>{
 if(!apiToken){document.querySelector('#roomMsg').textContent='Faça login para entrar em uma sala.';return}
 const code=document.querySelector('#roomCode').value.trim().toUpperCase();
 try{const d=await api('/api/rooms/'+code+'/join',{method:'POST'});currentRoom=code;document.querySelector('#roomMsg').textContent='Entrou na sala '+code+' • '+d.status;pollRoom()}catch(e){document.querySelector('#roomMsg').textContent=e.message}
});
async function pollRoom(){
 if(!currentRoom||!apiToken)return;
 try{const d=await api('/api/rooms/'+currentRoom);document.querySelector('#roomMsg').textContent='Sala '+currentRoom+' • '+(d.room.status==='ready'?'🟢 2 jogadores prontos!':'🟡 aguardando adversário...');if(d.room.status!=='ready')setTimeout(pollRoom,2000)}catch(e){}
}
syncRPG();


/* ===== ABERTURA ROBUSTA DOS JOGOS ===== */
launch = function(id){
  const g=games.find(x=>x.id===id)||games[0];
  try{
    addRecent(id);
    document.querySelector('#gameCategory').textContent=g.cat.toUpperCase();
    document.querySelector('#gameTitle').textContent=g.name;
    modal.classList.remove('hidden');
    if(PREMIUM_GAMES.has(id)){
      premiumGame(id);
    }else{
      campaignGame(id);
    }
  }catch(err){
    console.error('Games Online - erro ao abrir jogo:',err);
    modal.classList.remove('hidden');
    area.innerHTML='<div class="game-wrap" style="text-align:center;padding:40px"><div style="font-size:70px">🎮</div><h3>Jogo carregando...</h3><p>O jogo encontrou um erro ao iniciar. Recarregue a página e tente novamente.</p><button class="primary" onclick="location.reload()">RECARREGAR JOGO</button></div>';
  }
};
document.querySelectorAll('[data-launch]').forEach(b=>{
  b.onclick=(e)=>{e.preventDefault();e.stopPropagation();launch(b.dataset.launch)};
});





/* ===== JOGOS ESPECIFICOS APRIMORADOS ===== */
function gameShell(title,subtitle){
 area.innerHTML='<div class="game-wrap"><div style="text-align:center"><div style="font-size:58px">'+title+'</div><p class="score">'+subtitle+'</p></div><div id="specificGame"></div></div>';
 return document.querySelector('#specificGame');
}
function goalKeeper(){
 const box=gameShell('🥅','Defenda o gol • use o mouse/toque');
 box.innerHTML='<div style="position:relative;height:330px;border-radius:18px;overflow:hidden;background:linear-gradient(#73c8f5 0 58%,#4caf50 58%);border:2px solid #2c405d"><div style="position:absolute;left:0;right:0;bottom:0;height:42%;border-top:3px solid white"></div><div id="ball" style="position:absolute;font-size:46px;cursor:pointer">⚽</div><div id="goalInfo" class="score" style="position:absolute;top:12px;left:12px;background:#08101bcc;padding:8px 12px;border-radius:10px">Defesas: 0 • 10 chutes</div></div>';
 const b=document.querySelector('#ball'),inf=document.querySelector('#goalInfo');let saves=0,shots=0,active=true;
 function kick(){if(!active)return;shots++;const gx=20+Math.random()*80,gy=55+Math.random()*28;b.style.left=gx+'%';b.style.top=gy+'%';inf.textContent='Defesas: '+saves+' • Chutes: '+shots+'/10';if(shots>=10){active=false;inf.textContent='🏆 Fim! Defesas: '+saves}}
 b.onclick=()=>{if(active){saves++;inf.textContent='🧤 DEFESA! '+saves+' • Chutes: '+shots+'/10';kick()}};kick();const t=setInterval(()=>{if(!active){clearInterval(t);return}kick()},1400);
}
function princessDress(){
 const box=gameShell('👗','Vista a personagem e monte um look');
 const parts=[['Cabelo','💇‍♀️',['👱‍♀️','👩‍🦰','🧑‍🎤']],['Roupa','👗',['👗','🥻','👚']],['Sapato','👠',['👠','👟','🥾']],['Acessório','💎',['👑','🎀','👜']]];
 box.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px"><div style="background:#ffd9ed;border-radius:18px;display:flex;align-items:center;justify-content:center;min-height:300px"><div id="dressChar" style="font-size:105px">👱‍♀️<br>👗<br>👠</div></div><div id="dressOptions"></div></div><div id="dressScore" class="score">Escolha todos os itens</div>';
 const opt=document.querySelector('#dressOptions'),char=document.querySelector('#dressChar'),score=document.querySelector('#dressScore'),sel=['👱‍♀️','👗','👠'];opt.innerHTML=parts.map((p,i)=>'<div style="margin:8px 0"><b>'+p[0]+'</b> '+p[2].map((v,j)=>'<button class="primary" data-d="'+i+'-'+j+'" style="margin:4px">'+v+'</button>').join('')+'</div>').join('');
 opt.onclick=e=>{const b=e.target.closest('[data-d]');if(!b)return;const [i,j]=b.dataset.d.split('-').map(Number);sel[i]=parts[i][2][j];char.textContent=sel.join('\\n');score.textContent='✨ Look montado! '+sel.join(' ');};
}
function fashionStudio(){
 const box=gameShell('💄','Estúdio de moda • combine cores e acessórios');
 box.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px"><div id="model" style="min-height:300px;border-radius:18px;background:#f3e8ff;display:flex;align-items:center;justify-content:center;font-size:120px">💃</div><div><h3>Paleta</h3><button class="primary" data-c="#ff4d6d">🌸 Rosa</button><button class="primary" data-c="#6d5dfc">💜 Roxo</button><button class="primary" data-c="#18d6a0">💚 Verde</button><h3>Acessórios</h3><button class="primary" data-a="👑">👑</button><button class="primary" data-a="🕶️">🕶️</button><button class="primary" data-a="💎">💎</button><p id="fashionMsg" class="score">Crie seu visual.</p></div></div>';
 let acc='';const m=document.querySelector('#model'),msg=document.querySelector('#fashionMsg');box.onclick=e=>{if(e.target.dataset.c){m.style.background=e.target.dataset.c;msg.textContent='🎨 Cor escolhida!'}if(e.target.dataset.a){acc=e.target.dataset.a;m.textContent='💃'+acc;msg.textContent='✨ Acessório '+acc+' aplicado!'}};
}
function petCare(){
 const box=gameShell('🐶','Cuide do seu pet • mantenha os indicadores altos');
 box.innerHTML='<div style="font-size:100px;text-align:center" id="pet">🐶</div><div id="petStats" class="score">❤️ 70 • 🍖 70 • 😊 70</div><div style="display:flex;gap:8px;justify-content:center"><button class="primary" id="feed">🍖 Alimentar</button><button class="primary" id="bath">🛁 Banho</button><button class="primary" id="play">🎾 Brincar</button></div>';
 let hp=70,food=70,happy=70;const st=document.querySelector('#petStats'),pet=document.querySelector('#pet');
 function draw(){hp=Math.max(0,Math.min(100,hp));food=Math.max(0,Math.min(100,food));happy=Math.max(0,Math.min(100,happy));st.textContent='❤️ '+hp+' • 🍖 '+food+' • 😊 '+happy;if(hp<30)pet.textContent='🥺';else if(happy>85)pet.textContent='🐕';else pet.textContent='🐶'}
 feed.onclick=()=>{food+=18;hp+=5;draw()};bath.onclick=()=>{hp+=12;happy+=6;draw()};play.onclick=()=>{happy+=18;food-=7;draw()};setInterval(()=>{food-=2;happy-=1;if(food<25)hp-=2;draw()},1600);
}
function coloringGame(kind){
 const box=gameShell(kind==='animals'?'🦄':kind==='cars'?'🏎️':'🎨','Pinte cada parte do desenho');
 box.innerHTML='<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="colorBtn" data-c="#ff4d6d">🔴</button><button class="colorBtn" data-c="#ffd43b">🟡</button><button class="colorBtn" data-c="#18d6a0">🟢</button><button class="colorBtn" data-c="#4dabf7">🔵</button><button class="colorBtn" data-c="#b36cff">🟣</button></div><div id="paint" style="margin:18px auto;max-width:680px;min-height:260px;background:#fff;border-radius:20px;padding:22px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px"></div><p id="paintInfo" class="score">Escolha uma cor e pinte as peças.</p>';
 const paint=document.querySelector('#paint'),info=document.querySelector('#paintInfo');const icons=kind==='animals'?['🦄','🐱','🦋','🐶','🐼','🐰']:kind==='cars'?['🏎️','🚗','🚙','🚕','🛻','🏍️']:['🌈','⭐','🎈','🌸','🍭','🎮'];let color='#ff4d6d';
 document.querySelectorAll('.colorBtn').forEach(b=>b.onclick=()=>color=b.dataset.c);
 icons.forEach(v=>{const q=document.createElement('button');q.textContent=v;q.style.cssText='font-size:55px;min-height:90px;border:3px solid #ddd;border-radius:16px;background:#fff;cursor:pointer';q.onclick=()=>{q.style.background=color;q.style.borderColor=color;info.textContent='🎨 '+v+' pintado!'};paint.appendChild(q)});
}
function pizzaMaker(){
 const box=gameShell('🍕','Pizza Maker • coloque os ingredientes pedidos');
 const orders=[['🍅','🧀','🌶️'],['🍍','🧀','🥓'],['🍄','🧀','🫑']];let order=orders[Math.floor(Math.random()*orders.length)],picked=[];
 box.innerHTML='<h3>Pedido: '+order.join(' ')+'</h3><div id="pizza" style="font-size:115px;text-align:center">🍕</div><div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap">'+['🍅','🧀','🌶️','🍍','🥓','🍄','🫑'].map(v=>'<button class="primary" data-ing="'+v+'">'+v+'</button>').join('')+'</div><p id="pizzaInfo" class="score">Ingredientes: 0/'+order.length+'</p>';
 const info=document.querySelector('#pizzaInfo');box.onclick=e=>{const b=e.target.closest('[data-ing]');if(!b)return;const v=b.dataset.ing;if(order.includes(v)&&!picked.includes(v)){picked.push(v);info.textContent='Ingrediente certo! '+picked.length+'/'+order.length;if(picked.length===order.length)info.textContent='🏆 Pizza pronta! Pedido perfeito!'}else info.textContent='❌ Esse ingrediente não faz parte do pedido.'};
}
function bakery(){
 const box=gameShell('🧁','Bakery Star • atenda os pedidos antes do tempo');
 const orders=['🧁','🍰','🥐','🍩'];let done=0,time=30;
 box.innerHTML='<div id="bakeryOrder" style="font-size:80px;text-align:center">🧁</div><div id="bakeryItems" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">'+orders.map(v=>'<button class="primary" data-b="'+v+'">'+v+'</button>').join('')+'</div><p id="bakeryInfo" class="score">Pedidos: 0 • Tempo: 30</p>';
 const info=document.querySelector('#bakeryInfo'),ord=document.querySelector('#bakeryOrder');
 const next=()=>ord.textContent=orders[Math.floor(Math.random()*orders.length)];
 box.onclick=e=>{const b=e.target.closest('[data-b]');if(!b)return;if(b.dataset.b===ord.textContent){done++;next()}else done=Math.max(0,done-1);info.textContent='Pedidos: '+done+' • Tempo: '+time};next();
 const t=setInterval(()=>{time--;info.textContent='Pedidos: '+done+' • Tempo: '+time;if(time<=0){clearInterval(t);info.textContent='🏆 Fim! Pedidos corretos: '+done}},1000);
}
function airport(){
 const box=gameShell('🛫','Airport Manager • organize pousos e decolagens');
 box.innerHTML='<div id="airportMap" style="position:relative;height:300px;border-radius:18px;background:#183a2b;overflow:hidden"><div style="position:absolute;left:10%;right:10%;top:45%;height:12px;background:#555"></div><div id="planes" style="position:absolute;inset:0"></div></div><p id="airportInfo" class="score">Pousos seguros: 0 • Aviões: 3</p>';
 const map=document.querySelector('#planes'),info=document.querySelector('#airportInfo');let safe=0,planes=[];
 for(let i=0;i<3;i++){const q=document.createElement('button');q.textContent='✈️';q.style.cssText='position:absolute;font-size:34px;background:none;border:0;cursor:pointer;left:'+(10+i*30)+'%;top:'+(10+i*18)+'%';map.appendChild(q);planes.push(q);q.onclick=()=>{safe++;q.remove();info.textContent='🛬 Pouso seguro: '+safe+' • Aviões restantes: '+document.querySelectorAll('#planes button').length;if(!document.querySelectorAll('#planes button').length)info.textContent='🏆 Aeroporto organizado!'}} 
 planes.forEach((q,i)=>{let x=10+i*30,y=10+i*18;q.dataset.x=x;q.dataset.y=y;});const t=setInterval(()=>{planes.forEach(q=>{if(!q.isConnected)return;let x=(parseFloat(q.dataset.x)+.5)%90;q.dataset.x=x;q.style.left=x+'%'});},120);
}
function speedRace(){
 const box=gameShell('🏎️','Speed Race • ultrapasse os adversários');
 box.innerHTML='<div style="position:relative;height:320px;background:#222;border-radius:18px;overflow:hidden"><div id="raceCar" style="position:absolute;bottom:20px;left:45%;font-size:48px">🏎️</div><div id="rival" style="position:absolute;top:20px;left:20%;font-size:44px">🚗</div></div><p id="raceInfo" class="score">Distância: 0 m • Use ← →</p>';
 let x=45,d=0,k={};const car=document.querySelector('#raceCar'),r=document.querySelector('#rival'),info=document.querySelector('#raceInfo');
 const kd=e=>k[e.key]=1,ku=e=>k[e.key]=0;addEventListener('keydown',kd);addEventListener('keyup',ku);
 function loop(){if(k.ArrowLeft)x-=1;if(k.ArrowRight)x+=1;x=Math.max(5,Math.min(85,x));d+=1.5;car.style.left=x+'%';r.style.left=(20+Math.sin(d/35)*30)+'%';info.textContent='Distância: '+Math.floor(d)+' m • '+(d>=1000?'🏆 CHEGADA!':'← → para dirigir');if(d<1000)requestAnimationFrame(loop)}loop();
}
function motorcycle(){
 const box=gameShell('🏍️','Moto Rush • desvie do trânsito');
 box.innerHTML='<div style="position:relative;height:330px;background:#20242b;border-radius:18px;overflow:hidden"><div id="moto" style="position:absolute;bottom:18px;left:45%;font-size:48px">🏍️</div><div id="traffic"></div></div><p id="motoInfo" class="score">Distância: 0 • Use ← →</p>';
 const m=document.querySelector('#moto'),tr=document.querySelector('#traffic'),info=document.querySelector('#motoInfo');let x=45,d=0,k={},cars=[];
 for(let i=0;i<5;i++){const q=document.createElement('div');q.textContent=['🚗','🚙','🚕'][i%3];q.style.cssText='position:absolute;font-size:40px;top:'+(i*70-100)+'px;left:'+(10+(i*17)%75)+'%';tr.appendChild(q);cars.push(q)}
 addEventListener('keydown',e=>k[e.key]=1);addEventListener('keyup',e=>k[e.key]=0);
 function loop(){if(k.ArrowLeft)x-=1.5;if(k.ArrowRight)x+=1.5;x=Math.max(4,Math.min(88,x));d+=1;cars.forEach((q,i)=>{let y=(parseFloat(q.dataset.y||(-80+i*70))+3)%400;q.dataset.y=y;q.style.top=y+'px';q.style.left=(10+((i*19+Math.floor(d/40))%75))+'%'});m.style.left=x+'%';info.textContent='Distância: '+Math.floor(d)+' m • '+(d>1200?'🏁 Chegada!':'← → para desviar');if(d<1200)requestAnimationFrame(loop)}loop();
}

/* ===== JOGOS REAIS: NAO USAR A TELA GENERICA DE CAMPANHA ===== */
(function(){
  const REAL_GAME_MAP = {
    platformer: platformer,
    snake: snake,
    blocks: blocks,
    racer: racer,
    memory: memory,
    clicker: clicker,
    pong: pong,
    breakout: breakout,
    flappy: flappy,
    tictactoe: tictactoe,
    mines: mines,
    math: math,
    whack: whack,
    typing: typing,
    car: simCar,
    flight: simFlight,
    bus: bus,
    truck: truck,
    farm: farm,
    parking: parking,
    train: train,
    fishing: fishing,
    space: space,
    superplumber: premiumGame,
    kartrush: premiumGame,
    citydriver: premiumGame,
    spacebattle: premiumGame,
    masterchef: premiumGame,
    flightacademy: premiumGame,
    speedrace: premiumGame
  };

  function fallbackArcade(g){
    area.innerHTML =
      '<div class="game-wrap">'+
      '<div style="text-align:center;font-size:70px;margin-bottom:8px">'+g.icon+'</div>'+
      '<h3 style="text-align:center">'+g.name+'</h3>'+
      '<p id="fallbackInfo" class="score">Clique no alvo! 30 segundos.</p>'+
      '<div id="fallbackBoard" style="position:relative;height:300px;max-width:760px;margin:15px auto;border:1px solid #26344d;border-radius:16px;background:#08101b;overflow:hidden"></div>'+
      '</div>';
    const board=document.querySelector('#fallbackBoard');
    const info=document.querySelector('#fallbackInfo');
    let score=0,time=30,active=true;
    const target=document.createElement('button');
    target.textContent=g.icon;
    target.style.cssText='position:absolute;width:64px;height:64px;border-radius:50%;border:0;font-size:32px;cursor:pointer;background:#6d5dfc';
    board.appendChild(target);
    function move(){
      target.style.left=Math.max(0,Math.random()*(board.clientWidth-64))+'px';
      target.style.top=Math.max(0,Math.random()*(board.clientHeight-64))+'px';
    }
    target.onclick=()=>{if(!active)return;score+=10;info.textContent='Pontos: '+score+' • Tempo: '+time+'s';move()};
    move();
    const timer=setInterval(()=>{
      if(!document.querySelector('#fallbackBoard')){clearInterval(timer);return}
      time--;
      info.textContent='Pontos: '+score+' • Tempo: '+time+'s';
      if(time<=0){clearInterval(timer);active=false;info.textContent='🏆 Fim! Pontuação: '+score+' pontos';target.disabled=true}
    },1000);
  }

  window.launch = function(id){
    const g=games.find(x=>x.id===id)||games[0];
    try{
      addRecent(id);
      document.querySelector('#gameCategory').textContent=g.cat.toUpperCase();
      document.querySelector('#gameTitle').textContent=g.name;
      modal.classList.remove('hidden');

      const fn=REAL_GAME_MAP[id];
      if(fn){
        if(fn===premiumGame) fn(id);
        else fn();
      }else{
        fallbackArcade(g);
      }
    }catch(err){
      console.error('Games Online - erro ao iniciar '+id,err);
      modal.classList.remove('hidden');
      area.innerHTML='<div class="game-wrap" style="text-align:center;padding:40px"><div style="font-size:70px">'+g.icon+'</div><h3>Erro ao iniciar o jogo</h3><p>Recarregue a página e tente novamente.</p><button class="primary" onclick="location.reload()">RECARREGAR</button></div>';
    }
  };

  document.querySelectorAll('[data-launch]').forEach(b=>{
    b.onclick=(e)=>{e.preventDefault();e.stopPropagation();window.launch(b.dataset.launch)};
  });
})();
