const Newsletter = require('../models/Newsletter');
const emailService = require('../services/emailService');
const APIResponse = require('../utils/APIResponse');
const { createNotification } = require('../services/notificationService');

// Subscribe to newsletter
const subscribe = async (req, res) => {
  try {
    const { email, name } = req.body;

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.status === 'unsubscribed') {
        existing.status = 'active';
        existing.name = name || existing.name;
        await existing.save();
        
        // Send welcome email
        try {
          await emailService.sendNewsletterWelcome(email);
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
        }
        
        return APIResponse.success(res, existing, 'Successfully resubscribed to newsletter!');
      }
      return APIResponse.error(res, 'Email already subscribed to newsletter', 400);
    }

    // Create new subscription
    const subscription = new Newsletter({
      email,
      name: name || ''
    });

    const savedSubscription = await subscription.save();
    
    // Create notification
    await createNotification(
      'New Newsletter Subscriber',
      `${name || email} subscribed to the newsletter`,
      'newsletter',
      savedSubscription._id,
      'low'
    );
    
    // Send welcome email
    try {
      await emailService.sendNewsletterWelcome(email);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }
    
    return APIResponse.success(res, savedSubscription, 'Successfully subscribed to newsletter!', 201);

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return APIResponse.error(res, 'Failed to subscribe. Please try again.', 500);
  }
};

// Unsubscribe from newsletter
const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const subscription = await Newsletter.findOne({ email });
    if (!subscription) {
      return APIResponse.error(res, 'Email not found in newsletter', 404);
    }

    subscription.status = 'unsubscribed';
    await subscription.save();

    return APIResponse.success(res, subscription, 'Successfully unsubscribed from newsletter');

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return APIResponse.error(res, 'Failed to unsubscribe. Please try again.', 500);
  }
};

// Get all subscribers
const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    return APIResponse.success(res, subscribers, 'Subscribers retrieved successfully');
  } catch (error) {
    console.error('Get subscribers error:', error);
    return APIResponse.error(res, 'Failed to fetch subscribers', 500);
  }
};

module.exports = {
  subscribe,
  unsubscribe,
  getAllSubscribers
};