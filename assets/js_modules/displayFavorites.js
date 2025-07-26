import { fetchFavorites } from './apiService.js';

async function displayFavorites() {
    const container = document.getElementById('favorites-container');

    if (!container) {
        console.error('Element #favorites-container introuvable.');
        return;
    }

    container.innerHTML = '<p>Loading favorites...</p>';

    const favorites = await fetchFavorites();

    if (!favorites || favorites.length === 0) {
        container.innerHTML = '<p>No favorites saved.</p>';
        return;
    }

    container.innerHTML = ''; // Vide le container avant d'afficher

    favorites.forEach(book => {
        const div = document.createElement('div');
        div.className = 'favorite-item';
        div.innerHTML = `

        <div class="fav-01">
            <img src="${book.cover_thumbnail_url}" alt="Couverture de ${book.title}" />
        </div>

        <div class="fav-02">
            <h3>${book.title}</h3>
            <p> ${book.authors.map(author => `${author.first_name} ${author.last_name}`).join(', ')}</p>
        </div>

        <div class="fav-03">
            <i class="bi bi-trash3"></i>
        </div>

        `;
        container.appendChild(div);
    });
}

export { displayFavorites };
