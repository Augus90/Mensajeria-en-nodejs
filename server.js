import express, { Router } from 'express'; // importo como en ES6

const router = Router(); // Agrego el router de express

var app = express(); // inicializo express

app.use(router); // Uso es router de express

// Configuro el router para que solamente responda a las peticiones GET
router.get('/', function(req, res){ // Solo GET
    res.send('Hola desde GET')
});

router.post('/', function(req, res){ // Solo POST
    res.send('Hola desde POST')
});

app.listen(3000); // Escucho en el puerto 3000

console.log('La app esta escuchando en http://localhost:3000');

