// IMporto el socket
import {Server} from 'socket.io'
// Creo un objeto por que el interior de un objeto lo llamo por referencia, y si algo cambia 
// cambia todo el objeto
const socket = {};
let conections = 0;

// Me conecto al servidor http para escuchar los sockets
function connect(server) {
    socket.io = new Server(server);


    //SokcetIO
    socket.io.on('connection', (socket) => {
        console.log(`Connect...`);
        console.log(`Cantidad de conexiones: ${++conections}`);

        /** Aqui detectamos cada q un cliente se desconecte **/
        socket.on('disconnect', (message) => {
            console.log(`[DISCONNECT]: ${message}`);
            conections--;
            // showClients();
        });

    // showClients();
    })
}

/** Esta funcon muestra los ID de los clientes conectados **/
// function showClients() {
//     socket.io.clients((error, clients) => {
//         if (error)
//              throw error;
//         console.log(`[CLIENTS]: [${clients}]`);
// });
// }

export default {
    connect,
    socket
};
