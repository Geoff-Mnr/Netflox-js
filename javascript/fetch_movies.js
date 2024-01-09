const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTQ3MjliNmIwYWJhZGFmODA4ZjYxODgwY2Y1OGMzNyIsInN1YiI6IjY1ODFlZTdhN2U0MDNkMDkyNWY1NzVlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IK-k-mISXcatXzNYyzjbjgEw1NRdpuf2PWs08hlFzwQ';
const moviesUrl = 'https://api.themoviedb.org/3/movie/';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
};

// Fonction pour récupérer les films d'une page
function fetchMovies(url, containerId) {
    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            showMovies(response.results, containerId);
            // Affichez le fond d'écran du header en fonction du premier film de la liste
            if (response.results.length > 0) {
                showHeaderBackdrop(response.results[0]);
            }
        })
}

function showMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < Math.min(40, movies.length); i++) {
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



// Fonction générique pour récupérer les films de plusieurs pages
function fetchAllPages(genreId, containerId) {
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=${genreId}`, options)
        .then(response => response.json())
        .then(response => {
            const totalResults = response.total_results;
            const totalPages = Math.min(40, Math.ceil(totalResults / 20));
            fetchMoviesPages(1, totalPages, containerId, genreId);
        })
}

// Fonction pour récupérer les films de plusieurs pages (pages 1 à 20)
function fetchMoviesPages(pageNumber, totalPages, containerId, genreId) {
    if (pageNumber > totalPages) {
        return; // Arrêter la récursion une fois que toutes les pages ont été récupérées
    }
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${pageNumber}&sort_by=popularity.desc&with_genres=${genreId}`;
    fetchMovies(url, containerId);
    // Récursion pour récupérer la page suivante
    fetchMoviesPages(pageNumber + 1, totalPages, containerId, genreId);
}

// Récupérez les films de plusieurs pages pour chaque genre
fetchAllPages(35, 'moviesAllComedy');
fetchAllPages(16, 'moviesAllAnimation');
fetchAllPages(28, 'moviesAllAction');
fetchAllPages(12, 'moviesAllAdventure');
fetchAllPages(80, 'moviesAllCrime');
fetchAllPages(18, 'moviesAllDrama');
fetchAllPages(14, 'moviesAllFantasy');
fetchAllPages(27, 'moviesAllHorror');
fetchAllPages(10749, 'moviesAllRomance');
fetchAllPages(53, 'moviesAllThriller');
fetchAllPages(37, 'moviesAllWestern');
fetchAllPages(878, 'moviesAllSciencefiction');



// Fonction pour afficher le fond d'écran du header
function showHeaderBackdrop(movie) {
    // Mettez à jour l'attribut src avec l'image du film au hasard
    updateImageSource(movie);
}

// Fonction pour mettre à jour l'attribut src de l'élément img
function updateImageSource(movie) {
    const headerBackgroundImg = document.getElementById('header_background_img');

    // Mettez à jour l'attribut src avec l'image du film au hasard
    headerBackgroundImg.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
}


