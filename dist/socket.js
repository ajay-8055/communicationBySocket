"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = setupSocket;
const socket_io_1 = require("socket.io");
const authSocket_1 = __importDefault(require("./sockets/authSocket"));
const mainSocket_1 = __importDefault(require("./sockets/mainSocket"));
function setupSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5000",
            credentials: true
        }
    });
    io.use(authSocket_1.default);
    io.on('connection', mainSocket_1.default);
    return io;
}
