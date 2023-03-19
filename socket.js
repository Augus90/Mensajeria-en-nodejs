// IMporto el socket
import {Server} from 'socket.io'
// Creo un objeto por que el interior de un objeto lo llamo por referencia, y si algo cambia 
// cambia todo el objeto
const socket = {};

// Me conecto al servidor http para escuchar los sockets
function connect(server) {
    socket.io = new Server(server);

}

export default {
    connect,
    socket
};
