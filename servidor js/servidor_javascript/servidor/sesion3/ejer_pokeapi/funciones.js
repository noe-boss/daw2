const url = "https://pokeapi.co/api/v2/pokemon?offset=1&limit=120";

fetch(url)
  .then(resultado => resultado.json())
  .then(data => {
    console.log("data", data);
    const contenedor = document.getElementById("contenedor");
    const pokemons = data.results;

    for (let i = 0; i < pokemons.length; i += 4) {
      // Crear una fila cada 4 Pokémon
      const fila = document.createElement("div");
      fila.className = "fila";

      // Tomar grupo de 4
      const grupo = pokemons.slice(i, i + 4);

      grupo.forEach(poke => {
        const divPokemon = document.createElement("div");
        divPokemon.className = "pokemon";

        // Obtener el ID desde la URL (último número)
        const id = poke.url.split("/").filter(Boolean).pop();

        // Construir imagen oficial desde la PokeAPI
        const imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        divPokemon.innerHTML = `
          <div class="imagen">
            <img src="${imagen}">
          </div>
          <div class="nombre">
            ${poke.name}
          </div>
        `;

        fila.appendChild(divPokemon);
      });

      contenedor.appendChild(fila);
    }
  })
  .catch(err => {
    console.error("Error al obtener los Pokémon:", err);
  });
