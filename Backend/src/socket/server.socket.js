import { Server } from "socket.io";

let io;

export const initlizeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : "http://localhost:5173",
            credentials: true
        }
    });

    console.log("socket server initialized");

    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);

        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
        });
    });
};

export const getSocketInstance = () => {

    if (!io) {
        console.error("Socket not initialized");
        return null;
    }

    return io;
};