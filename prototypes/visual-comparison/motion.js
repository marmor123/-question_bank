import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
const $=id=>document.getElementById(id);
let mode=new URLSearchParams(location.search).get('variant')==='C'?'C':'A',time=0,action=null,paused=false,ready=false;
const sheet=new Image();sheet.src='./assets/tiny-dungeon.png';
const ctx=$('pixel').getContext('2d');ctx.imageSmoothingEnabled=false;
const renderer=new THREE.WebGLRenderer({canvas:$('three'),antialias:true,alpha:false});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(380,350,false);renderer.shadowMap.enabled=true;
const scene=new THREE.Scene();scene.background=new THREE.Color('#243746');
const camera=new THREE.PerspectiveCamera(36,380/350,.1,100);camera.position.set(5.3,4.2,7.4);camera.lookAt(0,1,0);
scene.add(new THREE.HemisphereLight(0xcfeaff,0x54635a,2.7));
const sun=new THREE.DirectionalLight(0xffefd2,3.5);sun.position.set(2,7,4);sun.castShadow=true;scene.add(sun);
const platform=new THREE.Mesh(new THREE.CylinderGeometry(3.2,3.4,.3,8),new THREE.MeshStandardMaterial({color:0x71858b,roughness:1}));platform.position.y=-.18;platform.receiveShadow=true;scene.add(platform);
for(let x=-2;x<=2;x++)for(let z=-2;z<=2;z++){const tile=new THREE.Mesh(new THREE.BoxGeometry(.92,.06,.92),new THREE.MeshStandardMaterial({color:(x+z)%2?0x758990:0x81959a}));tile.position.set(x,0,z);tile.receiveShadow=true;scene.add(tile)}
const orb=new THREE.Mesh(new THREE.SphereGeometry(.16,12,12),new THREE.MeshBasicMaterial({color:0x8cfff0}));orb.visible=false;scene.add(orb);
const actors=[];
const loader=new GLTFLoader();
function play(i,name){const a=actors[i];a.mixer.stopAllAction();const clip=THREE.AnimationClip.findByName(a.clips,name);if(!clip)throw Error('Missing clip '+name);const anim=a.mixer.clipAction(clip);anim.setLoop(name==='Idle'?THREE.LoopRepeat:THREE.LoopOnce,name==='Idle'?Infinity:1);anim.clampWhenFinished=true;anim.play();}
try{
for(const [file,x,angle] of [['Knight.glb',-1.15,Math.PI/2],['Skeleton_Warrior.glb',1.15,-Math.PI/2]]){
const gltf=await loader.loadAsync('./assets/'+file);const root=gltf.scene;root.position.x=x;root.rotation.y=angle;root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});scene.add(root);actors.push({root,mixer:new THREE.AnimationMixer(root),clips:gltf.animations});
}
ready=true;play(0,'Idle');play(1,'Idle');
}catch(e){$('status').textContent='3D assets could not load: '+e.message;}
function choose(m){mode=m;$('a').setAttribute('aria-pressed',m==='A');$('c').setAttribute('aria-pressed',m==='C');$('pixel').hidden=m!=='A';$('three').hidden=m!=='C';$('heading').textContent=m==='A'?'A · Static sprites, authored motion':'C · Borrowed skeletal animation';$('detail').textContent=m==='A'?'Actual 16-pixel Kenney sprites. Lunges, recoil, and spell effects are authored for this mockup; no character animation frames are borrowed.':'Actual KayKit knight and skeleton with their embedded attack, spell, and hit clips. Camera, platform, spell orb, and approach motion are authored for this mockup.';const u=new URL(location);u.searchParams.set('variant',m);history.replaceState(null,'',u);reset();drawPixel();renderer.render(scene,camera);}
function reset(){action=null;time=0;paused=false;$('question').hidden=true;orb.visible=false;if(ready){actors[0].root.position.x=-1.15;actors[1].root.position.x=1.15;play(0,'Idle');play(1,'Idle');actors.forEach(a=>a.mixer.update(.01))}$('status').textContent='Ready · press Attack to see the exchange.';}
function begin(kind){if(!ready&&mode==='C')return;reset();action={kind,hit:false,counter:false,returned:false};$('status').textContent=(mode==='A'?'A':'C')+' · '+(kind==='spell'?'Spell → hit → guardian responds':'Approach → attack → guardian responds');if(ready)play(0,kind==='spell'?'Spellcast_Shoot':'1H_Melee_Attack_Slice_Horizontal');}
$('a').onclick=()=>choose('A');$('c').onclick=()=>choose('C');$('attack').onclick=()=>begin('attack');$('spell').onclick=()=>begin('spell');$('pause').onclick=()=>{paused=true;$('question').hidden=false;$('status').textContent='Paused · waiting for you to continue.';};$('return').onclick=()=>begin('spell');
function tile(n,x,y,size=64){if(sheet.complete&&sheet.naturalWidth)ctx.drawImage(sheet,(n%12)*16,Math.floor(n/12)*16,16,16,x,y,size,size)}
function drawPixel(){
ctx.fillStyle='#202b33';ctx.fillRect(0,0,384,350);
for(let y=0;y<5;y++)for(let x=0;x<6;x++)tile(y===0?40:48,x*64,y*64+24);
ctx.fillStyle='#0005';ctx.beginPath();ctx.ellipse(110,249,36,12,0,0,7);ctx.ellipse(280,249,36,12,0,0,7);ctx.fill();
const t=time,step=action&&action.kind==='attack'?Math.sin(Math.min(t/.9,1)*Math.PI)*64:0;
const enemyStep=action&&t>1.55&&t<2.45?Math.sin((t-1.55)/.9*Math.PI)*55:0;
tile(96,78+step+(action&&t>2&&t<2.2?Math.sin(t*90)*7:0),176,64);
tile(121,246-enemyStep+(action&&t>.7&&t<.95?Math.sin(t*90)*7:0),176,64);
if(action&&action.kind==='spell'&&t>.28&&t<.8){ctx.fillStyle='#a0fff0';ctx.fillRect(124+(t-.28)/.52*140,196,16,16);ctx.fillStyle='#e7fff9';ctx.fillRect(128+(t-.28)/.52*140,200,8,8)}
if(action&&t>.72&&t<1){ctx.strokeStyle='#ffe6a1';ctx.lineWidth=4;for(let i=0;i<6;i++){let a=i*Math.PI/3;ctx.beginPath();ctx.moveTo(278+Math.cos(a)*24,208+Math.sin(a)*24);ctx.lineTo(278+Math.cos(a)*40,208+Math.sin(a)*40);ctx.stroke()}}
}
let last=performance.now();
function frame(now){requestAnimationFrame(frame);let dt=Math.min((now-last)/1000,.05)*($('slow').checked?.5:1);last=now;
if(action&&!paused){
time+=dt;if(ready){
actors.forEach(a=>a.mixer.update(dt));
actors[0].root.position.x=-1.15+(action.kind==='attack'?Math.sin(Math.min(time/.95,1)*Math.PI)*.65:0);
actors[1].root.position.x=1.15-(time>1.55&&time<2.45?Math.sin((time-1.55)/.9*Math.PI)*.6:0);
if(time>.72&&!action.hit){action.hit=true;play(1,'Hit_A')}
if(time>1.55&&!action.counter){action.counter=true;play(1,'1H_Melee_Attack_Chop');play(0,'Idle')}
if(time>2.02&&!action.returned){action.returned=true;play(0,'Hit_A')}
orb.visible=action.kind==='spell'&&time>.28&&time<.75;orb.position.set(-.8+(time-.28)/.47*1.8,1.3,.15);
}if(time>3.1){reset();$('status').textContent='Exchange complete · replay or compare the other style.'}
}
if(mode==='A')drawPixel();else renderer.render(scene,camera);
}
choose(mode);requestAnimationFrame(frame);
