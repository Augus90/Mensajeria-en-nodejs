const express = require('express');

var app = express(); // inicializo express

app.use('/', function(req, res){
    res.send('Hola'); // primera respuesta Hola, al entrar al root endpoint
});

app.listen(3000); // Escucho en el puerto 3000

console.log('La app esta escuchando en http://localhost:3000');

