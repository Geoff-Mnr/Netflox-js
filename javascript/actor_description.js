document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event fired");

  const urlParams = new URLSearchParams(window.location.search);
  const actorId = urlParams.get("id");
  console.log("actorId:", actorId);

  if (actorId) {
    const apiKey = "ca4729b6b0abadaf808f61880cf58c37";
    const actorUrl = `https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}&language=fr-FR`;

    // Effectuez une requête pour obtenir les détails de l'acteur
    fetch(actorUrl)
      .then((response) => response.json())
      .then((actor) => {
        const container = document.getElementById(
          "actor_description_container"
        );
        const divElement = document.createElement("div");
        divElement.classList.add("actor_description");

        // Récupérez les détails de la filmographie
        const filmographyUrl = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${apiKey}&language=fr-FR`;
        fetch(filmographyUrl)
          .then((response) => response.json())
          .then((filmography) => {
            const moviesCount = 10;
            const movies =
              filmography.cast && filmography.cast.length > 0
                ? filmography.cast
                  .slice(0, moviesCount)
                  .map((movie) => movie.title)
                  .join(", ")
                : "Filmographie non disponible";

            // Ajoutez les informations dans le bloc HTML
            divElement.innerHTML = `
                            <div class="actor_description_main">
                                <div class="actor_description_1">
                                    <img src="https://image.tmdb.org/t/p/w500${actor.profile_path
              }" alt="${actor.name}">
                                </div>   
                                <div class="actor_description_2">
                                    <h1>${actor.name}</h1>
                                    <span class="birthday">Date de naissance: ${formatBirthdate(
                actor.birthday
              )}</span>
                                    <span class="place_of_birth">Lieu de naissance: ${actor.place_of_birth
              }</span>
                                    
                                    <h4>Biographie</h4>
                                    <span class="biography">${truncateBiography(actor.biography, 500)}</span>


                                    <h3>Filmographie</h3>
                                    <span class="filmography">${movies}</span>
                                </div>
                            </div>
                        `;
            container.appendChild(divElement);
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération de la filmographie de l'acteur :",
              error
            );
          });
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'acteur :",
          error
        );
      });
  }
});

// Définissez une fonction pour formater la date de naissance
function formatBirthdate(birthdate) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("fr-FR", options).format(
    new Date(birthdate)
  );
  return formattedDate;
}

// Définissez une fonction pour tronquer la biographie
function truncateBiography(biography, maxLength) {
  if (biography.length > maxLength) {
    return `${biography.substring(0, maxLength)}...`;
  }
  return biography;
}