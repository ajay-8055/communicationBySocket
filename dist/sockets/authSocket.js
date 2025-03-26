"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authenticationSocket;
const authService = require('../services/auth');
function authenticationSocket(socket, next) {
    const token = socket.handshake.auth.token;
    if (!token)
        return next(new Error('No Token provided'));
    authService.validateToken(token).then((user) => {
        socket.data.user = user;
        next();
    }).catch(() => {
        next(new Error('Authentication error'));
    });
}
