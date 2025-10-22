// Importar express
const express = require('express');
const sesion2 = require('./sesion2/sesion2');
const paises = require('./sesion2/paises');
const coches = require('./ejer_coches/main');

// crear una aplicacion express
const app = express();

// definir el puerto en el que escuchara el servidor o tamien sirver escribir esto process.env.port
const port = 3000;

// Ruta principal
app.get('/', (req, res) => {
  res.send('<h1>Hola, mundo desde Express!</h1>');
});

//++SESION2
// Ejemplo: suma
app.get('/variables',(req,res)=>{
  const resultado = sesion2.variables();
  res.send(`La variable pinta ${resultado}`)
});

app.get('/concatenar',(req,res)=>{
  const resultado = sesion2.concatenar();
  res.send(true);
});

app.get('/concatenar',(req,res)=>{
  const resultado = sesion2.concatenar();
  res.send(true);
});
app.get('/ejemplos', (req, res) => {
  const resultado = paises.ejemplos();
  res.send(resultado);
});
app.get('/sesion2/paises', (req, res) => {
  const resultado = paises.ejemplos();
  res.send('<h1>ejercicio paises!</h1>');
  res.send(resultado);
});
app.get('/ejer_coches/main', (req, res) => {
  const resultado = coches.mostrarCoches();
  res.send(resultado);
});
//--SESION2
// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});