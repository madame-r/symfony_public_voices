import { fetchBooks, fetchCoverArts, fetchAudioTracks } from './js_modules/apiService.js';
import { formatPlayerData } from './js_modules/dataFormatter.js';
import { displayPlayer } from './js_modules/domUpdater.js';

const audiobookId = Number(window.location.pathname.split('/').pop());

async function loadPlayerData(audiobookId) {
    try {
        const books = await fetchBooks();
        const coverArts = await fetchCoverArts(audiobookId);
        const audioTracks = await fetchAudioTracks(audiobookId);

        const formattedData = formatPlayerData(audiobookId, books, coverArts, audioTracks);

        if (formattedData) {
            displayPlayer([formattedData]);
        } else {
            console.error("Aucune donnée formatée trouvée pour le player.");
        }
    } catch (error) {
        console.error("Erreur lors du chargement des données du player:", error);
    }
}

loadPlayerData(audiobookId);