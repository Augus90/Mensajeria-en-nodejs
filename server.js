import express, { Router } from 'express'; // importo como en ES6

const router = Router(); // Agrego el router de express

var app = express(); // inicializo express

app.use(express.json()); // Uso el body parser para poder escuchal consultas del body por json
app.use(express.urlencoded({extended: false})); // Uso el urlencoded para poder escuchar el body por Form-Encoded
app.use(router); // Uso es router de express


// Configuro el router para que solamente responda a las peticiones GET
router.get('/message', function(req, res){ // Solo GET
    console.log(req.body); // imprimo el json o el form-encoded
    console.log(req.query); // nos permite acceder a los parametros por query
    res.send('Hola desde GET')
});

router.post('/message', function(req, res){ // Solo POST
    console.log(req.body);
    console.log(req.query); // nos permite acceder a los parametros por query
    // Lo que nos llegue del parametro 'text' que nos manda el body lo debuelve como respuesta
    res.send('Mensaje ' + req.body.text + ' añadido correctamente');
});

app.listen(3000); // Escucho en el puerto 3000

console.log('La app esta escuchando en http://localhost:3000');