import express, { Response } from 'express';
const userRouter = express.Router();
const User = require('./models/User'); // Import your User model

// Route to create a new user
userRouter.post('/users', async (req: express.Request, res: Response) => {
  try {
    const userData = req.body; // Assuming user data is sent in the request body

    // Create a new user object using the provided data
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      password: userData.password, // Include the password field
      // Add more fields as needed
    });

    // Save the user object to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Send back the saved user data
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Error inserting user' }); // Send an error response
  }
});

// Route to insert sample data
userRouter.post('/sample-data', async (req: express.Request, res: Response) => {
  try {
    // Sample data to insert
    const sampleUsers = [
      {
        username: 'john_doe',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'pass123456',
        role: 'admin',
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'teacher',
      },
      // Add more sample data as needed
    ];

    // Insert sample users into the database
    const insertedUsers = await User.insertMany(sampleUsers);

    res.status(201).json(insertedUsers); // Send back the inserted users
  } catch (error) {
    console.error('Error inserting sample data:', error);
    res.status(500).json({ error: 'Error inserting sample data' }); // Send an error response
  }
});

module.exports = userRouter;
