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

    // Stocker les données nécessaires dans une propriété JS personnalisée
    div.audiobookData = {
      id: book.librivox_book_id,
      title: book.title,
      authors: book.authors,
      language: book.language || 'Unknown'  // Adapter selon la donnée reçue de l'API
    };

    div.innerHTML = `
      <div class="fav-01">
        <img src="${book.cover_thumbnail_url}" alt="Couverture de ${book.title}" />
      </div>

      <div class="fav-02">
        <h3>${book.title}</h3>
        <p>${book.authors.map(author => `${author.first_name} ${author.last_name}`).join(', ')}</p>
      </div>

      <div class="fav-03">
        <i class="bi bi-trash3"></i>
      </div>
    `;

    container.appendChild(div);
  });

  // Ajout du listener click sur les icônes poubelle après création du DOM
  document.querySelectorAll('.bi-trash3').forEach(icon => {
    icon.addEventListener('click', async (event) => {
      const favItem = event.target.closest('.favorite-item');
      if (!favItem) return;

      const audiobookData = favItem.audiobookData;
      if (!audiobookData) {
        console.error('Données du livre manquantes');
        return;
      }

      try {
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(audiobookData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erreur API: ${errorText}`);
        }

        // Suppression visuelle de l'élément de la liste
        favItem.remove();
        console.log('Favori supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression du favori:', error);
        alert('Une erreur est survenue, veuillez réessayer.');
      }
    });
  });
}

function initFavorites() {
  displayFavorites();
}

export { initFavorites };
