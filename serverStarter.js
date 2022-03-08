// EXPRESS Y SERVER
const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// LLAMADA A DB
// const { options } = require('./options/mariaDB.js');
// const knex = require('knex')(options);

// ETC...
const bodyParser = require('body-parser');

const morgan = require('morgan');

const router = express.Router();

const handlebars = require('express-handlebars');

// LLAMADA A CONTENEDOR PRODUCTOS
const call = require('./productContainer.js');
const contenedor = call.Contenedor;
const obj = new contenedor();

// LLAMADA A CONTENEDOR MENSAJES
const callMsg = require('./messageContainer.js');
const mensaje = callMsg.Mensaje;
const msg = new mensaje;

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
httpServer.listen(port, () => {
  console.log(`Http Server listening on port ${httpServer.address().port}`);
});
io.on('connection', (socket) => {
    const messages = [];
    console.log('Usuario conectado');

    socket.emit('messages', messages);

    socket.on('message', data => {
        let mensaje = { socketId: socket.id, message: data, fyh: new Date()}
        messages.push(mensaje);
        io.emit('messages', messages);
        msg.save(mensaje);
    });

})


// RUTAS
app.get('/', (req, res) => {
  const allMessages = msg.getAll();
  res.render('main', {messages: allMessages, hayProductos: false, form: true});
})

app.get('/productos', async(req, res) => {
  const allProducts = await obj.getAll();
  setTimeout(() => {
    res.render('main', {products: allProducts, hayProductos: true, form: false});
  }, 2000);
});
