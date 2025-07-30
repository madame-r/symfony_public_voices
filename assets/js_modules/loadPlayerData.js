import { fetchBookById, fetchCoverArts, fetchAudioTracks } from './apiService.js';
import { formatPlayerData } from './dataFormatter.js';
import { initAudiobookCover } from './initAudiobookCover.js';
import { playerNavigation } from './playerNavigation.js';
import { playerProgressBar } from './playerProgressBar.js';
import { setupFavoriteButton } from './setupFavoriteButton.js';

function getSelectedBookFromSession(audiobookId) {
    const bookJson = sessionStorage.getItem("selectedBook");
    if (!bookJson) return null;
    try {
        const book = JSON.parse(bookJson);
        return Number(book.id) === Number(audiobookId) ? book : null;
    } catch {
        return null;
    }
}

export async function loadPlayerData(audiobookId) {
    try {
        // Essaie d'abord de récupérer les données depuis sessionStorage
        const selectedBook = getSelectedBookFromSession(audiobookId);

        let books, coverArts, audioTracks;

        if (selectedBook) {
            books = { books: [selectedBook] };
            coverArts = await fetchCoverArts(audiobookId);
            audioTracks = await fetchAudioTracks(audiobookId);
        } else {

            books = await fetchBookById(audiobookId);
            coverArts = await fetchCoverArts(audiobookId);
            audioTracks = await fetchAudioTracks(audiobookId);
        }

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
