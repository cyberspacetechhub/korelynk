import { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import axios from '../api/axios';

const useNotifications = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const audioRef = useRef(null);
  const lastNotificationId = useRef(null);

  // Initialize audio and request notification permission
  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    audioRef.current.volume = 0.5;
    
    // Request notification permission on mobile
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    // Load notification preference
    const saved = localStorage.getItem('adminNotificationsEnabled');
    if (saved !== null) {
      setNotificationsEnabled(JSON.parse(saved));
    }
  }, []);

  const { data: notifications = [], refetch } = useQuery(
    'admin-notifications',
    () => axios.get('/notifications').then(res => res.data.data),
    {
      refetchInterval: 10000, // Poll every 10 seconds
      onSuccess: (data) => {
        const unread = data.filter(n => !n.read).length;
        setUnreadCount(unread);

        // Play sound and show browser notification for new notifications
        if (data.length > 0 && lastNotificationId.current !== data[0]._id) {
          if (lastNotificationId.current !== null && notificationsEnabled) {
            playNotificationSound();
            showBrowserNotification(data[0]);
          }
          lastNotificationId.current = data[0]._id;
        }
      }
    }
  );

  const playNotificationSound = () => {
    if (audioRef.current && notificationsEnabled) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const showBrowserNotification = (notification) => {
    if ('Notification' in window && Notification.permission === 'granted' && notificationsEnabled) {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/fon3.png',
        badge: '/fon3.png',
        tag: 'admin-notification'
      });
    }
  };

  const toggleNotifications = (enabled) => {
    setNotificationsEnabled(enabled);
    localStorage.setItem('adminNotificationsEnabled', JSON.stringify(enabled));
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
    notificationsEnabled,
    markAsRead,
    markAllAsRead,
    toggleNotifications,
    refetch
  };
};

export default useNotifications;