

async function displayBooks(books) {
    try {
        console.log("Affichage des livres :", books);

        const booksList = document.getElementById("books-list");
        if (!booksList) {
            console.error("Element #books-list introuvable !");
            return;
        }

        booksList.innerHTML = "";

        // Limiter l'affichage à 4 livres
        const limitedBooks = books.slice(0, 4);

        limitedBooks.forEach(book => {
            console.log("Affichage du livre :", book);

            const li = document.createElement("li");

            const title = document.createElement("h3");
            title.textContent = book.title;
            li.appendChild(title);

            const author = document.createElement("p");
            author.textContent = `Par : ${book.author}`;
            li.appendChild(author);


            const link = document.createElement("a");
            link.href = `/player/${Number(book.id)}`;

            const img = document.createElement("img");
            img.src = book.cover;
            img.alt = `Couverture de ${book.title}`;
            link.appendChild(img)
            li.appendChild(link);

            booksList.appendChild(li);


        });
    } catch (error) {
        console.error("Erreur lors de l'affichage des livres:", error);
    }
}

export { displayBooks };