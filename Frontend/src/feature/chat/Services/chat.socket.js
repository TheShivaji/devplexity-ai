import { io } from "socket.io-client";

let socket;

export const initlizeSocket = () => {

    socket = io(
        import.meta.env.MODE === "production" ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:3000",
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