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
  syncRPG();
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
rpg.phaseScores=rpg.phaseScores||{};\nrpg.nextLifeAt=Number(rpg.nextLifeAt)||0;
function saveRPG(){localStorage.setItem(RPG_KEY,JSON.stringify(rpg));updateRPGHud()}\nfunction recoverLives(){if(rpg.lives>=5||!rpg.nextLifeAt)return;const now=Date.now();while(rpg.lives<5&&rpg.nextLifeAt&&now>=rpg.nextLifeAt){rpg.lives++;rpg.nextLifeAt=rpg.lives<5?now+60000:0}saveRPG()}\nfunction gameSound(type){try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const a=gameSound.ctx||(gameSound.ctx=new A()),o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=type==='win'?720:type==='fail'?150:420;g.gain.setValueAtTime(.0001,a.currentTime);g.gain.exponentialRampToValueAtTime(.08,a.currentTime+.01);g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+.16);o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+.18)}catch(e){}}
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
function loseLife(){recoverLives();if(rpg.lives<=0)return false;rpg.lives--;if(!rpg.nextLifeAt)rpg.nextLifeAt=Date.now()+60000;saveRPG();gameSound('fail');return true}
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

function premiumPlumber(g,p){
 const[c,s,info]=premiumCanvas(g.name,'Aventura de plataforma • Fase '+p);const x=c.getContext('2d');let px=70,py=360,vx=0,vy=0,coins=0,score=0,k={},done=false;
 const world=()=>{x.fillStyle='#79c7ff';x.fillRect(0,0,820,460);x.fillStyle='#62b84b';x.fillRect(0,405,820,55);x.fillStyle='#8b5a2b';x.fillRect(0,425,820,35);for(let i=0;i<7;i++){let bx=120+i*105-(p*17%70),by=330-(i%3)*65;x.fillStyle='#8d6b45';x.fillRect(bx,by,75,16);x.fillStyle='#ffd84d';x.beginPath();x.arc(bx+38,by-18,9,0,7);x.fill()}x.fillStyle='#e64b4b';x.fillRect(px,py,30,40);x.fillStyle='#27364d';x.fillRect(px+6,py+28,18,12)};
 const key=e=>{k[e.key.toLowerCase()]=1;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault()},up=e=>k[e.key.toLowerCase()]=0;addEventListener('keydown',key);addEventListener('keyup',up);
 function loop(){if(done)return;world();if(k.a||k.arrowleft)vx=-4;if(k.d||k.arrowright)vx=4;if(!(k.a||k.d||k.arrowleft||k.arrowright))vx*=.8;if((k.w||k[' ']||k.arrowup)&&py>=365)vy=-12;vy+=.55;px+=vx;py+=vy;if(py>365){py=365;vy=0}px=Math.max(0,Math.min(790,px));if(px>750){coins=3;score=900;done=true;premiumFinish(g.id,p,score,true)}else{if(Math.random()<.025)coins=Math.min(6,coins+1);score=Math.min(850,Math.floor((px/750)*700+coins*40));s.textContent=score+' pts • 🪙 '+coins;info.textContent='Chegue ao portal verde • '+Math.floor(px/7.5)+'%';requestAnimationFrame(loop)}}loop();
}
function premiumRace(g,p){
 const[c,s,info]=premiumCanvas(g.name,'Circuito com tráfego • Fase '+p);const x=c.getContext('2d');let car=390,lane=1,speed=5,dist=0,score=0,obs=[],k={},done=false;for(let i=0;i<5;i++)obs.push({lane:(i+p)%3,y:-i*150-100});
 const key=e=>{k[e.key]=1;if(['ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault()},up=e=>k[e.key]=0;addEventListener('keydown',key);addEventListener('keyup',up);
 function loop(){if(done)return;x.fillStyle='#69a6d8';x.fillRect(0,0,820,460);x.fillStyle='#292d35';x.fillRect(180,0,460,460);x.fillStyle='#d9d9d9';for(let i=1;i<3;i++)for(let y=-40+(dist%80);y<460;y+=80)x.fillRect(180+i*153,y,5,42);if(k.ArrowLeft){lane=Math.max(0,lane-.04)}if(k.ArrowRight){lane=Math.min(2,lane+.04)}car=210+lane*153;speed=Math.min(10,5+p*.035+(k[' ']?2:0));dist+=speed;obs.forEach(o=>{o.y+=speed;o.x=210+o.lane*153;if(o.y>500){o.y=-100; o.lane=Math.floor(Math.random()*3);score+=80}x.fillStyle='#ef5b5b';x.fillRect(o.x-22,o.y,44,70);if(Math.abs(o.x-car)<42&&o.y>345&&o.y<430){done=true;gameSound('fail');info.textContent='💥 Batida! Fase não concluída. Use a campanha para tentar novamente.'}});x.fillStyle='#20d6a0';x.fillRect(car-25,365,50,80);score=Math.floor(dist*.6);s.textContent=score+' pts • velocidade '+speed.toFixed(1);info.textContent='Desvie do trânsito • '+Math.floor(dist/10)+'m';if(dist>=1200){done=true;premiumFinish(g.id,p,Math.min(1000,score),true)}else if(!done)requestAnimationFrame(loop)}loop();
}
function premiumCity(g,p){
 const[c,s,info]=premiumCanvas(g.name,'Missão urbana • Fase '+p);const x=c.getContext('2d');let car={x:385,y:380},target={x:120+(p*71)%560,y:80+(p*43)%250},k={},fuel=100,score=0,done=false;
 const key=e=>k[e.key]=1,up=e=>k[e.key]=0;addEventListener('keydown',key);addEventListener('keyup',up);
 function loop(){if(done)return;x.fillStyle='#152238';x.fillRect(0,0,820,460);x.fillStyle='#303947';for(let i=0;i<5;i++){x.fillRect(i*170,0,90,460);x.fillRect(0,i*100,820,55)}x.fillStyle='#f5d76e';x.fillRect(target.x,target.y,45,35);x.fillStyle='#31c7ff';x.fillRect(car.x,car.y,36,55);let dx=0,dy=0;if(k.ArrowLeft)dx=-3;if(k.ArrowRight)dx=3;if(k.ArrowUp)dy=-3;if(k.ArrowDown)dy=3;car.x=Math.max(0,Math.min(784,car.x+dx));car.y=Math.max(0,Math.min(405,car.y+dy));fuel-=.015;const d=Math.hypot(car.x-target.x,car.y-target.y);score=Math.max(0,Math.floor(1000-d*1.3-fuel<0?0:1000-d*1.3));s.textContent=score+' pts • ⛽ '+fuel.toFixed(0)+'%';info.textContent='Leve o carro até o marcador amarelo';if(d<48){done=true;premiumFinish(g.id,p,Math.max(600,Math.floor(1000-d*2)),true)}else if(fuel<=0){done=true;info.textContent='⛽ Combustível esgotado. Tente novamente.'}else requestAnimationFrame(loop)}loop();
}
function premiumSpace(g,p){
 const[c,s,info]=premiumCanvas(g.name,'Batalha espacial • Fase '+p);const x=c.getContext('2d');let ship=380,shots=[],enemies=[],score=0,k={},done=false;for(let i=0;i<5+Math.min(8,p/10);i++)enemies.push({x:80+(i%7)*100,y:60+Math.floor(i/7)*55,hp:1+(p>40?1:0)});
 const key=e=>{k[e.key]=1;if(e.key===' ')e.preventDefault()},up=e=>k[e.key]=0;addEventListener('keydown',key);addEventListener('keyup',up);
 function loop(){if(done)return;x.fillStyle='#050816';x.fillRect(0,0,820,460);for(let i=0;i<70;i++){x.fillStyle='#fff';x.fillRect((i*97)%820,(i*53+Date.now()/20)%460,2,2)}if(k.ArrowLeft||k.a)ship-=6;if(k.ArrowRight||k.d)ship+=6;ship=Math.max(20,Math.min(780,ship));if(k[' ']&&shots.length<8)shots.push({x:ship,y:390});shots.forEach(q=>q.y-=9);shots=shots.filter(q=>q.y>0);enemies.forEach(e=>{e.y+=Math.sin(Date.now()/500+e.x)*.25;shots.forEach(q=>{if(Math.abs(q.x-e.x)<30&&Math.abs(q.y-e.y)<25){e.hp--;q.y=-99;if(e.hp<=0){score+=120;e.dead=true}}})});enemies=enemies.filter(e=>!e.dead);x.fillStyle='#22d3ee';x.beginPath();x.moveTo(ship,370);x.lineTo(ship-22,415);x.lineTo(ship+22,415);x.fill();x.fillStyle='#ff5864';enemies.forEach(e=>{x.fillRect(e.x-20,e.y-15,40,30)});x.fillStyle='#ffd166';shots.forEach(q=>x.fillRect(q.x-2,q.y,4,12));s.textContent=score+' pts • inimigos '+enemies.length;info.textContent='Destrua todos os inimigos • Espaço atira';if(!enemies.length){done=true;premiumFinish(g.id,p,Math.min(1000,score),true)}else requestAnimationFrame(loop)}loop();
}
function premiumChef(g,p){
 const[c,s,info]=premiumCanvas(g.name,'Cozinha profissional • Pedido '+p);const x=c.getContext('2d');let order=['🍅','🧀','🍞'][p%3],picked=null,score=0,done=false;const items=['🍅','🧀','🍞','🥕','🍓','🥚'];x.fillStyle='#171f30';x.fillRect(0,0,820,460);x.font='42px sans-serif';x.fillText('PEDIDO DO CLIENTE',280,70);x.font='64px sans-serif';x.fillText(order,375,145);info.textContent='Escolha o ingrediente correto';items.forEach((it,i)=>{const b=document.createElement('button');b.textContent=it;b.className='chef-choice';b.onclick=()=>{picked=it;document.querySelectorAll('.chef-choice').forEach(z=>z.classList.remove('selected'));b.classList.add('selected');if(it===order){score=900;s.textContent=score+' pts';info.textContent='👨‍🍳 Perfeito!';if(!done){done=true;premiumFinish(g.id,p,score,true)}}else{score=150;s.textContent=score+' pts';info.textContent='❌ Ingrediente errado — tente novamente';gameSound('fail')}};document.querySelector('#premiumActions').appendChild(b)});s.textContent='0 pts';
}
function premiumFlight(g,p){
 const[c,s,info]=premiumCanvas(g.name,'Treinamento de voo • Fase '+p);const x=c.getContext('2d');let alt=2500,spd=150,fuel=100,k={},done=false;const key=e=>k[e.key]=1,up=e=>k[e.key]=0;addEventListener('keydown',key);addEventListener('keyup',up);
 function loop(){if(done)return;x.fillStyle='#78b9e6';x.fillRect(0,0,820,300);x.fillStyle='#1f5d38';x.fillRect(0,300,820,160);x.fillStyle='#fff';x.fillRect(630,260,90,5);if(k.ArrowUp)alt+=12;if(k.ArrowDown)alt-=12;if(k.ArrowRight)spd+=1;if(k.ArrowLeft)spd-=1;alt=Math.max(500,Math.min(6000,alt));spd=Math.max(80,Math.min(300,spd));fuel-=.025;const targetAlt=1500+((p*317)%3000),targetSpd=130+((p*29)%100);x.fillStyle='#fff';x.font='20px system-ui';x.fillText('ALT '+Math.round(alt)+' ft',25,35);x.fillText('SPD '+Math.round(spd)+' kt',25,62);x.fillText('ALVO '+targetAlt+' ft / '+targetSpd+' kt',25,90);s.textContent='Precisão '+Math.max(0,100-Math.floor(Math.abs(alt-targetAlt)/30+Math.abs(spd-targetSpd)/2))+'%';info.textContent='Ajuste altitude e velocidade ao alvo';if(Math.abs(alt-targetAlt)<100&&Math.abs(spd-targetSpd)<8){done=true;premiumFinish(g.id,p,900,true)}else if(fuel<=0){done=true;info.textContent='⛽ Combustível esgotado.'}else requestAnimationFrame(loop)}loop();
}
const originalLaunchPremium=launch;
launch=function(id){if(PREMIUM_GAMES.has(id)){const g=games.find(x=>x.id===id)||games[0];document.querySelector('#gameCategory').textContent=g.cat.toUpperCase();document.querySelector('#gameTitle').textContent=g.name;modal.classList.remove('hidden');premiumGame(id);return}originalLaunchPremium(id)};
\n// ===== PORTAL COMPLETO: PERFIL, LOJA, MISSOES, CONQUISTAS E SALAS =====
const PORTAL_KEY='games_portal_v2';
const portal=JSON.parse(localStorage.getItem(PORTAL_KEY)||'{}');
portal.nickname=portal.nickname||'Jogador';
portal.purchases=portal.purchases||[];
portal.achievements=portal.achievements||[];
portal.daily=portal.daily||{date:'',claimed:false};
portal.missions=portal.missions||{};
function savePortal(){localStorage.setItem(PORTAL_KEY,JSON.stringify(portal))}
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
 portal.daily={date:today,claimed:true};rpg.coins+=100;rpg.xp+=50;recalcLevel();saveRPG();savePortal();
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
 el.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const x=SHOP.find(y=>y[0]===b.dataset.buy);if(!x||portal.purchases.includes(x[0]))return;if(rpg.coins<x[3]){alert('Moedas insuficientes.');return}rpg.coins-=x[3];portal.purchases.push(x[0]);saveRPG();savePortal();renderShop();renderProfile()});
}
function renderProfile(){
 const el=document.querySelector('#profileCard');if(!el)return;
 const need=xpForLevel(rpg.level), name=portal.nickname||state.user||'Jogador';
 el.innerHTML='<div class="profile-avatar">'+(portal.purchases.includes('crown')?'👑':'🎮')+'</div><div><h2>'+name+'</h2><p>Nível '+rpg.level+' • '+rpg.xp+'/'+need+' XP</p><div class="profile-stats"><span>❤️ '+rpg.lives+'</span><span>🪙 '+rpg.coins+'</span><span>⭐ '+totalStars()+'</span><span>🎯 '+totalPhases()+' fases</span></div><input id="nicknameInput" value="'+name.replace(/"/g,'&quot;')+'" maxlength="30"><button class="primary" id="saveNick">Salvar nome</button></div>';
 el.querySelector('#saveNick').onclick=()=>{portal.nickname=el.querySelector('#nicknameInput').value.trim()||'Jogador';savePortal();renderProfile()};
 renderShop();
}
function updateMissionProgress(id,stars){
 const date=new Date().toISOString().slice(0,10),m=portal.missions[date]||{phases:0,games:0,stars:0,played:{}};
 m.phases++;m.stars+=stars;m.played=m.played||{};m.played[id]=1;m.games=Object.keys(m.played).length;portal.missions[date]=m;savePortal();
}
const oldAddRPGReward=addRPGReward;
addRPGReward=function(id,phase,stars){oldAddRPGReward(id,phase,stars);updateMissionProgress(id,stars);refreshAchievements()};
document.addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b||b.classList.contains('navbtn'))return;document.querySelectorAll('.navbtn').forEach(x=>x.classList.remove('active'));const n=document.querySelector('.navbtn[data-filter="'+b.dataset.filter+'"]');if(n)n.classList.add('active');render(b.dataset.filter,'');window.scrollTo({top:document.querySelector('#grid').offsetTop-80,behavior:'smooth'})});
document.querySelector('#showProgress')?.addEventListener('click',()=>{openPanel('#progressPanel');renderProgress()});
document.querySelector('#showMissions')?.addEventListener('click',()=>{openPanel('#missionsPanel');renderMissions()});
document.querySelector('#showProfile')?.addEventListener('click',()=>{openPanel('#profilePanel');renderProfile()});\ndocument.querySelector('#showMultiplayer')?.addEventListener('click',()=>openPanel('#multiplayerPanel'));

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
 try{await api('/api/progress',{method:'POST',body:JSON.stringify({player:{lives:rpg.lives,coins:rpg.coins,xp:rpg.xp,level:rpg.level,nextLifeAt:rpg.nextLifeAt||0},phase:{gameId:id,phase,stars,score}})})}catch(e){}
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
