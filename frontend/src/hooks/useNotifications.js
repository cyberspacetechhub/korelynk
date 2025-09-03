import { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import axios from '../api/axios';

const useNotifications = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const audioRef = useRef(null);
  const lastNotificationId = useRef(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    audioRef.current.volume = 0.5;
  }, []);

  const { data: notifications = [], refetch } = useQuery(
    'admin-notifications',
    () => axios.get('/notifications').then(res => res.data.data),
    {
      refetchInterval: 10000, // Poll every 10 seconds
      onSuccess: (data) => {
        const unread = data.filter(n => !n.read).length;
        setUnreadCount(unread);

        // Play sound for new notifications
        if (data.length > 0 && lastNotificationId.current !== data[0]._id) {
          if (lastNotificationId.current !== null) {
            playNotificationSound();
          }
          lastNotificationId.current = data[0]._id;
        }
      }
    }
  );

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`/notifications/${notificationId}/read`);
      refetch();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      await Promise.all(
        unreadNotifications.map(n => axios.put(`/notifications/${n._id}/read`))
      );
      refetch();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch
  };
};

export default useNotifications;