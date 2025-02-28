import { fetchBooks, fetchCoverArts } from "./js_modules/apiService.js";
import { formatBooksData } from "./js_modules/dataFormatter.js";
import { displayBooks } from "./js_modules/domUpdater.js";

async function loadBooks() {
    try {
        const booksData = await fetchBooks();
        if (!booksData?.books?.book) {
            console.error("Erreur: données des livres non disponibles", booksData);
            return;
        }

        // Récupérer les couvertures
        const coverArtsPromises = booksData.books.book.map(book => fetchCoverArts(book.id));
        const coverArtsDataArray = await Promise.all(coverArtsPromises);
        const coverArtsData = coverArtsDataArray.flat();

        // Formater les données
        const formattedBooks = formatBooksData(booksData.books.book, coverArtsData);

        // Mettre à jour le DOM
        displayBooks(formattedBooks);
    } catch (error) {
        console.error("Erreur lors du chargement des livres :", error);
    }
}

// Lancer la récupération des livres au chargement
loadBooks();