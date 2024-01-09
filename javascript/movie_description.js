
// Fonction pour ajouter un film aux favoris
function addToFavoritesMovie(movieId) {
    // Récupérez les films favoris actuels depuis le stockage local
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(`Ajouter le film avec l'ID ${movieId} aux favoris`);
    // Vérifiez si le film est déjà dans les favoris
    if (!favorites.includes(movieId)) {
        // Ajoutez l'ID du film aux favoris
        favorites.push(movieId);

        // Mettez à jour le stockage local avec la nouvelle liste de favoris
        localStorage.setItem('favorites', JSON.stringify(favorites));

    }
}

// Fonction pour afficher la description d'un film
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired');
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    console.log('movieId:', movieId);

    if (movieId) { // Correction: Utilisez movieId au lieu de filmId
        const apiKey = 'ca4729b6b0abadaf808f61880cf58c37';
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`;

        // Effectuez une requête pour obtenir les détails du film
        fetch(apiUrl)
            .then(response => response.json())
            .then(movie => {
                const container = document.getElementById('movie_description_container');
                const divElement = document.createElement('div');
                divElement.classList.add('movie_description');

                // Vérifiez si la propriété genres existe et est un tableau non vide
                const genresString = movie.genres && movie.genres.length > 0
                    ? movie.genres.map(genre => genre.name).join(', ')
                    : 'Genres non disponibles';
                const recommendationPercentage = movie.vote_average ? movie.vote_average * 10 + '%' : 'Non disponible';
                const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Date non disponible';

                // Récupérez les détails du casting
                const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=fr-FR`;

                fetch(castUrl)
                    .then(response => response.json())
                    .then(cast => {
                        // Trouvez le réalisateur
                        const director = cast.crew && cast.crew.find(member => member.job === 'Director');

                        // Récupérez les acteurs principaux (par exemple, les 5 premiers)
                        const mainActorsCount = 5; // Vous pouvez ajuster ce nombre selon vos besoins
                        const mainActors = cast.cast && cast.cast.length > 0
                            ? cast.cast.slice(0, mainActorsCount).map(actor => actor.name).join(', ')
                            : 'Acteurs principaux non disponibles';

                        // Ajoutez les informations dans le bloc HTML
                        divElement.innerHTML = `
                            <div class="movie_description_main">
                                <div class="movie_description_1">
                                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                                </div>   
                                <div class="movie_description_2">
                                    <div class="title">
                                    <h1>${movie.title}</h1>
                                    <button id="addToFavoritesButton"><img src="../img/icons8-add-100.png"></img></button>
                                    </div>
                                    <h2>${movie.original_title}</h2>
                                    <span class="genre">${genresString}</span>

                                    <div class="movie_description_info">
                                        <span class="recommandation">Recommandé à ${parseInt(recommendationPercentage)}%</span>
                                        <span class="release_year">${releaseYear}</span>
                                        <span class="movie_duration">Durée : ${movie.runtime} minutes</span>
                                    </div>

                                    <h4>De: <span class="director">${director ? director.name : 'Réalisateur non disponible'}</span></h4>
                                    <h4>Avec: <span>${mainActors}</span></h4>
                                   
                                    <h3>Synopsis</h3>
                                    <span class="synopsis">${movie.overview}</span>
                                    
                                   

                                </div>
                            </div>
                        `;
                        container.appendChild(divElement);

                        // Ajoutez un gestionnaire d'événements pour le bouton "Ajouter aux favoris"
                        document.getElementById('addToFavoritesButton').addEventListener('click', function () {
                            addToFavoritesMovie(movieId);
                        });
                    })
            })
    }
});
