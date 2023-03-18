import Model from "./model.js";

const getChats = function(userId){
    return new Promise((resolve, reject) =>{
        // Filtro vacio, si no hay un usuario no se llena y trae todols los chats
        let filter = {};
        if (userId !== null) {
            filter = {
                users : userId,
            }
        }
        const chat = Model.find(filter)
            .populate('users') // Busco a los usuarios del chat por su id y los traigo
            .catch((err) => reject(err))
        
        resolve(chat)
    })
}

const addChat = function(users) {
    const myChat = new Model(users);
    myChat.save();
}

export default {
    add: addChat,
    list: getChats,
}