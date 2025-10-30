import express from 'express';
import { variables, concatenar } from './sesion2/sesion2.js';
import { mostrarCoches } from './ejer_coches/main.js';
import { ejemplos } from './sesion2/paises.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hola, mundo desde Express!</h1>');
});

app.get('/variables',(req,res)=>{
  const resultado = variables();
  res.send(`La variable pinta ${resultado}`);
});

app.get('/concatenar',(req,res)=>{
  const resultado = concatenar();
  res.send(`${resultado}`);
});

app.get('/ejemplos', (req, res) => {
  const resultado = ejemplos();
  res.send('<pre>' + JSON.stringify(resultado, null, 2) + '</pre>');
});

app.get('/sesion2/paises', (req, res) => {
  const resultado = ejemplos();
  res.send(`<h1>Ejercicio paises!</h1><pre>${JSON.stringify(resultado, null, 2)}</pre>`);
});

app.get('/ejer_coches/main', (req, res) => {
  const resultado = mostrarCoches();
  res.send(resultado);
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
