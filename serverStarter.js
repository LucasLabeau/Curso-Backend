// EXPRESS
const express = require('express');
const app = express();

const {Server: HttpServer} = require('http');
const {}

const bodyParser = require('body-parser');

const morgan = require('morgan');

const router = express.Router();

const handlebars = require('express-handlebars');

// LLAMADA A INDEX
const call = require('./index.js');
const contenedor = call.Contenedor;
const obj = new contenedor();

// PUERTO
const port = 7070;

// MIDDLEWARE
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use(morgan('tiny'));
app.use('/api', router);

app.set('view engine', 'hbs');
app.set("views", "./views");
app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partialsDir'
}));

// ACTIVACIÓN DEL SERVER
const server = app.listen(port, () => {
  console.log(`Http Server listening on port ${server.address().port}`);
});
server.on("error", error => console.error(`Server Error ${error}`));

// RUTAS
app.get('/', (req, res) => {
  res.render('main', {hayProductos: false, form: true});
})

app.get('/productos', async(req, res) => {
    try {
      const allProducts = await obj.getAll();
      res.render('main', {products: allProducts, hayProductos: true, form: false});
    } catch (error) {
      res.status(error).send('Server error')
    }
});

// router.get('/productos/:id', async(req, res) => {
//     try {
//       let id = parseInt(req.params.id)
//       const productById = await obj.getById(id);
//       if (productById) {
//         res.json(productById);
//       } else {
//         res.json({ error: "producto no encontrado" })
//       }
//
//     } catch (error) {
//         res.status(error).send('Server error');
//     }
// });
//
// router.post('/productos', async(req, res) => {
//   try {
//     const saveProduct = await obj.save(req.body);
//     res.json(saveProduct);
//   } catch (e) {
//     res.status(e).send('Server error');
//   }
// });
//
// router.put('/productos/:id', async(req, res) => {
//     try {
//       let id = parseInt(req.params.id)
//       const productById = await obj.getById(id);
//       if (productById != undefined) {
//         const deleteProduct = await obj.deleteById(id);
//         const saveProduct = await obj.save({id: id, title: req.body.title, price: req.body.price});
//         res.json(saveProduct);
//       } else {
//         res.json({ error: "producto no encontrado" })
//       }
//     } catch (e) {
//       res.status(e).send('Server error');
//     }
// });
//
// router.delete('/productos/:id', async(req,res) => {
//     try {
//       let id = parseInt(req.params.id);
//       const deleteProduct = await obj.deleteById(id);
//       res.json([{ productoEliminado: deleteProduct}]);
//     } catch (e) {
//       res.status(e).send('Server error');
//     }
// });
