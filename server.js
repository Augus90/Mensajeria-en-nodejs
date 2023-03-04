import express, { Router } from 'express'; // importo como en ES6

import response from './network/response.mjs';// importo el modulo de respestas homogeneas

const router = Router(); // Agrego el router de express

var app = express(); // inicializo express

app.use(express.json()); // Uso el body parser para poder escuchal consultas del body por json
app.use(express.urlencoded({extended: false})); // Uso el urlencoded para poder escuchar el body por Form-Encoded
app.use(router); // Uso es router de express


// Configuro el router para que solamente responda a las peticiones GET
router.get('/message', function(req, res){ // Solo GET
    console.log('Header' + req.headers); // Leemos el header
    res.header({
        "custome-header":"Nuestro valor personalizado", // enviamos nuestro header custome
    })
    console.log(req.body); // imprimo el json o el form-encoded
    console.log(req.query); // nos permite acceder a los parametros por query
    // res.send('Hola desde GET')
    // llamo a la funcion para manejar las respuestas desde el modulo success con un mensaje y un numero de estado
    response.success(req, res, 'Creado correctamente',202);
});

router.put('/message', function(req, res){ // Solo PUT
    console.log(req.body);
    console.log(req.query); // nos permite acceder a los parametros por query
    // Lo que nos llegue del parametro 'text' que nos manda el body lo debuelve como respuesta
    res.send('Mensaje ' + req.body.text + ' añadido correctamente');
});

router.post('/message', function(req, res){ // Solo POST
    console.log(req.body);
    console.log(req.query); // nos permite acceder a los parametros por query
    // Lo que nos llegue del parametro 'text' que nos manda el body lo debuelve como respuesta
    // res.status(201).send({'Error' : 'Creado con exito'}); // Envia el estado 201 en la respuesta 
    if(req.query.error == 'ok'){
        // llamo a la funcion para manejar las respuestas desde el modulo success con un mensaje de error y un numero de estado
        response.error(req, res, 'error simulado', 401);
    }else{
        // llamo a la funcion para manejar las respuestas desde el modulo success con un mensaje y un numero de estado
        response.success(req, res,'Creado con exito',201); // Envia el estado 201 en la respuesta 
    }
});



app.listen(3000); // Escucho en el puerto 3000

console.log('La app esta escuchando en http://localhost:3000');