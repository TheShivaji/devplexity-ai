import { io } from "socket.io-client";


let socket;
export const initlizeSocket = () => {
    socket = io("http://localhost:3000");
    console.log("Socket connected");
}
socket.on("connect", () => {
    console.log("Socket connected");
});