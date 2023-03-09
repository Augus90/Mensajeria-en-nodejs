import store from "./store.js";

function addMessage(user, message) {
    // Agrego el controlador para generar el mensaje que se envía al recibir una petición por PUT
    // Este recibe los mensajes que se le pasan por el cuerpo de la petición y lo muestra por pantalla

    // Lo resuelve con una promesa
    return new Promise((resolve, reject) => {
        // Si no se proporciona el mensaje o el usuario, lo rechaza e informa del error
        if (!user || !message){
            console.error('[messageController] No hay usuario o mensaje')
            reject('Los datos son incorrectos');
            return false;
        }
        // Si todo llega correctamente, creo el mensaje, agrego la fecha y lo devuelvo
        const fullMessage = {
            user: user,
            message: message,
                date: new Date(),
            };
        
        // console.log(fullMessage);
        // LLamo a la funcion guardar mensaje en la base de datos
        store.add(fullMessage);

        resolve(fullMessage); // Si todo salió bien lo devuelvo
    });
    
};

// Nos devuelve todos los mensajes de la base de datos 
function getMessage(user, message) {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    });
};

export default {
    addMessage,
    getMessage
}