import express, { Router } from 'express'; // importo como en ES6
const app = express(); // inicializo express

// Importo el servidor HTTP para escuchar las peticiones de conexion por el websocket
import http from 'http';
const HttpServer =  http.Server(app)


// Importo la confihuracion de la base de datos
import config from "./Config/config.js";
import db from './db.js';
import socket from './socket.js';

// importo el componente network donde estan los modulos con las configuraciones de las rutas
import router from './network/routes.js'


// Creo la URI para la conexión de la base de datos
const MONGO_URI = `mongodb+srv://${db.USER}:${db.PASSWORD}@${config.config.db_host}/${db.DB_NAME}?retryWrites=true&w=majority`;

// Para no tener que conectarme a la BDD por cada una de las peticiones, me conecto desde el server y utilizar
// la conexión para todas las consultar futuras
db.connect(MONGO_URI);

app.use(express.json()); // Uso el body parser para poder escuchal consultas del body por json
app.use(express.urlencoded({extended: false})); // Uso el urlencoded para poder escuchar el body por Form-Encoded
// app.use(router); // Uso es router de express

// Conecto mi servidor al socket para habilitar escuchar los sockets
socket.connect(HttpServer);

router(app); // ahora llamo a mi router para manejar las rutas y las repuestas

app.use('/app', express.static('public'));

// Escucho el puerto 3000 y con el callback me aseguro que me muestre que se inicio una vez que halla termiando
HttpServer.listen(3000, function() {
    console.log('La app esta escuchando en http://localhost:3000');

}); // Escucho en el puerto 3000
