'use client';

import { useSocket } from '@/hooks/useSocket';
import { useEffect } from 'react';


export const NotificationProvider = () => {
  const { socket, sendNotification } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('receive-notification', (data) => {
        console.log('Received notification:', data);
        toast.success(data.message);
      });

      // Test notification
      setTimeout(() => {
        sendNotification({
          message: 'Test notification',
          type: 'success',
          timestamp: new Date().toISOString()
        });
      }, 2000);
    }
  }, [socket, sendNotification]);

  return null;
};
