let albumTitles = new Set()

function search() {
    let artist = document.getElementById("searchField").value;
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + artist)
        .then(response => response.json())
        .then(pippo => {
            // Mostra i risultati della ricerca
            document.getElementById("searchResults").style.display = "block";

            // Aggiorna la classe del nome dell'artista
            let nomeArtistaElement = document.getElementById("nomeArtista");
            nomeArtistaElement.classList.remove("d-none");
            nomeArtistaElement.classList.add("d-block");

            // Aggiorna il nome dell'artista
            let nomeArtista = nomeArtistaElement.querySelector("h2");
            nomeArtista.textContent = artist.toUpperCase();

            // Pulisci i risultati precedenti
            let artistSection = document.querySelector("#artistSection");
            artistSection.innerHTML = "";

            // Pulisci set di album
            albumTitles.clear();

            // Aggiungi i nuovi risultati come card
            pippo.data.forEach(element => {
                let cardHTML = `
                <div class="card mb-3 p-1">
                    <img src="${element.album.cover_big}" class="card-img-top" alt="${element.title}">
                    <div class="card-body p-1">
                        <h5 class="card-title">${element.title}</h5>
                        <a href="#" class="card-link">${element.artist.name}</a>
                    </div>
                </div>
            `;
                artistSection.innerHTML += cardHTML;

                // Aggiungi album al set
                albumTitles.add(element.album.title);

            });
        })
        .catch(error => console.error('Errore:', error));
}


function showAlbumList() {
    let albumList = document.getElementById("albumList");
    albumList.innerHTML = "";

    albumTitles.forEach(title => {
        let listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = title;
        albumList.appendChild(listItem);
    });
}






