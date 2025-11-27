const url = "https://swapi.dev/api/people";

let personajes = {};
let nextUrl = url;

function cargarPagina(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.results.forEach(personaje => {
                personajes[personaje.name] = personaje;
            });

            if (data.next) {
                cargarPagina(data.next);
            } else {
                localStorage.setItem("personajesStarWars", JSON.stringify(personajes));
                alert("Personajes cargados");
            }
        })
}

cargarPagina(nextUrl);