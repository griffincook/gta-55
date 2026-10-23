// Route metres stay geographic; game movement is deliberately accelerated.
export function remainingDistance(position,path,index=1,destination=position){
 if(path.length<2)return Math.hypot(position[0]-destination[0],position[1]-destination[1]);
 const next=Math.min(Math.max(1,index),path.length-1);let d=Math.hypot(position[0]-path[next][0],position[1]-path[next][1]);
 for(let i=next+1;i<path.length;i++)d+=Math.hypot(path[i][0]-path[i-1][0],path[i][1]-path[i-1][1]);return d;
}
export function travelEstimate(metres,mode){
 if(metres<25)return 'At your destination';
 // Typical local driving average (including junctions), or a normal walking pace.
 const minutes=Math.max(1,Math.round(metres/(mode==='walk'?5000:30000)*60));
 return `~${minutes} min ${mode==='walk'?'walk':'drive'} · real-world estimate`;
}
