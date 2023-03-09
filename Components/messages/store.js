// Para hacer pruebas y diagramar el sistema, creamos un MOCK de la base de datos para adecuar el código a los métodos 
// para guardar los mensajes

const list = []; // Creamos la lista vacía que albergara los mensajes en memoria

// Y generamos el addMessage y el getMessage que después serán los encargados de llamar a la base de datos
const addMessage = function(message){
    list.push(message);
}

const getMessage = function(){
    return list;
}

export default {
    add: addMessage,
    list: getMessage,
    //
}
