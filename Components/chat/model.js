import mongoose from "mongoose";
// Creamos el schema y configuramos para los mensajes
const Schema = mongoose.Schema;

const mySchema = new Schema({
    // Una lista con los usuarios del chat
    // solo contiene los ids de lso ususarios del documento user
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

// Creo el modelo desde mi schema de chat y lo exporto
const model = mongoose.model('Chat', mySchema);

export default model;
