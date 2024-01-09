const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTQ3MjliNmIwYWJhZGFmODA4ZjYxODgwY2Y1OGMzNyIsInN1YiI6IjY1ODFlZTdhN2U0MDNkMDkyNWY1NzVlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IK-k-mISXcatXzNYyzjbjgEw1NRdpuf2PWs08hlFzwQ'; // Remplacez par votre clé API TMDB
const moviesUrl = 'https://api.themoviedb.org/3/movie/';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
};

// Fonction pour récupérer les films populaires
function fetchMovies(url, containerId) {
    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            showMovies(response.results, containerId);
        })
        .catch(err => console.error(err));
}

// Fonction pour récupérer les genres de films
fetch('https://api.themoviedb.org/3/genre/movie/list?language=fr', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

// Fonction pour afficher 6 films
function showMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < Math.min(6, movies.length); i++) {
        const movie = movies[i];
        const liElement = document.createElement('li');
        liElement.innerHTML = `
            <a href="movie_description.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="${movie.title}">   
                <h3>${movie.title}</h3>
            </a>  
        `;
        container.appendChild(liElement);
    }
}


// Appel pour les films comedie
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=35', 'moviesComedy');

// Appel pour les films animation
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=16', 'moviesAnimation');

// Appel pour les films aventure
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=2&sort_by=popularity.desc&with_genres=12', 'moviesAdventure');

// Appel pour les films drame
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=2&sort_by=popularity.desc&with_genres=18', 'moviesDrama');

// Appel pour les films action
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=2&sort_by=popularity.desc&with_genres=28', 'moviesAction');

// Appel pour les films fantastique
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=2&sort_by=popularity.desc&with_genres=14', 'moviesFantasy');

// Appel pour les films romance
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=10749', 'moviesRomance');

// Appel pour les films science-fiction
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=6&sort_by=popularity.desc&with_genres=878', 'moviesScienceFiction');

// Appel pour les films thriller
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=4&sort_by=popularity.desc&with_genres=53', 'moviesThriller');

// Appel pour les films horreur
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=27', 'moviesHorror');

// Appel pour les films crime
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=80', 'moviesCrime');

// Appel pour les films western
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=37', 'moviesWestern');



// Affiche les films populaires dans le header
function displayRandomMovieBackground() {
    fetch(`${moviesUrl}top_rated?language=fr-FR&page=1`, options)
        .then(response => response.json())
        .then(response => {
            // Obtenez la liste des films populaires
            const ratedMovies = response.results;

            // Choisissez un film au hasard
            const randomMovie = getRandomElement(ratedMovies);

            // Mettez à jour l'attribut src de l'élément img dans la div header_background
            updateImageSource(randomMovie);
        })
        .catch(err => console.error(err));
}

// Fonction pour mettre à jour l'attribut src de l'élément img
function updateHeaderBackground(category) {
    fetch(`${moviesUrl}${category}?language=fr-FR&page=1`, options)
        .then(response => response.json())
        .then(response => {
            // Obtenez la liste des films de la catégorie sélectionnée
            const categoryMovies = response.results;

            // Choisissez un film au hasard
            const randomMovie = getRandomElement(categoryMovies);

            // Mettez à jour l'attribut src de l'élément img dans la div header_background
            updateImageSource(randomMovie);
        })
        .catch(err => console.error(err));
}

// Fonction pour mettre à jour l'attribut src de l'élément img
function updateImageSource(movie) {
    const headerBackgroundImg = document.getElementById('header_background_img');

    // Mettez à jour l'attribut src avec l'image du film au hasard
    headerBackgroundImg.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
}

// Fonction pour obtenir un élément au hasard d'un tableau
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Appelez la fonction pour afficher une image de film au hasard dans le header
displayRandomMovieBackground();


document.getElementById('comedyLink').addEventListener('click', function (event) {
    event.preventDefault();
    // Ensuite, redirigez vers la page comedy.html
    window.location.href = '../html/comedy.html';
});


