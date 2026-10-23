export function compassDirection(input){let x=Number(!!input.east)-Number(!!input.west),z=Number(!!input.south)-Number(!!input.north);const length=Math.hypot(x,z);return length?{x:x/length,z:z/length,moving:true}:{x:0,z:0,moving:false};}
export function compassStep(body,input,dt,segments,walking=false){
 const direction=compassDirection(input);
 if(!direction.moving){body.speed=0;return;}
 const target=walking?60:38;
 body.speed=walking?target:Math.min(target,Math.max(0,body.speed)+80*dt);
 body.yaw=Math.atan2(direction.x,direction.z);
 const distance=body.speed*dt*(walking?1:3);
 body.x+=direction.x*distance;body.z+=direction.z*distance;
}
