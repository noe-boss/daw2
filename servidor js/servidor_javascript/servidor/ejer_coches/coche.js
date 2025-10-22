class Coche {
  constructor(marca, modelo, anio) {
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
  }
  mostrarInfo() {
    console.log(`Marca: ${marca}, Modelo: ${modelo}, anio: ${anio}`);
  }
}