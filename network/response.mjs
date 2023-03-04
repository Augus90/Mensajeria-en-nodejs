// Creo las 2 funciones de respuesta para unificar la salida de mi sistema

function success(req, res, message, status){
    // responde con un objeto de error vacio y un mensaje, y si no le especifico el estado
    // le envia un 200 por defecto
    res.status(status || 200).send({
        Error: '',
        body: message
    });
}


function error(req, res, message, status){
    // Solo me manda el mensaje de error y el codigo de error que por defecto es el 500
    res.status(status || 500).send({
        Error: message,
        body: ''
    });
}

// Exporta las funciones del modulo para que puede usarlas en el programa principal
export default {
    success,
    error,
};

