const playerNavigation = (audioTracks) => {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const playPauseButton = document.getElementById('play-pause-button');
    const nowPlayingElement = document.getElementById('now-playing');
    const audioPlayer = document.getElementById('audio-player');
    const chaptersList = document.getElementById('chapters-list'); // Utilisation du nouvel élément 'chapters-list'

    let currentChapterIndex = 0;

    // Fonction pour charger un chapitre audio
    const loadChapter = (index) => {
        console.log("🔄 Chargement du chapitre à l'index :", index);

        currentChapterIndex = index;

        // Récupérer l'URL de l'audio
        const audioUrl = audioTracks[currentChapterIndex]?.urlMp3;
        if (audioUrl) {
            console.log("🎧 Chargement du fichier audio :", audioUrl);
            audioPlayer.src = audioUrl;
            nowPlayingElement.textContent = `${audioTracks[currentChapterIndex].title}`;

            // Attendre que les métadonnées audio soient chargées avant de configurer la lecture
            audioPlayer.addEventListener('loadedmetadata', () => {
                console.log("🎧 Métadonnées chargées pour le chapitre :", currentChapterIndex);
                playPauseButton.innerHTML = '<i class="bi bi-pause-circle"></i>';
            }, { once: true });
        } else {
            console.error("⚠️ L'URL de l'audio est undefined ou invalide.");
        }
    };

    // Afficher la liste des chapitres dans l'élément 'chapters-list'
    const displayChaptersList = () => {
        // Vider la liste des chapitres existante
        chaptersList.innerHTML = '';

        // Parcourir les chapitres et les ajouter à la liste
        audioTracks.forEach((track, index) => {
            const chapterLink = document.createElement('a');
            chapterLink.href = "#";
            chapterLink.textContent = track.title;
            chapterLink.addEventListener('click', (e) => {
                e.preventDefault();  // Empêche l'action par défaut
                loadChapter(index);  // Charge le chapitre sélectionné
            });

            const chapterListItem = document.createElement('li');
            chapterListItem.appendChild(chapterLink);
            chaptersList.appendChild(chapterListItem);
        });

        console.log("🎧 Liste des chapitres générée avec succès.");
    };

    loadChapter(currentChapterIndex);  // Charger le chapitre initial
    displayChaptersList();  // Afficher la liste des chapitres

    // Gestion des boutons de navigation
    nextButton.addEventListener('click', () => {
        if (currentChapterIndex < audioTracks.length - 1) {
            loadChapter(currentChapterIndex + 1);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentChapterIndex > 0) {
            loadChapter(currentChapterIndex - 1);
        }
    });

    // Gestion du bouton play/pause
    playPauseButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play().then(() => {
                console.log("🎧 Lecture du chapitre lancée");
                playPauseButton.innerHTML = '<i class="bi bi-pause-circle"></i>';
            }).catch((error) => {
                console.error("Erreur lors de la lecture de l'audio :", error);
            });
        } else {
            audioPlayer.pause();
            playPauseButton.innerHTML = '<i class="bi bi-play-circle"></i>';
        }
    });
};

export { playerNavigation };
