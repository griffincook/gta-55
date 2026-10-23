import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {nearest,step,routeBetween} from '../src/drive.js';
const data=JSON.parse(fs.readFileSync(new URL('../public/data/uxbridge.json',import.meta.url)));
const segments=data.roads.flatMap(r=>r.pts.slice(1).map((p,i)=>({a:r.pts[i],b:p,width:12,name:r.name}))).filter(s=>Math.hypot(...s.a)<1400&&Math.hypot(...s.b)<1400);
test('OSM contains downtown streets, complete closed buildings and sane coordinates',()=>{assert(data.roads.length>100);for(const n of ['Brock Street East','Brock Street West','Main Street North','Toronto Street South'])assert(data.roads.some(r=>r.name===n),n);for(const b of data.buildings)assert.deepEqual(b.pts[0],b.pts.at(-1));assert(data.house.every(Number.isFinite));});
test('real Brock Street route connects spawn to property',()=>{const a=nearest([-340,112],segments.filter(s=>s.name==='Brock Street West')).q,b=nearest(data.house,segments.filter(s=>s.name==='Brock Street East')).q;const path=routeBetween(segments,a,b);assert(path.length>6);const len=path.slice(1).reduce((s,p,i)=>s+Math.hypot(p[0]-path[i][0],p[1]-path[i][1]),0);assert(len>400&&len<800,`route ${len}m`);});

const road=[{a:[0,-5000],b:[0,5000],width:12}];
const simulate=(car,input,seconds,hz=180)=>{for(let i=0;i<seconds*hz;i++)step(car,input,1/hz,road);return car;};
test('reverse starts from rest at real substep rates, including high refresh screens',()=>{
 for(const hz of [60,180,360,720]){const car=simulate({x:0,z:0,yaw:0,speed:0},{brake:true},2,hz);assert(car.speed<-10);assert(car.z<-10);}
});
test('faster acceleration, braking through zero into reverse, and left steering',()=>{
 const car=simulate({x:0,z:0,yaw:0,speed:0},{gas:true},3);assert(car.speed>30);assert(car.z>50);
 simulate(car,{brake:true},4);assert(car.speed<-10);
 const steer=simulate({x:0,z:0,yaw:0,speed:10},{steer:1},.25);assert(steer.x>0);
});
test('off-road cars can reverse, drive back to the street, and cross the old boundary',()=>{
 const reverse=simulate({x:30,z:0,yaw:Math.PI/2,speed:0},{brake:true},3);assert(reverse.x<10);assert(reverse.speed<0);
 const forward=simulate({x:30,z:0,yaw:-Math.PI/2,speed:0},{gas:true},2);assert(forward.x<10);assert(forward.speed>0);
 const outward=simulate({x:10,z:0,yaw:Math.PI/2,speed:5},{gas:true},2);assert(outward.x>25);assert(outward.speed>0);
 for(const car of [reverse,forward,outward])assert(Object.values(car).every(Number.isFinite));
});
test('off-road travel remains slower and powered movement is frame-rate stable',()=>{
 const grass=simulate({x:50,z:0,yaw:0,speed:0},{gas:true},8);assert(grass.speed<=16);assert(grass.z>80);
 const a=simulate({x:0,z:0,yaw:0,speed:0},{gas:true},3,180),b=simulate({x:0,z:0,yaw:0,speed:0},{gas:true},3,360);assert(Math.abs(a.z-b.z)<.9);assert(Math.abs(a.speed-b.speed)<.1);
});
