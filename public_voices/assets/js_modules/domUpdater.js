// Gère le clic sur un livre
function handleBookClick(book) {
    sessionStorage.setItem("selectedBook", JSON.stringify(book));
    window.location.href = `/player/${book.id}`;
}

// Affiche les livres dans la liste
async function displayBooks(books, append = false) {
    try {
        console.log("Affichage des livres :", books);

        const booksList = document.getElementById("books-list");
        if (!booksList) {
            console.error("Element #books-list introuvable !");
            return;
        }

        if (!append) {
            booksList.innerHTML = ""; // vide la liste uniquement si append = false
        }

        books.forEach(book => {
            const li = document.createElement("li");
            li.style.cursor = "pointer";

            const img = document.createElement("img");
            img.src = book.cover;
            img.alt = `Couverture de ${book.title}`;
            img.onerror = () => {
                img.src = "/images/default_cover.jpg"; // adapte le chemin à ton projet
            };
            li.appendChild(img);

            const title = document.createElement("h3");
            title.textContent = book.title;
            li.appendChild(title);

            const author = document.createElement("p");
            author.textContent = `${book.author}`;
            li.appendChild(author);

            li.addEventListener("click", () => handleBookClick(book));

            booksList.appendChild(li);
        });

    } catch (error) {
        console.error("Erreur lors de l'affichage des livres:", error);
    }
}

export { displayBooks };
