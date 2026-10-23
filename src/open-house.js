export const LISTING_URL='https://www.realtor.ca/real-estate/30291114/55-brock-street-e-uxbridge';
export function loadOpenHouse(storage,outing){try{const raw=storage.getItem('ontario-open-house-v1');if(raw){const s=JSON.parse(raw);return {active:s.active===true&&s.watched!==true,watched:s.watched===true};}}catch{}return {active:!!outing&&outing.next>=2&&outing.next<6,watched:false};}
export const beginOpenHouse=()=>({active:true,watched:false});
export const endOpenHouse=()=>({active:false,watched:true});
export const houseAfterVideo=(state,playerState)=>state.active&&playerState===0?endOpenHouse():state;
