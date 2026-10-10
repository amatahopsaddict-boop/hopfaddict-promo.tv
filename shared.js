const DEFAULT={duration:15,noLive:true,liveTvUrl:'',
ticker:'10.10 Draft Beer ซื้อ 10 แถม 10 • Thirdstone 500 ml (17:00 - 23:00 น.) • Paulaner Oktoberfest ซื้อ 2 แถม 1 • เมนูใหม่ กุ้งสะดุ้งยำ 99.- • ชุด Party Set 1,660.-',
news:'🍺 10.10 Draft Beer!\nThirdstone ซื้อ 10 แถม 10 (500 ml)\nPaulaner Oktoberfest ซื้อ 2 แถม 1\nวันนี้ 17:00 - 23:00 น.',
music:'',beers:'',pointsUrl:'',
slides:[['promo5.jpg','10.10 Draft Beer Buy 10 Get 10'],['promo6.png','DJ Spotify + Paulaner 2 แถม 1'],['promo1.jpg','Paulaner Buy 2 Get 1'],['promo2.jpg','Party Set'],['promo4.jpg','กุ้งสะดุ้งยำ 99.-']].map(([f,t])=>({id:'initial_'+f,src:'assets/'+f,title:t,active:true})),
musicItems:[{time:'19:40',name:'Acoustic Duo',day:'จ.'},{time:'21:10',name:'Rock Night',day:'จ.'},{time:'19:40',name:'Indie Night',day:'อ.'}],
beerItems:[{name:'Thirdstone Peach & Passion 500 ml',price:'10 แถม 10'},{name:'Thirdstone Weizen 500 ml',price:'10 แถม 10'},{name:'Paulaner Oktoberfest 500 ml',price:'2 แถม 1'},{name:'Paulaner Weissbier 500 ml',price:'270.-'},{name:'Paulaner Dunkel 500 ml',price:'270.-'},{name:'Asahi 500 ml',price:'150.-'},{name:'Hoegaarden Rosée 500 ml',price:'หมด'},{name:'Budweiser 500 ml',price:'หมด'}]};
const KEY='hopf_tv_v10';function load(){try{return {...DEFAULT,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return structuredClone(DEFAULT)}}
function save(data){localStorage.setItem(KEY,JSON.stringify(data));try{new BroadcastChannel('hopf_tv').postMessage('update')}catch{}}
function openDB(){return new Promise((resolve,reject)=>{let r=indexedDB.open('hopf_tv_images',1);r.onupgradeneeded=()=>r.result.createObjectStore('images');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
async function putImage(id,file){const db=await openDB();return new Promise((resolve,reject)=>{let tx=db.transaction('images','readwrite');tx.objectStore('images').put(file,id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)})}
async function getImage(id){const db=await openDB();return new Promise((resolve,reject)=>{let tx=db.transaction('images','readonly');let r=tx.objectStore('images').get(id);r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>reject(r.error)})}
async function deleteImage(id){const db=await openDB();return new Promise((resolve)=>{let tx=db.transaction('images','readwrite');tx.objectStore('images').delete(id);tx.oncomplete=resolve;tx.onerror=resolve})}
async function urlFor(s){if(s.src)return s.src;const b=await getImage(s.id);return b?URL.createObjectURL(b):''}
