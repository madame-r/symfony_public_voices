const initAudiobookCover = (formattedData) => {

    const audiobookDetails = document.querySelector('.audiobook-details');

    if (formattedData.cover) {
        audiobookDetails.style.backgroundImage = `url('${formattedData.cover}')`;
        console.log("✅ Couverture appliquée :", formattedData.cover);
    } else {
        console.error("⚠️ Aucune image de couverture trouvée dans formattedData");
    }
};


export { initAudiobookCover }