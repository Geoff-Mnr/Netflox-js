const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTQ3MjliNmIwYWJhZGFmODA4ZjYxODgwY2Y1OGMzNyIsInN1YiI6IjY1ODFlZTdhN2U0MDNkMDkyNWY1NzVlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IK-k-mISXcatXzNYyzjbjgEw1NRdpuf2PWs08hlFzwQ'; // Remplacez par votre clé API TMDB
const seriesUrl = 'https://api.themoviedb.org/3/tv/';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
};

// récupérer les séries 
function fetchSeries(url, containerId) {
    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            showSeries(response.results, containerId);

        })
        .catch(err => console.error(err));
}

// récupérer les genres de séries
fetch('https://api.themoviedb.org/3/genre/tv/list?language=fr', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err))

// Fonction pour afficher 6 séries
function showSeries(series, containerId) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < Math.min(6, series.length); i++) {
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

// Appel pour les series comedie
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=3&sort_by=popularity.desc&with_genres=35', 'seriesComedy');

// Appel pour les series animation
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=16', 'seriesAnimation');

// Appel pour les series aventure
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=2&sort_by=popularity.desc&with_genres=10759', 'seriesAdventure');

// Appel pour les series drame
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=2&sort_by=popularity.desc&with_genres=18', 'seriesDrama');

// Appel pour les series science-fiction
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=2&sort_by=popularity.desc&with_genres=10765', 'seriesFantasySf');

// Appel pour les series thriller
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=2&sort_by=popularity.desc&with_genres=53', 'seriesThriller');

// Appel pour les series crime
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=6&sort_by=popularity.desc&with_genres=80', 'seriesCrime');

// Appel pour les series famille
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=10751', 'seriesFamily');

// Appel pour les series guerre
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=10768', 'seriesWar');

// Appel pour les series western
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=2&sort_by=popularity.desc&with_genres=37', 'seriesWestern');

// Appel pour les series documentaire
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr&page=1&sort_by=popularity.desc&with_genres=99', 'seriesDocumentary');

// Appel pour les series kids
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr&page=1&sort_by=popularity.desc&with_genres=10762', 'seriesKids');

// Appel pour les series mystere
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr&page=1&sort_by=popularity.desc&with_genres=9648', 'seriesMystery');

// Appel pour les series reality
fetchSeries('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr&page=1&sort_by=popularity.desc&with_genres=10764', 'seriesReality');



// Fonction pour afficher une image de série au hasard dans le header
function displayRandomSerieBackground() {
    fetch(`${seriesUrl}top_rated?language=fr-FR&page=1`, options)
        .then(response => response.json())
        .then(response => {
            // Obtenez la liste des films populaires
            const ratedSeries = response.results;

            // Choisissez un film au hasard
            const randomSerie = getRandomElement(ratedSeries);

            // Mettez à jour l'attribut src de l'élément img dans la div header_background
            updateImageSource(randomSerie);
        })
        .catch(err => console.error(err));
}


// Fonction pour mettre à jour l'attribut src de l'élément img
function updateImageSource(serie) {
    const headerBackgroundImg = document.getElementById('header_background_img');
    // Mettez à jour l'attribut src avec l'image du film au hasard
    headerBackgroundImg.src = `https://image.tmdb.org/t/p/original${serie.backdrop_path}`;
}

// Fonction pour obtenir un élément au hasard d'un tableau
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Appelez la fonction pour afficher une image de film au hasard dans le header
displayRandomSerieBackground()


document.getElementById('comedySeriesLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)
    window.location.href = '../html/series_comedy.html';
});

document.getElementById('animationSeriesLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)
    window.location.href = '../html/series_animation.html';
});

document.getElementById('adventureSeriesLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)
    window.location.href = '../html/series_adventure.html';
});

document.getElementById('dramaSeriesLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)
    window.location.href = '../html/series_drama.html';
});

document.getElementById('fantasySfSeriesLink').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (navigation vers une autre page)
    window.location.href = '../html/series_fantasy.html';
});

document.getElementById('crimeSeriesLink').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '../html/series_crime.html';
});

document.getElementById('familySeriesLink').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '../html/series_family.html';
});

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