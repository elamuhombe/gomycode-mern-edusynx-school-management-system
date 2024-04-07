

import express,{ Request, Response } from "express";
import mongoose from 'mongoose';

import cors from "cors";
import sendEmail from "./services/sendEmail"; // Import the sendEmail function
import { schoolRouter } from "./routes/schoolRoute";
import { loginRouter } from "./routes/loginRoute"

require('dotenv').config();

const app = express();
const port = 5100;

app.use(express.json());

const uri = process.env.MONGODB_URI as string;

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error: any) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

app.use(cors());

// Mount School route
app.use(schoolRouter)

// Mount Login route
app.use(loginRouter)

// Route handler for signup form submissions
app.use('/sendEmail', async (req, res) => {
  // Assuming you extract necessary data from the signup form
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  

  // Prepare email parameters
  const emailParams = {
    to: email,
    subject: 'Feedback',
    text: 'Thanks for signing up! We appreciate your interest and will reach out to you soon.'
  };

  try {
    // Send feedback email
    const emailResponse = await sendEmail(emailParams);

    if (emailResponse.success) {
      // Email sent successfully
      console.log('Feedback email sent successfully to:', email);
      // Assuming you send some response to the client indicating successful signup
      res.status(200).json({ message: 'Signup successful' });
    } else {
      // Error occurred while sending email
      console.error('Failed to send feedback email:', emailResponse.error);
      // Assuming you send some response to the client indicating signup failure
      res.status(500).json({ error: 'Failed to complete signup process' });
    }
  } catch (error) {
    // Unexpected error occurred
    console.error('An unexpected error occurred:', error);
    // Assuming you send some response to the client indicating unexpected error
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});


// Listen for incoming connections
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
