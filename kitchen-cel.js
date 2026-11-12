/* Fixed character bodies and an intact arm/hand/tool stirring cel. */
(function(g){'use strict';
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n)),mix=(a,b,t)=>a+(b-a)*t,ease=t=>{t=clamp(t);return t*t*(3-2*t);},scale=.82,offsetX=46,offsetY=18,counterY=578;
function point(x,y,dx=0,dy=0){return {x:x*scale+offsetX+dx,y:y*scale+offsetY+dy};}
function frame(c){const p=clamp(c.p||0);if(c.kind==='sip')return {group:'sip',index:p<.2?0:p<.4?1:p<.78?2:3,dx:0,dy:0};if(c.kind==='stir')return {group:'stir',index:0,dx:0,dy:c.flavors?20:0};if(c.done)return {group:'extra',index:3,dx:0,dy:0};let group='extra',index=2,dx=0,dy=0;
 if(['pour','starter'].includes(c.kind)){group='pour';index=p<.15?0:p<.35?1:p<.85?2:3;}
 if(['tea','sugar','fruit'].includes(c.kind)){group='add';const f=c.dragging?clamp((c.pointer.x-170)/170)*.6:p;index=f<.15?0:f<.35?1:f<.85?2:3;}
 if(c.kind==='strain'){group='extra';index=p>.25&&p<.85?1:0;}
 if(c.kind==='cover'){group='care';index=p<.4?0:1;dx=42;dy=-15;}
 if(c.kind==='measure'||c.kind==='cool'){group='care';index=p<.35?2:3;dx=c.kind==='measure'?54:0;}
 return {group,index,dx,dy};}
