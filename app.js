const lessons = [
 {title:'공항에서',sub:'여행의 첫 한마디',icon:'✈',cards:[
 ['탑승 수속하기',"I'd like to check in.",'탑승 수속을 하고 싶어요.',"I'd like to + 하고 싶은 일: 정중하게 원하는 것을 말할 때 써요."],
 ['여권 건네기','Here is my passport.','여기 제 여권이에요.','Here is…는 물건을 건네며 “여기 … 있어요”라고 할 때 써요.'],
 ['좌석 부탁하기','Can I have an aisle seat?','통로 쪽 좌석으로 주실 수 있나요?','aisle의 s는 소리가 나지 않아요. “아일”에 가깝게 말해요.'],
 ['탑승구 찾기','Where is gate twelve?','12번 탑승구는 어디인가요?','Where is…? 뒤에 찾는 장소를 붙여보세요. 탑승권에 적힌 번호로 바꾸면 돼요.'],
 ['다시 부탁하기','Could you say that again, please?','다시 한번 말씀해 주시겠어요?','잘 못 들었을 때 어디서든 쓸 수 있는 한마디예요.']]},
 {title:'호텔에서',sub:'체크인부터 체크아웃까지',icon:'⌂',cards:[
 ['예약 확인하기','I have a reservation.','예약했어요.','이름을 덧붙이려면 under + 예약자 이름을 말해보세요.'],
 ['체크인하기',"I'd like to check in, please.",'체크인하고 싶어요.','호텔에서도 공항에서 배운 check in을 쓸 수 있어요.'],
 ['조식 시간 묻기','What time is breakfast?','아침 식사는 몇 시인가요?','What time…?은 시간을 물어볼 때 써요.'],
 ['수건 부탁하기','Could I have two more towels?','수건 두 장 더 받을 수 있을까요?','two more는 “두 개 더”. 필요한 수만 바꿔보세요.'],
 ['체크아웃하기',"I'd like to check out, please.",'체크아웃하고 싶어요.','들어갈 때는 check in, 나갈 때는 check out이에요.']]},
 {title:'식당에서',sub:'맛있는 주문 한마디',icon:'♧',cards:[
 ['메뉴 부탁하기','Can I see the menu, please?','메뉴 좀 볼 수 있을까요?','부탁 끝에 please를 붙이면 더 정중해져요.'],
 ['메뉴 추천받기','What do you recommend?','무엇을 추천하시나요?','메뉴를 고르기 어려울 때 써보세요.'],
 ['메뉴 주문하기',"I'll have this, please.",'이걸로 주세요.','메뉴를 손가락으로 가리키며 말해도 괜찮아요.'],
 ['물 부탁하기','Could I have some water, please?','물 좀 주실 수 있을까요?','water 대신 필요한 음료를 넣어 말해보세요.'],
 ['계산 부탁하기','Could I have the bill, please?','계산서 좀 주시겠어요?','미국에서는 bill 대신 check라고도 해요.']]},
 {title:'길 위에서',sub:'길 찾기도, 이동도 가볍게',icon:'⚑',cards:[
 ['말 걸기','Excuse me.','실례합니다.','낯선 사람에게 도움을 구할 때 먼저 말해요.'],
 ['역 찾기','Where is the subway station?','지하철역은 어디인가요?','subway station 대신 찾는 장소를 넣어보세요.'],
 ['도움 구하기','Could you help me, please?','저 좀 도와주시겠어요?','천천히 말하고, 필요한 것을 가리켜도 괜찮아요.'],
 ['택시 타기','Please take me to this address.','이 주소로 가주세요.','휴대전화의 주소를 보여주면서 말해보세요.'],
 ['고마움 전하기','Thank you for your help.','도와주셔서 감사합니다.','Thank you만 말해도 마음이 전해져요.']]}
];
const $=id=>document.getElementById(id);
let lesson=0,index=0,busy=false,startX=null,startY=null;
const viewed=lessons.map(()=>new Set());
function tiles(){
 const grid=$('lesson-grid');grid.replaceChildren();
 lessons.forEach((l,i)=>{const b=document.createElement('button');b.className='lesson-tile'+(i===lesson?' selected':'');b.setAttribute('aria-pressed',String(i===lesson));b.innerHTML=`<span class="tile-top"><span class="tile-number">LESSON ${String(i+1).padStart(2,'0')}</span><span class="tile-icon" aria-hidden="true">${l.icon}</span></span><strong>${l.title}</strong><span class="tile-sub">${l.sub}</span><span class="tile-state">${i===lesson?'지금 연습 중':`답 확인 ${viewed[i].size} / 5`}</span>`;b.onclick=()=>{load(i);$('learn-nav').click()};grid.append(b)})
}
function load(i){if(busy||pointerId!==null)return;lesson=i;index=0;$('complete').close();$('status').textContent='';render();tiles()}
function render(){
 const l=lessons[lesson],c=l.cards[index];
 document.body.style.setProperty("--scene-image", `url("assets/${["airport","hotel","restaurant","city"][lesson]}-${index+1}.png")`);
 document.body.dataset.scene=["airport","hotel","restaurant","city"][lesson];
 $('lesson-label').textContent=`LESSON ${String(lesson+1).padStart(2,'0')} · ${l.title}`;
 $('progress-label').textContent=`오늘의 카드 ${index+1} / ${l.cards.length}`;
 $('mastered-count').textContent=`답 확인 ${viewed[lesson].size} / 5`;
 $('progress-fill').style.width=`${(index+1)/l.cards.length*100}%`;
 $('situation').textContent=c[0];$('card-number').textContent=`${String(index+1).padStart(2,'0')} / 05`;
 $('english').textContent=c[1];$('korean').textContent=c[2];$('hint').textContent=c[3];
 $('answer').hidden=true;$('korean').classList.remove('revealed');$('hint').hidden=true;
 $('card-prompt').textContent='영어로 어떻게 말할까요?';
 $('hint-toggle').setAttribute('aria-expanded','false');$('hint-toggle').innerHTML='말하기 힌트 보기 <span aria-hidden="true">＋</span>';
}
const paperStage=document.querySelector('.card-stage');
const paper=$('card');
const reducedMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
let preview=null,dragDirection=0,pointerId=null,dragging=false;
function clearPreview(){preview?.remove();preview=null;dragDirection=0;paperStage.classList.remove('turning')}
function preparePreview(direction){
 if(preview&&dragDirection===direction)return;
 clearPreview();dragDirection=direction;
 preview=paper.cloneNode(true);
 preview.removeAttribute('id');preview.removeAttribute('tabindex');
 preview.classList.add('paper-preview');preview.setAttribute('aria-hidden','true');preview.inert=true;
 preview.style.transform='';preview.style.opacity='';
 if(direction>0){
  preview.querySelector('#answer').hidden=false;
  preview.querySelector('#korean').classList.add('revealed');
  preview.querySelector('#card-prompt').textContent='이렇게 말하면 돼요.';
 }else if(index<lessons[lesson].cards.length-1){
  const c=lessons[lesson].cards[index+1];
  preview.style.setProperty('--scene-image',`url("assets/${['airport','hotel','restaurant','city'][lesson]}-${index+2}.png")`);
  preview.querySelector('#situation').textContent=c[0];
  preview.querySelector('#card-number').textContent=`${String(index+2).padStart(2,'0')} / 05`;
  preview.querySelector('#korean').textContent=c[2];preview.querySelector('#korean').classList.remove('revealed');
  preview.querySelector('#card-prompt').textContent='영어로 어떻게 말할까요?';preview.querySelector('#answer').hidden=true;
 }else{
  preview.querySelector('#card-prompt').textContent='오늘의 레슨';
  preview.querySelector('#korean').textContent='아빠, 오늘도 한 걸음!';
  preview.querySelector('#korean').classList.remove('revealed');preview.querySelector('#answer').hidden=true;
 }
 preview.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
 preview.querySelectorAll('[aria-controls]').forEach(el=>el.removeAttribute('aria-controls'));
 paperStage.insertBefore(preview,paper);paperStage.classList.add('turning');
}
async function settlePaper(){
 busy=true;
 try{
  if(!reducedMotion())await paper.animate([{transform:paper.style.transform||'none',opacity:Number(paper.style.opacity||1)},{transform:'none',opacity:1}],{duration:220,easing:'cubic-bezier(.2,.8,.2,1)'}).finished;
 }finally{paper.style.transform='';paper.style.opacity='';clearPreview();busy=false}
}
async function turnPaper(direction,apply){
 if(busy||$('complete').open)return;
 busy=true;preparePreview(direction);
 if('speechSynthesis'in window)speechSynthesis.cancel();
 let outgoing,incoming;
 try{
  if(!reducedMotion()){
   const distance=Math.max(paperStage.getBoundingClientRect().width,window.innerWidth)*1.15;
   outgoing=paper.animate([{transform:paper.style.transform||'none',opacity:Number(paper.style.opacity||1)},{transform:`translateX(${direction*distance}px) translateY(-20px) rotate(${direction*13}deg)`,opacity:.15}],{duration:420,easing:'cubic-bezier(.3,.65,.3,1)',fill:'forwards'});
   incoming=preview.animate([{transform:preview.style.transform||'translateY(10px) scale(.98)'},{transform:'none'}],{duration:420,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
   await outgoing.finished;
  }
  apply();
 }finally{paper.style.transform='';paper.style.opacity='';outgoing?.cancel();incoming?.cancel();clearPreview();busy=false}
}
function reveal(){
 if(!$('answer').hidden){if(!busy&&paper.style.transform)settlePaper();return}
 return turnPaper(1,()=>{
  $('answer').hidden=false;$('korean').classList.add('revealed');$('card-prompt').textContent='이렇게 말하면 돼요.';
  viewed[lesson].add(index);$('mastered-count').textContent=`답 확인 ${viewed[lesson].size} / 5`;
  $('status').textContent='천천히 소리 내어 따라 해보세요.';tiles();
 });
}
function next(){
 return turnPaper(-1,()=>{
  if(index===lessons[lesson].cards.length-1){$('complete-text').textContent=`${lessons[lesson].title}의 다섯 카드를 둘러봤어요. 영어 답은 ${viewed[lesson].size}개 확인했어요.`;$('complete').showModal()}
  else{index++;render();$('status').textContent='새 문장이에요. 영어로 떠올려보세요.'}
 });
}
$('again').onclick=reveal;$('known').onclick=next;
$('hint-toggle').onclick=()=>{const open=$('hint').hidden;$('hint').hidden=!open;$('hint-toggle').setAttribute('aria-expanded',String(open));$('hint-toggle').innerHTML=`말하기 힌트 ${open?'접기':'보기'} <span aria-hidden="true">${open?'−':'＋'}</span>`};
$('listen').onclick=()=>{if(!('speechSynthesis'in window)){$('status').textContent='이 브라우저에서는 발음 듣기를 지원하지 않아요.';return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance($('english').textContent);u.lang='en-US';u.rate=.78;const voice=speechSynthesis.getVoices().find(v=>v.lang==='en-US');if(voice)u.voice=voice;u.onerror=()=>{$('status').textContent='음성을 재생하지 못했어요. 기기의 영어 음성 설정을 확인해주세요.'};speechSynthesis.speak(u)};
const scrollBehavior=()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
function showLessons(){$('lessons').scrollIntoView({behavior:scrollBehavior()});$('lessons-nav').classList.add('active');$('lessons-nav').setAttribute('aria-current','location');$('learn-nav').classList.remove('active');$('learn-nav').removeAttribute('aria-current')}
$('choose-lesson').onclick=showLessons;$('lessons-nav').onclick=showLessons;$('learn-nav').onclick=()=>{document.querySelector('.study').scrollIntoView({behavior:scrollBehavior()});$('learn-nav').classList.add('active');$('learn-nav').setAttribute('aria-current','page');$('lessons-nav').classList.remove('active');$('lessons-nav').removeAttribute('aria-current')};
$('review').onclick=()=>load(lesson);$('next-lesson').onclick=()=>{load((lesson+1)%lessons.length);$('learn-nav').click()};$('close-dialog').onclick=()=>$('complete').close();
const card=$('card');
function endGesture(){
 startX=null;startY=null;dragging=false;
 if(pointerId!==null&&card.hasPointerCapture(pointerId))card.releasePointerCapture(pointerId);
 pointerId=null;
}
card.addEventListener('pointerdown',e=>{
 if(e.target.closest('button')||busy||$('complete').open||pointerId!==null||!e.isPrimary||e.button!==0)return;
 startX=e.clientX;startY=e.clientY;pointerId=e.pointerId;dragging=false;
});
card.addEventListener('pointermove',e=>{
 if(e.pointerId!==pointerId||startX===null||busy)return;
 const dx=e.clientX-startX,dy=e.clientY-startY;
 if(!dragging){
  if(Math.abs(dy)>12&&Math.abs(dy)>Math.abs(dx)){endGesture();return}
  if(Math.abs(dx)<10||Math.abs(dx)<Math.abs(dy)*1.2)return;
  dragging=true;card.setPointerCapture(e.pointerId);
 }
 if(dx>0&&!$('answer').hidden){card.style.transform='';card.style.opacity='';clearPreview();return}
 preparePreview(dx<0?-1:1);
 if(!reducedMotion()){
  const width=paperStage.getBoundingClientRect().width,progress=Math.min(Math.abs(dx)/width,1);
  card.style.opacity=String(1-Math.min(progress*1.1,.35));
  card.style.transform=`translateX(${dx}px) translateY(${-progress*9}px) rotate(${Math.max(-9,Math.min(9,dx/width*10))}deg)`;
  preview.style.transform=`translateY(${10*(1-progress)}px) scale(${.98+.02*progress})`;
 }
});
card.addEventListener('pointerup',e=>{
 if(e.pointerId!==pointerId||startX===null)return;
 const dx=e.clientX-startX,dy=e.clientY-startY,wasDragging=dragging;endGesture();
 if(!wasDragging)return;
 const threshold=Math.min(100,card.getBoundingClientRect().width*.22);
 if(Math.abs(dx)>threshold&&Math.abs(dx)>Math.abs(dy)*1.2){if(dx>0)reveal();else next()}
 else settlePaper();
});
card.addEventListener('pointercancel',()=>{if(pointerId===null)return;endGesture();if(!busy)settlePaper()});
card.addEventListener('lostpointercapture',()=>{if(pointerId===null)return;endGesture();if(!busy)settlePaper()});
card.addEventListener('keydown',e=>{if(e.target!==card||pointerId!==null)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();if(e.key==='ArrowLeft')next();else reveal()}});
load(0);
