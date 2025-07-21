function formatBooksData(books, coverArtsArray) {
    console.log("Données des livres :", books);
    console.log("Données des couvertures :", coverArtsArray);

    // Utiliser directement les données des couvertures
    const coverArts = coverArtsArray.flatMap(coverArt => coverArt.books);

    return books.map(book => {
        let authorName = "Auteur inconnu";

        if (book.authors && Array.isArray(book.authors) && book.authors.length > 0) {
            const authorData = book.authors[0];
            authorName = `${authorData.first_name || ''} ${authorData.last_name || ''}`.trim();
        }

        console.log(`Livre: ${book.title}, Auteur: ${authorName}, ID: ${book.id}`);

        const coverArt = coverArts.find(cover => {
            console.log(`Comparaison des IDs de couverture: Livre ID ${book.id}, Couverture ID ${cover.id}`);
            return String(cover.id) === String(book.id);
        });

        if (coverArt) {
            console.log(`Couverture trouvée pour le livre ${book.title} (ID: ${book.id}) : ${coverArt.coverart_thumbnail}`);
        } else {
            console.log(`Aucune couverture trouvée pour le livre ${book.title} (ID: ${book.id})`);
        }

        const bookId = Number(book.id);
        console.log(`Type de bookId après conversion: ${typeof bookId}`);

        return {
            id: bookId,
            title: book.title || "Titre inconnu",
            author: authorName,
            cover: coverArt ? coverArt.coverart_thumbnail : "default_cover.jpg",
        };
    });
}

function formatPlayerData(bookId, books, coverArtsArray, audioTracksArray) {

    const coverArts = coverArtsArray.books || [];
    const audioTracks = audioTracksArray || [];
    const booksArray = books.books || [];


    const book = booksArray.find(book => Number(book.id) === bookId);
    if (!book) {
        console.error(`Livre avec ID ${bookId} non trouvé`);
        return null;
    }

    let authors = [];
    if (Array.isArray(book.authors)) {
        authors = book.authors.map(author => ({
            first_name: author.first_name || '',
            last_name: author.last_name || '',
            dob: parseInt(author.dob) || null,
            dod: parseInt(author.dod) || null
        }));
    }

    const coverArt = coverArts.find(cover => String(cover.id) === String(book.id));

    const audioTracksForBook = audioTracks
        .filter(track => typeof track.chapter_order !== "undefined")
        .sort((a, b) => a.chapter_order - b.chapter_order);



    const formattedBook = {
        id: bookId,
        title: book.title || "Titre inconnu",
        authors: authors,
        description: book.description || "",
        language: book.language || "unknown",
        urlTextSource: book.url_text_source || "",
        cover: coverArt ? coverArt.coverart_jpg : "default_cover.jpg",
        coverThumbnail: coverArt ? coverArt.coverart_thumbnail : "default_cover_thumb.jpg",
        totalTime: coverArt ? coverArt.totaltimesecs : 0,
        zipUrl: book.url_zip_file || "",
        audioTracks: audioTracksForBook.map(track => ({
            id: track.id,
            title: track.title || "Chapitre sans titre",
            chapterOrder: track.chapter_order,
            urlMp3: track.url_mp3 || "",
            playtime: track.playtime || 0
        }))
    };

    console.log("📦 Livre enrichi et formaté :", formattedBook);

    return formattedBook;
}

export { formatBooksData, formatPlayerData };