import mongoose from "mongoose";
// Creamos el schema y configuramos para los mensajes
const Schema = mongoose.Schema;

const mySchema = new Schema({
    // user: String,
    // Agrego un object Id de mongo para hacer referencia a la otra tabla con los usuarios
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    message: {
        type: String,
        required: true // el mensaje es requerido
    },
    date: Date
})

// Creo el modelo message desde mi schema de mensajes y lo exporto
const model = mongoose.model('Message', mySchema);
export default model;
