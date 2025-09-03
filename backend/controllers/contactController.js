const contactService = require('../services/contactService');
const emailService = require('../services/emailService');
const APIResponse = require('../utils/APIResponse');

// Create contact
const createContact = async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    const contact = await contactService.createContact({
      name,
      email,
      phone,
      company,
      service: req.body.service,
      budget: req.body.budget,
      message
    });

    // Send notification email to admin
    await emailService.sendContactNotification(contact);

    // Send auto-reply to user
    await emailService.sendAutoReply(contact);

    return APIResponse.success(res, contact, 'Message sent successfully! We will get back to you soon.', 201);

  } catch (error) {
    console.error('Contact form error:', error);
    return APIResponse.error(res, 'Failed to send message. Please try again.', 500);
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await contactService.getAllContacts(page, limit);
    return APIResponse.success(res, result, 'Contacts retrieved successfully');
  } catch (error) {
    console.error('Get contacts error:', error);
    return APIResponse.error(res, 'Failed to fetch contacts', 500);
  }
};

// Update contact status
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await contactService.updateContactStatus(id, status);

    if (!contact) {
      return APIResponse.error(res, 'Contact not found', 404);
    }

    return APIResponse.success(res, contact, 'Contact status updated successfully');
  } catch (error) {
    console.error('Update contact error:', error);
    return APIResponse.error(res, 'Failed to update contact status', 500);
  }
};

module.exports = {
  createContact,
  getAllContacts,
  updateContactStatus
};