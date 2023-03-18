import express, {response, Router} from 'express';
import {success,error} from '../../network/response.mjs';// importo el modulo para las respestas homogeneas
import controller from './controller.js';

const router = Router(); // Agrego el router de express

router.get('/:userId', (req, res) => {
    // const filterChat = req.params.userId || null;
    // Obtengo los chats de los ususarios con useid de filtro
    controller.getChat(req.params.userId)
        .then((data) => {
            success(req, res, data, 201);
        })
        .catch(err => {
            error(req, res, 'Internal Error', 500, err);
        })
});

router.post('/', function(req, res){
    controller.addChat(req.body.users)
        .then((data) => {
            success(req, res, data,201); // si lo resuelve, reenvía el mensaje y un codigo de respuesta valido
        })
        .catch((err) => {
            error(req, res, 'Información invalida', 400, err);
        });
});

export default router;