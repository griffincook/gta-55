import test from 'node:test';
import assert from 'node:assert/strict';
import {resetGame,gameSaveKeys} from '../src/reset-game.js';
import {loadMorning} from '../src/morning-state.js';
import {loadOuting} from '../src/outing.js';
import {loadAfternoon} from '../src/afternoon.js';
import {loadMissions} from '../src/missions.js';
import {loadDay,loadReads} from '../src/day.js';
test('whole-game reset clears all progress, preserves unrelated storage, and reloads a fresh day',()=>{const data=new Map(gameSaveKeys.map(k=>[k,JSON.stringify({next:5,phase:'done',done:['books'],tracked:'picnic',picnic:true})]));data.set('unrelated','keep');const storage={getItem:k=>data.get(k)??null,removeItem:k=>data.delete(k)};resetGame(storage);assert.deepEqual([...data],[['unrelated','keep']]);assert.equal(loadMorning(storage).next,0);assert.equal(loadOuting(storage),null);assert.equal(loadAfternoon(storage).phase,'wander');assert.deepEqual(loadMissions(storage),{tracked:'main',picnic:false});assert.deepEqual(loadDay(storage),{done:[],choices:{}});assert.equal(loadReads(storage,[]).size,0);});
