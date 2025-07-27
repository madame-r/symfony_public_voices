import { loadBooks } from "./booksLoader.js";

function setupSearchBar() {
    const input = document.getElementById('search-input');
    const icon = document.querySelector('.search-icon');

    if (!input || !icon) {
        console.error('Élément input ou icône recherche introuvable.');
        return;
    }

    icon.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const searchTerm = input.value.trim();
        console.log("Recherche lancée avec :", searchTerm);
        loadBooks({ search: searchTerm, reset: true });
    });
}


export { setupSearchBar };
