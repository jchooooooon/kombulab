(function(g){
'use strict';
const lessons=[
{title:'살아 있는 시작을 찾아요',tag:'01 · 준비물 탐험',art:'tools',text:'새 균막은 살아 있는 액상 스타터에서 자라요. 차와 설탕만 준비하는 것으로는 부족해요.',question:'처음 스코비를 기를 때 꼭 필요한 것은?',options:['분말 콤부차','배양용 활성 액상 스타터','식초 한 숟가락'],answer:1,why:'맞아요! 출처와 보관 이력을 확인한 무가향 액상 스타터가 출발점이에요.',hint:'살아 있는 배양체가 들어 있고, 배양용으로 적합한 액체를 찾아보세요.'},
{title:'뜨거운 차는 잠깐 기다려요',tag:'02 · 첫날의 순서',art:'brew',text:'차를 우리고 설탕을 녹인 다음, 충분히 식혀요. 온도계로 확인한 뒤 스타터를 넣어요.',question:'스타터를 넣기 전, 무엇을 확인할까요?',options:['차액이 25℃ 전후로 식었는지','설탕을 더 넣을 수 있는지','병을 밀폐할 수 있는지'],answer:0,why:'맞아요! 충분히 식히고 부피를 맞춘 뒤 접종해요. 이후 pH와 액온을 기록해요.',hint:'뜨거운 차액은 배양체에 영향을 줄 수 있어요. 온도계를 떠올려 보세요.'},
{title:'하루하루, 작은 변화를 읽어요',tag:'03 · 관찰 탐험',art:'thin',text:'날짜별로 젖은 얇은 막, 기포, 층을 살펴봐요. 같은 날짜라도 모습은 서로 달라요.',question:'며칠이 지났는데 막이 안 보인다면?',options:['실패라고 단정해요','설탕을 계속 추가해요','pH·액온·외관 기록을 함께 확인해요'],answer:2,why:'맞아요! 막이 보이는 속도와 발효 경과는 달라요. 날짜만으로 완료나 실패를 정하지 않아요.',hint:'눈에 보이는 모습 하나보다 여러 관찰 기록을 함께 보는 것이 좋아요.'},
{title:'보송한 반점은 멈춤 신호',tag:'04 · 관찰자의 눈',art:'mold',text:'젖고 매끈한 막과 마르고 보송한 털 같은 반점은 달라요. 아래 그림을 눌러 질감과 위치를 비교해 보세요.',question:'표면에 털 같은 곰팡이가 의심된다면?',options:['표면만 걷어내요','맛보지 않고 사용을 멈춰요','pH가 낮으면 계속 써요'],answer:1,why:'맞아요. 맛보기와 사용을 멈추고 분리해요. 털 같은 반점이 보이면 액체와 균막 전체를 폐기해요.',hint:'일부를 걷거나 pH만 확인해서 다시 쓰는 방법은 적절하지 않아요.'},
{title:'이제, 나만의 관찰을 시작해요',tag:'05 · 첫 배치로',art:'review',text:'배양 날짜, 스타터 출처, pH와 액온, 외관을 함께 남겨요. 새 막의 두께가 다음 배치 사용을 결정하지는 않아요.',question:'다음 배치에 쓸지 판단할 때 필요한 것은?',options:['균막 두께만','예쁜 색깔만','배양 이력·관찰 기록·필요한 검사'],answer:2,why:'기초 탐험 완료! 실습에서 차 우리기부터 배양·관찰까지 이어서 배워요.',hint:'모양만으로 판단하지 않고, 이력과 측정·검사 결과를 함께 살펴요.'}
];
function firstPending(items,done){const i=items.findIndex(x=>!done(x));return i<0?items.length:i;}
function cursor(items,done,requested){const first=firstPending(items,done);if(!Number.isInteger(requested))return first;const n=Math.max(0,Math.min(items.length,requested));return n===items.length&&first<items.length?first:n;}
function tally(b){return Object.values(b.checks.prep).filter(Boolean).length+Object.values(b.checks.brew).filter(Boolean).length+Object.values(b.checks.daily).reduce((n,d)=>n+Object.values(d).filter(Boolean).length,0)+new Set(b.records.map(r=>r.date)).size;}
function plan(C,b,stage,date){
 const group=stage===0?'prep':stage===1?'brew':'daily',d=stage===1?b.start:(date<b.start?b.start:date);
 const items=(stage===0?C.PREP:stage===1?C.BREW:stage===3?C.COLD:C.DAILY.filter(x=>x[0]!=='measure')).map(([key,title,desc])=>({key,title,desc,group,date:d,done:b.checks[group]&&(group==='daily'?b.checks.daily[d]?.[key]===true:b.checks[group][key]===true)}));
 if(stage>0)items.push({key:'record',title:stage===1?'첫 pH와 액온을 남겨요':'오늘의 pH와 액온을 남겨요',desc:'기기를 보정하고 별도 시료에서 실제 측정한 값을 입력해요.',group,date:d,done:!!C.latest(b,d)});
 return items;
}
function learned(raw){if(!raw)return [];const a=JSON.parse(raw);if(!Array.isArray(a)||a.some(x=>!Number.isInteger(x)||x<0||x>=lessons.length))throw Error('학습 기록 형식이 다릅니다.');return [...new Set(a)];}
const api={lessons,firstPending,cursor,tally,learned,plan};if(typeof module!=='undefined'&&module.exports)module.exports=api;else g.KombuQuest=api;
})(globalThis);
