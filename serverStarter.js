// EXPRESS Y SERVER
const express = require('express');
const app = express();

const {Server: HttpServer} = require('http');

// LLAMADA A DB
const { options } = require('./options/mariaDB.js');
const knex = require('knex')(options);

// ETC...
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
  const allProducts = await obj.getAll();
  res.render('main', {products: allProducts, hayProductos: true, form: false});
});
