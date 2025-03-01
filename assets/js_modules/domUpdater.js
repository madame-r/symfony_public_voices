

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



async function displayPlayer(playerData) {
    try {
        console.log("Affichage des données du player :", playerData);

        const playerContainer = document.getElementById("player-container");
        if (!playerContainer) {
            console.error("Element #player-container introuvable !");
            return;
        }

        if (!Array.isArray(playerData) || playerData.length === 0) {
            console.error("Aucune donnée formatée pour le player !");
            return;
        }

        playerContainer.innerHTML = "";

        const firstPlayerData = playerData[0];
        console.log("Données du premier livre :", firstPlayerData);

        const title = document.createElement("h2");
        title.textContent = firstPlayerData.title || "Titre du livre";
        playerContainer.appendChild(title);

        const author = document.createElement("p");
        author.textContent = `Auteur: ${firstPlayerData.author || "Auteur inconnu"}`;
        playerContainer.appendChild(author);

        const cover = document.createElement("img");
        cover.src = firstPlayerData.cover || "default_cover.jpg";
        cover.alt = `Couverture de ${firstPlayerData.title}`;
        playerContainer.appendChild(cover);

        const duration = document.createElement("p");
        const totalMinutes = Math.floor(firstPlayerData.totalTime / 60);
        const totalSeconds = firstPlayerData.totalTime % 60;
        duration.textContent = `Durée totale: ${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
        playerContainer.appendChild(duration);

        const audioList = document.createElement("ul");
        console.log("Liste des pistes audio :", firstPlayerData.audioTracks);
        if (!Array.isArray(firstPlayerData.audioTracks)) {
            console.error(`audioTracks n'est pas un tableau`, firstPlayerData.audioTracks);
            return;
        }
        firstPlayerData.audioTracks.forEach(track => {
            if (!track || !track.title || !track.urlMp3) {
                console.error('Données de piste audio manquantes ou incorrectes', track);
                return;
            }
            console.log("Affichage de la piste audio :", track);

            const trackItem = document.createElement("li");

            const trackTitle = document.createElement("strong");
            trackTitle.textContent = `${track.chapterOrder}. ${track.title}`;
            trackItem.appendChild(trackTitle);

            const trackDuration = document.createElement("span");
            const trackMinutes = Math.floor(track.playtime / 60);
            const trackSeconds = track.playtime % 60;
            trackDuration.textContent = ` - ${trackMinutes}:${trackSeconds < 10 ? '0' + trackSeconds : trackSeconds}`;
            trackItem.appendChild(trackDuration);

            const trackLink = document.createElement("a");
            trackLink.href = track.urlMp3;
            trackLink.textContent = "Écouter";
            trackItem.appendChild(trackLink);

            audioList.appendChild(trackItem);
        });
        playerContainer.appendChild(audioList);

    } catch (error) {
        console.error("Erreur lors de l'affichage des données du player:", error);
    }
}




export { displayBooks, displayPlayer };