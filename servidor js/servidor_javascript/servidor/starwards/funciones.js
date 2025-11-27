import { sw } from "./datos.js";

const naves = sw.results;

const grandes = naves.filter(nave => {
  const pasajeros = parseInt(nave.passengers);
  return !isNaN(pasajeros) && pasajeros > 100;
});

const pequeñas = naves.filter(nave => {
  const pasajeros = parseInt(nave.passengers);
  return !isNaN(pasajeros) && pasajeros <= 100;
});


export function imprimirNaves(){
    console.log("Naves grandes");
    
    grandes.forEach(nave => {
        console.log(`🚀 Nave: ${nave.name} | Pasajeros: ${nave.passengers}`);
    });

    console.log("Naves Pequeñas");

    pequeñas.forEach(nave => {
        console.log(`🛸 Nave: ${nave.name} | Pasajeros: ${nave.passengers}`);
    });
} 