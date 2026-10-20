// Throwaway: compare hybrid automatic exchanges with player-paced manual exchanges.
// One hero is a user-selected playtest fixture, not a final player-format decision.
const $=id=>document.getElementById(id),screen=$('screen');
const questions=[
 {id:'signal',title:'The signal at the watchtower',stem:'Your expedition reaches an abandoned watchtower at dusk. A brass instruction plate describes three signals used by the fictional lantern keepers. One steady light means the path is open. Two short flashes mean the bridge is damaged. Three long flashes ask travellers to wait for a guide. The keeper repeats a pattern so that approaching groups can distinguish it from ordinary light through the windows. Your scout watches two complete repetitions. Each time, there are two brief flashes followed by darkness. The group has enough supplies to wait and a second path remains available. According to the plate, what does the observed signal mean?',choices:['The path is open.','The bridge is damaged.','Wait for a guide.','The tower is empty.','Supplies are exhausted.'],answer:1,takeaway:'Match the observed two short flashes to the bridge warning.',explanation:'The plate explicitly pairs two short flashes with a damaged bridge. A steady light and three long flashes mean different things. The supplies and alternative path do not change the signal. This is fictional reading-comprehension content, not clinical advice.'},
 {id:'supplies',title:'A second supply ledger',stem:'A second lantern keeper uses a different ledger. Each sealed blue crate contains four lanterns. A red crate contains six spare lenses and no lanterns. Your scout brings two sealed blue crates and one red crate to the camp. No crates have been opened or exchanged. How many lanterns arrive at the camp?',choices:['Four','Six','Eight','Ten','Fourteen'],answer:2,takeaway:'Two blue crates contain eight lanterns; the red crate holds lenses.',explanation:'Each blue crate contains four lanterns, so two contain eight. Lenses are separate objects and should not be added to the lantern count.'},
 {id:'ward',title:'The guardian’s ward',stem:'The fictional ruin has a ward controlled by three seals. The inscription states: the sun seal opens the gate only in daylight; the moon seal opens it only at night; the river seal never opens the gate and instead lights the corridor. Your hero arrives after sunset. The corridor is already lit. Which seal opens the gate now?',choices:['Sun seal','Moon seal','River seal','All three together','None of the seals'],answer:1,takeaway:'After sunset, the moon seal satisfies the stated rule.',explanation:'The scene explicitly takes place at night. Only the moon seal opens the gate at night. Lighting the corridor and opening the gate are different effects.'},
 {id:'boss',title:'The final inscription',stem:'At the final chamber, the guardian presents a fictional rule: a silver key opens the north chest; a copper key opens the south chest; a glass key opens neither chest and is used only for the window. Your objective is to open the south chest. Which key meets that objective?',choices:['Silver','Copper','Glass','Any key','No key'],answer:1,takeaway:'The copper key opens the south chest.',explanation:'The inscription provides a direct mapping. The copper key is the only listed key for the south chest. No additional game knowledge is needed.'}
];
let mode=new URLSearchParams(location.search).get('variant')==='manual'?'manual':'hybrid';
let s,animation=null,timer=null,lastView=null;
const sheet=new Image();sheet.src='assets/tiny-dungeon.png';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function fresh(){clearTimeout(timer);animation=null;s={view:'route',route:0,finished:false,coins:0,xp:0,correct:[],missed:[],log:'Ready',battle:null,question:null};render();}
function button(label,action,cls=''){const b=document.createElement('button');b.textContent=label;b.className=cls;b.onclick=action;return b;}
function appendButton(parent,label,action,cls=''){parent.append(button(label,action,cls));}
function state(){ $('rewards').textContent=`${s.xp} growth · ${s.coins} coins`;$('debug').textContent=JSON.stringify({pacing:mode,...s},null,2);$('mode').textContent=mode==='hybrid'?'A · Hybrid pacing':'B · Manual pacing';}
function render(){clearTimeout(timer);state();screen.innerHTML='';
 if(s.view==='route')route();
 if(s.view==='battle')battle();
 if(s.view==='question')question();
 if(s.view==='result')result();
 if(s.view==='redemption')redemption();
 if(lastView!==s.view){screen.scrollIntoView({block:'start'});lastView=s.view;}
}
function panel(html){screen.innerHTML=`<section class="panel">${html}</section>`;return screen.firstElementChild;}
function route(){
 const p=panel(`<span class="eyebrow">Ruins · route map</span><h2>${s.finished?'Expedition complete':'Follow the lanterns'}</h2><p class="small">A short flow sample. Most study practice belongs on the route; battle questions are occasional.</p><div class="route"></div>`);
 const r=p.querySelector('.route');
 if(s.route===0){r.innerHTML='<div class="node"><strong>Fork · choose a stop</strong><p class="small">Both paths reconnect at the courtyard. Skipped questions remain available in future adventures.</p><div class="fork"></div></div>';const f=r.querySelector('.fork');appendButton(f,'Study at the tower',()=>ask(0,'route'));appendButton(f,'Find a cache · +3 coins',()=>{s.coins+=3;s.route=1;render();});}
 if(s.route===1){r.innerHTML='<div class="node done">✓ The paths reconnect</div>';appendButton(r,'Enter courtyard battle',()=>startBattle('ordinary'),'primary wide');}
 if(s.route===2){r.innerHTML='<div class="node done">✓ Courtyard cleared</div>';appendButton(r,'Enter guardian chamber',()=>startBattle('boss'),'primary wide');}
 if(s.finished){r.innerHTML='<div class="node done">✓ Tower → courtyard → guardian</div><p>Question rewards survive the end of the adventure. Missed questions are now eligible in Redemption.</p>';}
 const nav=document.createElement('div');nav.className='buttons';p.append(nav);appendButton(nav,'Open separate Redemption section',()=>{s.view='redemption';render();});
}
function startBattle(kind){animation=null;s.battle={kind,hp:60,enemy:kind==='boss'?80:48,max:kind==='boss'?80:48,round:0,phase:'ready',questionDone:false,guard:false,returned:null};s.view='battle';s.log=kind==='redemption'?'A short challenge using an eligible missed question.':'Ready. Start when you want.';render();}
function battle(){
 const b=s.battle;screen.innerHTML=`<div class="health"><div><strong>Your hero · ${b.hp}/60</strong><progress value="${b.hp}" max="60"></progress></div><div><strong>${b.kind==='boss'?'Guardian':b.kind==='redemption'?'Echo guardian':'Courtyard sentinel'} · ${b.enemy}/${b.max}</strong><progress value="${b.enemy}" max="${b.max}"></progress></div></div><div class="stage"><canvas width="384" height="245" aria-label="Pixel hero facing a dungeon sentinel"></canvas></div><section class="battle-copy"><span class="badge">${b.phase==='running'?'Combat active':b.phase==='choice'?'Tactical pause':'Combat paused'}</span><p role="status">${s.log}</p><div class="buttons"></div></section>`;
 const buttons=screen.querySelector('.buttons');
 if(b.phase==='ready'||b.phase==='paused'){appendButton(buttons,b.phase==='ready'?'Start battle':'Resume battle',()=>{b.phase='running';s.log='Ordinary attacks exchange automatically.';render();},'primary');}
 if(b.phase==='running'){
   if(mode==='manual')appendButton(buttons,'Attack · one exchange',()=>exchange(),'primary');
   else timer=setTimeout(exchange,1000);
   appendButton(buttons,'Pause',()=>{b.phase='paused';s.log='Take your time. Resume when ready.';render();});
 }
 if(b.phase==='return')appendButton(buttons,'Return to battle · release move',()=>{const damage=b.returned?22:10;b.phase='animating';s.log=b.returned?'Correct · the strong pulse is released.':'The pulse still lands with reduced strength.';render();animate(damage,()=>afterExchange(false));},'primary');
 if(b.phase==='choice'){
   const required=b.kind==='boss'||b.kind==='redemption';
   appendButton(buttons,required?'Attempt required question':'Answer for a stronger pulse',()=>ask(b.kind==='boss'?3:b.kind==='redemption'?questions.findIndex(q=>s.missed.includes(q.id)&&!s.correct.includes(q.id)):2,'battle'),'primary');
   if(!required){appendButton(buttons,'Guard · reduce the next hit',()=>{b.guard=true;b.questionDone=true;b.phase='running';s.log='Guard raised for the next exchange.';render();});appendButton(buttons,'Keep fighting · skip question',()=>{b.questionDone=true;b.phase='running';s.log='Continue with ordinary attacks.';render();});}
 }
 draw();
}
function exchange(){const b=s.battle;if(s.view!=='battle'||b.phase!=='running')return;b.phase='animating';s.log='Your hero attacks. The sentinel responds.';render();animate(8,()=>afterExchange(true));}
function animate(damage,done){const b=s.battle;animation={start:performance.now(),damage,hit:false,done};if(reduced){b.enemy=Math.max(0,b.enemy-damage);animation=null;done();return;}requestAnimationFrame(frame);}
function frame(now){if(!animation)return;const a=animation,t=(now-a.start)/1000;if(t>.4&&!a.hit){a.hit=true;s.battle.enemy=Math.max(0,s.battle.enemy-a.damage);}draw(t);if(t<.95)requestAnimationFrame(frame);else{animation=null;a.done();}}
function afterExchange(counter){const b=s.battle;
 if(b.enemy<=0){win();return;}
 if(counter){b.hp=Math.max(0,b.hp-(b.guard?1:5));b.guard=false;b.round++;}
 if(b.hp<=0){lose();return;}
 if(!b.questionDone&&b.round>=2){b.phase='choice';s.log=b.kind==='boss'?'The guardian raises a ward. Attempt one question to proceed; a wrong answer still releases a weaker pulse.':b.kind==='redemption'?'An eligible missed question powers this challenge.':'An opening appears. Answer a question for a stronger pulse, guard, or keep fighting.';}
 else{b.phase='running';s.log=mode==='hybrid'?'Ordinary attacks continue.':'Choose when to make the next attack.';}
 render();
}
function ask(index,origin){clearTimeout(timer);s.question={index,origin,selected:null,answered:false,correct:false};s.view='question';lastView=null;render();}
function question(){const current=s.question,q=questions[current.index];
 screen.innerHTML=`<section class="question"><span class="eyebrow">${current.origin==='battle'?'Battle paused · pulse at stake':'Route study encounter'} · fictional fixture</span><h2>${q.title}</h2><p>${q.stem}</p><div class="answers buttons"></div><div id="feedback"></div><div id="question-actions" class="buttons"></div></section>`;
 const answers=screen.querySelector('.answers');
 q.choices.forEach((choice,i)=>{const b=button(`${String.fromCharCode(65+i)}. ${choice}`,()=>{current.selected=i;question();state();},current.selected===i?'selected':'');b.setAttribute('aria-pressed',current.selected===i);b.disabled=current.answered;answers.append(b);});
 const actions=$('question-actions');
 if(!current.answered){const submit=button('Confirm answer',()=>answer(),'primary');submit.disabled=current.selected===null;actions.append(submit);}
 else{
 $('feedback').innerHTML=`<div class="feedback ${current.correct?'':'miss'}" role="status"><strong>${current.correct?'Correct':'Not quite'} · ${String.fromCharCode(65+q.answer)} is correct</strong><p>${q.takeaway}</p><div class="small">${current.correct?'First correct answers earn growth and coins.':'No growth or answer coins. This question remains for a later Redemption challenge.'}</div></div><details><summary>Read full explanation</summary><p>${q.explanation}</p></details>`;
 appendButton(actions,current.origin==='route'&&!current.correct?'Continue · one recovery question':'Continue',continueQuestion,'primary');
 }
}
function answer(){const c=s.question,q=questions[c.index];if(c.answered)return;c.answered=true;c.correct=c.selected===q.answer;
 if(c.correct&&!s.correct.includes(q.id)){s.correct.push(q.id);s.xp+=10;s.coins+=2;s.missed=s.missed.filter(id=>id!==q.id);}
 else if(!c.correct&&!s.correct.includes(q.id)&&!s.missed.includes(q.id))s.missed.push(q.id);
 render();
}
function continueQuestion(){const c=s.question;
 if(c.origin==='route'&&!c.correct){ask(1,'recovery');return;}
 if(c.origin==='route'||c.origin==='recovery'){s.route=1;s.view='route';render();return;}
 const b=s.battle;b.questionDone=true;b.returned=c.correct;b.phase='animating';s.view='battle';s.log=c.correct?'Correct · the strong pulse is released.':'The pulse still lands with reduced strength.';render();animate(c.correct?22:10,()=>afterExchange(false));
}
function win(){const b=s.battle;s.coins+=5;s.outcome='victory';s.view='result';if(b.kind==='ordinary')s.route=2;if(b.kind==='boss'){s.finished=true;s.route=3;}render();}
function lose(){clearTimeout(timer);animation=null;s.outcome='defeat';s.view='result';render();}
function result(){const won=s.outcome==='victory';const p=panel(`<div class="result-icon">${won?'✦':'◇'}</div><span class="eyebrow">${won?'Victory':'Defeat'}</span><h2>${won?'The way is clear':'Regroup and try again'}</h2><p>${won?'+5 battle coins for this encounter.':'Earned growth, coins and correct answers are preserved.'}</p><p class="small">No consumables or victory-streak tuning in this flow test.</p><div class="buttons"></div>`);const buttons=p.querySelector('.buttons');
 if(!won&&(s.battle.kind!=='redemption'||s.missed.length))appendButton(buttons,'Retry battle',()=>startBattle(s.battle.kind),'primary');
 appendButton(buttons,s.battle.kind==='redemption'?'Return to Redemption':'Return to route',()=>{s.view=s.battle.kind==='redemption'?'redemption':'route';render();},won?'primary':'');
}
function redemption(){const eligible=s.finished?s.missed.filter(id=>!s.correct.includes(id)):[];const p=panel(`<span class="eyebrow">Separate Redemption section</span><h2>Return to what you missed</h2><p>${eligible.length} eligible missed question${eligible.length===1?'':'s'}.</p><p class="small">${s.finished?'This prototype uses one missed question per short battle. Correct answers count even if you later lose.':'Finish the adventure first. Misses from the active adventure are not eligible yet.'}</p><div class="buttons"></div>`);const buttons=p.querySelector('.buttons');if(eligible.length)appendButton(buttons,'Start a short challenge',()=>startBattle('redemption'),'primary');appendButton(buttons,'Back to adventure',()=>{s.view='route';render();});}
function draw(t=0){const canvas=screen.querySelector('canvas');if(!canvas)return;const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.fillStyle='#263840';ctx.fillRect(0,0,384,245);
 const tile=(n,x,y,size)=>{if(sheet.complete&&sheet.naturalWidth)ctx.drawImage(sheet,n%12*16,Math.floor(n/12)*16,16,16,x,y,size,size);};
 for(let y=0;y<4;y++)for(let x=0;x<6;x++)tile(y===0?40:48,x*64,y*64,64);
 const step=animation?Math.sin(Math.min(t/.6,1)*Math.PI)*65:0;
 ctx.fillStyle='#0005';for(const x of [100,285]){ctx.beginPath();ctx.ellipse(x,206,32,9,0,0,7);ctx.fill();}
 tile(96,68+step,139,64);tile(s.battle?.kind==='boss'?122:121,250+(t>.4&&t<.6?Math.sin(t*100)*6:0),139,64);
 if(animation&&t>.35&&t<.7){ctx.fillStyle='#f4df96';ctx.font='bold 22px system-ui';ctx.fillText(`−${animation.damage}`,267,120-t*10);}
}
function switchMode(){mode=mode==='hybrid'?'manual':'hybrid';const u=new URL(location);u.searchParams.set('variant',mode);history.replaceState(null,'',u);if(s.battle&&s.view==='battle'&&s.battle.phase==='animating'){state();return;}render();}
$('prev').onclick=switchMode;$('next').onclick=switchMode;$('reset').onclick=fresh;$('defeat').onclick=()=>{if(s.view==='battle'&&s.battle)lose();};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&s.view==='battle'&&s.battle.phase==='running'){s.battle.phase='paused';s.log='Paused while you were away.';render();}});
sheet.onload=()=>draw();fresh();
