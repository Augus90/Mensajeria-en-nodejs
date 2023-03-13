import mongoose from "mongoose";
// Creamos el schema y configuramos para los mensajes
const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String
})

// Creo el modelo User desde mi schema de mensajes y lo exporto
const model = mongoose.model('User', mySchema);

export default model;
