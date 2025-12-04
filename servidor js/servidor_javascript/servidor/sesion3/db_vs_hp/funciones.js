/*
function obtenerDatosConPromiseAll() {
  const api1 = fetch("https://hp-api.onrender.com/api/characters").then(r => r.json());
  const api2 = fetch("https://dragonball-api.com/api/characters").then(r => r.json());

  // Promise.all espera a que ambas promesas se resuelvan
  return Promise.all([api1, api2]);
}

// Función que imprime los resultados
function imprimirResultados([data1, data2]) {
  console.log("Resultado de la API Harry Potter");
  console.log("Resultado de la API Dragon Ball");
}

// Ejecutamos
obtenerDatosConPromiseAll()
  .then(imprimirResultados)
  .catch(err => console.error("Error:", err));
*/
  

  /*
  function obtenerDatosConPromiseAll() {
  const api1 = fetch("https://hp-api.onrender.com/api/characters").then(r => r.json());
  const api2 = fetch("https://dragonball-api.com/api/characters").then(r => r.json());

  // Promise.all espera a que ambas promesas se resuelvan
  return Promise.all([api1, api2]);
}

// Función que imprime los resultados
function imprimirResultados([data1, data2]) {
  console.log("Resultado de la API Harry Potter");
  console.log("Resultado de la API Dragon Ball");
}

// Ejecutamos
obtenerDatosConPromiseAll()
  .then(imprimirResultados)
  .catch(err => console.error("Error:", err));
  */


  function obtenerDatosConPromiseRace() {
  const api1 = fetch("https://hp-api.onrender.com/api/characters").then(r => r.json());
  const api2 = fetch("https://dragonball-api.com/api/characters").then(r => r.json());

  // Promise.race devuelve la primera promesa que se resuelva o rechace
  return Promise.race([api1, api2]);
}

// Función que imprime el resultado ganador
function imprimirResultado(resultado) {
  console.log("Primera API en responder:", resultado);
}

// Ejecutamos
obtenerDatosConPromiseRace()
  .then(imprimirResultado)
  .catch(err => console.error("Error:", err));
