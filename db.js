// Ahora no conectamos a mogoose para utilizar la verdadera base de datos
import db from "mongoose";

// Importo la confihuracion de la base de datos
import config from "./Config/config.js";

// Configuro las variables de entorno que vienen de config.js
const USER = encodeURIComponent(config.config.db_user);
const PASSWORD = encodeURIComponent(config.config.db_password);
const DB_NAME = encodeURIComponent(config.config.db_name);

db.Promise = global.Promise;

// Separo la connecion a la BDD para poder cambiar de entorno o de url sin reescribir todo
async function connect(MONGO_URI){

    console.log(MONGO_URI);
    await db.connect(MONGO_URI, {
        useNewUrlParser: true,
    });

    console.log('[db] Conectada con éxito');
}

export default {
    USER,
    PASSWORD,
    DB_NAME,
    connect,
};