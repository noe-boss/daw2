class Comic {

    #id;
    #titulo;
    #autor;
    #estado;
    #prestado;
    #estanteria;

    constructor(id, titulo, autor, estado, prestado, estanteria) {
        this.#id = id;

        this.setTitulo(titulo);
        this.setAutor(autor);
        this.setEstado(estado);
        this.setPrestado(prestado);
        this.setEstanteria(estanteria);
    }

    get id() { return this.#id; }
    get titulo() { return this.#titulo; }
    get autor() { return this.#autor; }
    get estado() { return this.#estado; }
    get prestado() { return this.#prestado; }
    get estanteria() { return this.#estanteria; }

    setTitulo(valor) {
        if (!valor || valor.trim() === "") {
            alert("El titulo no puede estar vacio.");
            return;
        }
        this.#titulo = valor.trim();
    }
    setAutor(valor) {
        if (!valor || valor.trim() === "") {
            alert("El autor no puede estar vacio.");
            return;
        }
        this.#autor = valor.trim();
    }
    setEstado(valor) {
        this.#estado = valor;
    }
    setPrestado(valor) {
        this.#prestado = (valor === "si");
    }
    setEstanteria(valor) {
        this.#estanteria = valor;
    }
}
