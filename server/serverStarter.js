const express = require('express');
const app = express();

const llamada = require('./../index.js');
const contenedor = llamada.Contenedor;
const obj = new contenedor();

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Http Server listening on port ${server.address().port}`);
});
server.on("error", error => console.error(`Server Error ${error}`));

app.get('/productos', (req, res) => {
  res.send(console.log(obj.getAll()))
});

app.get('/productoRandom', (req, res) => {
  let random = Math.floor(Math.random() * 6).toFixed(0);
  res.send(console.log(obj.getById(random)))
});
// const server = http.createServer((req, res) => {
//   let msg = {code: 200, msg: 'Conectado'}
//   res.end(JSON.stringify(msg, null, 2));
//
//   if (req.url == '/productos') {
//
//   } else if (req.url == '/productoRandom') {
//
//   }
// });
