export function setupFavoriteButton(audiobookData) {

    const favoriteBtn = document.getElementById("favorite");
    if (!favoriteBtn || !audiobookData) return;

    favoriteBtn.addEventListener("click", async () => {

        try {

            const response = await fetch("/api/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include', // <-- IMPORTANT pour l'auth session
                body: JSON.stringify(audiobookData)
            });


            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erreur lors de l'ajout du favori : ${errorText}`);
            }

            const result = await response.json();
            console.log("✅ Favori ajouté ou supprimé avec succès :", result);

            // Toggle classe pour feedback visuel
            favoriteBtn.classList.toggle("favorited");

        } catch (error) {
            console.error("Erreur lors de l'envoi du favori :", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    });
}
