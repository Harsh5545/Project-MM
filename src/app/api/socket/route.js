import { Server as SocketIOServer } from 'socket.io';
import { NextResponse } from 'next/server';

let io;

if (!io) {
  io = new SocketIOServer({
    path: '/api/socket',
    addTrailingSlash: false,
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('notification', (data) => {
      // Broadcast the notification to all connected clients except sender
      socket.broadcast.emit('receive-notification', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

export async function GET(request) {
  try {
    return new NextResponse('Socket is running', {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }
}

export const dynamic = 'force-dynamic';
