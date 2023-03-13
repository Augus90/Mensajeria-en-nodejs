import Store from "./store.js";

function addUser(name){
    // El store.add nos devuelve una promesa, pero si no me llega un nombre valido puedo rechazar
    // el nombre devolviendo un reject por defecto de la promesa indicando que el nombre no es valido
    if(!name){
        return Promise.reject('Invalid name');
    }
    
    // si el nombre es valido solo retorno la promesa del store.add sin ninguna modificacion
    const user = {
        name,
    };

    return Store.add(user);
}

function getUser(filterUser){
    return new Promise((resolve, reject) => {
        resolve(Store.list(filterUser));
    })
}

export default {
    addUser,
    getUser,
}