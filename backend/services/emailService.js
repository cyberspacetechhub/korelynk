const nodemailer = require('nodemailer')

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  }

  async sendContactNotification(contactData) {
    const { name, email, phone, company, subject, message } = contactData

    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `
    }

    return await this.transporter.sendMail(adminEmail)
  }

  async sendAutoReply(contactData) {
    const { name, email, message } = contactData

    const autoReply = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Cyberspace Tech Hub',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <br>
        <p>Best regards,<br>Cyberspace Tech Hub Team</p>
      `
    }

    return await this.transporter.sendMail(autoReply)
  }

  async sendNewsletterWelcome(email) {
    const welcomeEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Cyberspace Tech Hub Newsletter',
      html: `
        <h2>Welcome to our newsletter!</h2>
        <p>Thank you for subscribing to Cyberspace Tech Hub newsletter.</p>
        <p>You'll receive updates about our latest projects, tech insights, and industry news.</p>
        <br>
        <p>Best regards,<br>Cyberspace Tech Hub Team</p>
      `
    }

    return await this.transporter.sendMail(welcomeEmail)
  }
}

module.exports = new EmailService()