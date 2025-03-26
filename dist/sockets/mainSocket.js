"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleConnection;
function handleConnection(socket) {
    console.log(`User ${socket.data.user.id} connected`);
    socket.join(`user_${socket.data.user.id}`);
    socket.on('disconnect', () => {
        console.log(`User ${socket.data.user.id}`);
    });
    socket.on('join:room', (roomId) => {
        socket.join(`room_${roomId}`);
        socket.to(`rom_${roomId}`).emit('user:joined', socket.data.user);
    });
    socket.on('leave:room', (roomId) => {
        socket.leave(`room_${roomId}`);
        socket.to(`room_${roomId}`).emit('user:left', socket.data.user);
    });
}
