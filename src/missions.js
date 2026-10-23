import {findCider} from './ciders.js';
export const sideQuests=[
 {id:'marketday',title:'Market day, next door',copy:'Browse the farmers’ market, then pop next door to The Second Wedge.',steps:[['market','Find something at the farmers’ market'],['brewery','Discover The Second Wedge']],reward:'Local regular'},
 {id:'movies',title:'A very local premiere',copy:'Make a movie-night plan at the Roxy. No open-house film here—this one is your night out.',steps:[['roxy','Choose your movie-night plan']],reward:'Small-town film critic'},
 {id:'bookworm',title:'Just one more chapter',copy:'Visit the library, then find your next read at Blue Heron Books.',steps:[['library','Pick up a lead at the library'],['books','Choose a book at Blue Heron Books']],reward:'Brock Street bookworm'},
 {id:'picnic',title:'Operation: extremely good lunch',copy:'Collect Little Thief pastries and Meat Merchant sandwiches, then unpack lunch at Elgin Park.',steps:[['bakery','Collect baked goods at Little Thief'],['meatmerchant','Collect Meat Merchant sandwiches'],['elgin','Unpack your picnic at Elgin Park']],reward:'Picnic professional'},
 {id:'cider',title:'“We’re already out…”',copy:'A perfectly optional country detour. Choose a bottle at Slabtown to take home for later.',steps:[['slabtown','Choose your take-home bottle']],reward:'Scenic-route specialist'}
];
export function loadMissions(storage){try{const s=JSON.parse(storage.getItem('ontario-missions-v1'));return {tracked:sideQuests.some(q=>q.id===s?.tracked)?s.tracked:'main',picnic:s?.picnic===true};}catch{return {tracked:'main',picnic:false};}}
export const hasSandwich=day=>day.done.includes('meatmerchant')&&day.choices.meatmerchant==='sandwich';
export const picnicReady=(day,state)=>!state.picnic&&day.done.includes('bakery')&&hasSandwich(day);
export function completePicnic(day,state){return picnicReady(day,state)?{...state,picnic:true}:state;}
export function sideProgress(quest,day,state){const steps=quest.steps.map(([id,label])=>({id,label,done:quest.id==='picnic'?(id==='elgin'?state.picnic:id==='meatmerchant'?hasSandwich(day):day.done.includes(id)):day.done.includes(id)}));return {...quest,steps,done:steps.every(s=>s.done),target:steps.find(s=>!s.done)?.id||null};}
export function mainMissions(outing,afternoon,morning){const n=outing?.next??-1;const active=n>=0;const phases=['wander','car','pickup','hockey','soccer','pickleball','hockeypickup','dinner','done'];const a=phases.indexOf(afternoon.phase);return [
 {id:'ready',title:'Get ready & leave the house',done:active||morning.next>=5,target:'house',detail:'Wake up, collect the children, let out the dog and leave the house.'},
 {id:'school',title:'Walk the kids to school',done:n>=1,target:'elementary',detail:'One stop for Joseph Gould and Uxbridge Secondary.'},
 {id:'groceries',title:'Grocery shop',done:n>=3,target:n===1?'house':'vinces',detail:n===1?'Head home for the dog and car first.':'Collect your groceries at Vince’s Market.'},
 {id:'dog',title:'Take the dog for a walk',done:n>=5,target:n<4?'trailparking':'dogwalk',detail:'Park behind Walmart, then explore the Preserve. A new toy is optional.'},
 {id:'home',title:'Go home',done:n>=6,target:'house',detail:'Watch the open-house film, unpack the groceries and settle the dog.'},
 {id:'downtown',title:'A little power-walk',done:n>=6&&a>=1,target:null,detail:`Explore three different locations (${Math.min(3,afternoon.visits.length)}/3), then collect the car.`},
 {id:'sports',title:'Take the kids to sports',done:n>=6&&a>=7,target:({car:'house',pickup:'elementary',hockey:'arena',soccer:'kennedy',pickleball:'kennedy',hockeypickup:'arena'})[afternoon.phase]||'house',detail:'School pickup, hockey, soccer and a little pickleball. Collect both kids afterwards.'},
 {id:'dinner',title:'Dinner at Sundays',done:n>=6&&afternoon.phase==='done',target:'sundays',detail:'Everyone together for dinner after sports.'}
 ].map((m,i,list)=>({...m,status:m.done?'completed':list.slice(0,i).every(s=>s.done)?'current':'later'}));}
export function inventory(day,outing,afternoon,missions){const items=[];const add=(id,name,note,status='In your bag')=>items.push({id,name,note,status});for(const id of day.done){const c=day.choices[id];switch(id){
 case 'coffee':add(id,Number(c)===1?'Maple coffee':'Classic coffee','The Bridge Social · your order');break;
 case 'books':add(id,Number(c)===1?'Local-history book':'Mystery novel','Blue Heron Books · your reading choice');break;
 case 'bakery':add(id,'Little Thief baked goods',missions.picnic?'Shared at your Elgin Park picnic.':Number(c)===1?'A gift. Possibly to yourself.':'Packed as trail provisions.',missions.picnic?'Enjoyed':'In your bag');break;
 case 'meatmerchant':add(id,c==='sandwich'?'Meat Merchant sandwiches':Number(c)===0?'Barbecue provisions':'Butcher’s recommendation',missions.picnic&&c==='sandwich'?'Shared at Elgin Park.':'Your butcher-shop choice.',missions.picnic&&c==='sandwich'?'Enjoyed':c==='sandwich'?'In your bag':'Collected');break;
 case 'market':add(id,Number(c)===1?'Market flowers':'Local apples','Your farmers’ market find');break;
 case 'brewery':add(id,Number(c)===1?'Brewery plan with friends':'Second Wedge take-home find','The Second Wedge · your choice',Number(c)===1?'Plans & keepsakes':'In your bag');break;
 case 'roxy':add(id,Number(c)===1?'Everything Everywhere All at Uxbridge':'The Fast and the Mildly Inconvenienced','Your imaginary movie-night plan','Plans & keepsakes');break;
 case 'library':add(id,Number(c)===1?'Historic house lead':'Trail lead','A clue from the library','Plans & keepsakes');break;
 case 'sundays':if(c==='dinner')break;add(id,Number(c)===1?'A wave to a friend':'Sundays menu to go','Your downtown discovery','Plans & keepsakes');break;
 case 'vinces':add(id,'Vince’s grocery bag','Milk, bread, apples and one necessary snack.',outing?.next>=6?'At home':'In your bag');break;
 case 'slabtown':add(id,findCider(c)?.name||'Slabtown cider','Your chosen bottle, saved for later.',outing?.next>=6?'At home':'In your bag');break;
 }}if(outing?.hasToy)add('toy','Squeaky dog toy',outing.next>=5?'Trail-tested. The dog approves.':'Ready for a trail debut.',outing.next>=6?'At home':'With the dog');if(afternoon.phase==='done')add('dinner','Family dinner at Sundays','School, errands and sports: done.','Memories');if(missions.picnic)add('picnic','Elgin Park picnic','Pastries + sandwiches + a very good patch of grass.','Memories');return items;}
