import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';

interface EmailParams {
  to: string;
  subject: string;
  text: string;
}

interface EmailResponse {
  success: boolean;
  error?: string;
}

async function sendEmail(params: EmailParams): Promise<EmailResponse> {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASSWORD!
      },
    });

    const mailOptions: SendMailOptions = {
      from: process.env.EMAIL_USER, // Use configured sender email
      to: params.to,
      subject: params.subject,
      text: params.text,
    };

    // Send mail with defined transport object
    const info: SentMessageInfo = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.response);
    return { success: true };
  } catch (error) {
    console.error("An unexpected error occurred while sending email:", error);
    return { success: false, error: "An unexpected error occurred while sending email. Please try again later." };
  }
}

export default sendEmail;
