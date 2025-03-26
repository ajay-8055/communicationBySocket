import { Socket } from "socket.io";

export default function handleConnection(socket: Socket) {
    console.log(`User ${socket.data.user.id} connected`);
    socket.join(`user_${socket.data.user.id}`);
    socket.on('disconnect', () => {
        console.log(`User ${socket.data.user.id}`);
    })

    socket.on('join:room', (roomId: string) => {
        socket.join(`room_${roomId}`)
        socket.to(`rom_${roomId}`).emit('user:joined', socket.data.user);
    });

    socket.on('leave:room', (roomId: string) => {
        socket.leave(`room_${roomId}`)

        socket.to(`room_${roomId}`).emit('user:left', socket.data.user);

    });

}