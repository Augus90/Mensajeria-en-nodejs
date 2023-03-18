import express, {response, Router} from 'express';

import multer from 'multer';

import {success,error} from '../../network/response.mjs';// importo el modulo para las respestas homogeneas

import controller from './controller.js';

const router = Router(); // Agrego el router de express

const storage = multer.diskStorage({
    destination: function(req, file, next){
        next(null, 'public/files/')
    },
    filename: function(req, file, next){
        next(null, Date.now() + '.jpg');
    }
});

const upload = multer({ 
    storage: storage
});

// Configuro el router para que solamente responda a las peticiones GET
router.get('/', function(req, res){ // Solo GET
    // console.log('Header' + req.headers); // Leemos el header
    // res.header({
    //     "custome-header":"Nuestro valor personalizado", // enviamos nuestro header custome
    // })
    // console.log(req.body); // imprimo el json o el form-encoded
    // console.log(req.query); // nos permite acceder a los parametros por query
    // res.send('Hola desde GET')
    // llamo a la funcion para manejar las respuestas desde el modulo success con un mensaje y un numero de estado
    // success(req, res, 'Creado correctamente',202);

    // Variable filtro que toma el query para buscar un solo user o todos si no ser proporciona ninguno
    const filterMessage = req.query.user || null;
    // Con el getMessage llamo al controlador para que me traiga todos los mensajes de la base de datos
    controller.getMessage(filterMessage)
        .then((messageList) => {
            success(req, res, messageList, 200);
        })
        .catch((err) => {
            error(req, res, 'Error inesperado', 500, err);
        });
});

router.put('/', function(req, res){ // Solo PUT
    console.log(req.body);
    console.log(req.query); // nos permite acceder a los parametros por query
    // Lo que nos llegue del parametro 'text' que nos manda el body lo debuelve como respuesta
    res.send('Mensaje ' + req.body.text + ' añadido correctamente');
});

router.post('/', upload.single('file'), function(req, res){ // Solo POST
    // console.log(req.body);
    // console.log(req.query); // nos permite acceder a los parametros por query
    // Lo que nos llegue del parametro 'text' que nos manda el body lo debuelve como respuesta

    // llamamos al controlador pora que se encargue de procesar la informacion del cuerpo del mensaje
    // y pueda guardar el mensaje en la base de datos
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then((fullMessage) => {
            success(req, res, fullMessage,201); // si lo resuelve, reenvía el mensaje y un codigo de respuesta valido
        })
        .catch((err) => {
            error(req, res, 'Información invalida', 400, err);
        });
    // res.status(201).send({'Error' : 'Creado con exito'}); // Envia el estado 201 en la respuesta 
    // if(req.query.error == 'ok'){
    //     // llamo a la funcion para manejar las respuestas desde el modulo success con un mensaje de error y un numero de estado
    //     error(req, res, 'error simulado', 401, "Es solo una simulacion de errores");
    // }else{
    //     // llamo a la funcion para manejar las respuestas desde el modulo success con un mensaje y un numero de estado
    //     success(req, res,'Creado con exito',201); // Envia el estado 201 en la respuesta 
    // }
});

router.patch('/:id', function(req, res){
    console.log(req.params.id);

    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            success(req, res, data, 200);
        })
        .catch((err) => {
            error(req, res, 'Error interno', 500, err);
        })
});

// Creo el borrar usuario para un id de mansaje especifico
router.delete('/:id', function(req, res){
    // Solo borra el mensaje con id procorcionado por el query
    controller.deleteMessage(req.params.id)
        .then(() => {
            success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
        })
        .catch((err) => {
            error(req, res, 'Error interno', 500, err);
        })
})

export default router;