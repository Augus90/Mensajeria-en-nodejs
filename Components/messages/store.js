// Para hacer pruebas y diagramar el sistema, creamos un MOCK de la base de datos para adecuar el código a los métodos 
// para guardar los mensajes

// const list = []; // Creamos la lista vacía que albergara los mensajes en memoria


import Model from "./model.mjs"



// Y generamos el addMessage y el getMessage que después serán los encargados de llamar a la base de datos
const addMessage = function(message){
    // list.push(message);
    // Utilizo mi schema para guardar la informacion en la base de datos
    const myMessage = new Model(message);
    myMessage.save();
}

const getMessage = async function(filterUser){
    // Variable filtro que es vacia si no se especifica el usuario para traer a todos
    let filter = {};
    // Si el usuario no es vacio, solo trae los mensajes del mismo creando el filtro
    if(filterUser !== null){
        filter = { user: filterUser };
    }

    // Llamo al find para que me traiga todos los mensajes de mi BDD con el filtro proporcionado
    const messages = await Model.find(filter);

    return messages;
}

async function updateText(id, message){
    // Busco el unico mensaje con ese id
    const foundMessage = await Model.findOne({ 
        _id: id
    });  
    // modifico su contenido con el mensaje nuevo
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}


function deleteMessage(id){
    // Busco el id en la BDD para eliminarlo
    return Model.deleteOne({ 
        _id: id
    });
}

export default {
    add: addMessage,
    list: getMessage,
    updateText: updateText,
    remove : deleteMessage,
}
