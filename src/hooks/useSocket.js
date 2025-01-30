import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const useSocket = () => {
  const socket = useRef(null);

  useEffect(() => {
    const initSocket = async () => {
      if (!socket.current) {
        socket.current = io({
          path: '/api/socket',
          addTrailingSlash: false,
        });

        socket.current.on('connect', () => {
          console.log('Socket connected:', socket.current.id);
        });

        socket.current.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
        });
      }
    };

    initSocket();

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const sendNotification = (data) => {
    if (socket.current && socket.current.connected) {
      socket.current.emit('notification', data);
      console.log('Notification sent:', data);
    } else {
      console.warn('Socket not connected. Cannot send notification.');
    }
  };

  return { sendNotification, socket: socket.current };
};
