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
      subject: 'Thank you for contacting KoreLynk Tech',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <br>
        <p>Best regards,<br>KoreLynk Tech Team</p>
      `
    }

    return await this.transporter.sendMail(autoReply)
  }

  async sendNewsletterWelcome(email) {
    const welcomeEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to KoreLynk Tech Newsletter',
      html: `
        <h2>Welcome to our newsletter!</h2>
        <p>Thank you for subscribing to KoreLynk Tech newsletter.</p>
        <p>You'll receive updates about our latest projects, tech insights, and industry news.</p>
        <br>
        <p>Best regards,<br>KoreLynk Tech Team</p>
      `
    }

    return await this.transporter.sendMail(welcomeEmail)
  }

  async sendNewBlogNotification(blog, subscribers) {
    if (!subscribers || subscribers.length === 0) return

    const blogUrl = `${process.env.FRONTEND_URL}/blog/${blog.slug}`
    const unsubscribeUrl = `${process.env.FRONTEND_URL}/newsletter/unsubscribe`

    const emailPromises = subscribers.map(subscriber => {
      const emailContent = {
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject: `New Blog Post: ${blog.title}`,
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h2 style="color: #4f46e5;">New Blog Post Published!</h2>
            <h3>${blog.title}</h3>
            ${blog.featuredImage ? `<img src="${blog.featuredImage}" alt="${blog.title}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;">` : ''}
            <p>${blog.excerpt || blog.content?.substring(0, 200) + '...' || ''}</p>
            <a href="${blogUrl}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Read Full Article</a>
            <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              You're receiving this because you subscribed to our newsletter.<br>
              <a href="${unsubscribeUrl}?email=${subscriber.email}" style="color: #6b7280;">Unsubscribe</a>
            </p>
          </div>
        `
      }
      return this.transporter.sendMail(emailContent)
    })

    return await Promise.allSettled(emailPromises)
  }

  async sendPasswordResetCode(email, code, userType = 'admin') {
    const resetEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Code - KoreLynk Tech',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4f46e5; text-align: center;">Password Reset Request</h2>
          <p>You have requested to reset your password for KoreLynk Tech ${userType} portal.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h3 style="margin: 0; color: #1f2937;">Your Reset Code:</h3>
            <div style="font-size: 32px; font-weight: bold; color: #4f46e5; letter-spacing: 4px; margin: 10px 0;">${code}</div>
          </div>
          <p><strong>Important:</strong></p>
          <ul>
            <li>This code will expire in 10 minutes</li>
            <li>Use this code only on the official login page</li>
            <li>If you didn't request this reset, please ignore this email</li>
          </ul>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            This is an automated message from KoreLynk Tech<br>
            Please do not reply to this email
          </p>
        </div>
      `
    }

    return await this.transporter.sendMail(resetEmail)
  }

  async sendVerificationCode(email, code, userType) {
    const verificationEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification - KoreLynk Tech',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4f46e5; text-align: center;">Verify Your Email</h2>
          <p>Welcome to KoreLynk Tech! Please verify your email to complete your ${userType} account setup.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h3 style="margin: 0; color: #1f2937;">Your Verification Code:</h3>
            <div style="font-size: 32px; font-weight: bold; color: #4f46e5; letter-spacing: 4px; margin: 10px 0;">${code}</div>
          </div>
          <p><strong>Important:</strong></p>
          <ul>
            <li>This code will expire in 10 minutes</li>
            <li>Enter this code to activate your account</li>
            <li>If you didn't create this account, please ignore this email</li>
          </ul>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            This is an automated message from KoreLynk Tech<br>
            Please do not reply to this email
          </p>
        </div>
      `
    }

    return await this.transporter.sendMail(verificationEmail)
  }

  async sendEnrollmentConfirmation(enrollment) {
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: enrollment.email,
      subject: `Enrollment Confirmation - ${enrollment.course.title}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4f46e5; text-align: center;">Enrollment Received!</h2>
          <p>Dear ${enrollment.studentName},</p>
          <p>Thank you for enrolling in our course. We have received your application and it's currently under review.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Course Details:</h3>
            <p><strong>Course:</strong> ${enrollment.course.title}</p>
            <p><strong>Category:</strong> ${enrollment.course.category}</p>
            <p><strong>Instructor:</strong> ${enrollment.course.instructor}</p>
            <p><strong>Amount:</strong> $${enrollment.paymentAmount}</p>
            <p><strong>Status:</strong> Pending Review</p>
          </div>
          <p>We'll notify you once your enrollment is approved. Payment instructions will be provided upon approval.</p>
          <p>Best regards,<br>KoreLynk Tech Team</p>
        </div>
      `
    }

    return await this.transporter.sendMail(confirmationEmail)
  }

  async sendEnrollmentApproval(enrollment) {
    const approvalEmail = {
      from: process.env.EMAIL_USER,
      to: enrollment.email,
      subject: `Enrollment Approved - ${enrollment.course.title}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #10b981; text-align: center;">🎉 Enrollment Approved!</h2>
          <p>Dear ${enrollment.studentName},</p>
          <p>Congratulations! Your enrollment has been approved.</p>
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #1f2937; margin-top: 0;">Next Steps:</h3>
            <ol>
              <li>Complete payment of $${enrollment.paymentAmount}</li>
              <li>Join our course community</li>
              <li>Prepare for the course start date</li>
            </ol>
          </div>
          <p>We're excited to have you in our learning community!</p>
          <p>Best regards,<br>KoreLynk Tech Team</p>
        </div>
      `
    }

    return await this.transporter.sendMail(approvalEmail)
  }
}

module.exports = new EmailService()