const express = require('express');
const sendEmail = require('./api/sendEmail')
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/SchoolDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.post('/api/sendEmail', async (req, res) => {
  try {
    // Log the request body to inspect the payload
    console.log('Request body:', req.body);

    // Extract email data from the request body
    const { from, message } = req.body;

    // Call the function to send the email
    const result = await sendEmail({ from, message });

    // Respond with a success message
    res.status(200).json(result);
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
