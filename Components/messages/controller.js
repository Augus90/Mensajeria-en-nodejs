import socket from "../../socket.js";
import store from "./store.js";

function addMessage(chat ,user, message, file) {
    // Agrego el controlador para generar el mensaje que se envía al recibir una petición por PUT
    // Este recibe los mensajes que se le pasan por el cuerpo de la petición y lo muestra por pantalla

    // Lo resuelve con una promesa
    return new Promise((resolve, reject) => {
        // Si no se proporciona el mensaje o el usuario, lo rechaza e informa del error
        if (!chat || !user || !message){
            console.error('[messageController] No hay chat, usuario o mensaje')
            reject('Los datos son incorrectos');
            return false;
        }

        let fileUrl = '';
        if(file){
            fileUrl = 'http://localhost:3000/app/files/' + file.filename;
        }

        // Si todo llega correctamente, creo el mensaje, agrego la fecha y lo devuelvo
        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
            };
        
        // console.log(fullMessage);
        // LLamo a la funcion guardar mensaje en la base de datos
        store.add(fullMessage);

        // Emite el menaje por WebSocket para que todos lo que estén escuchando reciban el mensaje
        socket.socket.io.emit('message', fullMessage);

        resolve(fullMessage); // Si todo salió bien lo devuelvo
    });
    
};

// Nos devuelve todos los mensajes de la base de datos que coincidan con el filtro de ususario
function getMessage(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    });
};

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if(!id || !message){ // verificamos que el id y el mensaje no estén vacios
            reject('Invalid data');
            return false;
        }
        // llama al store que se encargue de la actualización 
        const result = await store.updateText(id, message);

        resolve(result);
    });
}

function deleteMessage(id){
    return new Promise((resolve, reject) => {
        if(!id){ // verificamos que el id no sea nulo
            reject('Invalid id');
            return false;
        }
        // Si no es nulo lo busco en la base de datos y lo elimino
        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => reject(e));
    });
}

export default {
    addMessage,
    getMessage,
    updateMessage,
    deleteMessage,
}