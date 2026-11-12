(function(g){'use strict';
const steps=[
 ['준비','작은 발효 공방을 열어요','물·차·설탕, 그리고 살아 있는 스타터.','재료 준비하기','hero',0,'tap',0,'첫 1L 관찰용 배합: 무가향 홍차 4.5g, 백설탕 54g, 식힌 가당 차액 900mL, 배양용 활성 액상 스타터 100mL. 내열 비커·체·식품용 병·촘촘한 천·고무줄·저울·온도계·보정한 pH 측정기와 별도 시료 컵을 준비해요. 제조용 검증 배합이 아니며 스타터 공급자의 조건을 우선 확인해요.'],
 ['차 우리기','맑은 뜨거운 물을 부어요','내열 비커에 물 500mL를 넣어요.','물 붓기','brew',0,'pour',1700,'뜨거운 물은 내열 비커에 부어요. 일반 유리 배양병에 바로 붓지 않아요. 이 단계의 물은 아직 투명해요.'],
 ['차 우리기','홍차를 넣어 볼까요?','무가향 홍차 4.5g (티백 약 2개)','홍차 넣기','brew',1,'tea',1400,'무가향 홍차로 기본 과정을 익혀요. 얼그레이·허브 등 다른 차는 맛 실험에서 향을 비교할 수 있지만 기본 종균의 배양 조건과 같다고 가정하지 않아요.'],
 ['차 우리기','차가 천천히 우러나요','실습에서는 기다림을 짧게 보여줘요.','우려내기','brew',1,'steep',3000,'앱은 추출 10분을 몇 초로 압축해요. 실제 작업에서는 사용하는 차와 검증한 추출 조건에 맞춰 시간을 관리하세요. 화면의 시간은 실제 발효 타이머가 아니에요.'],
 ['차 우리기','찻잎은 체에 남겨요','차액만 깨끗한 내열 용기로 받아요.','찻잎 거르기','brew',2,'strain',2200,'찻잎을 체로 걸러 제거해요. 뜨거운 차를 받는 용기도 내열 제품이어야 해요. 작업 도구와 병은 깨끗이 세척하고 적절히 소독해요.'],
 ['식히기','설탕을 넣어요','백설탕 54g','설탕 넣기','brew',3,'sugar',1600,'설탕은 배양 미생물이 이용하는 재료예요. 발효 후 남는 양은 조건에 따라 달라요. 단맛이 줄었다고 무당이나 무알코올이라고 판단할 수 없어요.'],
 ['식히기','알갱이가 안 보이게 저어요','한 번 누르면 유리 막대가 저어 줘요.','설탕 녹이기','culture',0,'stir',3200,'따뜻한 차액에 설탕을 완전히 녹여요. 앱의 진행 막대는 조작 진행도이며 실제 용해도를 측정하는 값은 아니에요.'],
 ['식히기','스타터는 충분히 식힌 뒤에','온도계로 25℃ 전후인지 확인해요.','식히며 온도 확인','culture',1,'cool',3200,'뜨거운 차에 스타터를 넣지 않아요. 실제 차액은 온도계로 확인하세요. 화면의 90→25℃는 학습용 표현이에요. 스타터 공급자가 지정한 온도 범위가 있다면 그 지침을 따르세요.'],
 ['식히기','차액 전체를 900mL로 맞춰요','설탕을 녹이고 식힌 차액의 전체 부피예요.','부피 맞추기','hero',1,'pour',1800,'물 900mL에 차·설탕을 추가한다는 뜻이 아니에요. 식힌 가당 차액 전체를 900mL로 맞추고, 깨끗한 식품용 배양병으로 옮겨요.'],
 ['스타터 넣기(접종)','살아 있는 스타터를 넣어요','활성 액상 스타터 100mL','스타터 넣기','culture',2,'starter',1800,'출처와 보관 이력이 확인된 무가향 배양용 액상 스타터를 써요. 분말 콤부차나 식초는 대체재가 아니에요. 기존 균막이 없어도 활성 액상 스타터에서 새 균막이 생길 수 있어요.'],
 ['스타터 넣기(접종)','부드럽게 한 바퀴','차와 스타터가 고르게 섞이게 해요.','천천히 섞기','flavor',2,'stir',2400,'실제 초기 pH는 혼합한 뒤 직접 확인해요. 앱에서 스타터를 넣었다는 사실만으로 적절한 산도나 안전성을 보장하지 않아요.'],
 ['스타터 넣기(접종)','공기는 통하고 벌레는 못 들어오게','촘촘한 천을 고무줄로 고정해요.','덮개 씌우기','culture',3,'cover',1300,'병 입구 전체를 덮는 촘촘한 통기성 천을 사용하고 고무줄로 고정해요. 1차 배양을 밀폐하지 않아요. 병 주위의 청결도 함께 관리해요.'],
 ['확인','pH 측정기는 작은 컵으로','덜어낸 시료를 재고, 병에 되붓지 않아요.','별도 시료 측정','observe',0,'measure',2400,'측정기는 기기 설명서에 따라 pH 7.01·4.01 표준액으로 보정해요. 전극을 헹군 뒤 별도 시료 컵에 담가 값이 안정되면 읽어요. pH와 액온을 함께 확인하세요. 이 실습은 기기와 연결되지 않으며 실제 측정값을 보여주지 않아요.'],
 ['배양','빛을 피해 조용히 두어요','직사광선과 오염원을 피한 안정된 장소.','배양 자리 잡기','observe',1,'tap',0,'통기성 덮개를 유지하고 공급자 지침에 맞는 온도에서 배양해요. 곰팡이·벌레·부패취가 있으면 사용을 멈춰요. 온도·스타터·조건에 따라 발효 속도가 달라져요.'],
 ['관찰','시간이 지나면 무엇이 보일까요?','날짜를 눌러 표면의 변화를 살펴봐요.','날짜별 변화 보기','observe',2,'days',0,'균막이 생기는 속도는 일정하지 않아요. D1–3, D4–7, D8–14는 관찰 예시이며 완성 날짜가 아니에요. pH·액온·외관을 함께 확인하세요.'],
 ['관찰','젖은 막과 보송한 반점','곰팡이가 의심되면 맛보지 않아요.','표면 비교하기','observe',2,'compare',0,'곰팡이의 색은 흰색일 수도 있어요. 표면의 마르고 털 같은 반점이 의심되면 사용·맛보기를 멈추고 액체와 균막 전체를 폐기해요. 일부만 걷어내거나 낮은 pH를 이유로 재사용하지 않아요.'],
 ['마무리','한 병의 과정을 배웠어요','차 우리기부터 배양·관찰까지 완료했어요.','맛 실험하러 가기','observe',3,'finish',0,'학습 완료가 실제 발효 완료나 음용 적합 판정을 뜻하지 않아요. 실제 제조에서는 공정과 관찰 결과를 확인하고, 상품화에는 총산·에탄올·미생물·포장·소비기한 등의 별도 검토가 필요해요.']
].map(([chapter,title,line,action,atlas,frame,kind,duration,detail],id)=>({id,chapter,title,line,action,atlas,frame,kind,duration,detail}));
function empty(){return {version:1,step:0,completed:false,daysSeen:false,comparisonPassed:false,actionDone:false,fraction:0};}
function validate(x){if(!x||x.version!==1||!Number.isInteger(x.step)||x.step<0||x.step>=steps.length||['completed','daysSeen','comparisonPassed'].some(k=>typeof x[k]!=='boolean')||x.actionDone!==undefined&&typeof x.actionDone!=='boolean'||x.fraction!==undefined&&(!Number.isFinite(x.fraction)||x.fraction<0||x.fraction>1))throw Error('진행 정보를 읽지 못했어요.');return {...empty(),step:x.step,completed:x.completed,daysSeen:x.daysSeen,comparisonPassed:x.comparisonPassed,actionDone:x.actionDone||false,fraction:x.actionDone?1:x.fraction||0};}
function advance(x){const s=validate(x),step=steps[s.step];if(step.kind==='days'&&!s.daysSeen)return s;if(step.kind==='compare'&&!s.comparisonPassed)return s;if(s.step===steps.length-1)return {...s,completed:true};return {...s,step:s.step+1,actionDone:false,fraction:0};}
// One message state drives the single dialogue panel, including after reload.
function actionMessage(step,{active=false,done=false,p=0}={}){
 if(done){
  if(step.kind==='measure')return {title:'시료 측정 방법을 익혔어요',line:'실제 pH는 보정한 측정기로 확인해요.'};
  if(step.kind==='cool')return {title:'식히는 연습을 마쳤어요',line:'실제 액온을 확인한 뒤 스타터를 넣어요.'};
  return {title:step.title,line:'잘했어요! 다음 순서로 가볼까요?'};
 }
 if(active&&step.kind==='cool')return {title:step.title,line:`가상 온도 ${Math.round(90-p*65)}℃ · 식히는 중이에요.`};
 if(active&&step.kind==='measure')return {title:step.title,line:p<.6?'시료 컵에 넣고 값이 안정되기를 기다려요.':'시료는 측정한 뒤 병에 되붓지 않아요.'};
 return {title:step.title,line:step.line};
}
const api={steps,empty,validate,advance,actionMessage};if(typeof module!=='undefined'&&module.exports)module.exports=api;else g.KombuRetro=api;
})(globalThis);
