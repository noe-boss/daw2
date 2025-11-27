const API_URL = "https://dragonball-api.com/api/characters";

// FETCH PERSONAJES
async function obtenerPersonajes() {
    try {
        const resp = await fetch(API_URL);
        if (!resp.ok) throw new Error(`HTTP error ${resp.status}`);
        const data = await resp.json();
        if (data.items) return data.items;
        else return [];
    } catch (err) {
        console.error("Error al obtener personajes:", err);
        return [];
    }
}

async function obtenerPersonaje(id) {
    try {
        const resp = await fetch(`${API_URL}/${id}`);
        if (!resp.ok) throw new Error(`HTTP error ${resp.status}`);
        const data = await resp.json();
        return data;
    } catch (err) {
        console.error("Error al obtener personaje:", err);
        return null;
    }
}

// CREAR TARJETA PORTADA
function crearTarjeta(personaje) {
    const card = document.createElement("div");
    card.className = "card";

    const divImg = document.createElement("div");
    divImg.className = "imagen";
    divImg.innerHTML = `<img src="${personaje.image}" alt="${personaje.name}">`;

    const divName = document.createElement("div");
    divName.className = "nombre";
    divName.textContent = personaje.name || "-";

    const divDesc = document.createElement("div");
    divDesc.className = "descripcion";
    divDesc.textContent = personaje.description || "Sin descripción";

    card.appendChild(divImg);
    card.appendChild(divName);
    card.appendChild(divDesc);

    card.addEventListener("click", () => {
        window.location.href = `personaje.html?id=${personaje.id}`;
    });

    return card;
}

// CREAR FILA TABLA LISTADO
function crearFilaTabla(personaje) {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = personaje.id || "-";

    const tdNombre = document.createElement("td");
    const enlace = document.createElement("a");
    enlace.href = `personaje.html?id=${personaje.id}`;
    enlace.textContent = personaje.name || "-";
    tdNombre.appendChild(enlace);

    const tdKi = document.createElement("td");
    tdKi.textContent = personaje.ki || "-";

    const tdMaxKi = document.createElement("td");
    tdMaxKi.textContent = personaje.maxKi || "-";

    const tdRace = document.createElement("td");
    tdRace.textContent = personaje.race || "-";

    const tdGender = document.createElement("td");
    tdGender.textContent = personaje.gender || "-";

    const tdAffiliation = document.createElement("td");
    tdAffiliation.textContent = personaje.affiliation || "-";

    tr.appendChild(tdId);
    tr.appendChild(tdNombre);
    tr.appendChild(tdKi);
    tr.appendChild(tdMaxKi);
    tr.appendChild(tdRace);
    tr.appendChild(tdGender);
    tr.appendChild(tdAffiliation);

    return tr;
}

// CARGAR PORTADA
async function cargarPortada() {
    const personajes = await obtenerPersonajes();
    const grid = document.getElementById("grid-container");
    grid.innerHTML = "";
    personajes.forEach(personaje => {
        grid.appendChild(crearTarjeta(personaje));
    });
}

// CARGAR LISTADO
async function cargarListado() {
    const personajes = await obtenerPersonajes();
    const tabla = document.querySelector("#characters-table tbody");
    tabla.innerHTML = "";
    personajes.forEach(personaje => {
        tabla.appendChild(crearFilaTabla(personaje));
    });
}

//   CARGAR FICHA
async function cargarFichaPersonaje() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const personaje = await obtenerPersonaje(id);
    const cont = document.getElementById("character-detail");
    cont.className = "card";

    if (personaje) {
        cont.innerHTML = `
      <div class="imagen"><img src="${personaje.image}" alt="${personaje.name}"></div>
      <div class="nombre">${personaje.name}</div>
      <div class="descripcion">${personaje.description || "Sin descripción"}</div>
    `;
    } else {
        cont.innerText = "No se pudo cargar el personaje.";
    }
}

// Inicializar según página
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("grid-container")) cargarPortada();
    if (document.getElementById("characters-table")) cargarListado();
    if (document.getElementById("character-detail")) cargarFichaPersonaje();
});
