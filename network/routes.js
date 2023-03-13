import express, { Router } from 'express'; // importo como en ES6
import message from "../Components/messages/network.js"
import user from "../Components/user/network.js"
 

// Creamos la capa de red, donde utilizaremos a express para llamar a las rutas
// Nuestro nuevo router esta en la carpeta network donde haremos los redireccionamientos
// tanto de las respuestas como de las rutas 
const router = function (server) {
    // Todas las llamadas hacia message las gestione el componente de message
    server.use('/message', message);
    server.use('/user', user);
}

export default router;