
// Affichez les films favoris lorsque la page est chargée
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired');

    // Sélectionnez le conteneur où vous souhaitez afficher les films favoris
    const favoritesContainerMovies = document.getElementById('favoritesContainerMovies');
    const favoritesContainerseries = document.getElementById('favoritesContainerseries');

    // Affichez les films favoris
    displayFavoriteMovies(favoritesContainerMovies);
    displayFavoriteSeries(favoritesContainerSeries);

});


// Affichez les films favoris
function displayFavoriteMovies(container) {

    // Récupérez les films favoris depuis le stockage local
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Effacez le contenu précédent du conteneur
    container.innerHTML = '';

    // Vérifiez s'il y a des favoris
    if (favorites.length > 0) {
        // Parcourez la liste des films favoris et affichez les détails
        for (const movieId of favorites) {

            // Effectuez une requête pour obtenir les détails du film
            const apiKey = 'ca4729b6b0abadaf808f61880cf58c37';
            const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`;

            fetch(movieUrl)
                .then(response => response.json())
                .then(movie => {

                    // Créez un élément pour représenter le film favori
                    const favoriteElement = document.createElement('div');
                    favoriteElement.classList.add('favorite-item');
                    favoriteElement.id = `movie${movieId}`;

                    // Ajoutez le poster du film à l'élément
                    const moviePoster = document.createElement('img');
                    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
                    moviePoster.alt = movie.title;
                    favoriteElement.appendChild(moviePoster);

                    // Ajoutez le nom du film à l'élément
                    const movieTitle = document.createElement('h3');
                    movieTitle.textContent = movie.title;
                    favoriteElement.appendChild(movieTitle);

                    // Ajoutez un bouton de suppression
                    const removeImage = document.createElement('img');
                    removeImage.src = '../img/icons8-cancel-300.png';
                    removeImage.alt = 'Supprimer des favoris';
                    removeImage.classList.add('remove-icon'); // Ajoutez la classe 'remove-icon'
                    removeImage.addEventListener('click', function () {
                        removeFromFavoritesMovies(movieId);
                        // Supprimez également l'élément de la vue
                        favoriteElement.remove();
                    });

                    // Ajoutez l'image de suppression à l'élément du film favori
                    favoriteElement.appendChild(removeImage);

                    // Ajoutez l'élément du film favori au conteneur
                    container.appendChild(favoriteElement);
                })

        }
    } else {
        console.log('Aucun film favori.');
    }
}

function displayFavoriteSeries(container) {

    // Récupérez les séries TV favorites depuis le stockage local
    const favoritesSeries = JSON.parse(localStorage.getItem('favoritesSeries')) || [];

    // Effacez le contenu précédent du conteneur
    container.innerHTML = '';

    // Vérifiez s'il y a des séries TV favorites
    if (favoritesSeries.length > 0) {

        // Parcourez la liste des séries TV favorites et affichez les détails
        for (const serieId of favoritesSeries) {

            // Effectuez une requête pour obtenir les détails de la série TV
            const apiKey = 'ca4729b6b0abadaf808f61880cf58c37';
            const serieUrl = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=fr-FR`;

            fetch(serieUrl)
                .then(response => response.json())
                .then(serie => {
                    console.log('Received details for serie:', serie);

                    // Créez un élément pour représenter la série TV favorite
                    const favoriteElement = document.createElement('div');
                    favoriteElement.classList.add('favorite-item');
                    favoriteElement.id = `serie${serieId}`; // Ajoutez un identifiant unique

                    // Ajoutez l'image de la série TV à l'élément
                    const seriePoster = document.createElement('img');
                    seriePoster.src = `https://image.tmdb.org/t/p/w500${serie.backdrop_path}`;
                    seriePoster.alt = serie.name;
                    favoriteElement.appendChild(seriePoster);

                    // Ajoutez le nom de la série TV à l'élément
                    const serieTitle = document.createElement('h3');
                    serieTitle.textContent = serie.name;
                    favoriteElement.appendChild(serieTitle);

                    // Ajoutez un bouton de suppression
                    const removeImage = document.createElement('img');
                    removeImage.src = '../img/icons8-cancel-300.png';
                    removeImage.alt = 'Supprimer des favoris';
                    removeImage.classList.add('remove-icon'); // Ajoutez la classe 'remove-icon'

                    removeImage.addEventListener('click', function () {
                        removeFromFavoritesSeries(serieId);
                        // Supprimez également l'élément de la vue
                        favoriteElement.remove();
                    });

                    // Ajoutez l'image de suppression à l'élément de la série TV favorite
                    favoriteElement.appendChild(removeImage);

                    // Ajoutez l'élément de la série TV favorite au conteneur
                    container.appendChild(favoriteElement);
                })
        }
    } else {
        console.log('Aucune série TV favorite.');
    }
}


// Supprimez le film des favoris

function removeFromFavoritesMovies(movieId) {
    // Récupérez les films favoris depuis le stockage local
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Recherchez l'index du film dans la liste des favoris
    const index = favorites.indexOf(movieId);

    // Si l'index est trouvé, supprimez-le de la liste
    if (index !== -1) {
        favorites.splice(index, 1);

        // Mettez à jour la liste des favoris dans le stockage local
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Affichez les films favoris après la suppression
        displayFavoriteMovies();
    }
}


function removeFromFavoritesSeries(serieId) {
    // Récupérez les films favoris depuis le stockage local
    let favoritesSeries = JSON.parse(localStorage.getItem('favoritesSeries')) || [];

    // Recherchez l'index du film dans la liste des favoris
    const index = favoritesSeries.indexOf(serieId);

    // Si l'index est trouvé, supprimez-le de la liste
    if (index !== -1) {
        favoritesSeries.splice(index, 1);

        // Mettez à jour la liste des favoris dans le stockage local
        localStorage.setItem('favoritesSeries', JSON.stringify(favoritesSeries));

        // Affichez les films favoris après la suppression
        displayFavoriteSeries();
    }
}


