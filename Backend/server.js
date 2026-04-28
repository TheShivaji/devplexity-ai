import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { initlizeSocket } from "./src/socket/server.socket.js";
import http from "http";

const httpServer=http.createServer(app);
initlizeSocket(httpServer);

connectDB();
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

