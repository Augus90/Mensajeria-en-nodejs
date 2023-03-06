import express, { Router } from 'express'; // importo como en ES6

// importo el componente network donde estan los modulos con las configuraciones de las rutas
import router from './network/routes.js'

var app = express(); // inicializo express

app.use(express.json()); // Uso el body parser para poder escuchal consultas del body por json
app.use(express.urlencoded({extended: false})); // Uso el urlencoded para poder escuchar el body por Form-Encoded
// app.use(router); // Uso es router de express

router(app); // ahora llamo a mi router para manejar las rutas y las repuestas

app.use('/app', express.static('public'));

app.listen(3000); // Escucho en el puerto 3000

console.log('La app esta escuchando en http://localhost:3000');