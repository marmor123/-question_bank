// Disposable presentation prototype. All encounter names and scenery are proposals.
const $=id=>document.getElementById(id),canvas=$('map'),ctx=canvas.getContext('2d');
const town=new Image(),dungeon=new Image();town.src='assets/tiny-town.png';dungeon.src='assets/tiny-dungeon.png';
const W=34,H=44,T=16,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const points={start:[16,35],house:[11,26],lookout:[21,26],clearing:[16,19],gate:[16,10]};
const paths=[
 [[16,35],[16,30],[11,30],[11,26]],[[16,35],[16,30],[21,30],[21,26]],
 [[11,26],[14,26],[14,21],[16,21],[16,19]],[[21,26],[24,26],[24,21],[16,21],[16,19]],
 [[16,19],[16,10]]
];
const roads=new Set();
for(const path of paths)for(let i=1;i<path.length;i++){
 const [a,b]=[path[i-1],path[i]],length=Math.abs(b[0]-a[0])+Math.abs(b[1]-a[1]);
 for(let n=0;n<=length;n++){const x=a[0]+Math.sign(b[0]-a[0])*n,y=a[1]+Math.sign(b[1]-a[1])*n;roads.add(x+','+y);}
}
let hero={x:16*T,y:35*T},camera={x:0,y:0},stage='start',travelling=false,paused=false,route=[],last=0,walk=0,choice=null,visited=[];
const rnd=(x,y)=>(Math.sin(x*127.1+y*311.7)*43758.5453)%1;
function tile(n,x,y,sheet=town){ctx.drawImage(sheet,n%12*T,Math.floor(n/12)*T,T,T,Math.round(x-camera.x),Math.round(y-camera.y),T,T);}
function rect(color,x,y,w,h){ctx.fillStyle=color;ctx.fillRect(Math.round(x-camera.x),Math.round(y-camera.y),w,h);}
function house(x,y,stone=false){
 const a=stone?52:48,b=stone?76:72;
 [a,a+1,a+1,a+2].forEach((n,i)=>tile(n,(x+i)*T,y*T));
 [a+12,a+13,a+15,a+14].forEach((n,i)=>tile(n,(x+i)*T,(y+1)*T));
 [b,b+1,b+2,b+3].forEach((n,i)=>tile(n,(x+i)*T,(y+2)*T));
 [stone?88:84,stone?89:85,stone?90:86,stone?91:87].forEach((n,i)=>tile(n,(x+i)*T,(y+3)*T));
}
function tree(x,y,orange=false){tile(orange?3:4,x*T,(y-1)*T);tile(orange?15:16,x*T,y*T);}
function road(x,y){return roads.has(x+','+y)}
function objectReserved(x,y){return(x>=7&&x<=13&&y>=22&&y<=26)||(x>=19&&x<=24&&y>=22&&y<=26)||(x>=12&&x<=20&&y>=5&&y<=10)||(x>=12&&x<=20&&y>=16&&y<=19)||(x>=13&&x<=18&&y>=33&&y<=37);}
function draw(){
 ctx.imageSmoothingEnabled=false;ctx.fillStyle='#84bf64';ctx.fillRect(0,0,240,336);
 const minX=Math.max(0,Math.floor(camera.x/T)),minY=Math.max(0,Math.floor(camera.y/T));
 for(let y=minY;y<Math.min(H,minY+23);y++)for(let x=minX;x<Math.min(W,minX+17);x++){
  const r=Math.abs(rnd(x,y));tile(r>.9?2:r>.57?1:0,x*T,y*T);
  if(road(x,y)){tile(25,x*T,y*T);if(!road(x-1,y)){rect('#c4b778',x*T,y*T,2,T)}if(!road(x+1,y)){rect('#c4b778',(x+1)*T-2,y*T,2,T)}}
 }
 // Hand-authored buildings and landmarks from the original sprite sheets.
 house(9,22);house(19,22,true);
 for(let x=7;x<=12;x++)if(x!==11)tile(x===7?44:x===10?46:x===12?44:45,x*T,27*T);
 tile(83,13*T,29*T);tile(83,19*T,29*T);tile(57,20*T,27*T);
 tile(104,15*T,17*T);tile(106,17*T,18*T);
 for(let x=13;x<=19;x++){tile(x===13?96:x===19?98:97,x*T,6*T);tile(108,x*T,7*T);}
 house(14,6,true);
 tile(103,13*T,8*T);tile(103,19*T,8*T);
 tile(94,14*T,35*T);tile(106,18*T,35*T);tile(83,15*T,33*T);
 // Keep trees clear of roads and authored buildings; a dense outer wood frames the route.
 const things=[];
 for(let y=Math.max(1,minY-2);y<Math.min(H-1,minY+25);y++)for(let x=Math.max(1,minX-1);x<Math.min(W-1,minX+18);x++){
  if(objectReserved(x,y))continue;
  if(road(x,y)||road(x,y-1)||road(x-1,y)||road(x+1,y))continue;
  const r=Math.abs(rnd(x,y));
  if((x<6||x>27||y<5||y>38)?r>.18:r>.76)things.push({y:y*T,x,tree:true,orange:r>.97});
  else if(r<.045)things.push({y:y*T,x,small:true});
 }
 things.push({y:hero.y+8,hero:true});things.sort((a,b)=>a.y-b.y);
 for(const thing of things){
  if(thing.hero){const x=Math.round(hero.x-camera.x),y=Math.round(hero.y-camera.y),bob=travelling&&!paused?Math.round(Math.sin(walk)*1):0;
   ctx.fillStyle='#263b4566';ctx.fillRect(x+3,y+13,11,4);tile(96,hero.x,hero.y-2+bob,dungeon);
  }else if(thing.tree)tree(thing.x,thing.y/T,thing.orange);else tile(28,thing.x*T,thing.y);
 }
 positionMarkers();
}
function updateCamera(){camera.x=Math.max(0,Math.min(W*T-240,hero.x+8-120));camera.y=Math.max(0,Math.min(H*T-336,hero.y+8-218));}
function positionMarkers(){
 for(const el of $('destinations').children){const p=points[el.dataset.target];el.style.left=((p[0]*T+8-camera.x)/240*100)+'%';el.style.top=((p[1]*T-3-camera.y)/336*100)+'%';}
}
function markers(items){$('destinations').replaceChildren();for(const [id,name] of items){
 const b=document.createElement('button');b.className='destination';b.dataset.target=id;b.setAttribute('aria-label','Travel to '+name);
 b.innerHTML='<span class="badge">'+name+'</span><span class="tip" aria-hidden="true">▼</span>';b.onclick=()=>travel(id);$('destinations').append(b);
}positionMarkers();}
function status(title,text,hint='Tap a marked destination to travel.'){
 $('heading').textContent=title;$('description').textContent=text;$('hint').textContent=hint;$('continue').hidden=true;
 $('state').textContent='Location: '+stage+' · Travelling: '+travelling+' · Visited: '+(visited.join(', ')||'none');
 $('where').textContent=travelling?'Travelling along the woodland path.':'Current location: '+({start:'woodland entrance',house:'keeper’s house',lookout:'old lookout',clearing:'lantern clearing',gate:'Mossgate'}[stage]||stage);
}
function travel(id){
 if(travelling)return;choice=id;
 const path=stage==='start'?(id==='house'?paths[0]:paths[1]):stage==='house'?paths[2]:stage==='lookout'?paths[3]:paths[4];
 route=path.slice(1).map(p=>({x:p[0]*T,y:p[1]*T}));travelling=true;markers([]);
 status('On the woodland path','Your hero is travelling to the next landmark.','The camera follows. No direct movement controls.');
 if(reduced){hero={...route[route.length-1]};arrive();return}
 last=0;requestAnimationFrame(frame);
}
function frame(now){
 if(!travelling||paused)return;
 const dt=last?Math.min((now-last)/1000,.05):0;last=now;walk+=dt*16;
 const target=route[0],dx=target.x-hero.x,dy=target.y-hero.y,dist=Math.hypot(dx,dy),step=dt*53;
 if(dist<=step){hero={...target};route.shift();if(!route.length){arrive();return}}
 else{hero.x+=dx/dist*step;hero.y+=dy/dist*step}
 updateCamera();draw();requestAnimationFrame(frame);
}
function arrive(){
 travelling=false;stage=choice;visited.push(stage);updateCamera();
 if(stage==='gate'){status('Mossgate lies ahead','The two paths have rejoined. The guardian encounter would begin here.','End of the map example · No battle or rewards in this study.');$('continue').textContent='Try the other branch';$('continue').hidden=false;$('continue').onclick=reset;}
 else{const title=stage==='house'?'The keeper’s house':stage==='lookout'?'The old lookout':'The lantern clearing';
 status(title,stage==='clearing'?'The paths meet beneath the old trees. Mossgate is just ahead.':'A short encounter would open here, then return you to the world.','Encounter placeholder · We are testing the journey presentation.');
 $('continue').textContent='Continue the journey';$('continue').hidden=false;$('continue').onclick=()=>{status('Follow the path',stage==='clearing'?'The gate is beyond the clearing.':'Both branches lead onward to the lantern clearing.');markers(stage==='clearing'?[['gate','Mossgate']]:[['clearing','Lantern clearing']]);draw();};}
 draw();
}
function reset(){hero={x:16*T,y:35*T};stage='start';travelling=false;paused=false;visited=[];route=[];choice=null;$('modal').hidden=true;updateCamera();status('A fork in the woodland','Visit the keeper’s house or explore the old lookout.');markers([['house','Keeper’s house'],['lookout','Old lookout']]);draw();}
$('menu').onclick=()=>{paused=true;$('modal').hidden=false};
function closeMenu(){ $('modal').hidden=true;paused=false;if(travelling){last=0;requestAnimationFrame(frame)}}
$('close').onclick=closeMenu;$('reset').onclick=reset;
document.addEventListener('visibilitychange',()=>{if(document.hidden&&travelling){paused=true;$('modal').hidden=false;$('where').textContent='Travel paused while you were away.'}});
Promise.all([town.decode(),dungeon.decode()]).then(reset).catch(()=>{status('Art could not load','Open this example using the documented local server.','');});
