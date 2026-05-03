import { io } from "socket.io-client";


let socket;
export const initlizeSocket = () => {
    socket = io("http://localhost:3000");

    socket.on("connect", () => {
        console.log("Socket connected");
    });
    socket.on("connect_error", (err) => {
        console.error("Connection Error:", err.message);
    });

    return socket;
}