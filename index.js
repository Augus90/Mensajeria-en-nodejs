import express from 'express';
const app = express();

import http from 'http';
const HttpServer =  http.Server(app)

import {Server} from 'socket.io'
const io = new Server(HttpServer);

const PORT = 8080;

// Pagina estatica que muesta un mensaje y se crean las conexiones al socket
app.use(express.static('public'));

// Creo la conexión del socket y cada vez que se conecta un usuario lo imformo por consola y envio un mensaje
io.on('connection', function(socket){
    console.log('Nuevo cliente conectado');
    socket.emit('mensaje', 'Bienvenido');
})

// Para probar la conexión envió un mensaje cada 3 segundos
setInterval(function(){
    io.emit('mensaje', 'Hola, os escribo a todos');
}, 3000);

// Creo el servidor con express y node
HttpServer.listen(PORT, function() {
    console.log('Servidor iniciado en http://localhost:' + PORT);
})