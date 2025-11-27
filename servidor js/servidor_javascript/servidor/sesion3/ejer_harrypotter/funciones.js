const API_URL = "https://hp-api.onrender.com/api/characters";
const PLACEHOLDER_IMG = "noimg.jpg";

// Normalizar casas: "" o null -> "sin casa", minúsculas
function normalizarCasa(nombre) {
    if (!nombre || nombre.trim() === "") return "sin casa";
    return nombre.trim().toLowerCase();
}

// Obtener todos los personajes
async function obtenerPersonajes() {
    try {
        const resp = await fetch(API_URL);
        if (!resp.ok) throw new Error(`HTTP error ${resp.status}`);
        return await resp.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

// Crear tarjeta de personaje
function crearTarjeta(p) {
    const card = document.createElement("div");
    card.className = "card";
    const imgSrc = p.image && p.image.trim() !== "" ? p.image : PLACEHOLDER_IMG;

    card.innerHTML = `
        <div class="imagen">
            <img src="${imgSrc}" alt="${p.name}">
        </div>
        <div class="nombre">${p.name}</div>
        <div class="descripcion">
            <b>Apodos:</b> ${p.alternate_names?.join(", ") || "—"}<br>
            <b>Año de nacimiento:</b> ${p.yearOfBirth || "—"}<br>
            <b>Actor:</b> ${p.actor || "—"}
        </div>
    `;

    card.addEventListener("click", () => {
        window.location.href = `personaje.html?name=${encodeURIComponent(p.name)}`;
    });

    return card;
}

// Ajustar altura de la fila
function ajustarAlturaFila(fila) {
    let maxHeight = 0;
    const cards = Array.from(fila.children);

    // Calculamos la altura total de cada tarjeta (incluyendo la imagen)
    cards.forEach(card => {
        card.style.height = 'auto';
        const cardHeight = card.offsetHeight;
        maxHeight = Math.max(maxHeight, cardHeight);
    });

    // Aplicamos la altura máxima a todas
    cards.forEach(card => card.style.height = maxHeight + 'px');
}

// Cargar listado por casa
async function cargarListadoPorCasa() {
    const cont = document.getElementById("grid-container");
    if (!cont) return;

    const personajes = await obtenerPersonajes();

    // Obtener casa desde URL o header
    let casa = new URLSearchParams(window.location.search).get("house") || "";
    const header = document.querySelector("header h1");
    if (!casa && header) casa = header.textContent.trim();

    const casaNormal = normalizarCasa(casa);

    // Filtrado robusto
    const filtrados = personajes.filter(p => {
        const housePersonaje = normalizarCasa(p.house);
        if (casaNormal === "sin casa") return housePersonaje === "sin casa";
        return housePersonaje === casaNormal;
    });

    // Ordenar por año de nacimiento, personajes sin año al final
    filtrados.sort((a,b) => {
        const aYear = a.yearOfBirth ? parseInt(a.yearOfBirth) : Infinity;
        const bYear = b.yearOfBirth ? parseInt(b.yearOfBirth) : Infinity;
        return aYear - bYear;
    });

    cont.innerHTML = "";
    let fila = document.createElement("div");
    fila.className = "fila";

    filtrados.forEach((p, i) => {
        fila.appendChild(crearTarjeta(p));
        if ((i + 1) % 4 === 0) {
            ajustarAlturaFila(fila);
            cont.appendChild(fila);
            fila = document.createElement("div");
            fila.className = "fila";
        }
    });
    if (fila.children.length > 0) {
        ajustarAlturaFila(fila);
        cont.appendChild(fila);
    }

    // **Se ha eliminado la impresión del nombre de la casa desde JS**
}

// Cargar portada (index.html)
function cargarPortada() {
    const cont = document.getElementById("grid-container");
    if (!cont) return;

    const casas = ["Gryffindor","Slytherin","Hufflepuff","Ravenclaw","Sin casa"];
    cont.innerHTML = "";

    casas.forEach(casa => {
        const div = document.createElement("div");
        div.className = "card casa-card";

        const img = document.createElement("img");
        img.src = `${casa.toLowerCase()}.jpg`;
        img.alt = casa;
        img.width = 200;
        img.height = 200;
        div.appendChild(img);

        // Click lleva a la página correcta usando minúsculas
        div.addEventListener("click", () => {
            const casaURL = normalizarCasa(casa);
            if (casaURL === "sin casa") window.location.href = "nohome.html";
            else window.location.href = `${casaURL}.html`;
        });

        cont.appendChild(div);
    });
}

// Cargar ficha personaje
async function cargarFichaPersonaje() {
    const nombre = new URLSearchParams(window.location.search).get("name");
    if (!nombre) return;

    const personajes = await obtenerPersonajes();
    const p = personajes.find(x => x.name === nombre);
    if (!p) return;

    const cont = document.getElementById("character-detail");
    cont.innerHTML = `
        <div class="card grande">
            <div class="imagen">
                <img src="${p.image || PLACEHOLDER_IMG}" alt="${p.name}">
            </div>
            <h2>${p.name}</h2>
            <p><b>Casa:</b> ${p.house || "—"}</p>
            <p><b>Apodos:</b> ${p.alternate_names?.join(", ") || "—"}</p>
            <p><b>Año de nacimiento:</b> ${p.yearOfBirth || "—"}</p>
            <p><b>Actor:</b> ${p.actor || "—"}</p>
            <p><b>Patronus:</b> ${p.patronus || "—"}</p>
        </div>
    `;
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    const contGrid = document.getElementById("grid-container");
    const contDetalle = document.getElementById("character-detail");
    const url = window.location.pathname;

    if (contGrid) {
        if (url.includes("index.html")) {
            cargarPortada();
        } else {
            cargarListadoPorCasa();
        }
    }

    if (contDetalle) {
        cargarFichaPersonaje();
    }
});
