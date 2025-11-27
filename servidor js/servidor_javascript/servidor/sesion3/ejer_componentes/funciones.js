// Definición de la clase del Custom Element
    class MiContador extends HTMLElement {
      // Atributos que se observarán para detectar cambios
      static get observedAttributes() {
        return ['valor'];
      }

      constructor() {
        super(); // Siempre llamar a super() en el constructor
        this.valor = parseInt(this.getAttribute('valor')) || 0;
      }

      // Se ejecuta cuando el elemento se añade al DOM
      connectedCallback() {
        this.render();
        this.addEventListener('click', this.incrementar);
      }

      // Se ejecuta cuando se quita del DOM
      disconnectedCallback() {
        this.removeEventListener('click', this.incrementar);
      }

      // Se ejecuta cuando se cambia un atributo observado
      attributeChangedCallback(nombre, valorNuevo) {
        if (nombre === 'valor') {
          this.valor = parseInt(valorNuevo);
          this.render();
        }
      }

      // Método para incrementar el contador
      incrementar = () => {
        this.valor++;
        this.setAttribute('valor', this.valor);
      }

      // Método para actualizar el contenido del elemento
      render() {
        this.textContent = `Contador: ${this.valor}`;
      }
    }

    class MiRestador extends HTMLElement {
      // Atributos que se observarán para detectar cambios
      static get observedAttributes() {
        return ['valorrestado'];
      }

      constructor() {
        super(); // Siempre llamar a super() en el constructor
        this.valorrestado = parseInt(this.getAttribute('valorrestado')) || 0;
      }

      // Se ejecuta cuando el elemento se añade al DOM
      connectedCallback() {
        this.render();
        this.addEventListener('click', this.restar);
      }

      // Se ejecuta cuando se quita del DOM
      disconnectedCallback() {
        this.removeEventListener('click', this.restar);
      }

      // Se ejecuta cuando se cambia un atributo observado
      attributeChangedCallback(nombre, valorAntiguo, valorNuevo) {
        if (nombre === 'valorrestado') {
          this.valorrestado = parseInt(valorNuevo);
          this.render();
        }
      }

      // Método para incrementar el contador
      restar = () => {
        this.valorrestado--;
        this.setAttribute('valorrestado', this.valorrestado);
      }

      // Método para actualizar el contenido del elemento
      render() {
        this.textContent = `Contador Restado: ${this.valorrestado}`;
      }
    }

    class MiMultiplicador extends HTMLElement {
      // Atributos que se observarán para detectar cambios
      static get observedAttributes() {
        return ['valormultiplicado'];
      }

      constructor() {
        super(); // Siempre llamar a super() en el constructor
        this.valormultiplicado = parseInt(this.getAttribute('valormultiplicado')) || 1;
      }

      // Se ejecuta cuando el elemento se añade al DOM
      connectedCallback() {
        this.render();
        this.addEventListener('click', this.multiplicar);
      }

      // Se ejecuta cuando se quita del DOM
      disconnectedCallback() {
        this.removeEventListener('click', this.multiplicar);
      }

      // Se ejecuta cuando se cambia un atributo observado
      attributeChangedCallback(nombre, valorAntiguo, valorNuevo) {
        if (nombre === 'valormultiplicado') {
          this.valormultiplicado = parseInt(valorNuevo);
          this.render();
        }
      }

      // Método para incrementar el contador
      multiplicar = () => {
        this.valormultiplicado = this.valormultiplicado * 2;
        this.setAttribute('valormultiplicado', this.valormultiplicado);
      }

      // Método para actualizar el contenido del elemento
      render() {
        this.textContent = `Contador Multiplicado: ${this.valormultiplicado}`;
      }
    }

 class MiTabla extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.data = [];
  }

  set data(value) {
    this._data = value;
    this.render();
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    // Datos iniciales
    this.data = [
      { nombre: 'Ana', edad: 28, ciudad: 'Madrid' },
      { nombre: 'Luis', edad: 35, ciudad: 'Valencia' },
    ];
  }

  render() {
    if (!this.shadowRoot) return;
    const data = this._data || [];
    this.shadowRoot.innerHTML = `
      <style>
        table { border-collapse: collapse; width: 100%; font-family: sans-serif; }
        th, td { border: 1px solid #ccc; padding: 8px; }
        th { background: #f4f4f4; }
      </style>
      <table>
        <thead>
          <tr>${data.length ? Object.keys(data[0]).map(k => `<th>${k}</th>`).join('') : ''}</tr>
        </thead>
        <tbody>
          ${data.map(row => `<tr>${Object.values(row).map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;
  }
}

customElements.define('mi-tabla', MiTabla);


    // Registrar el elemento personalizado
    customElements.define('mi-contador', MiContador);
    customElements.define('mi-restador', MiRestador);

    const tabla = document.querySelector('mi-tabla');
tabla.data = [
  { nombre: 'Mario', edad: 30, ciudad: 'Bilbao' },
  { nombre: 'Lucía', edad: 25, ciudad: 'Granada' },
];