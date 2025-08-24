export async function setupFavoriteButton(audiobookData) {
    const favoriteBtn = document.getElementById("favorite");
    const icon = favoriteBtn?.querySelector("i");

    if (!favoriteBtn || !audiobookData || !icon) return;

    // --- 1. Vérifie si le livre est déjà dans les favoris ---
    try {
        const res = await fetch("/api/favorites", {
            method: "GET",
            credentials: 'include',
        });

        const contentType = res.headers.get("Content-Type");

        if (res.status === 401 || contentType?.includes("text/html")) {
            console.warn("Utilisateur non connecté.");
            return;
        }

        if (!res.ok) throw new Error("Impossible de charger les favoris");

        const favorites = await res.json();

        const isFavorite = favorites.some(
            fav => fav.librivox_book_id === audiobookData.id
        );

        if (isFavorite) {
            favoriteBtn.classList.add("favorited");
            icon.classList.remove("bi-heart");
            icon.classList.add("bi-heart-fill");
        }
    } catch (error) {
        console.error("Erreur lors du chargement des favoris :", error);
    }

    // --- 2. Ajout du gestionnaire de clic pour toggler le favori ---
    favoriteBtn.addEventListener("click", async () => {
        try {
            const response = await fetch("/api/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(audiobookData),
            });

            const contentType = response.headers.get("Content-Type");

            if (response.status === 401 || contentType?.includes("text/html")) {
                alert("Vous devez être connecté pour ajouter un favori.\nVeuillez vous connecter depuis la page de connexion.");
                return;
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erreur API : ${errorText}`);
            }

            const result = await response.json();
            console.log("✅ Favori ajouté ou supprimé :", result);

            // --- 3. Mise à jour visuelle (toggle class + icône) ---
            const isNowFavorite = favoriteBtn.classList.toggle("favorited");

            if (isNowFavorite) {
                icon.classList.remove("bi-heart");
                icon.classList.add("bi-heart-fill");
            } else {
                icon.classList.remove("bi-heart-fill");
                icon.classList.add("bi-heart");
            }

        } catch (error) {
            console.error("Erreur lors du toggle favori :", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    });
}
