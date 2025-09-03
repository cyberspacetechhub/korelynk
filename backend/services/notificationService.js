const Notification = require('../models/Notification');

const createNotification = async (title, message, type, relatedId = null, priority = 'medium') => {
  try {
    const notification = new Notification({
      title,
      message,
      type,
      relatedId,
      priority
    });
    
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Failed to create notification:', error);
    throw error;
  }
};

const getNotifications = async (limit = 50) => {
  try {
    return await Notification.find()
      .sort({ createdAt: -1 })
      .limit(limit);
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    throw error;
  }
};

const markAsRead = async (notificationId) => {
  try {
    return await Notification.findByIdAndUpdate(
      notificationId, 
      { read: true }, 
      { new: true }
    );
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
    throw error;
  }
};

const getUnreadCount = async () => {
  try {
    return await Notification.countDocuments({ read: false });
  } catch (error) {
    console.error('Failed to get unread count:', error);
    throw error;
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  getUnreadCount
};