document.getElementById('animationLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)

    // Redirige vers la page animation.html
    window.location.href = '../html/animation.html';
});

document.getElementById('adventureLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)

    // Redirige vers la page adventure.html
    window.location.href = '../html/adventure.html';
});

document.getElementById('dramaLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)

    // Redirige vers la page adventure.html
    window.location.href = '../html/drama.html';
});

document.getElementById('actionLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)

    // Redirige vers la page adventure.html
    window.location.href = '../html/action.html';
});

document.getElementById('crimeLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)

    // Redirige vers la page adventure.html
    window.location.href = '../html/crime.html';
});

document.getElementById('fantasyLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)

    // Redirige vers la page adventure.html
    window.location.href = '../html/fantasy.html';
});

document.getElementById('romanceLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)

    // Redirige vers la page adventure.html
    window.location.href = '../html/romance.html';
});

document.getElementById('thrillerLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)

    // Redirige vers la page adventure.html
    window.location.href = '../html/thriller.html';
});

document.getElementById('westernLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)

    // Redirige vers la page adventure.html
    window.location.href = '../html/westerN.html';
});

document.getElementById('horrorLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)

    // Redirige vers la page adventure.html
    window.location.href = '../html/horror.html';
});

document.getElementById('sciencefictionLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)

    // Redirige vers la page adventure.html
    window.location.href = '../html/science-fiction.html';
});

displayRandomMovieBackground();



// Fonction pour afficher les films et les séries dans une recherche
function searchMoviesAndSeries() {
    const searchInput = document.getElementById('search');
    const query = searchInput.value.trim();
    const searchResultsContainer = document.getElementById('searchResults');

    // Effacez les résultats précédents
    searchResultsContainer.innerHTML = '';

    if (query !== '') {
        const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=fr-FR&query=${query}&page=1&include_adult=false`;

        // Effectuez la recherche multi-requête
        fetch(searchUrl, options)
            .then(response => response.json())
            .then(data => {
                // Vérifiez si des résultats ont été trouvés
                if (data.results.length > 0) {
                    // Affichez tous les résultats sous l'input
                    displayResults(data.results, searchResultsContainer, 'all');
                } else {
                    // Aucun résultat trouvé, vous pouvez gérer cela en conséquence
                    console.log('Aucun résultat trouvé.');
                }

                // Une fois la recherche effectuée, masquez l'élément de recherche
                searchInput.classList.remove('show');

                // Videz l'input après la recherche
                searchInput.value = '';
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

// Fonction pour afficher les résultats de la recherche
function displayResults(results, container, type) {
    results.forEach(result => {
        const listItem = document.createElement('li');

        // Créer une image
        const image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/w200${result.poster_path || result.profile_path}`;
        image.alt = result.title || result.name || result.original_name;

        // Créer un élément de titre
        const title = document.createElement('span');
        title.textContent = result.title || result.name || result.original_name;

        // Ajouter la classe pour le style CSS
        listItem.classList.add('result-item');

        // Ajouter l'image et le titre à l'élément de liste
        listItem.appendChild(image);
        listItem.appendChild(title);

        // Ajouter un événement de clic pour rediriger vers la page de description correspondante
        listItem.addEventListener('click', function () {
            if (result.media_type === 'person') {
                window.location.href = `actor_description.html?id=${result.id}`;
            } else if (result.media_type === 'tv') {
                window.location.href = `serie_description.html?id=${result.id}`;
            } else if (result.media_type === 'movie') {
                window.location.href = `movie_description.html?id=${result.id}`;
            }
        });

        container.appendChild(listItem);
    });

    // Afficher le conteneur des résultats
    container.style.display = 'block';
}


// Ajout de l'événement de clic au bouton de recherche
document.getElementById('searchButton').addEventListener('click', searchMoviesAndSeries);