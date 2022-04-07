// Importación de mocks de productos
import fiveProducts from './api/productos-test.js';

// EXPRESS Y SERVER
import express  from 'express';
import {Server as HttpServer} from 'http';
import {Server as IOServer} from 'socket.io';

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
// ETC...
import bodyParser from 'body-parser';

import morgan from 'morgan';

const router = express.Router();

import handlebars from 'express-handlebars';

// LLAMADA A CONTENEDOR MENSAJES
import msg from './daos/messagesDao.js';

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
  layoutsDir: './views/layouts',
  partialsDir: './views/partials'
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
  const allMessages = msg.listAll();
  res.render('main', {messages: allMessages, hayProductos: false, form: true});
})

app.get('/productos', async(req, res) => {
//  const allProducts = await obj.getAll();
  setTimeout(() => {
    res.render('main', {products: fiveProducts, hayProductos: true, form: false});
  }, 2000);
});
