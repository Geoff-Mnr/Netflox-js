const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTQ3MjliNmIwYWJhZGFmODA4ZjYxODgwY2Y1OGMzNyIsInN1YiI6IjY1ODFlZTdhN2U0MDNkMDkyNWY1NzVlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IK-k-mISXcatXzNYyzjbjgEw1NRdpuf2PWs08hlFzwQ'; // Remplacez par votre clé API TMDB

// Options pour la requête HTTP
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
};


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