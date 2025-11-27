import express from 'express';
import { fileURLToPath } from "url";
import fs from "fs/promises";
import path from "path";

import { variables, concatenar } from './sesion2/sesion2.js';
import { mostrarCoches } from './ejer_coches/main.js';
import { ejemplos } from './sesion2/paises.js';
import { imprimirNaves } from './starwards/funciones.js';

const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use('/peliculas', express.static(path.join(__dirname, 'peliculas')));
app.get("/peliculas/movies", async (req, res) => {
        const data = await fs.readFile(path.join(__dirname, "/peliculas/movies.json"), "utf-8");
        const movies = JSON.parse(data);
        res.json(movies);
});
app.get('/starwards/funciones', (req, res) => {
  const resultado = imprimirNaves();
  res.send(resultado);
});


app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
