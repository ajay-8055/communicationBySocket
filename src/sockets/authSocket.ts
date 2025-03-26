import { Socket } from "socket.io";

const authService = require('../services/auth')

export default function authenticationSocket(socket: Socket, next: (err?: Error) => void) {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error('No Token provided'))

    authService.validateToken(token).then((user: any) => {
        socket.data.user = user;
        next();
    }).catch(() => {
        next(new Error('Authentication error'))
    })
}