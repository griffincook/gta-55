// Transcribed from the menu photograph supplied by the owner, not a live stock list.
export const ciders=[
 {id:'founders-zero',name:'Founder’s Zero',style:'Bone dry',abv:'6.6%',notes:'Clean apple flavour, zero added sugar.',colour:'#a2b9a2'},
 {id:'founders-dry',name:'Founder’s Dry',style:'Dry',abv:'6.4%',notes:'Ontario apples with subtle lemon zest and apple blossom.',colour:'#b6a36f'},
 {id:'hint-o-hops',name:'Hint O’ Hops',style:'Dry',abv:'6.4%',notes:'A hint of hops, lemon and bitterness.',colour:'#8caa59'},
 {id:'legendary-cherry',name:'Legendary Cherry',style:'Off-dry',abv:'5.8%',notes:'Niagara Montmorency cherry and apple.',colour:'#b45f60'},
 {id:'black-currant',name:'Black Currant',style:'Semi-sweet',abv:'6.0%',notes:'Dark fruit and real black currants.',colour:'#75516e'},
 {id:'ginger-spritz',name:'Ginger Spritz',style:'Semi-sweet',abv:'5.5%',notes:'Fresh ginger with sea salt and thyme.',colour:'#c4a45b'},
 {id:'mojito-de-manzana',name:'Mojito de Manzana',style:'Semi-sweet',abv:'6.4%',notes:'Apple, mint and freshly squeezed lime.',colour:'#97ae4e'},
 {id:'honey-habanero',name:'Honey Habanero',style:'Semi-sweet',abv:'6.2%',notes:'Honey sweetness and warm habanero heat.',colour:'#ce9352'},
 {id:'raspberry-tea',name:'Raspberry Tea',style:'Semi-sweet',abv:'5.9%',notes:'Tart raspberry meets smooth hibiscus tea.',colour:'#bd626e'},
 {id:'pineapple-mimosa',name:'Pineapple Mimosa',style:'Semi-sweet',abv:'6.2%',notes:'Pineapple, citrus and lively bubbles.',colour:'#d0ba56'}
];
export const findCider=id=>ciders.find(c=>c.id===id)||null;
export const ciderItem=day=>findCider(day.choices?.slabtown)?.name||'A bottle of cider';
