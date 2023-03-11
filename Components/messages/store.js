// Para hacer pruebas y diagramar el sistema, creamos un MOCK de la base de datos para adecuar el código a los métodos 
// para guardar los mensajes

// const list = []; // Creamos la lista vacía que albergara los mensajes en memoria

// Ahora no conectamos a mogoose para utilizar la verdadera base de datos
import db from "mongoose";
import Model from "./model.mjs"
import config from "../../Config/config.js";


// Configuro las variables de entorno que vienen de config.js
const USER = encodeURIComponent(config.config.db_user);
const PASSWORD = encodeURIComponent(config.config.db_password);
const DB_NAME = encodeURIComponent(config.config.db_name);
// Creo la URI para la conexión de la base de datos
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.config.db_host}/${DB_NAME}?retryWrites=true&w=majority`;

db.Promise = global.Promise;
db.connect(MONGO_URI, {
    useNewUrlParser: true,
});
console.log('[db] Conectada con éxito');

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
