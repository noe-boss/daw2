import { Electrico } from "./electrico.js"; 
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer coches.json correctamente
const cochesData = JSON.parse(readFileSync(path.join(__dirname, "coches.json"), "utf-8"));

// Resto de tu código...
class Combustion {
  constructor(marca, modelo, anio) {
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
  }
}

const coches = cochesData.map(coche => {
  if (coche.electrico) {
    return new Electrico(coche.marca, coche.modelo, coche.anio, coche.autonomia);
  } else {
    return new Combustion(coche.marca, coche.modelo, coche.anio);
  }
});

export function mostrarCoches() {
  return coches.map(coche => {
    if (coche instanceof Electrico) {
      return `Marca: ${coche.marca}, Modelo: ${coche.modelo}, Año: ${coche.anio}, Autonomía: ${coche.autonomia} km`;
    } else {
      return `Marca: ${coche.marca}, Modelo: ${coche.modelo}, Año: ${coche.anio}`;
    }
  }).join("<br>");
}