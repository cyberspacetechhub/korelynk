const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, getUnreadCount } = require('../services/notificationService');

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await getNotifications();
    res.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: error.message
    });
  }
});

// Get unread count
router.get('/unread-count', async (req, res) => {
  try {
    const count = await getUnreadCount();
    res.json({
      success: true,
      data: { count }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get unread count',
      error: error.message
    });
  }
});

// Mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await markAsRead(req.params.id);
    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read',
      error: error.message
    });
  }
});

module.exports = router;