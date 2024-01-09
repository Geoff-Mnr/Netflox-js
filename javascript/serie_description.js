//Ajouter une série aux favoris
function addToFavoritesSerie(serieId) {
    // Récupérez les séries TV favoris actuelles depuis le stockage local
    const favoritesSeries = JSON.parse(localStorage.getItem('favoritesSeries')) || [];
    console.log(`Ajouter la série TV avec l'ID ${serieId} aux favoris`);

    // Vérifiez si la série TV est déjà dans les favoris
    if (!favoritesSeries.includes(serieId)) {
        // Ajoutez l'ID de la série TV aux favoris
        favoritesSeries.push(serieId);

        // Mettez à jour le stockage local avec la nouvelle liste de favoris
        localStorage.setItem('favoritesSeries', JSON.stringify(favoritesSeries));
    }
}

// Fonction pour afficher la description d'une série 
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired');
    const urlParams = new URLSearchParams(window.location.search);
    const serieId = urlParams.get('id');
    console.log('serieId:', serieId);

    if (serieId) {
        const apiKey = 'ca4729b6b0abadaf808f61880cf58c37';
        const serieUrl = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=fr-FR`;

        // Effectuez une requête pour obtenir les détails de la série
        fetch(serieUrl)
            .then(response => response.json())
            .then(serie => {

                const container = document.getElementById('serie_description_container');
                const divElement = document.createElement('div');
                divElement.classList.add('serie_description');

                // Vérifiez si la propriété genres existe et est un tableau non vide
                const genresString = serie.genres && serie.genres.length > 0
                    ? serie.genres.map(genre => genre.name).join(', ')
                    : 'Genres non disponibles';
                const recommendationPercentage = serie.vote_average ? serie.vote_average * 10 + '%' : 'Non disponible';
                const releaseYear = serie.first_air_date ? new Date(serie.first_air_date).getFullYear() : 'Date non disponible';

                // Récupérez les détails du casting
                const castUrl = `https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=${apiKey}&language=fr-FR`;

                fetch(castUrl)
                    .then(response => response.json())
                    .then(cast => {
                        // Trouvez le créateur dans le casting
                        const creator = cast.created_by && cast.created_by.length > 0
                            ? cast.created_by.map(creator => creator.name).join(', ')
                            : 'Créateur non disponible';

                        // Récupérez les acteurs principaux (par exemple, les 3 premiers)
                        const mainActorsCount = 3; // Vous pouvez ajuster ce nombre selon vos besoins
                        const mainActors = cast.cast && cast.cast.length > 0
                            ? cast.cast.slice(0, mainActorsCount).map(actor => actor.name).join(', ')
                            : 'Acteurs principaux non disponibles';

                        // Ajoutez les informations dans le bloc HTML
                        divElement.innerHTML = `
                            <div class="serie_description_main">
                                <div class="serie_description_1">
                                    <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" alt="${serie.name}">
                                </div>   
                                <div class="serie_description_2">
                                    <div class="title">
                                    <h1>${serie.name}</h1>
                                    <button id="addToFavoritesButton"><img src="../img/icons8-add-100.png"></img></button>
                                    </div>
                                    <h2>${serie.original_name}</h2>
                                    <span class="genre">${genresString}</span>

                                    <div class="serie_description_info">
                                    <span class="recommandation">Recommandé à ${parseInt(recommendationPercentage)}%</span>
                                        <span class="release_year">${releaseYear}</span>
                                        <span class="serie_duration">${serie.number_of_seasons} Saisons</span>
                                    </div>

                                    <h4>Créateur: <span class="creator">${creator}</span></h4>
                                    <h4>Avec: <span>${mainActors}</span></h4>
                                   
                                    <h3>Synopsis</h3>
                                    <span class="synopsis">${serie.overview}</span>
                                </div>
                            </div>
                        `;
                        container.appendChild(divElement);

                        // Ajoutez un gestionnaire d'événements pour le bouton "Ajouter aux favoris"
                        document.getElementById('addToFavoritesButton').addEventListener('click', function () {
                            console.log('Adding to favorites. Serie ID:', serieId);
                            addToFavoritesSerie(serieId);
                        });

                    })
            })
    }
});
