(function(g){'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const noise=n=>{const x=Math.sin(n*127.1+19.7)*43758.5453;return x-Math.floor(x);};
function create(id,i){const n=i+['pineapple','passion','lychee','mango','lemon','lavender','raspberry','ginger','sage'].indexOf(id)*47;
 const rest=id==='lemon'||id==='lavender'||id==='sage'?.13+noise(n+3)*.12:id==='pineapple'?.60+noise(n+3)*.23:.77+noise(n+3)*.10;
 const x=id==='sage'?.2+(i*.57)%.6:.12+((i*.61803398875+noise(n-i)*.3)%1)*.76;
 return {id,index:i,x,y:rest,restY:rest,vx:0,vy:0,angle:noise(n+1)*180-90,spin:0,depth:noise(n+5),size:.85+noise(n+7)*.3};
}
// Kinematic stirring envelope: drive the liquid, then let its angular velocity decay.
function envelope(t){return t<3.1?3.7*Math.min(1,t/.65):3.7*Math.exp(-(t-3.1)*1.05);}
function step(p,dt,flow,spoon){dt=clamp(dt,0,1/30);const dx=p.x-.5,dy=p.y-.51;
 const wake=spoon?Math.exp(-((p.x-spoon.x)**2+(p.y-spoon.y)**2)/.035):0;
 const drag=1-Math.exp(-dt*(2.2+Math.min(1,Math.abs(flow))*2.6+wake*2));
 const radius=Math.hypot(dx/.36,dy/.30),inward=Math.max(0,radius-.85)*Math.abs(flow)*.9;
 const vx=-dy*flow*.95-dx*inward,vy=dx*flow*.64-dy*inward;
 p.vx+=(vx-p.vx)*drag;p.vy+=(vy-p.vy)*drag;
 p.vy+=(p.restY-p.y)*dt*.8/(1+Math.abs(flow)*1.4);
 p.x+=p.vx*dt;p.y+=p.vy*dt;
 if(p.x<.11||p.x>.89){p.x=clamp(p.x,.11,.89);p.vx*=-.22;}
 if(p.y<.07||p.y>.9){p.y=clamp(p.y,.07,.9);p.vy*=-.18;}
 p.spin+=(flow*24-p.spin)*(1-Math.exp(-dt*2));p.angle+=p.spin*dt;
 p.depth+=(clamp(.5+dy*.8,0,1)-p.depth)*(1-Math.exp(-dt*1.5));
 return p;
}
const api={create,step,envelope,noise};if(typeof module!=='undefined'&&module.exports)module.exports=api;else g.KombuFlavorMotion=api;
})(globalThis);
