function formatBooksData(books, coverArtsArray) {
    console.log("Données des livres :", books);
    console.log("Données des couvertures :", coverArtsArray);

    // Utiliser directement les données des couvertures
    const coverArts = coverArtsArray.flatMap(coverArt => coverArt.books);

    return books.map(book => {
        let authorName = "Auteur inconnu";
        if (book.authors && book.authors.author) {
            const authorData = Array.isArray(book.authors.author) ? book.authors.author[0] : book.authors.author;
            if (authorData) {
                authorName = `${authorData.first_name || ''} ${authorData.last_name || ''}`.trim();
            }
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
    console.log("Données des livres :", books);
    console.log("Données des couvertures :", coverArtsArray);
    console.log("Données des pistes audio :", audioTracksArray);

    const coverArts = coverArtsArray.books || [];
    console.log("CoverArts traités :", coverArts);

    const audioTracks = audioTracksArray || [];
    console.log("AudioTracks traités :", audioTracks);

    const booksArray = books.books.book || [];
    console.log("BooksArray traités :", booksArray);

    const book = booksArray.find(book => Number(book.id) === bookId);
    if (!book) {
        console.error(`Livre avec ID ${bookId} non trouvé`);
        return null;
    }

    let authorName = "Auteur inconnu";
    if (book.authors && book.authors.author) {
        const authorData = Array.isArray(book.authors.author) ? book.authors.author[0] : book.authors.author;
        if (authorData) {
            authorName = `${authorData.first_name || ''} ${authorData.last_name || ''}`.trim();
        }
    }

    const coverArt = coverArts.find(cover => String(cover.id) === String(book.id));
    console.log(`Livre ID ${book.id} - CoverArt trouvé :`, coverArt);

    const audioTracksForBook = audioTracks;
    console.log("Données pour audioTracksForBook :", audioTracksForBook);

    const formattedBook = {
        id: bookId,
        title: book.title || "Titre inconnu",
        author: authorName,
        cover: coverArt ? coverArt.coverart_jpg : "default_cover.jpg",
        totalTime: coverArt ? coverArt.totaltimesecs : 0,
        zipUrl: book.url_zip_file,
        audioTracks: audioTracksForBook.map(track => ({
            id: track.id,
            title: track.title,
            chapterOrder: track.chapter_order,
            urlMp3: track.url_mp3,
            playtime: track.playtime
        }))
    };

    console.log("Livre formaté :", formattedBook);
    return formattedBook;
}


export { formatBooksData, formatPlayerData };