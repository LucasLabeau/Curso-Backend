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

app.get('/productos', async(req, res) => {
    try {
        //const content = await fs.promises.readFile('data.json', 'utf-8');
        const todosProductos = await obj.getAll();
        res.json(todosProductos)
    } catch (error) {
        res.status(error).send('Server error')
    }
});

app.get('/productoRandom', async(req, res) => {
    try {
        const todosProductos = await obj.getAll();
        const max = todosProductos.length;
        const random = Math.ceil(Math.random() * (max));
        const productoPorId = await obj.getById(random);
        res.json(productoPorId);
    } catch (error) {
        res.status(error).send('Server error')
    }
});
