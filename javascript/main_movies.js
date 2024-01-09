const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTQ3MjliNmIwYWJhZGFmODA4ZjYxODgwY2Y1OGMzNyIsInN1YiI6IjY1ODFlZTdhN2U0MDNkMDkyNWY1NzVlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IK-k-mISXcatXzNYyzjbjgEw1NRdpuf2PWs08hlFzwQ'; // Remplacez par votre clé API TMDB
const moviesUrl = 'https://api.themoviedb.org/3/movie/';
const seriesUrl = 'https://api.themoviedb.org/3/tv/';

// Options pour la requête HTTP
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
}

// Fonction pour récupérer les séries populaires
function fetchSeries(url, containerId) {
    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            showSeries(response.results, containerId);

        })
}

// Fonction pour récupérer les genres de films
fetch('https://api.themoviedb.org/3/genre/movie/list?language=fr', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

// Fonction pour récupérer les genres de séries
fetch('https://api.themoviedb.org/3/genre/tv/list?language=fr', options)
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
            <a href="./html/movie_description.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="${movie.title}">   
                <h3>${movie.title}</h3>
            </a>  
        `;
        container.appendChild(liElement);
    }
}

// Fonction pour afficher 6 séries
function showSeries(series, containerId) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < Math.min(6, series.length); i++) {
        const serie = series[i];
        const liElement = document.createElement('li');
        liElement.innerHTML = `
            <a href="./html/serie_description.html?id=${serie.id}">
                <img src="https://image.tmdb.org/t/p/w500${serie.backdrop_path}" alt="${serie.name}">   
                <h3>${serie.name}</h3>
            </a>  
        `;
        container.appendChild(liElement);
    }
}


// Appel pour les films populaires
fetchMovies(`${moviesUrl}popular?language=fr-FR`, 'moviesPopular');

// Appel pour les films les mieux notés
fetchMovies(`${moviesUrl}top_rated?language=fr-FR&page=1`, 'moviesRated');

// Appel pour les films à venir
fetchMovies(`${moviesUrl}upcoming?language=fr-FR&page=1`, 'moviesNews');

// Appel pour les séries populaires
fetchSeries(`${seriesUrl}popular?language=fr-FR`, 'seriesPopular');

// Appel pour les séries les mieux notées
fetchSeries(`${seriesUrl}top_rated?language=fr-FR&page=3`, 'seriesRated');

// Appel pour les séries à venir
fetchSeries(`${seriesUrl}on_the_air?language=fr-FR&page=3`, 'seriesNews');


// Fonction pour afficher une image de film au hasard dans le header
function displayRandomMovieBackground() {
    fetch(`${moviesUrl}popular?language=fr-FR&page=1`, options)
        .then(response => response.json())
        .then(response => {
            // Obtenez la liste des films populaires
            const popularMovies = response.results;

            // Choisissez un film au hasard
            const randomMovie = getRandomElement(popularMovies);

            // Mettez à jour l'attribut src de l'élément img dans la div header_background
            updateImageSource(randomMovie);
        })
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
                window.location.href = `./html/actor_description.html?id=${result.id}`;
            } else if (result.media_type === 'tv') {
                window.location.href = `./html/serie_description.html?id=${result.id}`;
            } else if (result.media_type === 'movie') {
                window.location.href = `./html/movie_description.html?id=${result.id}`;
            }
        });

        container.appendChild(listItem);
    });

    // Afficher le conteneur des résultats
    container.style.display = 'block';
}

// Ajout de l'événement de clic au bouton de recherche
document.getElementById('searchButton').addEventListener('click', searchMoviesAndSeries);







