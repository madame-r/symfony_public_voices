
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





async function fetchBooks(limit = 6, offset = 0) {
    const endpoint = `books?limit=${limit}&offset=${offset}`;
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


export {fetchBooks, fetchCoverArts, fetchGenres, fetchAudioTracks };