export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function closest(p,a,b){const dx=b[0]-a[0],dz=b[1]-a[1],t=clamp(((p[0]-a[0])*dx+(p[1]-a[1])*dz)/(dx*dx+dz*dz||1),0,1);return [a[0]+dx*t,a[1]+dz*t];}
export function nearest(p,segments){let best=null;for(const s of segments){const q=closest(p,s.a,s.b),d=Math.hypot(p[0]-q[0],p[1]-q[1]);if(!best||d<best.d)best={...s,q,d};}return best;}
// Forgiving arcade terrain: grass slows the car without trapping it at an invisible wall.
export function step(car,input,dt,segments){
 const road=nearest([car.x,car.z],segments);
 const off=road?road.d>road.width/2+1:false;
 const powered=input.gas||input.brake;
 const accel=input.gas?18:input.brake?(car.speed>0?-28:-9):0;
 car.speed=clamp((car.speed+accel*dt)*Math.exp(-(input.drift?1.8:off?.65:.3)*dt),-12,off?16:38);
 // Never round away a powered movement: physics runs several tiny steps per frame.
 if(!powered&&Math.abs(car.speed)<.03)car.speed=0;
 car.yaw+=(input.steer||0)*car.speed/4.6*(input.drift?.95:.58)*dt*2/(1+Math.abs(car.speed)*.035);
 car.x+=Math.sin(car.yaw)*car.speed*dt*3;
 car.z+=Math.cos(car.yaw)*car.speed*dt*3;
 return nearest([car.x,car.z],segments);
}
export function routeBetween(segments,start,end){const key=p=>p.map(v=>v.toFixed(2)).join(','),nodes=new Map();for(const s of segments){for(const p of [s.a,s.b])if(!nodes.has(key(p)))nodes.set(key(p),{p,edges:[],d:Infinity});const a=nodes.get(key(s.a)),b=nodes.get(key(s.b)),w=Math.hypot(a.p[0]-b.p[0],a.p[1]-b.p[1]);a.edges.push([b,w]);b.edges.push([a,w]);}const near=p=>[...nodes.values()].reduce((a,b)=>Math.hypot(a.p[0]-p[0],a.p[1]-p[1])<Math.hypot(b.p[0]-p[0],b.p[1]-p[1])?a:b);const from=near(start),to=near(end),pending=new Set(nodes.values());from.d=0;while(pending.size){let u=null;for(const n of pending)if(!u||n.d<u.d)u=n;if(u.d===Infinity)break;pending.delete(u);if(u===to)break;for(const [v,w]of u.edges)if(u.d+w<v.d){v.d=u.d+w;v.prev=u;}}if(to.d===Infinity)return [];const path=[end];for(let n=to;n;n=n.prev)path.push(n.p);path.push(start);return path.reverse();}
