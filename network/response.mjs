const statusMessage = {
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid format',
    '500': 'Internal error'
};

// Creo las 2 funciones de respuesta para unificar la salida de mi sistema
export const success = function(req, res, message, status){

    let statusCode = status;
    let statusMessage = message;

    if (!status) statusCode = 200;
    if (!message) statusMessage = statusMessage[status];
    // responde con un objeto de error vacio y un mensaje, y si no le especifico el estado
    // le envia un 200 por defecto
    res.status(statusCode).send({
        Error: '',
        body: statusMessage 
    });
}


export const error  = function(req, res, message, status, details){
    // Agrego los detalles del error y los imprimo en la consola 
    console.log('[Responce errors] ' + details);
    // Solo me manda el mensaje de error y el codigo de error que por defecto es el 500
    res.status(status || 500).send({
        Error: message,
        body: ''
    });
}

// Exporta las funciones del modulo para que puede usarlas en el programa principal
// export default {
//     success,
//     error,
// };

