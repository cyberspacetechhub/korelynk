const Contact = require('../models/Contact')
const { createNotification } = require('./notificationService')

class ContactService {
  async getAllContacts(page = 1, limit = 10) {
    const skip = (page - 1) * limit
    const contacts = await Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
    const total = await Contact.countDocuments()
    
    return {
      contacts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    }
  }

  async createContact(contactData) {
    const contact = new Contact(contactData)
    const savedContact = await contact.save()
    
    // Create notification
    await createNotification(
      'New Contact Message',
      `${contactData.name} sent a message: ${contactData.subject}`,
      'contact',
      savedContact._id,
      'high'
    )
    
    return savedContact
  }

  async updateContactStatus(id, status) {
    return await Contact.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    )
  }

  async getRecentContacts(limit = 5) {
    return await Contact.find().sort({ createdAt: -1 }).limit(limit)
  }

  async getContactStats() {
    return await Contact.countDocuments()
  }

  async getContactById(id) {
    return await Contact.findById(id)
  }
}

module.exports = new ContactService()