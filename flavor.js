(function(g){'use strict';
const teas={
 black:{name:'홍차',tone:'#b77b38',aroma:'꿀·맥아를 떠올리게 하는 진한 차 향',finish:'묵직한 차 맛과 약간의 떫은 여운',body:'도톰함',tannin:'뚜렷함'},
 green:{name:'녹차',tone:'#b2ad60',aroma:'풋잎과 싱그러운 풀 향',finish:'가볍고 산뜻한 끝맛',body:'가벼움',tannin:'은은함'},
 jasmine:{name:'자스민 녹차',tone:'#baad62',aroma:'코끝에 남는 자스민 꽃 향',finish:'꽃 향과 맑은 녹차의 여운',body:'가벼움',tannin:'은은함'},
 oolong:{name:'우롱차',tone:'#b78c4e',aroma:'꽃과 구운 곡물을 떠올리게 하는 차 향',finish:'둥근 차 맛과 가벼운 구수함',body:'중간',tannin:'중간'},
 assamDarjeeling:{name:'아삼 + 다르질링',tone:'#ad713c',aroma:'맥아의 깊이와 섬세한 과실 향',finish:'홍차의 무게감에 가벼운 과실 여운',body:'중간',tannin:'중간',blend:'두 홍차를 섞는 사례예요. 브랜드의 실제 배합 비율은 공개되지 않았어요.'},
 blackGreen:{name:'홍차 + 녹차',tone:'#b79a51',aroma:'홍차의 맥아 향과 녹차의 풋잎 향',finish:'진한 차 맛 뒤로 산뜻한 잎 향',body:'중간',tannin:'중간',blend:'콤부랩의 1:1 가상 블렌드예요. 제조용 검증 배합이 아니에요.'}
};
const groups={basic:'기본·블렌드',delicate:'백차·우롱차',rich:'진한·볶은 차',herbal:'허브'};
Object.values(teas).forEach(t=>t.group='basic');
Object.assign(teas,{"whitePeony": {"name": "백모단 백차", "group": "delicate", "tone": "#c7b579", "aroma": "은은하고 섬세한 꽃 향", "first": "가벼운 산미에 꽃 향이 또렷해지는 인상", "finish": "맑고 부드러운 꽃 향의 여운", "body": "가벼움", "tannin": "은은함", "category": "백차", "origin": "중국 차 · 독일 제조 사례", "sourceCase": "whitePeony"}, "tieguanyin": {"name": "철관음", "group": "delicate", "tone": "#b58143", "aroma": "구운 차와 캐러멜을 떠올리게 하는 향", "first": "잘 익은 과일 같은 산미와 둥근 차 맛", "finish": "볶은 향과 은근한 단향의 여운", "body": "중간", "tannin": "중간", "category": "우롱차 블렌드", "origin": "대만 차 · 대만 제조 사례", "sourceCase": "tieguanyin"}, "baozhong": {"name": "문산포종", "group": "delicate", "tone": "#bcb56b", "aroma": "난초·인동꽃과 아몬드 과자 같은 향", "first": "밝고 산뜻한 산미와 부드러운 곡물 단향", "finish": "가벼운 꽃 향과 고소한 여운", "body": "가벼움", "tannin": "은은함", "category": "약산화 우롱차", "origin": "대만 차 · 미국 제조 사례", "sourceCase": "baozhong"}, "puerh": {"name": "보이 생차", "group": "rich", "tone": "#b39a5e", "aroma": "차분한 잎 향과 여러 겹의 차 향", "first": "은근한 산미와 복합적인 차 맛", "finish": "과하게 무겁지 않은 차의 긴 여운", "body": "중간", "tannin": "중간", "category": "보이차 · 생차", "origin": "중국 윈난 차 · 독일 제조 사례", "sourceCase": "puerh"}, "hojicha": {"name": "호지차 블렌드", "group": "rich", "tone": "#a1784a", "aroma": "볶은 차와 견과류를 떠올리게 하는 향", "first": "구수한 향 위에 겹쳐지는 새콤함", "finish": "부드럽고 따뜻한 로스팅 향", "body": "중간", "tannin": "은은함", "category": "홍차 베이스 + 볶은 녹차", "origin": "일본식 볶은 녹차 · Kimi 제품 사례", "sourceCase": "hojicha"}, "earlGrey": {"name": "얼그레이 블렌드", "group": "rich", "tone": "#b88848", "aroma": "감귤류와 꽃을 떠올리게 하는 향", "first": "산뜻한 감귤 향에 약간의 쌉쌀함", "finish": "홍차의 깊이와 향긋한 여운", "body": "중간", "tannin": "중간", "category": "홍차 베이스 + 얼그레이", "origin": "향을 더한 홍차 · Kimi 제품 사례", "sourceCase": "earlGrey"}, "lapsang": {"name": "정산소종", "group": "rich", "tone": "#9d693f", "aroma": "소나무 장작과 훈연을 떠올리게 하는 향", "first": "짙은 훈연 향과 둥글고 부드러운 산미", "finish": "나무 향과 길게 남는 스모키한 여운", "body": "도톰함", "tannin": "중간", "category": "훈연 홍차", "origin": "중국식 훈연차 · 미국 제조 사례", "sourceCase": "lapsang"}, "rooibos": {"name": "루이보스", "group": "herbal", "tone": "#b16b39", "aroma": "부드러운 단향과 은은한 감귤 향", "first": "매끄러운 질감과 둥근 단향의 인상", "finish": "차의 떫은맛보다 부드러운 향이 남는 끝맛", "body": "중간", "tannin": "은은함", "category": "허브 원료 · 찻잎 아님", "origin": "남아프리카 원료 · 대만 제조 사례", "sourceCase": "rooibos"}});
const fruits={
 pineapple:{name:'파인애플',rect:[65,45,475,455],aroma:'밝고 잘 익은 열대 과일 향',taste:'새콤달콤하고 즙이 많은 인상',acid:2,sweet:2},
 passion:{name:'패션프루트',rect:[580,85,425,400],aroma:'멀리까지 퍼지는 진한 열대 과일 향',taste:'입안을 또렷하게 깨우는 산미',acid:3,sweet:1},
 lychee:{name:'리치',rect:[1040,135,480,340],aroma:'장미와 청포도를 떠올리게 하는 달콤한 향',taste:'부드럽고 둥근 단향',acid:0,sweet:3},
 mango:{name:'망고',rect:[65,570,475,380],aroma:'잘 익은 망고의 농밀한 향',taste:'부드럽고 풍성한 과육 느낌',acid:0,sweet:3},
 lemon:{name:'레몬',rect:[575,535,435,435],aroma:'산뜻한 감귤 껍질 향',taste:'날렵하고 선명한 산미',acid:3,sweet:0},
 lavender:{name:'라벤더',rect:[1050,490,460,490],aroma:'차분한 허브·꽃 향',taste:'많아지면 비누처럼 느껴질 수 있는 향',acid:0,sweet:0}
};
Object.assign(fruits,{
 raspberry:{name:'라즈베리',aroma:'',taste:'',acid:2,sweet:1},
 ginger:{name:'생강',aroma:'',taste:'',acid:0,sweet:0},
 sage:{name:'세이지',aroma:'',taste:'',acid:0,sweet:0}
});
const cases=[
 {id:'tropical',name:'자스민 트로피컬',region:'홍콩',tea:'jasmine',fruits:['pineapple','passion'],brand:'On The Wagon · Jasmine Green Tea',fact:'공식 소개에 자스민 녹차와 파인애플·패션프루트 풍미가 등장해요.',note:'파인애플·패션프루트는 제품의 풍미 표현이에요. 실제 과일 첨가 여부·양은 확인되지 않아 앱에서는 과육으로 비교해요.'},
 {id:'lychee',name:'리치 우롱',region:'홍콩',tea:'oolong',fruits:['lychee'],brand:'On The Wagon · Lychee Oolong',fact:'공식 제품은 우롱차에 리치 풍미를 결합하며 청포도 같은 인상도 소개해요.',note:'리치·청포도는 제품의 풍미 설명이에요. 청포도를 추가한 조합을 뜻하지 않아요.'},
 {id:'lavender',name:'파인애플 라벤더',region:'중국 본토 · 베이징',tea:'black',fruits:['pineapple','lavender'],brand:'The PuXuan 공식 메뉴 · MOMING',fact:'파인애플·라벤더 조합은 확인되지만, 완성 제품의 맛 설명과 상세 배합은 공개되어 있지 않아요.',note:'메뉴에는 개별 제품의 차 종류와 배합 비율이 없어요. 홍차 베이스는 콤부랩의 응용 선택이에요.'},
 {id:'mango',name:'망고 패션프루트',region:'대만',tea:'oolong',fruits:['mango','passion'],brand:'Kai · 有機芒果百香康普茶',fact:'공식 성분 소개는 대만 망고·패션프루트와 유기농 우롱차의 조합이에요.',note:'공개된 원재료 조합을 참고했어요. 브랜드 제조법을 재현한 것은 아니에요.'},
 {id:'blend',name:'두 가지 홍차',region:'홍콩',tea:'assamDarjeeling',fruits:[],brand:'On The Wagon · Assam & Darjeeling',fact:'아삼과 다르질링을 섞은 콤부차예요. 공식 설명은 사과·캐러멜 같은 풍미를 제시해요.',note:'사과는 풍미 표현이며 실제 사과를 넣었다는 뜻이 아니에요. 브랜드 배합 비율은 공개되지 않았어요.'}
];
cases.push(...[{"id": "whitePeony", "name": "백모단 백차 콤부차", "region": "독일 · 중국 백차", "brand": "Bärbucha · Pai Mu Tan", "fact": "백모단 백차·설탕·콤부차 배양액으로 제조한 공식 사례예요. 제조사는 발효 뒤 섬세한 꽃 향이 더 드러난다고 설명해요.", "note": "제조·판매 사례를 참고했어요. 제조 비율은 공개되지 않았어요.", "tea": "whitePeony", "fruits": []}, {"id": "tieguanyin", "name": "철관음 콤부차", "region": "대만", "brand": "Kai · 鐵觀音康普茶", "fact": "공식 성분은 대만 철관음과 유기농 우롱차, 사탕수수당, SCOBY예요. 볶은 캐러멜 향과 과일 같은 산미를 소개해요.", "note": "철관음만 사용한 제품이 아니라 우롱차와 함께 쓴 사례예요. 실제 혼합 비율은 공개되지 않았어요.", "tea": "tieguanyin", "fruits": []}, {"id": "baozhong", "name": "문산포종 발효차", "region": "미국 · 대만 차", "brand": "Unified Ferments · Wen Shan Bao Zhong", "fact": "문산포종과 설탕, 콤부차 스타터를 사용한 발효차예요. 공식 설명은 난초·인동꽃·마지팬 같은 향을 제시해요.", "note": "브랜드가 발효차로 소개하는 제품이에요. 아몬드 과자 같은 향은 풍미 표현이며 아몬드 첨가를 뜻하지 않아요.", "tea": "baozhong", "fruits": []}, {"id": "puerh", "name": "보이 생차 콤부차", "region": "독일 · 중국 윈난 차", "brand": "Bärbucha · Pu-erh", "fact": "윈난산 보이 생차로 만든 제조 사례예요. 제조사는 복합적이지만 과하게 강하지 않은 맛과 비교적 밝은 차색을 설명해요.", "note": "2026년 5월 정규 제품은 중단됐고, 생차·숙차 특별 제품을 예고했어요. 이 선택은 과거 생차 사례이며 진한 숙차와 구분해요.", "tea": "puerh", "fruits": []}, {"id": "hojicha", "name": "호지차 블렌드", "region": "Kimi · 일본식 차", "brand": "Kimi Kombucha · Hojicha", "fact": "공식 원재료는 홍차·설탕·SCOBY로 만든 콤부차 베이스와 볶은 일본 녹차예요. 구수한 로스팅 향과 새콤함을 소개해요.", "note": "호지차 단독 1차 발효 사례로 해석하지 않았어요. 추가 시점과 비율은 공개되지 않았어요.", "tea": "hojicha", "fruits": []}, {"id": "earlGrey", "name": "얼그레이 블렌드", "region": "Kimi · 가향 홍차", "brand": "Kimi Kombucha · Earl Grey", "fact": "공식 원재료는 홍차 콤부차 베이스와 얼그레이예요. 감귤·꽃 향과 약간의 쌉쌀함을 설명해요.", "note": "가향차를 결합한 제품 사례예요. 얼그레이만으로 종균을 배양하는 제조법을 뜻하지 않아요.", "tea": "earlGrey", "fruits": []}, {"id": "lapsang", "name": "정산소종 발효차", "region": "미국 · 중국식 차", "brand": "Unified Ferments · Lapsang Souchong", "fact": "정산소종·설탕·콤부차 스타터를 사용한 발효차예요. 소나무 장작 훈연 향과 부드러운 질감, 둥근 산미를 소개해요.", "note": "공식 제품의 풍미를 참고한 가상 베이스예요. 나무 향은 표현이며 나무를 넣는 실습이 아니에요.", "tea": "lapsang", "fruits": []}, {"id": "rooibos", "name": "루이보스 콤부차", "region": "대만 · 남아프리카 원료", "brand": "Min Min · 南非國寶茶", "fact": "루이보스로 양조한 공식 제품 사례예요. 제조사는 매끄러운 질감과 단향, 감귤 향을 소개해요.", "note": "루이보스는 차나무 잎이 아닌 허브 원료예요. 제품 사례가 일반 홍차 배양법과 동일한 조건을 보장하지는 않아요. 단향은 당 함량이 아니에요.", "tea": "rooibos", "fruits": []}]);
cases.unshift(
 {id:'gtGolden',name:'골든 파인애플 · 3종',region:'미국',tea:'blackGreen',fruits:['pineapple','lemon','sage'],amounts:{pineapple:40,lemon:6,sage:.2},brand:"GT’s · Golden Pineapple",fact:'공식 원재료에 파인애플 주스·레몬 주스·세이지가 기재되어 있어요.',tasteSummary:'제조사는 파인애플의 선명한 과일 향에 은은한 세이지 향과 레몬의 새콤함이 더해진다고 설명해요.',note:'완성 제품의 공식 설명입니다. 제품 베이스에는 홍차·녹차 외에 키위 주스 등이 사용돼요. 제조사의 배합량은 공개되지 않았어요. 앱은 과육·레몬 조각·식용 세이지 잎을 쓰는 시음용 제안으로, 주스 원료인 제품을 재현하지 않아요.'},
 {id:'gtTrilogy',name:'트릴로지 · 3종',region:'미국',tea:'blackGreen',fruits:['raspberry','lemon','ginger'],amounts:{raspberry:30,lemon:6,ginger:2},brand:"GT’s · Trilogy",fact:'공식 원재료에 라즈베리 주스·레몬 주스·착즙 생강 주스가 기재되어 있어요.',tasteSummary:'제조사는 라즈베리의 새콤함, 레몬의 산뜻함, 생강의 알싸한 자극이 어우러진다고 설명해요.',note:'완성 제품의 공식 설명입니다. 제품 베이스에는 홍차·녹차 외에 키위 주스 등이 사용돼요. 제조사의 배합량은 공개되지 않았어요. 앱은 라즈베리 과육·레몬 조각·얇은 생강 조각으로 실험하며, 주스 원료인 제품과 같은 맛을 보장하지 않아요.'}
);
// Product tasting notes are explicit: a menu listing alone is not sensory evidence.
const caseProfiles={
  "tropical": {
    "tasteSummary": "파인애플·패션프루트를 떠올리게 하는 열대 과일 향에 자스민 꽃 향이 남아요.",
    "tasteTip": "마신 뒤에도 꽃 향이 남는지 느껴 보세요."
  },
  "lychee": {
    "tasteSummary": "과즙을 떠올리게 하는 리치 향과 섬세한 우롱차 향. 청포도 같은 풍미도 느껴지는 제품이에요.",
    "tasteTip": "리치 향과 차 향 중 무엇이 더 또렷한지 비교해 보세요."
  },
  "lavender": {
    "tasteSummary": null,
    "tasteTip": "파인애플만 넣은 잔과 라벤더도 넣은 잔의 향을 비교해 보세요."
  },
  "mango": {
    "tasteSummary": "진한 망고 향과 패션프루트의 새콤달콤함이 어우러져요. 우롱차를 바탕으로 한 열대 과일 풍미예요.",
    "tasteTip": "망고 향과 새콤함 중 무엇이 먼저 느껴지는지 살펴보세요."
  },
  "blend": {
    "tasteSummary": "맥아 향의 아삼과 섬세한 다르질링이 만나, 사과를 떠올리게 하는 산뜻함과 캐러멜 풍미를 내요.",
    "tasteTip": "사과·캐러멜은 향을 빗댄 말이에요. 첨가 재료와 구분해 보세요."
  },
  "whitePeony": {
    "tasteSummary": "백차의 섬세한 꽃 향이 발효 뒤 더 또렷해지는 제품이에요.",
    "tasteTip": "마시기 전 향과 삼킨 뒤 남는 향을 비교해 보세요."
  },
  "tieguanyin": {
    "tasteSummary": "볶은 차의 진한 향과 캐러멜 같은 단향에 과일을 떠올리게 하는 산미가 겹쳐요.",
    "tasteTip": "달콤하게 느껴지는 향과 혀에 느껴지는 단맛을 구분해 보세요."
  },
  "baozhong": {
    "tasteSummary": "난초·인동꽃을 떠올리게 하는 꽃 향과 아몬드 과자 같은 풍미가 어우러져요.",
    "tasteTip": "아몬드 과자는 향을 빗댄 말이며 아몬드를 넣었다는 뜻은 아니에요."
  },
  "puerh": {
    "tasteSummary": "여러 겹의 차 풍미가 느껴지면서도, 지나치게 강하지 않고 은은한 맛으로 소개돼요.",
    "tasteTip": "이 사례는 보이 생차예요. 숙차와 구분해서 골라 보세요."
  },
  "hojicha": {
    "tasteSummary": "볶은 차의 구수함과 견과류 같은 향에 새콤함이 더해져요. 부드러운 질감도 특징이에요.",
    "tasteTip": "마시기 전 구수한 향과 입안의 새콤함을 차례로 느껴 보세요."
  },
  "earlGrey": {
    "tasteSummary": "감귤·꽃 향이 또렷하고, 차의 쌉쌀함이 함께 느껴지는 제품이에요.",
    "tasteTip": "감귤 향과 혀에 남는 쌉쌀함을 나누어 느껴 보세요."
  },
  "lapsang": {
    "tasteSummary": "소나무 장작을 떠올리게 하는 짙은 훈연 향에 부드러운 질감과 둥근 산미가 이어져요.",
    "tasteTip": "훈연 향은 차를 가공할 때 생겨요. 나무를 넣는 조합은 아니에요."
  },
  "rooibos": {
    "tasteSummary": "매끄러운 질감에 달콤한 향과 감귤 향이 피어나는 제품이에요.",
    "tasteTip": "향이 달콤하게 느껴지는 것과 실제 단맛을 비교해 보세요."
  },
  "gtGolden": {
    "tasteSummary": "파인애플의 선명한 과일 풍미에 은은한 세이지 향과 레몬의 새콤함이 더해져요.",
    "tasteTip": "과일 향 사이로 허브 향이 얼마나 느껴지는지 살펴보세요."
  },
  "gtTrilogy": {
    "tasteSummary": "라즈베리의 새콤함과 레몬의 산뜻함에 생강의 알싸한 자극이 어우러져요.",
    "tasteTip": "레몬의 신맛과 생강의 알싸함을 나누어 느껴 보세요."
  }
};
cases.forEach(c=>Object.assign(c,caseProfiles[c.id]));
const defaults={pineapple:40,passion:15,lychee:30,mango:40,lemon:6,lavender:.1};
Object.assign(defaults,{raspberry:30,ginger:2,sage:.2});
const prepared={pineapple:{unit:5,label:'껍질 뺀 과육',color:'#efbd4d',kind:'cube'},passion:{unit:3,label:'껍질 뺀 과육·씨',color:'#dc9c34',kind:'pulp'},lychee:{unit:5,label:'껍질·씨 뺀 과육',color:'#ede8cc',kind:'half'},mango:{unit:5,label:'껍질 뺀 과육',color:'#e9a12e',kind:'cube'},lemon:{unit:2,label:'얇게 자른 조각',color:'#e0cf65',kind:'slice'},lavender:{unit:.02,label:'식용 말린 꽃',color:'#b7a0ba',kind:'buds'}};
Object.assign(prepared,{raspberry:{unit:3,label:'라즈베리 과육',color:'#c44b64',kind:'berry'},ginger:{unit:1,label:'얇게 자른 생강',color:'#d7bf7b',kind:'slice'},sage:{unit:.1,label:'식용 세이지 잎',color:'#879a82',kind:'leaf'}});
const recommendations={"black": {"amounts": {"mango": 40, "lemon": 6}, "name": "망고 레몬"}, "green": {"amounts": {"lychee": 30, "lemon": 4}, "name": "리치 레몬"}, "jasmine": {"amounts": {"pineapple": 40, "passion": 15}, "name": "자스민 트로피컬"}, "oolong": {"amounts": {"lychee": 40, "lemon": 4}, "name": "리치 우롱"}, "assamDarjeeling": {"amounts": {"mango": 35, "lemon": 6}, "name": "망고 홍차"}, "blackGreen": {"amounts": {"pineapple": 35, "lychee": 25}, "name": "밸런스 과일차"}, "whitePeony": {"amounts": {"lychee": 25, "lemon": 2}, "name": "은은한 리치 백차"}, "tieguanyin": {"amounts": {"mango": 35, "passion": 10}, "name": "망고 철관음"}, "baozhong": {"amounts": {"lychee": 30, "pineapple": 20}, "name": "꽃향 과일 포종"}, "puerh": {"amounts": {"pineapple": 35, "lemon": 4}, "name": "상큼한 보이차"}, "hojicha": {"amounts": {"mango": 40}, "name": "망고 호지차"}, "earlGrey": {"amounts": {"lychee": 30, "lemon": 4}, "name": "리치 얼그레이"}, "lapsang": {"amounts": {"pineapple": 40, "mango": 25}, "name": "스모키 트로피컬"}, "rooibos": {"amounts": {"mango": 35, "lemon": 5}, "name": "부드러운 망고 루이보스"}};
function empty(){return {tea:'jasmine',fruits:[],preset:'tropical',step:0,mixed:false,baseMl:500,dose:1,amounts:{}};}
function validate(x){if(!x||!teas[x.tea]||!Array.isArray(x.fruits)||x.fruits.length>Object.keys(fruits).length||new Set(x.fruits).size!==x.fruits.length||x.fruits.some(id=>!fruits[id])||!Number.isInteger(x.step)||x.step<0||x.step>2||typeof x.mixed!=='boolean'||!['custom',...cases.map(c=>c.id)].includes(x.preset))throw Error('맛 실험 기록을 읽지 못했어요.');
 const baseMl=x.baseMl??500,dose=x.dose??1,amounts=x.amounts??{};
 if(![250,500,1000].includes(baseMl)||![.5,1,1.5].includes(dose)||!amounts||typeof amounts!=='object'||Array.isArray(amounts)||Object.entries(amounts).some(([id,v])=>!fruits[id]||typeof v!=='number'||!Number.isFinite(v)||v<=0||v>100||(['lavender','sage'].includes(id)&&v>1)))throw Error('재료 분량을 읽지 못했어요.');
 return {tea:x.tea,fruits:[...x.fruits],preset:x.preset,step:x.step,mixed:x.mixed,baseMl,dose,amounts:{...amounts}};
}
function preset(id){const c=cases.find(c=>c.id===id);if(!c)throw Error('사례를 찾지 못했어요.');return {...empty(),tea:c.tea,preset:c.id};}
function amount(x,id){return Math.round((x.amounts?.[id]??defaults[id])*(x.baseMl??500)/500*(x.dose??1)*100)/100;}
function portions(x){return x.fruits.map(id=>({id,grams:amount(x,id),count:Math.max(1,Math.ceil(amount(x,id)/prepared[id].unit))}));}
// Qualitative ingredient-based estimates; not measurements or a validated sensory model.
const flavorTraits={
 pineapple:{note:'파인애플의 새콤달콤한 과일 풍미',role:'과일 풍미',weight:1},
 passion:{note:'패션프루트의 진한 열대 과일 향과 산미',role:'산미·열대 향',weight:1.2},
 lychee:{note:'리치의 꽃을 닮은 달콤한 향',role:'꽃·과일 향',weight:1},
 mango:{note:'망고의 풍성하고 달콤한 향',role:'풍성한 과일 향',weight:1},
 lemon:{note:'레몬의 선명한 새콤함',role:'산미',weight:1.1},
 lavender:{note:'라벤더의 꽃 향',role:'꽃 향',weight:1.1},
 raspberry:{note:'라즈베리의 새콤한 베리 풍미',role:'베리 향·산미',weight:1},
 ginger:{note:'생강의 알싸한 자극',role:'알싸함',weight:1.1},
 sage:{note:'세이지의 솔잎을 닮은 허브 향',role:'허브 향',weight:1.1}
};
const estimateSources=[
 {name:'라벤더의 꽃 향 · McCormick FONA'},
 {name:'세이지의 향 · McCormick'},
 {name:'베리·레몬·생강 풍미 · GT’s'},
 {name:'망고·패션프루트 풍미 · Kai'}
];
function estimate(x){
 const tea=teas[x.tea],components=x.fruits.map(id=>{const f=flavorTraits[id],relative=amount(x,id)/(x.baseMl||500)*500/defaults[id];return {id,name:fruits[id].name,grams:amount(x,id),relative,role:f.role,note:f.note,score:relative*f.weight};}).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
 if(!components.length)return {easy:tea.aroma+'에 콤부차의 새콤함이 더해질 것으로 예상돼요.',tip:'과일 없이 '+tea.finish+'에 집중해 보세요.',components};
 let easy;
 if(components.length<=3)easy=components.map(c=>c.note).join(', ')+' 등의 특징이 어우러질 것으로 예상돼요.';
 else easy=components.slice(0,2).map(c=>c.note).join(', ')+' 등을 중심으로, 나머지 '+(components.length-2)+'가지 재료의 향이 겹치는 복합적인 맛으로 예상돼요.';
 if(x.fruits.length===2&&x.fruits.includes('pineapple')&&x.fruits.includes('lavender'))easy='파인애플의 새콤달콤한 풍미에 라벤더의 꽃 향이 겹쳐, 꽃 향 나는 파인애플 티처럼 느껴질 것으로 예상돼요.';
 const density=components.reduce((n,c)=>n+c.relative,0)/components.length;
 let tip=density<.75?'재료를 적게 넣어 '+tea.name+'의 향이 비교적 잘 남을 것으로 예상돼요.':density>1.25?'재료를 넉넉히 넣어 과일·허브의 풍미가 '+tea.name+'보다 두드러질 수 있어요.':tea.name+'의 '+tea.aroma+'이 바탕에 남을 것으로 예상돼요.';
 const strongHerb=components.find(c=>['lavender','sage','ginger'].includes(c.id)&&c.relative>1.25);
 if(strongHerb)tip=strongHerb.name+'의 '+strongHerb.role+'이 다른 재료를 덮을 수 있어요. 은은한 맛을 원하면 양을 줄여 보세요.';
 return {easy,tip,components};
}
function evidence(x){return cases.find(c=>c.tea===x.tea&&c.fruits.length===x.fruits.length&&c.fruits.every(id=>x.fruits.includes(id)))||null;}
function recommendation(x){const c=cases.find(c=>c.id===x.preset&&c.tea===x.tea);if(c&&c.fruits.length)return {name:c.name,amounts:{...(c.amounts||Object.fromEntries(c.fruits.map(id=>[id,defaults[id]])))},reason:c.tasteTip,source:c};const r=recommendations[x.tea];return {...r,reason:'재료를 넣기 전과 후를 비교해 보세요. 한 번에 한 가지 양만 바꾸면 차이를 찾기 쉬워요.',source:null};}
function recommendedState(x){const r=recommendation(x);return {...validate(x),fruits:Object.keys(r.amounts),amounts:{...r.amounts},preset:r.source?.id||'custom',step:2,mixed:false};}
function tasting(x){const c=evidence(x);if(!c?.tasteSummary){const e=estimate(x);return {supported:false,kind:'estimated',label:'예상되는 맛',easy:e.easy,aroma:'',first:e.easy,finish:'',tip:e.tip,components:e.components,tags:[],source:c};}return {supported:true,kind:'documented',label:'이 제품은 이런 맛이에요',easy:c.tasteSummary,aroma:'',first:c.tasteSummary,finish:'',tip:c.tasteTip,components:[],tags:[],source:c};}
const api={teas,groups,fruits,cases,defaults,prepared,recommendations,flavorTraits,estimateSources,estimate,empty,validate,preset,amount,portions,recommendation,recommendedState,evidence,tasting};if(typeof module!=='undefined'&&module.exports)module.exports=api;else g.KombuFlavorModel=api;
})(globalThis);
