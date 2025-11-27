//creamos el array de comics que contendra todos los objetos comic
//inicializamos el contador de id para darselo a cada nuevo comic
let comics = [];
let ultimoId = 0;

//funcion que aumenta la id
function generarNuevoId() {
    ultimoId = ultimoId + 1;
    return ultimoId;
}

// Comics iniciales incrustado en el array de comics con push, pasando los atributos
comics.push(new Comic(generarNuevoId(), "Spider-Man", "Stan Lee", "pendiente", "no", "estanteria1"));
comics.push(new Comic(generarNuevoId(), "Naruto", "Masashi Kishimoto", "leido", "si", "estanteria3"));
comics.push(new Comic(generarNuevoId(), "One Piece", "Oda", "leyendo", "no", "estanteria2"));

//funcion que muestra los comics recorriendo el array comics
function mostrarComics(comicsFiltrados) {
    //llamamos a la caja que contendra los comics mediante su id
    //con innerHTML podemos incrustar el contenido
    let contenedor = document.getElementById("comics");
    contenedor.innerHTML = "";

    
    let lista = comicsFiltrados || comics;

    //imprimimos todos los comics
    for (let comic of lista) {

        //creamos una fila o div donde estara el comic con createElement y la etiqueta
        let fila = document.createElement("div");
        //se añade una clase a las filas para darles estilos
        fila.className = "fila";

        //se inyecta los atributos y botones para ese comic a la fila
        fila.innerHTML =
            '<div class="celda"><input id="titulo' + comic.getId() + '" value="' + comic.getTitulo() + '"></div>' +
            '<div class="celda"><input id="autor' + comic.getId() + '" value="' + comic.getAutor() + '"></div>' +

            '<div class="celda"><select id="estado' + comic.getId() + '">' +
                '<option value="pendiente"' + (comic.getEstado() === "pendiente" ? " selected" : "") + '>Pendiente</option>' +
                '<option value="leyendo"' + (comic.getEstado() === "leyendo" ? " selected" : "") + '>Leyendo</option>' +
                '<option value="leido"' + (comic.getEstado() === "leido" ? " selected" : "") + '>Leído</option>' +
            '</select></div>' +

            '<div class="celda"><select id="prestado' + comic.getId() + '">' +
                '<option value="no"' + (!comic.getPrestado() ? " selected" : "") + '>No</option>' +
                '<option value="si"' + (comic.getPrestado() ? " selected" : "") + '>Sí</option>' +
            '</select></div>' +

            '<div class="celda"><select id="estanteria' + comic.getId() + '">' +
                '<option value="estanteria1"' + (comic.getEstanteria() === "estanteria1" ? " selected" : "") + '>Estantería 1</option>' +
                '<option value="estanteria2"' + (comic.getEstanteria()  === "estanteria2" ? " selected" : "") + '>Estantería 2</option>' +
                '<option value="estanteria3"' + (comic.getEstanteria()  === "estanteria3" ? " selected" : "") + '>Estantería 3</option>' +
            '</select></div>' +

            '<div class="celda acciones">' +
                '<button onclick="modificarComic(' + comic.getId() + ')">Modificar</button>' +
                '<button onclick="eliminarComic(' + comic.getId() + ')">Eliminar</button>' +
            '</div>';

        //añadimos a el contenedor la fila de comic
        contenedor.appendChild(fila);
    }
}

//funcion que añade nuevo comic
function registrarComic() {
    //recogemos los valres en el "formulario de registro"
    let titulo = document.getElementById("nuevoTitulo").value.trim();
    let autor = document.getElementById("nuevoAutor").value.trim();
    let estado = document.getElementById("nuevoEstado").value;
    let prestado = document.getElementById("nuevoPrestado").value;
    let estanteria = document.getElementById("nuevaEstanteria").value;

    //validamos que titulo y autor no esten vacios
    if (!titulo || !autor || estado === "" || prestado === "" || estanteria === "") {
        alert("Todos los campos son obligatorios.");
        return;
    }

    //creamos un objeto comic de la clase comic incrustandole atrivutos y creando un id nuevo
    let comic = new Comic(generarNuevoId(), titulo, autor, estado, prestado, estanteria);
    //añadimos el comic al array de comics
    comics.push(comic);

    //mostramos los cambios
    mostrarComics();
}

//funcion que modifica los atributos de un comic por su id
function modificarComic(id) {
    //recorremos todos los comics y buscamos cual tiene esa id de atributo
    
        for (let comic of comics) {
            if(comic.getId() === id){
                //cambiamos todos los los atributos con los metodos set y metiendo el valor del input
                comic.setTitulo(document.getElementById("titulo" + id).value);
                comic.setAutor(document.getElementById("autor" + id).value);
                comic.setEstado(document.getElementById("estado" + id).value);
                comic.setPrestado(document.getElementById("prestado" + id).value);
                comic.setEstanteria(document.getElementById("estanteria" + id).value);
            break;
            }
        }

    //mostramos los cambios
    mostrarComics();
}

//funcion que elimina un comic por su id
function eliminarComic(id) {
    //solo se mantienen los comics que no tienen esa id
    comics = comics.filter(comic => comic.getId() !== id);

    //mostramos los cambios
    mostrarComics();
}

//funcion que valida los filtros
function aplicarFiltros() {
    let tituloFiltrado = document.getElementById("filtroTitulo").value.toLowerCase();
    let autorFiltrado = document.getElementById("filtroAutor").value.toLowerCase();
    let estadoFiltrado = document.getElementById("filtroEstado").value;
    let prestadoFiltrado = document.getElementById("filtroPrestado").value;
    let estanteriaFiltrado = document.getElementById("filtroEstanteria").value;

    //recogemos los comics del array que cumplan la condicion
    let filtrados = comics.filter(comic => {
        let filtra = true;

        //validamos si existe algun valor que coincida en los atributos con includes, ignorando mayusculas con toLowerCase
        if (tituloFiltrado && !comic.getTitulo().toLowerCase().includes(tituloFiltrado)){
            filtra = false;
        }
        if (autorFiltrado && !comic.getAutor().toLowerCase().includes(autorFiltrado)) {
            filtra = false
        };
        if (estadoFiltrado && comic.getEstado() !== estadoFiltrado){
            filtra = false
        };
        if (prestadoFiltrado && (comic.getPrestado() ? "si" : "no") !== prestadoFiltrado){ 
            filtra = false
        };
        if (estanteriaFiltrado && comic.getEstanteria() !== estanteriaFiltrado){
            filtra = false
        };

        return filtra;
    });

    //mostramos los cambios
    mostrarComics(filtrados);
}

//siempre se muestran los comics
mostrarComics();