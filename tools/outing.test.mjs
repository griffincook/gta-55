import {test} from 'node:test';
import assert from 'node:assert/strict';
import {itinerary,advanceOuting,loadOuting,outingMode,buyDogToy,dogWalkLine} from '../src/outing.js';
import {places} from '../src/day.js';
test('the family day requires both school drop-offs, groceries, walk, then home; cider is optional',()=>{
 let s={next:0,cider:false};
 assert.equal(advanceOuting(s,'house'),s);
 for(const task of itinerary){assert(places.some(p=>p.id===task.id));assert.equal(advanceOuting(s,'slabtown'),s);s=advanceOuting(s,task.id);}
 assert.equal(s.next,6);assert.equal(s.cider,false);assert.equal(outingMode(s),'walk');assert.equal(advanceOuting(s,'house'),s);
});
test('only the preserve outing and downtown chapters switch to walking',()=>{
 assert.deepEqual([0,1,2,3,4,5,6].map(next=>outingMode({next})),['walk','walk','drive','drive','walk','drive','walk']);
});
test('outing saves recover invalid data and keep optional cider progress',()=>{
 for(const raw of ['{oops','null','{"next":-1}','{"next":99}','{"next":2.3}'])assert.equal(loadOuting({getItem:()=>raw}),null);
 assert.deepEqual(loadOuting({getItem:()=>'{"next":4,"cider":true}'}),{next:5,cider:true,version:3,hasToy:false});
});

test('new saves retain the correct walking chapter while older saves migrate',()=>{assert.equal(loadOuting({getItem:()=>JSON.stringify({next:4,version:2})}).next,4);assert.equal(loadOuting({getItem:()=>JSON.stringify({next:5})}).next,6);});

test('combined school walk returns home for dog and car before driving',()=>{let state={next:0,cider:false,version:3};assert.equal(outingMode(state),'walk');state=advanceOuting(state,'elementary');assert.equal(itinerary[state.next].id,'house');assert.equal(outingMode(state),'walk');state=advanceOuting(state,'house');assert.equal(itinerary[state.next].id,'vinces');assert.equal(outingMode(state),'drive');assert.equal(loadOuting({getItem:()=>JSON.stringify({next:1,version:2})}).next,0);assert.equal(loadOuting({getItem:()=>JSON.stringify({next:1,version:3})}).next,1);});

test('optional Walmart toy never advances or gates the walk and changes its payoff',()=>{const without={next:3,cider:false,version:3,hasToy:false};const withToy=buyDogToy(without);assert.equal(withToy.next,3);assert.equal(withToy.hasToy,true);assert.equal(advanceOuting(without,'trailparking').next,4);assert.equal(advanceOuting(withToy,'trailparking').next,4);assert(dogWalkLine(withToy).includes('Walmart toy'));assert(dogWalkLine(without).includes('No new toy needed'));assert.equal(loadOuting({getItem:()=>JSON.stringify(withToy)}).hasToy,true);});
