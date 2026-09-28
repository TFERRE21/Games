/* Games Online — fixes and specialized simulators */
(function(){
'use strict';
const area=document.querySelector('#gameArea'),modal=document.querySelector('#modal');
const previous=window.launch;
let clean=()=>{},raf=0,keys={},timers=[];
function stop(){try{clean()}catch(e){};clean=()=>{};cancelAnimationFrame(raf);timers.forEach(clearInterval);timers=[];keys={}}
function snd(f=500){try{const a=new (window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator(),g=a.createGain();o.frequency.value=f;g.gain.value=.03;o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+.06)}catch(e){}}
function base(icon,title,sub){stop();area.innerHTML='<div class="game-wrap gox"><div class="gox-top"><div><div class="gox-icon">'+icon+'</div><h3>'+title+'</h3><p>'+sub+'</p></div><div id="fixHud" class="score"></div></div><div id="fixBody"></div></div>';return document.querySelector('#fixBody')}
function canvas(){const b=document.querySelector('#fixBody');b.innerHTML='<canvas id="fixCanvas" width="760" height="420"></canvas><div id="fixInfo" class="score"></div>';return[document.querySelector('#fixCanvas'),document.querySelector('#fixInfo')]}
function key(){const d=e=>keys[e.key]=1,u=e=>keys[e.key]=0;addEventListener('keydown',d);addEventListener('keyup',u);return()=>{removeEventListener('keydown',d);removeEventListener('keyup',u)}}
function reward(id,l){try{if(typeof addRPGReward==='function')addRPGReward(id,l,3)}catch(e){}}
function win(id,l,score,next){stop();area.innerHTML='<div class="gox-end"><div style="font-size:72px">🏆</div><h2>Fase '+l+' concluída!</h2><p>Pontuação: <b>'+score+'</b></p><button class="primary" id="fixNext">➡️ PRÓXIMA FASE</button></div>';document.querySelector('#fixNext').onclick=next;snd(880)}
function lose(title,score,restart){stop();area.innerHTML='<div class="gox-end"><div style="font-size:72px">💥</div><h2>'+title+'</h2><p>Pontuação: <b>'+score+'</b></p><button class="primary" id="fixRestart">🔄 REINICIAR FASE</button></div>';document.querySelector('#fixRestart').onclick=restart}
function plumber(level=1){
 const b=base('🦊','Super Plumber','Aventura de plataforma original • Fase '+level);b.innerHTML='<canvas id="fixCanvas" width="760" height="400"></canvas><div id="fixInfo" class="score"></div><div class="gox-controls">← → mover • ↑ / Espaço pular • toque no jogo para pular</div>';const c=document.querySelector('#fixCanvas'),x=c.getContext('2d'),info=document.querySelector('#fixInfo');let p={x:40,y:320,vy:0,on:1},ks={},un;const platforms=[];for(let i=0;i<9;i++)platforms.push({x:80+i*90,y:290-(i%4)*28,w:70});const enemyCount=Math.min(2+Math.floor(level/2),6),enemies=[];for(let i=0;i<enemyCount;i++)enemies.push({x:240+i*105,y:300-(i%3)*30,v:1+level*.12});let coin=0,raf2=0,dead=false;const jump=()=>{if(p.on){p.vy=-10;p.on=0;snd(540)}};c.addEventListener('pointerdown',jump);un=key();
 function die(){if(dead)return;dead=true;lose('A raposinha perdeu!',coin,()=>plumber(level))}
 function loop(){x.fillStyle=['#5b8c5a','#c89b55','#83c9ef','#3e315f','#a94a3d','#79c4d9','#5d4b83','#2b8b6e','#e9a64b','#293b78'][level-1];x.fillRect(0,0,760,400);x.fillStyle='#2c7a3f';x.fillRect(0,350,760,50);if(ks.ArrowLeft)p.x-=4;if(ks.ArrowRight)p.x+=4;if(ks[' ']||ks.ArrowUp){jump();ks[' ']=ks.ArrowUp=0}p.vy+=.5;p.y+=p.vy;p.x=Math.max(0,Math.min(725,p.x));p.on=0;if(p.y>=316){p.y=316;p.vy=0;p.on=1}
  platforms.forEach(q=>{q.x-=.7+level*.08;if(q.x+q.w<0)q.x=760+Math.random()*100;x.fillStyle='#7c5cff';x.fillRect(q.x,q.y,q.w,14);if(p.vy>=0&&p.x+25>q.x&&p.x<q.x+q.w&&p.y+34>=q.y&&p.y+34<q.y+18){p.y=q.y-34;p.vy=0;p.on=1}});
  enemies.forEach(e=>{e.x-=e.v;if(e.x<-40)e.x=800+Math.random()*100;x.font='30px sans-serif';x.fillText('👾',e.x,e.y);if(p.x<e.x+28&&p.x+28>e.x&&p.y+30>e.y-25&&p.y<e.y)die()});
  if(Math.random()<.018+level*.002)coin++;x.font='31px sans-serif';x.fillText('🦊',p.x,p.y+30);x.fillText('🚪',700,315);info.textContent='FASE '+level+' • 🪙 '+coin+' • inimigos '+enemyCount;if(p.x>675){reward('superplumber',level);win('superplumber',level,coin,()=>plumber(level>=10?1:level+1));return}if(p.y>430)die();raf2=requestAnimationFrame(loop)}
 clean=()=>{cancelAnimationFrame(raf2);un();c.removeEventListener('pointerdown',jump)};loop()
}
function color(level,kind,id){
 const icons=kind==='cars'?['🏎️','🚗','🚙','🚕','🛻','🏍️','🚓','🚑','🚒','🚜','🚐','🚎']:kind==='animals'?['🦄','🐱','🦋','🐶','🐼','🐰','🦁','🐯','🐸','🐵','🐨','🐷']:['🌈','⭐','🎈','🌸','🍭','🎮','🍎','🍉','🌻','🎁','🪁','🎸'];
 const target=Math.min(12,5+level);const b=base(kind==='cars'?'🏎️':kind==='animals'?'🦄':'🎨','Colorir '+(kind==='cars'?'Carros':kind==='animals'?'Animais':'Fun'),'Pinte '+target+' desenhos na fase '+level+'.');b.innerHTML='<div id="pal" style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap"></div><div id="paint" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;max-width:650px;margin:16px auto"></div><div id="paintI" class="score">0/'+target+'</div>';let chosen='#ff4d6d',done=0;const pal=document.querySelector('#pal'),grid=document.querySelector('#paint'),info=document.querySelector('#paintI');['#ff4d6d','#ffd43b','#18d6a0','#4dabf7','#b36cff'].forEach((c,i)=>{let q=document.createElement('button');q.className='primary';q.textContent=['🔴','🟡','🟢','🔵','🟣'][i];q.onclick=()=>chosen=c;pal.appendChild(q)});icons.forEach(v=>{let q=document.createElement('button');q.textContent=v;q.style.cssText='height:90px;font-size:48px;background:#fff;border:3px solid #ddd;border-radius:14px';q.onclick=()=>{if(q.dataset.done)return;q.dataset.done=1;q.style.background=chosen;q.style.borderColor=chosen;done++;info.textContent=done+'/'+target;snd(560);if(done>=target)win(id,level,done,()=>color(level>=10?1:level,kind,id))};grid.appendChild(q)});clean=()=>{}
}
function vehicle(id,level){
 const cfg={car:['🚗','City Car','Faça o percurso desviando dos obstáculos.'],bus:['🚌','Bus Route','Pare nas paradas para embarcar passageiros.'],truck:['🚚','Truck Cargo','Entregue a carga sem perder o equilíbrio.'],train:['🚆','Train Control','Respeite os sinais e chegue à estação.']}[id];
 const [icon,title,sub]=cfg,b=base(icon,title,sub+' • Fase '+level);const[c,info]=canvas(),x=c.getContext('2d');let progress=0,speed=level===1?55:65,energy=100,score=0,raf2=0,ks={},un=key(),ob=[],stops=[250,520,780],stopIndex=0,brake=0,signal=0;
 for(let i=0;i<4+level;i++)ob.push({x:760+i*180,y:100+Math.random()*210,v:1+level*.1});
 function loop(){x.fillStyle=id==='train'?'#243447':'#1b242d';x.fillRect(0,0,760,420);x.fillStyle='#555';x.fillRect(0,315,760,70);
  if(ks.ArrowUp)speed=Math.min(120,speed+1);if(ks.ArrowDown)speed=Math.max(0,speed-1.5);if(ks.ArrowLeft)brake=Math.max(-1,brake-.04);if(ks.ArrowRight)brake=Math.min(1,brake+.04);speed=Math.max(0,speed-brake*.5);
  progress+=speed*.025;energy=Math.max(0,energy-speed*.0008);
  ob.forEach(o=>{o.x-=speed*.03;if(o.x<-50)o.x=800+Math.random()*250;x.font='34px sans-serif';x.fillText(id==='train'?'🛤️':id==='truck'?'🪨':'🚧',o.x,o.y)});
  x.font='48px sans-serif';x.fillText(icon,110,315);
  if(id==='bus'){stops.forEach((s,i)=>{let sx=760-(s-progress)*.7;x.font='28px sans-serif';x.fillText('🚏',sx,300)});let target=760-(stops[stopIndex]-progress)*.7;if(Math.abs(target-110)<25&&speed<18){score+=100;stopIndex++;snd(700)}}
  if(id==='train'){signal=Math.floor(progress/180)%3;x.font='32px sans-serif';x.fillText(signal===1?'🔴':'🟢',650,100);if(signal===1&&speed>35){lose('🚦 Você passou o sinal vermelho!',score,()=>vehicle(id,level));return}}
  if(id==='truck'&&Math.abs(brake)>.75){energy-=.04}
  score=Math.max(score,Math.floor(progress));info.textContent='Progresso '+Math.floor(progress)+' • Velocidade '+Math.floor(speed)+' • Energia '+Math.floor(energy)+' • Pontos '+score;
  if(energy<=0){lose('⛽ Veículo sem energia!',score,()=>vehicle(id,level));return}
  if(ob.some(o=>o.x>80&&o.x<170&&o.y>260&&o.y<340)){lose('💥 Acidente!',score,()=>vehicle(id,level));return}
  const target=650+level*180;if(id==='bus'&&stopIndex<Math.min(stops.length,level+1)){raf2=requestAnimationFrame(loop);return}
  if(progress>=target){reward(id,level);win(id,level,score,()=>vehicle(id,level>=10?1:level+1));return}
  raf2=requestAnimationFrame(loop)}
 clean=()=>{cancelAnimationFrame(raf2);un()};loop()
}
const names={superplumber:'ARCADE',car:'SIMULADOR',bus:'SIMULADOR',truck:'SIMULADOR',train:'SIMULADOR',colorfun:'COLORIR',coloranimals:'COLORIR',colorcars:'COLORIR'};
window.launch=function(id){
 const cat=names[id]||'JOGO';document.querySelector('#gameCategory').textContent=cat;
 const titles={superplumber:'Super Plumber',car:'Simulador de Carro',bus:'Simulador de Ônibus',truck:'Simulador de Caminhão',train:'Simulador de Trem',colorfun:'Color Fun',coloranimals:'Colorir Animais',colorcars:'Colorir Carros'};
 document.querySelector('#gameTitle').textContent=titles[id]||document.querySelector('#gameTitle').textContent;
 modal.classList.remove('hidden');
 if(id==='superplumber')return plumber(1);
 if(id==='colorfun')return color(1,'fun',id);
 if(id==='coloranimals')return color(1,'animals',id);
 if(id==='colorcars')return color(1,'cars',id);
 if(['car','bus','truck','train'].includes(id))return vehicle(id,1);
 if(previous)return previous(id);
};
})();
