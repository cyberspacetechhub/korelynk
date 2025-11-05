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
            <p><strong>Amount:</strong> ₦${enrollment.paymentAmount?.toLocaleString()}</p>
            <p><strong>Payment Method:</strong> ${enrollment.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Paystack'}</p>
            <p><strong>Status:</strong> Pending Review</p>
          </div>
          <p>We'll notify you once your enrollment is approved and provide payment instructions.</p>
          <p>Best regards,<br>KoreLynk Tech Team</p>
        </div>
      `
    }

    return await this.transporter.sendMail(confirmationEmail)
  }

  async sendEnrollmentApproval(enrollment, paymentAccount = null) {
    const paymentInstructions = enrollment.paymentMethod === 'bank_transfer' && paymentAccount ? `
      <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
        <h3 style="color: #1f2937; margin-top: 0;">Payment Instructions:</h3>
        <p><strong>Bank:</strong> ${paymentAccount.bankName}</p>
        <p><strong>Account Number:</strong> ${paymentAccount.accountNumber}</p>
        <p><strong>Account Name:</strong> ${paymentAccount.accountName}</p>
        <p><strong>Amount:</strong> ₦${enrollment.paymentAmount?.toLocaleString()}</p>
        <p><strong>Reference:</strong> Use your full name (${enrollment.studentName}) as description</p>
      </div>
    ` : `
      <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
        <h3 style="color: #1f2937; margin-top: 0;">Payment Method:</h3>
        <p>Paystack payment integration coming soon! Please contact support for payment instructions.</p>
      </div>
    `
    
    const approvalEmail = {
      from: process.env.EMAIL_USER,
      to: enrollment.email,
      subject: `Enrollment Approved - ${enrollment.course.title}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #10b981; text-align: center;">🎉 Enrollment Approved!</h2>
          <p>Dear ${enrollment.studentName},</p>
          <p>Congratulations! Your enrollment has been approved.</p>
          ${paymentInstructions}
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #1f2937; margin-top: 0;">Next Steps:</h3>
            <ol>
              <li>Complete payment of ₦${enrollment.paymentAmount?.toLocaleString()}</li>
              <li>Upload payment proof if using bank transfer</li>
              <li>Wait for payment confirmation</li>
              <li>Join our course community</li>
            </ol>
          </div>
          <p>We're excited to have you in our learning community!</p>
          <p>Best regards,<br>KoreLynk Tech Team</p>
        </div>
      `
    }

    return await this.transporter.sendMail(approvalEmail)
  }



  async sendEnrollmentRejection(enrollment, reason = '') {
    const rejectionEmail = {
      from: process.env.EMAIL_USER,
      to: enrollment.email,
      subject: `Enrollment Update - ${enrollment.course.title}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #ef4444; text-align: center;">Enrollment Update</h2>
          <p>Dear ${enrollment.studentName},</p>
          <p>Thank you for your interest in <strong>${enrollment.course.title}</strong>.</p>
          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
            <p>Unfortunately, we cannot proceed with your enrollment at this time.</p>
            ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
          </div>
          <p>We encourage you to explore our other courses or reapply in the future.</p>
          <p>Best regards,<br>KoreLynk Tech Team</p>
        </div>
      `
    }

    return await this.transporter.sendMail(rejectionEmail)
  }

  async sendWelcomeEmail(email, fullName, userType) {
    const welcomeEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Welcome to KoreLynk Tech - ${userType} Account Created`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4f46e5; text-align: center;">Welcome to KoreLynk Tech!</h2>
          <p>Dear ${fullName},</p>
          <p>Your ${userType} account has been successfully created.</p>
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1f2937; margin-top: 0;">What's Next?</h3>
            <ul>
              <li>Complete your profile setup</li>
              <li>Explore available courses</li>
              <li>Join our learning community</li>
            </ul>
          </div>
          <p>We're excited to have you on board!</p>
          <p>Best regards,<br>KoreLynk Tech Team</p>
        </div>
      `
    }

    return await this.transporter.sendMail(welcomeEmail)
  }

  async sendGradeNotification(email, data) {
    const { studentName, assignmentTitle, grade, feedback } = data
    
    const gradeEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Assignment Graded - ${assignmentTitle}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4f46e5; text-align: center;">Assignment Graded</h2>
          <p>Dear ${studentName},</p>
          <p>Your assignment <strong>${assignmentTitle}</strong> has been graded.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Grade: ${grade}</h3>
            ${feedback ? `<p><strong>Feedback:</strong></p><p>${feedback}</p>` : ''}
          </div>
          <p>Keep up the great work!</p>
          <p>Best regards,<br>KoreLynk Tech Team</p>
        </div>
      `
    }

    return await this.transporter.sendMail(gradeEmail)
  }

  async sendPaymentConfirmation(email, data) {
    const { studentName, courseName, amount } = data
    
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Payment Confirmed - ${courseName}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #10b981; text-align: center;">🎉 Payment Confirmed!</h2>
          <p>Dear ${studentName},</p>
          <p>Your payment has been confirmed and your enrollment is now active.</p>
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #1f2937; margin-top: 0;">Payment Details:</h3>
            <p><strong>Course:</strong> ${courseName}</p>
            <p><strong>Amount:</strong> ₦${amount?.toLocaleString()}</p>
            <p><strong>Status:</strong> Confirmed ✅</p>
          </div>
          <p>You can now access your course materials and join class sessions.</p>
          <p>Welcome to the learning community!</p>
          <p>Best regards,<br>KoreLynk Tech Team</p>
        </div>
      `
    }

    return await this.transporter.sendMail(confirmationEmail)
  }

  async sendPaymentRejection(email, data) {
    const { studentName, courseName } = data
    
    const rejectionEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Payment Issue - ${courseName}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #ef4444; text-align: center;">Payment Issue</h2>
          <p>Dear ${studentName},</p>
          <p>We were unable to confirm your payment for <strong>${courseName}</strong>.</p>
          <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
            <h3 style="color: #1f2937; margin-top: 0;">Next Steps:</h3>
            <ul>
              <li>Check your payment details</li>
              <li>Ensure payment was made to the correct account</li>
              <li>Contact support if you believe this is an error</li>
              <li>Resubmit payment proof if necessary</li>
            </ul>
          </div>
          <p>Please contact our support team for assistance.</p>
          <p>Best regards,<br>KoreLynk Tech Team</p>
        </div>
      `
    }

    return await this.transporter.sendMail(rejectionEmail)
  }
}

module.exports = new EmailService()