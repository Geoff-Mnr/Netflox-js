const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTQ3MjliNmIwYWJhZGFmODA4ZjYxODgwY2Y1OGMzNyIsInN1YiI6IjY1ODFlZTdhN2U0MDNkMDkyNWY1NzVlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IK-k-mISXcatXzNYyzjbjgEw1NRdpuf2PWs08hlFzwQ';
const seriesUrl = 'https://api.themoviedb.org/3/tv/';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
};

// Fonction pour récupérer les séries d'une page
function fetchSeries(url, containerId) {
    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            showSeries(response.results, containerId);
            // Affichez le fond d'écran du header en fonction du premier film de la liste
            if (response.results.length > 0) {
                showHeaderBackdrop(response.results[0]);
            }
        })
}

function showSeries(series, containerId) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < Math.min(40, series.length); i++) {
        const serie = series[i];
        const liElement = document.createElement('li');
        liElement.innerHTML = `
        <a href="serie_description.html?id=${serie.id}">
            <img src="https://image.tmdb.org/t/p/w500${serie.backdrop_path}" alt="${serie.name}">   
            <h3>${serie.name}</h3>
        </a>  
    `;
        container.appendChild(liElement);
    }
}

// Fonction générique pour récupérer les films de plusieurs pages
function fetchAllPages(genreId, containerId) {
    fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=${genreId}`, options)
        .then(response => response.json())
        .then(response => {
            const totalResults = response.total_results;
            const totalPages = Math.min(20, Math.ceil(totalResults / 20)); 
            fetchSeriesPages(1, totalPages, containerId, genreId);
        })
}

// Fonction pour récupérer les films de plusieurs pages (pages 1 à 20)
function fetchSeriesPages(pageNumber, totalPages, containerId, genreId) {
    if (pageNumber > totalPages) {
        return; // Arrêter la récursion une fois que toutes les pages ont été récupérées
    }
    const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=${pageNumber}&sort_by=popularity.desc&with_genres=${genreId}`;
    fetchSeries(url, containerId);
    // Récursion pour récupérer la page suivante
    fetchSeriesPages(pageNumber + 1, totalPages, containerId, genreId);
}

// Fonction pour récupérer les séries d'une page
fetchAllPages(35, 'seriesAllComedy');
fetchAllPages(16, 'seriesAllAnimation');
fetchAllPages(10759, 'seriesAllAdventure');
fetchAllPages(80, 'seriesAllCrime');
fetchAllPages(18, 'seriesAllDrama');
fetchAllPages(10765, 'seriesAllFantasy');
fetchAllPages(53, 'seriesAllThriller');
fetchAllPages(37, 'seriesAllWestern');
fetchAllPages(10751, 'seriesAllFamily');
fetchAllPages(9648, 'seriesAllMystery');
fetchAllPages(10762, 'seriesAllKids');
fetchAllPages(99, 'seriesAllDocumentary');
fetchAllPages(10764, 'seriesAllReality');




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