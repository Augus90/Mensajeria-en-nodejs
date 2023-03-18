import Store from "./store.js";

function getChat(userID){
    return new Promise((resolve, reject) => {
        resolve(Store.list(userID));
    })
}

function addChat(userList){
    return new Promise((resolve, reject) => {
        if(!userList || !Array.isArray(userList)){
            console.error('[chatController] No hay usuario')
            reject('Los datos son incorrectos')
            return false
        }
        
        const newChat = {
            users : userList,
        };

        Store.add(newChat);
        resolve(newChat)
    })
}

export default {
    addChat,
    getChat,
}