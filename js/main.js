function fetchCinemas() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=etablissements-cinematographiques&facet=commune"
    );

    xhr.onload = () => {
      if (xhr.status === 200) {
        const cinemasData = JSON.parse(xhr.responseText);
        resolve(cinemasData);
      } else {
        reject("Erreur lors de la requête AJAX");
      }
    };
    xhr.onerror = () => {
      reject("Erreur réseau");
    };
    xhr.send();
  });
}

function displayCinemas(cinemasData) {
  const cinemaList = document.getElementById("cinema-list");
  cinemasData.records.forEach((record) => {
    const cinema = record.fields;
    const li = document.createElement("li");
    li.textContent = `Nom: ${cinema.nom}, Adresse: ${cinema.adresse}, Code Postal: ${cinema.dep}, Commune: ${cinema.commune}`;
    cinemaList.appendChild(li);
  });
}

fetchCinemas()
  .then((cinemasData) => {
    displayCinemas(cinemasData);
  })
  .catch((error) => {
    console.error(error);
  });
