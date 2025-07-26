import { fetchFavorites } from './apiService.js';

async function displayFavorites() {
    const container = document.getElementById('favorites-container');

    if (!container) {
        console.error('Element #favorites-container introuvable.');
        return;
    }

    container.innerHTML = '<p>Chargement des favoris...</p>';

    const favorites = await fetchFavorites();

    if (!favorites || favorites.length === 0) {
        container.innerHTML = '<p>Aucun favori enregistré.</p>';
        return;
    }

    container.innerHTML = ''; // Vide le container avant d'afficher

    favorites.forEach(book => {
        const div = document.createElement('div');
        div.className = 'favorite-item';
        div.innerHTML = `
            <h3>${book.title}</h3>
            <img src="${book.cover_thumbnail_url}" alt="Couverture de ${book.title}" />
            <p>Durée : ${Math.floor(book.total_time_seconds / 60)} min</p>
            <hr />
        `;
        container.appendChild(div);
    });
}

export { displayFavorites };
