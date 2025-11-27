let listaComics = [];
let ultimoId = 0;

function generarNuevoId() {
    ultimoId = ultimoId + 1;
    return ultimoId;
}

// Comics iniciales
listaComics.push(new Comic(generarNuevoId(), "Spider-Man", "Stan Lee", "pendiente", "no", "estanteria1"));
listaComics.push(new Comic(generarNuevoId(), "Naruto", "Masashi Kishimoto", "leido", "si", "estanteria3"));
listaComics.push(new Comic(generarNuevoId(), "One Piece", "Oda", "leyendo", "no", "estanteria2"));

function mostrarComics(listaFiltrada) {
    let contenedor = document.getElementById("listado");
    contenedor.innerHTML = "";

    let lista = listaFiltrada || listaComics;

    for (let i = 0; i < lista.length; i++) {
        let comic = lista[i];

        let fila = document.createElement("div");
        fila.className = "fila";

        fila.innerHTML =
            '<div class="celda"><input id="titulo' + comic.id + '" value="' + comic.titulo + '"></div>' +
            '<div class="celda"><input id="autor' + comic.id + '" value="' + comic.autor + '"></div>' +

            '<div class="celda"><select id="estado' + comic.id + '">' +
                '<option value="pendiente"' + (comic.estado === "pendiente" ? " selected" : "") + '>Pendiente</option>' +
                '<option value="leyendo"' + (comic.estado === "leyendo" ? " selected" : "") + '>Leyendo</option>' +
                '<option value="leido"' + (comic.estado === "leido" ? " selected" : "") + '>Leído</option>' +
            '</select></div>' +

            '<div class="celda"><select id="prestado' + comic.id + '">' +
                '<option value="no"' + (!comic.prestado ? " selected" : "") + '>No</option>' +
                '<option value="si"' + (comic.prestado ? " selected" : "") + '>Sí</option>' +
            '</select></div>' +

            '<div class="celda"><select id="estanteria' + comic.id + '">' +
                '<option value="estanteria1"' + (comic.estanteria === "estanteria1" ? " selected" : "") + '>Estantería 1</option>' +
                '<option value="estanteria2"' + (comic.estanteria === "estanteria2" ? " selected" : "") + '>Estantería 2</option>' +
                '<option value="estanteria3"' + (comic.estanteria === "estanteria3" ? " selected" : "") + '>Estantería 3</option>' +
            '</select></div>' +

            '<div class="celda acciones">' +
                '<button onclick="modificarComic(' + comic.id + ')">Modificar</button>' +
                '<button onclick="eliminarComic(' + comic.id + ')">Eliminar</button>' +
            '</div>';

        contenedor.appendChild(fila);
    }
}

function registrarComic() {
    let titulo = document.getElementById("nuevoTitulo").value.trim();
    let autor = document.getElementById("nuevoAutor").value.trim();
    let estado = document.getElementById("nuevoEstado").value;
    let prestado = document.getElementById("nuevoPrestado").value;
    let estanteria = document.getElementById("nuevaEstanteria").value;

    if (!titulo || !autor) {
        alert("El título y el autor son obligatorios.");
        return;
    }

    let comic = new Comic(generarNuevoId(), titulo, autor, estado, prestado, estanteria);
    listaComics.push(comic);

    mostrarComics();
}

function modificarComic(id) {
    for (let i = 0; i < listaComics.length; i++) {
        if (listaComics[i].id === id) {
            let comic = listaComics[i];

            comic.setTitulo(document.getElementById("titulo" + id).value);
            comic.setAutor(document.getElementById("autor" + id).value);
            comic.setEstado(document.getElementById("estado" + id).value);
            comic.setPrestado(document.getElementById("prestado" + id).value);
            comic.setEstanteria(document.getElementById("estanteria" + id).value);

            break;
        }
    }
    mostrarComics();
}

function eliminarComic(id) {
    listaComics = listaComics.filter(c => c.id !== id);
    mostrarComics();
}

function aplicarFiltros() {
    let t = document.getElementById("filtroTitulo").value.toLowerCase();
    let a = document.getElementById("filtroAutor").value.toLowerCase();
    let e = document.getElementById("filtroEstado").value;
    let p = document.getElementById("filtroPrestado").value;
    let es = document.getElementById("filtroEstanteria").value;

    let filtrados = listaComics.filter(c => {
        let pasa = true;

        if (t && !c.titulo.toLowerCase().includes(t)) pasa = false;
        if (a && !c.autor.toLowerCase().includes(a)) pasa = false;
        if (e && c.estado !== e) pasa = false;
        if (p && (c.prestado ? "si" : "no") !== p) pasa = false;
        if (es && c.estanteria !== es) pasa = false;

        return pasa;
    });

    mostrarComics(filtrados);
}

mostrarComics();
