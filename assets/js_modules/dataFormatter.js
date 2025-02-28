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

export { formatBooksData };