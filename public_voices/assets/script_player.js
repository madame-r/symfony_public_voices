import { loadPlayerData } from './js_modules/loadPlayerData.js';




const audiobookId = Number(window.location.pathname.split('/').pop());
console.log("audiobookId extrait de l'URL :", audiobookId);

loadPlayerData(audiobookId);

