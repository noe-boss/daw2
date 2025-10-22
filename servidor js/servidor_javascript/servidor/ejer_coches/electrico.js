import { Coche } from "./coche.js";

export class Electrico extends Coche {
  constructor(marca, modelo, anio, autonomia) {
    super(marca, modelo, anio);
    this.autonomia = autonomia;
  }

  mostrarInfo() {
    console.log(`Marca: ${this.marca}, Modelo: ${this.modelo}, Año: ${this.anio}, Autonomía: ${this.autonomia} km`);
  }
}