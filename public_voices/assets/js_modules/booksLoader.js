import { fetchBooks, fetchCoverArts } from "./apiService.js";
import { formatBooksData } from "./dataFormatter.js";
import { displayBooks } from "./domUpdater.js";

const LIMIT = 6;
let offset = 0;
let loading = false;
let allLoaded = false;
let currentSearch = null;  // stocke la recherche en cours

async function loadBooks(options = {}) {


    if (loading || allLoaded) return;
    loading = true;

    const { search = currentSearch, reset = false } = options;

    if (reset) {
        offset = 0;
        allLoaded = false;
        document.getElementById('books-list').innerHTML = '';
    }

    currentSearch = search;

    try {

        console.log("Paramètres envoyés à fetchBooks:", LIMIT, offset, search);
        const booksData = await fetchBooks(LIMIT, offset, search);
        console.log("Réponse complète de l'API:", booksData);

        const booksArray = Array.isArray(booksData.books) ? booksData.books : [];

        if (booksArray.length === 0) {
            allLoaded = true; // Plus de livres à charger
            window.removeEventListener('scroll', handleScroll);
            console.log("Plus de livres à charger");
            return;
        }

        // Récupérer les couvertures pour les livres chargés
        const coverArtsPromises = booksArray.map(book => fetchCoverArts(book.id));
        const coverArtsDataArray = await Promise.all(coverArtsPromises);
        const coverArtsData = coverArtsDataArray.flat();

        // Formater les données
        const formattedBooks = formatBooksData(booksArray, coverArtsData);

        // Ajouter les livres dans le DOM (append ou nouveau contenu si reset)
        displayBooks(formattedBooks, !reset);

        offset += LIMIT;

    } catch (error) {
        console.error("Erreur lors du chargement des livres :", error);
    } finally {
        loading = false;
    }
}

function handleScroll() {
    console.log("handleScroll déclenché");

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;

    if (scrollPosition >= threshold) {
        loadBooks({ search: currentSearch });
    }
}

function setupLazyLoading() {
    window.addEventListener('scroll', handleScroll);
}

export { loadBooks, setupLazyLoading };
