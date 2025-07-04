async function displayBooks(books, append = false) {

    try {
        console.log("Affichage des livres :", books);

        const booksList = document.getElementById("books-list");
        if (!booksList) {
            console.error("Element #books-list introuvable !");
            return;
        }

        if (!append) {
            booksList.innerHTML = "";  // vide la liste uniquement si append = false
        }

        // Afficher tous les livres reçus
        books.forEach(book => {
            console.log("Affichage du livre :", book);

            const li = document.createElement("li");

            const link = document.createElement("a");
            link.href = `/player/${Number(book.id)}`;

            const img = document.createElement("img");
            img.src = book.cover;
            img.alt = `Couverture de ${book.title}`;
            link.appendChild(img);
            li.appendChild(link);

            const title = document.createElement("h3");
            title.textContent = book.title;
            li.appendChild(title);

            const author = document.createElement("p");
            author.textContent = `${book.author}`;
            li.appendChild(author);

            booksList.appendChild(li);
        });
        
    } catch (error) {
        console.error("Erreur lors de l'affichage des livres:", error);
    }
}


export { displayBooks };
