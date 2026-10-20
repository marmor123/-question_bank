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
const walkable=new Set(roads),blocked=new Set();
function area(set,x1,y1,x2,y2){for(let y=y1;y<=y2;y++)for(let x=x1;x<=x2;x++)set.add(x+','+y);}
area(walkable,14,34,18,37);area(walkable,10,26,14,28);area(walkable,20,26,24,28);
area(walkable,14,17,18,20);area(walkable,14,10,18,11);
area(blocked,9,22,12,25);area(blocked,19,22,22,25);area(blocked,13,6,19,9);
for(let x=7;x<=12;x++)if(x!==11)blocked.add(x+',27');
for(const [x,y] of [[13,29],[19,29],[20,27],[15,17],[17,18],[14,35],[18,35],[15,33]])blocked.add(x+','+y);
for(const key of blocked)walkable.delete(key);
const canWalk=(x,y)=>walkable.has(x+','+y);
let hero={x:16*T,y:35*T},camera={x:0,y:0},stage='start',travelling=false,paused=false,route=[],last=0,walk=0,choice=null,visited=[],follow=true,animationFrame=0,destination=null,gesture=null;
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
  if(canWalk(x,y)){tile(25,x*T,y*T);if(!canWalk(x-1,y)){rect('#c4b778',x*T,y*T,2,T)}if(!canWalk(x+1,y)){rect('#c4b778',(x+1)*T-2,y*T,2,T)}}
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
  if(canWalk(x,y)||canWalk(x,y-1)||canWalk(x-1,y)||canWalk(x+1,y))continue;
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
 if(travelling&&destination){ctx.strokeStyle='#fff2b0';ctx.lineWidth=1;ctx.strokeRect(Math.round(destination.x-camera.x)+2,Math.round(destination.y-camera.y)+2,12,12);}
 positionMarkers();
}
function clampCamera(){camera.x=Math.max(0,Math.min(W*T-240,camera.x));camera.y=Math.max(0,Math.min(H*T-336,camera.y));}
function updateCamera(){if(!follow)return;camera.x=hero.x+8-120;camera.y=hero.y+8-218;clampCamera();}
function positionMarkers(){
 for(const el of $('destinations').children){const p=points[el.dataset.target],x=p[0]*T+8-camera.x,y=p[1]*T-3-camera.y;el.style.left=(x/240*100)+'%';el.style.top=(y/336*100)+'%';el.hidden=x<24||x>216||y<85||y>245;}
}
function markers(items){$('destinations').replaceChildren();for(const [id,name] of items){
 const b=document.createElement('button');b.className='destination';b.dataset.target=id;b.setAttribute('aria-label','Travel to '+name);
 b.innerHTML='<span class="badge">'+name+'</span><span class="tip" aria-hidden="true">▼</span>';b.onclick=()=>travel(id);$('destinations').append(b);
}positionMarkers();}
function status(title,text,hint='Tap paths or clearings to walk. Drag to look ahead.'){
 $('heading').textContent=title;$('description').textContent=text;$('hint').textContent=hint;$('continue').hidden=true;
 $('state').textContent='Location: '+stage+' · Travelling: '+travelling+' · Visited: '+(visited.join(', ')||'none');
 $('where').textContent=travelling?'Travelling along the woodland path.':'Current location: '+({start:'woodland entrance',house:'keeper’s house',lookout:'old lookout',clearing:'lantern clearing',gate:'Mossgate'}[stage]||stage);
}
function allMarkers(){markers([['house','Keeper’s house'],['lookout','Old lookout'],['clearing','Lantern clearing'],['gate','Mossgate']]);}
function findPath(start,end){
 const key=p=>p[0]+','+p[1],queue=[start],previous=new Map([[key(start),null]]);
 for(let i=0;i<queue.length;i++){
  const p=queue[i];if(key(p)===key(end)){const result=[];let current=p;while(current){result.unshift({x:current[0]*T,y:current[1]*T});current=previous.get(key(current));}return result;}
  for(const [dx,dy] of [[0,-1],[1,0],[0,1],[-1,0]]){const next=[p[0]+dx,p[1]+dy];if(canWalk(...next)&&!previous.has(key(next))){previous.set(key(next),p);queue.push(next);}}
 }return null;
}
function travel(id){moveTo(...points[id],id);}
function moveTo(x,y,id=null){
 if(paused)return;
 if(!canWalk(x,y)){$('hint').textContent='That ground is blocked. Choose a sandy path or clearing.';return;}
 // Finish the current tile-edge segment before rerouting, avoiding diagonal corner cuts.
 const anchor=travelling&&route.length?route[0]:{x:Math.round(hero.x/T)*T,y:Math.round(hero.y/T)*T};
 const found=findPath([anchor.x/T,anchor.y/T],[x,y]);if(!found){$('hint').textContent='There is no open path to that spot.';return;}
 cancelAnimationFrame(animationFrame);
 choice=id||Object.keys(points).find(name=>points[name][0]===x&&points[name][1]===y)||null;
 route=found;if(hero.x===anchor.x&&hero.y===anchor.y)route.shift();
 destination={x:x*T,y:y*T};follow=true;$('recenter').hidden=true;
 travelling=route.length>0;
 status('Walking through Mossgate','Your hero follows open ground to the spot you tapped.','Tap again to change destination. Drag to look ahead.');
 if(!travelling){arrive();return;}
 if(reduced){hero={...destination};arrive();return;}
 last=0;animationFrame=requestAnimationFrame(frame);
}
function frame(now){
 if(!travelling||paused)return;
 const dt=last?Math.min((now-last)/1000,.05):0;last=now;walk+=dt*16;
 const target=route[0],dx=target.x-hero.x,dy=target.y-hero.y,dist=Math.hypot(dx,dy),step=dt*53;
 if(dist<=step){hero={...target};route.shift();if(!route.length){arrive();return}}
 else{hero.x+=dx/dist*step;hero.y+=dy/dist*step}
 updateCamera();draw();animationFrame=requestAnimationFrame(frame);
}
function arrive(){
 travelling=false;route=[];destination=null;updateCamera();
 if(!choice||choice==='start'){status('Explore the woodland','Choose another spot on a path or in a clearing.');allMarkers();draw();return;}
 stage=choice;if(!visited.includes(stage))visited.push(stage);
 if(stage==='gate'){status('Mossgate lies ahead','The two paths have rejoined. The guardian encounter would begin here.','End of the map example · No battle or rewards in this study.');$('continue').textContent='Try the other branch';$('continue').hidden=false;$('continue').onclick=reset;}
 else{const title=stage==='house'?'The keeper’s house':stage==='lookout'?'The old lookout':'The lantern clearing';
 status(title,stage==='clearing'?'The paths meet beneath the old trees. Mossgate is just ahead.':'A short encounter would open here, then return you to the world.','Encounter placeholder · We are testing the journey presentation.');
 $('continue').textContent='Continue the journey';$('continue').hidden=false;$('continue').onclick=()=>{status('Follow the path',stage==='clearing'?'The gate is beyond the clearing.':'Both branches lead onward to the lantern clearing.');markers(stage==='clearing'?[['gate','Mossgate']]:[['clearing','Lantern clearing']]);draw();};}
 draw();
}
function reset(){cancelAnimationFrame(animationFrame);hero={x:16*T,y:35*T};stage='start';travelling=false;paused=false;visited=[];route=[];choice=null;destination=null;follow=true;gesture=null;$('recenter').hidden=true;$('modal').hidden=true;updateCamera();status('Walk into the woodland','Tap the sandy ground to move, or drag the map to see further.');allMarkers();draw();}
$('menu').onclick=()=>{paused=true;$('modal').hidden=false};
function closeMenu(){ $('modal').hidden=true;paused=false;if(travelling){cancelAnimationFrame(animationFrame);last=0;animationFrame=requestAnimationFrame(frame)}}
$('close').onclick=closeMenu;$('reset').onclick=reset;
document.addEventListener('visibilitychange',()=>{if(document.hidden&&travelling){paused=true;$('modal').hidden=false;$('where').textContent='Travel paused while you were away.'}});
$('recenter').onclick=()=>{follow=true;$('recenter').hidden=true;updateCamera();draw();};
canvas.addEventListener('pointerdown',e=>{
 if(!e.isPrimary||e.button!==0||paused)return;
 gesture={id:e.pointerId,x:e.clientX,y:e.clientY,camera:{...camera},drag:false,wasFollowing:follow};
 canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove',e=>{
 if(!gesture||gesture.id!==e.pointerId)return;
 const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
 if(!gesture.drag&&Math.hypot(dx,dy)<8)return;
 if(!gesture.drag){gesture.drag=true;gesture.camera={...camera};$('hint').textContent='Looking ahead. Tap reachable ground to walk there, or return to your hero.';}
 const bounds=canvas.getBoundingClientRect();follow=false;
 camera.x=gesture.camera.x-dx*240/bounds.width;camera.y=gesture.camera.y-dy*336/bounds.height;
 clampCamera();$('recenter').hidden=false;draw();
});
canvas.addEventListener('pointerup',e=>{
 if(!gesture||gesture.id!==e.pointerId)return;const dragged=gesture.drag;gesture=null;
 if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
 if(dragged)return;
 const bounds=canvas.getBoundingClientRect(),x=Math.floor(((e.clientX-bounds.left)*240/bounds.width+camera.x)/T),y=Math.floor(((e.clientY-bounds.top)*336/bounds.height+camera.y)/T);
 moveTo(x,y);
});
canvas.addEventListener('pointercancel',()=>{gesture=null;});
Promise.all([town.decode(),dungeon.decode()]).then(reset).catch(()=>{status('Art could not load','Open this example using the documented local server.','');});
