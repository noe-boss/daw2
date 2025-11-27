class Comic {
    #id
    #titulo
    #autor
    #estado
    #prestado
    #estanteria

    constructor(id, titulo, autor, estado, prestado, estanteria) {
        this.#id = id;
        this.setTitulo(titulo);
        this.setAutor(autor);
        this.setEstado(estado);
        this.setPrestado(prestado);
        this.setEstanteria(estanteria);
    }

    //metodos get para dar el valor del atributo de cada comic
    getId(){ return this.#id}
    getTitulo(){ return this.#titulo}
    getAutor(){ return this.#autor}
    getEstado(){ return this.#estado}
    getPrestado(){ return this.#prestado}
    getEstanteria(){ return this.#estanteria}


    //metodos set que serviran para incrustar valores a los atributos
    setTitulo(newTitulo){
        //validamos que el titulo no este vacio y enviamos un mensaje al usuario
        if (!newTitulo || newTitulo.trim() === "") {
            alert("El titulo no puede estar vacio.");
            return;
        }
        //eliminamos los espacios a los lados
        this.#titulo = newTitulo.trim();
    } 
    setAutor(newAutor){
        //validamos que el autor no este vacio y enviamos un mensaje al usuario
        if (!newAutor || newAutor.trim() === "") {
            alert("El titulo no puede estar vacio.");
            return;
        }
        //eliminamos los espacios a los lados
        this.#autor = newAutor.trim();
    } 
    setEstado(newEstado) {
        if (newEstado === ""){
            alert("El estado no puede estar vacio.");
            return;
        } else {
            this.#estado = newEstado;
        }
    }
    setPrestado(newPrestado) {
        //valido la respuesta del usuario y hago la conversion a booleano
        if(newPrestado === "si"){
            this.#prestado = true;
        } else if ("no") {
            this.#prestado = false;
        } else {
            alert("El prestado no puede estar vacio.");
            return;
        }
    }
    setEstanteria(newEstanteria) {
        if (newEstanteria === ""){
            alert("El estanteria no puede estar vacio.");
            return;
        } else {
            this.#estanteria = newEstanteria;
        }
    }
}