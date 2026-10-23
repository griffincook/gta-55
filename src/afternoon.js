export const afternoonSteps=[
 {phase:'car',id:'house',title:'School pickup already?',copy:'Three different stops explored. The school day has flown by. Walk home for the car; hockey and soccer gear are waiting.',action:'Collect the car and sports bags',reply:'Sports bags aboard. Drive to the schools and collect both kids.'},
 {phase:'pickup',id:'elementary',title:'The backpack reunion.',copy:'Pick up both kids at the shared Joseph Gould / Uxbridge Secondary stop.',action:'Collect both kids',reply:'Two kids aboard. Older one to hockey first; younger one to soccer next.'},
 {phase:'hockey',id:'arena',title:'Hockey-bag logistics.',copy:'Drop the older child at Uxbridge Arena, 291 Brock Street West.',action:'Drop the older child at hockey',reply:'Hockey bag delivered. The younger one is ready for soccer at Kennedy Fields.'},
 {phase:'soccer',id:'kennedy',title:'Soccer boots on.',copy:'Take the younger child to Kennedy Fields / Fields of Uxbridge. You can play pickleball here while soccer is on.',action:'Drop the younger child at soccer',reply:'Soccer underway. Your own highly competitive pickleball era begins.'},
 {phase:'pickleball',id:'kennedy',title:'Parent-athlete unlocked.',copy:'A little pickleball while the youngest plays soccer. Return three balls, or enjoy the sidelines.',action:'Play pickleball',reply:'Soccer finished. Youngest back beside you. Collect the older child from hockey, then dinner.'},
 {phase:'hockeypickup',id:'arena',title:'One more hockey-bag lift.',copy:'Soccer is over. Return to the rink to collect the older child so everyone can go to Sundays together.',action:'Collect the older child from hockey',reply:'Whole family reunited. Next stop: Sundays for dinner.'},
 {phase:'dinner',id:'sundays',title:'Finally, somebody else cooks.',copy:'Sports are done. Settle in at Sundays, featured in the MICHELIN Guide, for an imaginary family dinner. Small-town life, very good dinner plans.',action:'Sit down for family dinner',reply:'School, errands, trails, sports and dinner. One very full Uxbridge day. Your house is ready for its next family.'}
];
const phases=['wander',...afternoonSteps.map(s=>s.phase),'done'];
export const downtownPlaces=['coffee','books','roxy','bakery','library','sundays','market','brewery','trail','elgin','uxbridgeps','arena','kennedy','meatmerchant'];
export function loadAfternoon(storage){try{const s=JSON.parse(storage.getItem('ontario-afternoon-v1'));return {phase:phases.includes(s?.phase)?s.phase:'wander',visits:[...new Set((Array.isArray(s?.visits)?s.visits:[]).filter(id=>downtownPlaces.includes(id)))]};}catch{return {phase:'wander',visits:[]};}}
export function recordAfternoonVisit(state,id){if(state.phase!=='wander'||!downtownPlaces.includes(id))return state;const visits=[...new Set([...state.visits,id])];return {...state,visits,phase:visits.length>=3?'car':'wander'};}
export const afternoonTask=state=>afternoonSteps.find(s=>s.phase===state.phase)||null;
export function advanceAfternoon(state,id){const task=afternoonTask(state);return task?.id===id?{...state,phase:phases[phases.indexOf(state.phase)+1]}:state;}
export const afternoonMode=state=>['wander','car','pickleball'].includes(state.phase)?'walk':'drive';
export const rallyHit=fraction=>fraction>=.2&&fraction<=.8;
