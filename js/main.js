document.addEventListener("DOMContentLoaded", () => {
  const cinemaList = document.getElementById("cinema-list");
  const paginationContainer = document.getElementById("pagination");
  let currentPage = 1;
  const resultsPerPage = 10;
  let userLatitude, userLongitude;

  function fetchCinemas(page) {
    const offset = (page - 1) * resultsPerPage;
    const url = `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?offset=${offset}&limit=${resultsPerPage}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        cinemaList.innerHTML = "";

        if (data.results) {
          data.results.forEach((record) => {
            const cinema = record;
            const cinemaName = cinema.nom;
            const cinemaAdresse = cinema.adresse;
            const cinemaCodePostale = cinema.commune;

            const listItem = document.createElement("li");
            listItem.textContent =
              cinemaName + cinemaCodePostale + cinemaAdresse;
            cinemaList.appendChild(listItem);
          });
        } else {
          cinemaList.textContent = "Aucun résultat trouvé.";
        }

        handlePagination(data.nhits);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }

  function handlePagination(totalResults) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const prevButton = document.createElement("button");
    prevButton.textContent = "Page précédente";
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        fetchCinemas(currentPage);
      }
    });

    const nextButton = document.createElement("button");
    nextButton.textContent = "Page suivante";
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        fetchCinemas(currentPage);
      }
    });

    paginationContainer.innerHTML = "";
    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);
  }

  function getUserLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userLatitude = position.coords.latitude;
          userLongitude = position.coords.longitude;
          fetchCinemas(currentPage);
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération de la position de l'utilisateur :",
            error
          );
          fetchCinemas(currentPage);
        }
      );
    } else {
      console.error(
        "La géolocalisation n'est pas prise en charge par votre navigateur."
      );
      fetchCinemas(currentPage);
    }
  }

  getUserLocation();
});
