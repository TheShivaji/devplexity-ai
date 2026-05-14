import { io } from "socket.io-client";

let socket;

export const initlizeSocket = () => {

    socket = io(
        process.env.NODE_ENV === "production" ? process.env.VITE_API_URL : "http://localhost:3000",
        {
            withCredentials: true
        }
    );

    socket.on("connect", () => {
        console.log("Socket connected");
    });

    socket.on("connect_error", (err) => {
        console.error("Connection Error:", err.message);
    });

    return socket;
};