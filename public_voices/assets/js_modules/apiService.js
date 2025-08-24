
/* API LIBRIVOX ******************************************** */


const BASE_URL = "/api/librivox/";

async function fetchData(endpoint) {

    try {

        const response = await fetch(`${BASE_URL}${endpoint}`);

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
        }

        return await response.json();

    } catch (error) {

        console.error("Erreur lors de la récupération des données:", error);
        return null;
    }
}





async function fetchBooks(limit = 6, offset = 0, search = null) {
    let endpoint = `books?limit=${limit}&offset=${offset}`;
    if (search && search.trim() !== '') {
        endpoint += `&search=${encodeURIComponent(search.trim())}`;
    }
    return await fetchData(endpoint);
}


async function fetchCoverArts(audiobookId) {
    return await fetchData(`${audiobookId}/coverarts`);
}

async function fetchGenres(audiobookId) {
    return await fetchData(`${audiobookId}/genres`);
}

async function fetchAudioTracks(audiobookId) {
    return await fetchData(`${audiobookId}/audiotracks`);
}


async function fetchBookById(id) {
    return await fetchData(`books/${id}`);
}



/* API USER ACCOUNT  ******************************************** */

const USER_ACCOUNT_BASE_URL = "/api/";

async function fetchFavorites() {
    try {
        const response = await fetch(`${USER_ACCOUNT_BASE_URL}favorites`, {
            headers: {
                "Accept": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des favoris:", error);
        return null;
    }
}



export { fetchBooks, fetchCoverArts, fetchGenres, fetchAudioTracks, fetchBookById, fetchFavorites };