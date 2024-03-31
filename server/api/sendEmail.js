const nodemailer = require('nodemailer');

async function sendEmail(emailData) {
  try {
    const { from, message } = emailData;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Define email options
    const mailOptions = {
      from: from,
      to: process.env.EMAIL_USERNAME,
      subject: 'Contact Form Submission',
      html: `<p>${message}</p>`
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

module.exports = sendEmail;
