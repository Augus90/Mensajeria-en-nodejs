import Model from "./model.js";

function addUser(user) {
    const myUser = new Model(user);
    return myUser.save();
}

const getUsers = async function(filterUser) {
    let filter = {};
    if (filterUser !== null) {
        filter = {
            name: filterUser,
        }
    }

    const user = await Model.find(filter);
    return user;
}


export default {
    add: addUser,
    list: getUsers,
}