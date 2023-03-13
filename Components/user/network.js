import express, {response, Router} from 'express';
import {success,error} from '../../network/response.mjs';// importo el modulo para las respestas homogeneas
import controller from './controller.js';

const router = Router(); // Agrego el router de express

router.post('/', (req, res) => {
    controller.addUser(req.body.name)
        .then(data => {
            success(req, res, data, 201);
        })
        .catch(err => {
            error(req, res, 'Internal Error', 500, err);
        });
})

router.get('/', (req, res) => {
    const filterUser = req.query.user || null;
    controller.getUser(filterUser)
        .then((data) => {
            success(req, res, data, 201);
        })
        .catch(err => {
            error(req, res, 'Internal Error', 500, err);
        })
})

export default router;