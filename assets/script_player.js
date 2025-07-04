
import { fetchBooks, fetchCoverArts, fetchAudioTracks } from './js_modules/apiService.js';
import { formatPlayerData } from './js_modules/dataFormatter.js';

import { initAudiobookCover } from './js_modules/initAudiobookCover.js';
import { playerNavigation } from './js_modules/playerNavigation.js';
import { playerProgressBar } from './js_modules/playerProgressBar.js';






const audiobookId = Number(window.location.pathname.split('/').pop());
console.log(audiobookId);

async function loadPlayerData(audiobookId) {

    try {

        const books = await fetchBooks();

        console.log("books reçus côté player :", books);

        const coverArts = await fetchCoverArts(audiobookId);
        const audioTracks = await fetchAudioTracks(audiobookId);

        const formattedData = formatPlayerData(audiobookId, books, coverArts, audioTracks);



        if (formattedData) {
            console.log("Test de la condition if avec formattedData :", true);
            console.log("Ajout de l'écouteur DOMContentLoaded");

            if (document.readyState === "loading") {

                // Le DOM n'est pas encore chargé, on écoute l'événement

                document.addEventListener("DOMContentLoaded", () => {
                    console.log("L'événement DOMContentLoaded s'est déclenché !");
                    console.log("Données formatées pour initAudiobookCover :", formattedData);
                    initAudiobookCover(formattedData);
                    playerNavigation(formattedData.audioTracks);
                    playerProgressBar();
                });
            } else {
                // Le DOM est déjà chargé, on exécute directement
                console.log("Le DOM était déjà chargé, exécution immédiate !");
                initAudiobookCover(formattedData);
                playerNavigation(formattedData.audioTracks);
                playerProgressBar();
            }
        }

    } catch (error) {
        console.error("Erreur lors du chargement des données du player:", error);
    }


}

loadPlayerData(audiobookId);
