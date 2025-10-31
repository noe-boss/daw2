document.addEventListener("DOMContentLoaded", async () => {
    const resultado = document.getElementById("resultado");
    const res = await fetch("/peliculas/movies");
    const movies = await res.json();

    movies.sort((a, b) => a.title.localeCompare(b.title));

    let html = "<ul>";
    movies.forEach((movie, index) => {
        html += `<li>${index + 1}. ${movie.title}</li>`;
    });
    html += "</ul>";

    html += "<br>";
    html += "<br>";

    html += "</ul>";
    movies.forEach((movie, index) => {
    if (index >= 10 && index < 15) {
        html += `<li>${index + 1}. ${movie.title}</li>`;
    }
    html += "</ul>";

    html += "<br>";
    html += "<br>";

    const moviesCopia = movies.filter(movie => movie.title !== "El señor de los anillos: El retorno del rey");
    moviesCopia = moviesCopia.filter(movie => movie.title !== "El señor de los anillos: El retorno del rey");

    html += "</ul>";
    movies.forEach((movie, index) => {
        html += `<li>${index + 1}. ${movie.title}</li>`;
    });
    html += "</ul>";
});


    resultado.innerHTML = html;
});