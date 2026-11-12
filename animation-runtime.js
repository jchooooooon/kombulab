(function(g){'use strict';
// Count visible animation frames only, including the short completion beats.
function createTimeline({requestFrame=requestAnimationFrame,cancelFrame=cancelAnimationFrame,isHidden=()=>document.hidden,onVisibility=fn=>{document.addEventListener('visibilitychange',fn);return ()=>document.removeEventListener('visibilitychange',fn);}}={}){
 let job=null,frameId=0;
 const unlisten=onVisibility(()=>{if(job)job.last=null;});
 function cancel(){cancelFrame(frameId);frameId=0;job=null;}
 function play(duration,tick,done){cancel();const current={elapsed:0,last:null};job=current;
  function frame(now){if(job!==current)return;if(isHidden()){current.last=null;frameId=requestFrame(frame);return;}
   const delta=current.last===null?0:Math.min(100,Math.max(0,now-current.last));current.last=now;current.elapsed+=delta;
   const p=Math.min(1,current.elapsed/Math.max(1,duration));tick(p,Math.min(.033,delta/1000));
   if(job!==current)return;if(p<1)frameId=requestFrame(frame);else{job=null;frameId=0;done();}}
  frameId=requestFrame(frame);
 }
 return {play,cancel,destroy(){cancel();unlisten();}};
}
const pending=new WeakMap(),failed=new WeakSet();
function readyImage(img,timeout=15000){
 if(img.complete&&img.naturalWidth>0)return Promise.resolve(true);
 if(pending.has(img))return pending.get(img);
 const promise=new Promise(resolve=>{
  let timer;const finish=ok=>{clearTimeout(timer);img.removeEventListener('load',loaded);img.removeEventListener('error',error);if(!ok)failed.add(img);else failed.delete(img);resolve(ok);};
  const loaded=()=>finish(img.naturalWidth>0),error=()=>finish(false);
  img.addEventListener('load',loaded);img.addEventListener('error',error);timer=setTimeout(error,timeout);
  if(failed.has(img)||img.complete){const src=img.src;img.src=src;}
 }).finally(()=>pending.delete(img));pending.set(img,promise);return promise;
}
const api={createTimeline,readyImage};if(typeof module!=='undefined'&&module.exports)module.exports=api;else g.KombuRuntime=api;
})(globalThis);
