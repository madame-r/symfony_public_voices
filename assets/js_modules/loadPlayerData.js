import { fetchBooks, fetchCoverArts, fetchAudioTracks } from './apiService.js';
import { formatPlayerData } from './dataFormatter.js';
import { initAudiobookCover } from './initAudiobookCover.js';
import { playerNavigation } from './playerNavigation.js';
import { playerProgressBar } from './playerProgressBar.js';
import { setupFavoriteButton } from './setupFavoriteButton.js';


export async function loadPlayerData(audiobookId) {
    try {
        const books = await fetchBooks();
        const coverArts = await fetchCoverArts(audiobookId);
        const audioTracks = await fetchAudioTracks(audiobookId);




        //Affichage dans la console des données brutes pour exploration
        console.log("Données brutes des livres (books) :", books);
        console.log("Données brutes des couvertures (coverArts) :", coverArts);
        console.log("Données brutes des pistes audio (audioTracks) :", audioTracks);




        const formattedData = formatPlayerData(audiobookId, books, coverArts, audioTracks);

        if (!formattedData) return;

        const initPlayerUI = () => {
            initAudiobookCover(formattedData);
            playerNavigation(formattedData.audioTracks);
            playerProgressBar();
            setupFavoriteButton(formattedData);
        };

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", initPlayerUI);
        } else {
            initPlayerUI();
        }

    } catch (error) {
        console.error("Error loading player data:", error);
    }

}
