import { Server } from "socket.io";

let io;
export const initlizeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true
        }
    });
    console.log("socket server initialized");

    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);
    });
}

export const getSocketInstance = () => {
    if(!io) {
        console.error("Socket not initialized");
        return null;
    }
    return io;
}


