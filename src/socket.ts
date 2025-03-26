import { Server } from "socket.io";

import http from 'http'
import authenticationSocket from "./sockets/authSocket";
import handleConnection from "./sockets/mainSocket";


export function setupSocket(server: http.Server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5000",
            credentials: true
        }
    });

    io.use(authenticationSocket)
    io.on('connection', handleConnection);

    return io;
}