function pourTip(c){if(c.kind==='strain')return point(262,406);if(['tea','sugar','fruit'].includes(c.kind))return point(342,520);return point(332,444);}
function vessel(step,flavors){const cx=[7,12].includes(step)&&!flavors?198:310,k=flavors?1.25:1,w=200*k,h=220*k,base=flavors?720:670,y=base-h;return {id:'beaker',x:cx-w/2,y,w,h,cx,surface:y+26*k,bottom:base-16*k};}
function sampleVessel(kind){const cx=kind==='measure'?380:326;return {x:cx-41,y:515,w:82,h:80,cx,surface:539,bottom:580};}
function fruitSize(id){return ({lychee:57,sage:57,lemon:65,lavender:28,ginger:42,raspberry:42,passion:48})[id]||51;}
// Independent seeded dimensions prevent a row or a diagonal of identical particles.
function noise(n){const x=Math.sin(n*127.1+19.7)*43758.5453;return x-Math.floor(x);}
function ingredientPiece(type,i){const n=i+(type==='sugar'?300:0);return {x:(noise(n+11)-.5)*124,depth:type==='tea'?.06+noise(n+73)*.86:.76+noise(n+73)*.19,angle:noise(n+137)*Math.PI*2,size:type==='tea'?18+noise(n+211)*12:6+noise(n+211)*5,variant:i%3,spin:(noise(n+293)-.5)*2,flight:.115+noise(n+341)*.05};}
function liquid(step,p,flavors){const fill=ease((p-.35)/.5);if(flavors)return {level:.86,tea:1};if(step===0)return {level:0,tea:0};if(step===1)return {level:fill*.43,tea:0};if(step===2)return {level:.43,tea:.08*fill};if(step===3)return {level:.43,tea:.08+.92*p};if(step===4)return {level:ease((p-.25)/.6)*.43,tea:1};if(step<8)return {level:.43,tea:1};if(step===8)return {level:.43+.344*fill,tea:1};return {level:.774+(step===9?.086*fill:.086),tea:1};}
function liquidY(v,l){return v.bottom-(v.bottom-v.surface)*l.level;}
// One intact arm/hand/rod sprite rotates as a rigid piece beneath the fixed sleeve.
// No pixels of the face, apron, waist, hair, background or vessel are displaced.
function stirPose(c){const amp=c.active&&!c.done?Math.sin(Math.PI*clamp(c.p)):0;return {pivotX:159,pivotY:419,angle:.18+Math.sin((c.p||0)*Math.PI*7)*.045*amp};}
function drawStir(ctx,images,c,foreground=false){const body=images['stir-body'],arm=images['stir-arm'];if(!body?.naturalWidth||!arm?.naturalWidth)return;const q=stirPose(c);
 ctx.save();ctx.translate(offsetX,offsetY);ctx.scale(scale,scale);if(!foreground){ctx.drawImage(body,0,0,512,768);ctx.restore();return;}
 ctx.save();ctx.translate(q.pivotX,q.pivotY);ctx.rotate(q.angle);ctx.translate(-q.pivotX,-q.pivotY);
 ctx.drawImage(arm,0,0,512,768);ctx.restore();
 // Sleeve occludes the overlapping upper-arm cap, so the joint remains connected.
 ctx.drawImage(body,100,359,115,63,100,359,115,63);ctx.restore();
}
function create(asset,onload,fruit){const images={},names=['stage','beaker','ingredients','stir-body','stir-arm','cover','cup','plate',...['pour','add','care','extra','sip'].flatMap(a=>[0,1,2,3].map(i=>a+'-'+i))];for(const name of names){const i=new Image();i.onload=onload;i.src=asset('assets/'+(['cover','cup','plate'].includes(name)?'kitchen/':'lab/')+name+'.webp');images[name]=i;}
 function img(ctx,name,x,y,w,h){const i=images[name];if(i?.naturalWidth)ctx.drawImage(i,x,y,w,h);}
 function grain(ctx,type,x,y,size,angle=0,variant=0){const atlas=images.ingredients;if(!atlas?.naturalWidth)return;ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.drawImage(atlas,variant*512,type==='tea'?0:512,512,512,-size/2,-size/2,size,size);ctx.restore();}
 function interior(ctx,v){const k=v.w/200;ctx.beginPath();ctx.roundRect(v.cx-79*k,v.surface,158*k,v.bottom-v.surface,12*k);}
 function fluid(ctx,v,l){if(!l.level)return;const y=liquidY(v,l);ctx.save();interior(ctx,v);ctx.clip();
 const gradient=ctx.createLinearGradient(0,y,0,v.bottom);gradient.addColorStop(0,l.tea?`rgba(204,133,42,${.14+l.tea*.45})`:'rgba(177,217,235,.27)');gradient.addColorStop(1,l.tea?`rgba(163,91,24,${.15+l.tea*.5})`:'rgba(159,205,225,.36)');ctx.fillStyle=gradient;ctx.fillRect(v.x,y,v.w,v.bottom-y+2);
 ctx.fillStyle=l.tea?'#e6b65f80':'#e5f4fb80';ctx.strokeStyle=l.tea?'#b97a3970':'#a6d3e580';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(v.cx,y+3,77*v.w/200,9,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore();
 }
 function grainsInLiquid(ctx,c,v,l){const p=clamp(c.p||0),tea=c.step===2||c.step===3,sugar=c.step===5||c.step===6;if(!tea&&!sugar||c.flavors)return;
  const filling=c.step===2||c.step===5,count=tea?24:44,y=liquidY(v,l),type=tea?'tea':'sugar';ctx.save();interior(ctx,v);ctx.clip();ctx.beginPath();ctx.rect(v.cx-79,y+2,158,v.bottom-y-2);ctx.clip();
  for(let i=0;i<count;i++){const q=ingredientPiece(type,i),arrival=.35+i/count*.34+q.flight;if(filling&&p<arrival)continue;const age=filling?clamp((p-arrival)/.17):1,stir=c.kind==='stir'?p*14:0,dissolve=sugar&&c.step===6?ease(clamp(p*1.25-noise(i+49)*.2)):0;
   const px=v.cx+q.x*Math.cos(stir)+Math.sin(stir+q.angle)*8*(stir?1:0),py=y+9+(v.bottom-y-21)*q.depth*ease(age)+(tea?Math.sin(p*5+q.angle)*2:Math.sin(stir+q.angle)*6*(stir?1:0));ctx.globalAlpha=(1-dissolve)*.92;grain(ctx,type,px,py,q.size*(1-dissolve*.7),q.angle+q.spin*p+stir,q.variant);}
  ctx.restore();
 }
 function stream(ctx,a,b,p,color){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.quadraticCurveTo(a.x+3,(a.y+b.y)/2,b.x,b.y);ctx.stroke();ctx.strokeStyle='#fff6dfb3';ctx.lineWidth=1.5;ctx.setLineDash([6,12]);ctx.lineDashOffset=-p*250;ctx.stroke();ctx.setLineDash([]);ctx.strokeStyle='#fff7db90';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(b.x,b.y,10+Math.sin(p*45)*4,3,0,0,Math.PI*2);ctx.stroke();ctx.restore();}
 function draw(ctx,c){const p=clamp(c.p||0),f=frame(c),v=vessel(c.step,c.flavors),l=liquid(c.step,p,c.flavors);ctx.clearRect(0,0,512,768);
  const bg=images.stage;if(bg.naturalWidth)ctx.drawImage(bg,0,0,512,768);
  ctx.save();ctx.beginPath();ctx.rect(0,0,512,counterY);ctx.clip();
  if(c.kind==='stir')drawStir(ctx,images,c);else {const name=f.group+'-'+f.index,i=images[name],crop=name==='extra-1'?25:name==='care-3'?52:0;if(i?.naturalWidth)ctx.drawImage(i,crop,0,512-crop,768,offsetX+f.dx+crop*scale,offsetY+f.dy,(512-crop)*scale,768*scale);}
  ctx.restore();
  if(c.kind==='stir')drawStir(ctx,images,c,true);
  ctx.save();ctx.fillStyle='#8c5f3d20';ctx.beginPath();ctx.ellipse(v.cx,v.y+v.h-7,110,13,0,0,Math.PI*2);ctx.fill();ctx.restore();
  if(['pour','starter','strain'].includes(c.kind)&&!c.done&&p>(c.kind==='strain'?.25:.35)&&p<.85){const a=pourTip(c),target=c.kind==='strain'?point(289,477):{x:v.cx,y:liquidY(v,l)+5};stream(ctx,a,target,p,[1,8].includes(c.step)?'#cce9f9b0':'#bd7d26c0');if(c.kind==='strain')stream(ctx,point(289,577),{x:v.cx,y:liquidY(v,l)+5},p,'#bd7d26c0');}
  fluid(ctx,v,l);
  if(c.wet?.length){ctx.save();interior(ctx,v);ctx.clip();for(const w of c.wet){ctx.globalAlpha=.96;fruit(ctx,w.id,v.cx-65*v.w/200+w.x*130*v.w/200,liquidY(v,l)+18+w.y*(v.bottom-liquidY(v,l)-40),fruitSize(w.id)*(w.size||1),w.angle*Math.PI/180);}ctx.restore();}
  grainsInLiquid(ctx,c,v,l);

  if(c.step===7&&p<.85||c.step>=1&&c.step<=6){ctx.save();ctx.strokeStyle='#fff0d270';ctx.lineWidth=3;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(v.cx-40+i*40,v.surface-15);ctx.bezierCurveTo(v.cx-55+i*40,v.surface-40,v.cx-15+i*40,v.surface-50,v.cx-35+i*40,v.surface-85);ctx.stroke();}ctx.restore();}
  if(['cool','measure'].includes(c.kind)){const sample=sampleVessel(c.kind);ctx.save();ctx.beginPath();ctx.roundRect(sample.x+10,sample.y+9,sample.w-20,sample.h-17,5);ctx.clip();ctx.fillStyle='#ce913e70';ctx.fillRect(sample.x+10,sample.surface,sample.w-20,sample.bottom-sample.surface);ctx.restore();img(ctx,'beaker',sample.x,sample.y,sample.w,sample.h);}
  if(['tea','sugar','fruit'].includes(c.kind)&&!c.done){const centers=[[166,550],[302,433],[290,468],[175,565]],b=point(...centers[f.index]),count=c.kind==='fruit'?c.fruitCount||12:c.kind==='tea'?24:44,remaining=Math.ceil(count*(1-ease((p-.35)/.5)));
   if(f.index!==2){ctx.save();ctx.beginPath();if(c.kind==='fruit')ctx.rect(b.x-49,b.y-45,98,57);else ctx.ellipse(b.x,b.y,49,12,0,0,Math.PI*2);ctx.clip();for(let i=0;i<remaining;i++){if(c.kind==='fruit')fruit(ctx,c.fruit,b.x+(i%3-1)*24,b.y-10-Math.floor(i/3)*9,fruitSize(c.fruit)*.72,i*.2);else {const q=ingredientPiece(c.kind,i);grain(ctx,c.kind,b.x+q.x*.58,b.y+(noise(i+401)-.5)*14,q.size*.72,q.angle,q.variant);}}ctx.restore();}
   if(p>(c.kind==='fruit'?.2:.35)&&p<.94){const a=pourTip(c);for(let i=0;i<count;i++){const q=ingredientPiece(c.kind,i),isFruit=c.kind==='fruit',elapsed=p-(isFruit?.2+i/count*.45:.35+i/count*.34),travel=isFruit?.23:q.flight;if(elapsed<0||elapsed>=travel)continue;const t=elapsed/travel,fp=isFruit?globalThis.KombuFlavorMotion?.create(c.fruit,i):null,targetX=fp?v.cx-65*v.w/200+fp.x*130*v.w/200:v.cx+q.x,targetY=liquidY(v,l)+(isFruit?18+.06*(v.bottom-liquidY(v,l)-40):9),x=mix(a.x+(noise(i+91)-.5)*13,targetX,t)+Math.sin(t*Math.PI)*q.spin*8,y=mix(a.y,targetY,t*t);if(isFruit)fruit(ctx,c.fruit,x,y,fruitSize(c.fruit)*(fp?.size||1),fp?fp.angle*Math.PI/180:(i+p)*.5);else grain(ctx,c.kind,x,y,q.size,q.angle+q.spin*t,q.variant);}}
  }
  img(ctx,v.id,v.x,v.y,v.w,v.h);
  if(c.kind==='cover'&&!c.done&&p>=.4&&p<=.85){const i=images['care-1'];if(i.naturalWidth){ctx.save();ctx.translate(offsetX+f.dx,offsetY+f.dy);ctx.scale(scale,scale);ctx.beginPath();const edge=[[146,575],[201,575],[223,605],[320,605],[344,575],[384,575],[388,637],[375,651],[379,679],[355,694],[337,710],[303,710],[280,715],[250,708],[229,716],[201,703],[179,696],[177,683],[157,679],[160,659],[151,645]];edge.forEach(([x,y],n)=>n?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.clip();ctx.drawImage(i,0,0,512,768);ctx.restore();}}
  if(c.step>11&&!c.flavors||c.kind==='cover'&&(c.done||p>.85))img(ctx,'cover',v.cx-130,v.y-30,260,138);
  if(c.kind==='stir'&&(c.active||c.done)){ctx.save();interior(ctx,v);ctx.clip();ctx.strokeStyle='#fff0bd9c';ctx.lineWidth=2;const a=c.angle??p*22;for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(v.cx,liquidY(v,l)+10,30+i*16,6+i*3,0,a+i,a+i+Math.PI*1.5);ctx.stroke();}ctx.restore();}
  if(c.done){ctx.save();ctx.fillStyle='#fff1c7';ctx.strokeStyle='#c58b65';ctx.lineWidth=2;for(let i=0;i<3;i++){const x=v.cx-70+i*70,y=485-Math.sin(i)*25;ctx.beginPath();ctx.moveTo(x,y-7);ctx.lineTo(x+3,y-2);ctx.lineTo(x+7,y);ctx.lineTo(x+3,y+2);ctx.lineTo(x,y+7);ctx.lineTo(x-3,y+2);ctx.lineTo(x-7,y);ctx.lineTo(x-3,y-2);ctx.closePath();ctx.fill();ctx.stroke();}ctx.restore();}
 }
 function ready(kind,step,flavors=false){const group=kind==='stir'?['stir-body','stir-arm']:['pour','starter'].includes(kind)?[0,1,2,3].map(i=>'pour-'+i):['tea','sugar','fruit'].includes(kind)?[0,1,2,3].map(i=>'add-'+i):['cool','measure','cover'].includes(kind)?[0,1,2,3].map(i=>'care-'+i):kind==='sip'?[0,1,2,3].map(i=>'sip-'+i):[0,1,2,3].map(i=>'extra-'+i);
  const required=new Set(['stage','beaker','extra-3',...group]);if(!flavors&&[2,3,5,6].includes(step))required.add('ingredients');if(kind==='cover'||step>=12&&!flavors)required.add('cover');
  return Promise.all([...required].map(name=>g.KombuRuntime.readyImage(images[name]))).then(xs=>xs.every(Boolean));}
 return {draw,images,count:names.length,ready};}
const api={create,frame,pourTip,liquid,vessel,sampleVessel,clamp,stirPose,liquidY,fruitSize,counterY,ingredientPiece};if(typeof module!=='undefined'&&module.exports)module.exports=api;else g.KombuKitchen=api;
})(globalThis);
