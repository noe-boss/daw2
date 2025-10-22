import { Coche } from "./coche.js";
import { Electrico } from "./electrico.js"; 
import { readFileSync } from "fs";
const cochesData = JSON.parse(readFileSync("./coches.json", "utf-8"));

const coches = cochesData.map(coche => {
  if (coche.electrico) {
    return new CocheElectrico(coche.marca, coche.modelo, coche.anio, coche.autonomia);
  } else {
    return new CocheCombustion(coche.marca, coche.modelo, coche.anio);
  }
});

function mostrarCoches(){
  return coches.map(coche => {
    if (coche instanceof Electrico) {
      return `Marca: ${coche.marca}, Modelo: ${coche.modelo}, Año: ${coche.anio}, Autonomía: ${coche.autonomia} km`;
    } else {
      return `Marca: ${coche.marca}, Modelo: ${coche.modelo}, Año: ${coche.anio}`;
    }
  }).join("<br>");
}
module.exports = {mostrarCoches};