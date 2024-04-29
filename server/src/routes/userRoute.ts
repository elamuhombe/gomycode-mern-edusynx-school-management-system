import express, { Request, Response } from 'express';
import { IUser,User } from './../models/User'; // Assuming you have a User model defined
import mongoose from 'mongoose';

const userRouter = express.Router();

// Validation middleware for creating or updating a user
const validateUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { firstName, lastName,gender, school, email,familyNumber,teachingSubjects, className,isClassTeacher, role, password} = req.body;

  next();
};

// Create a user
userRouter.post('/user', validateUser, async (req, res) => {
  const {firstName, lastName,gender, school,familyNumber,teachingSubjects,isClassTeacher,className, email, role, password}=req.body
  try {
    const user = new User({firstName, lastName,gender, isClassTeacher,className, teachingSubjects, familyNumber,school, email, role, password: password || "123456"}); // Create a new user instance
    let savedUser=await user.save(); // Save the user to the database
    console.log({savedUser})
    if(!savedUser) throw Error('error occured while creating user')
    res.status(201).json({savedUser,success: true});
  } catch (error: any) {
    console.log({userError:error.message})
    res.status(400).send(error.message);
  }
});
// Get all users
userRouter.get("/user", async (req: Request, res: Response) => {
  try {
    const user = await User.find().populate('school');
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single user by id
userRouter.get("/user/:id", async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single user by id
userRouter.get("/user/password/:id", async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update user route
userRouter.put('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});
// Update a user's password
userRouter.put('/user/password/:id', async (req, res) => {
  const userId = req.params.id;

  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const newPassword = req.body.password;

  try {
    // Update the user's password
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId }, // Filter by user ID
      { password: newPassword }, // Update password field
      { new: true } // Return the updated document
    );

    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User password updated successfully' });
  } catch (error) {
    console.error('Error updating user password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

userRouter.patch('/user/:userId/email', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const newEmail = req.body.email;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's email address
    user.email = newEmail;

    // Save the updated user object
    await user.save();

    return res.status(200).json({ message: 'User email updated successfully', user });
  } catch (error) {
    console.error('Error updating user email:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Delete a user by ID
userRouter.delete('/user/:userId', async (req, res) => {
  const _userId = req.params.userId; // Extract the user ID from the request parameters
  try {
    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(_userId);

    // Check if user exists
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // User successfully deleted
    res.status(200).json({ success: true, message: 'User deleted successfully', deletedUser });
  } catch (error: any) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

userRouter.get('/user/count/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid studentId' });
    }

    // Count the number of documents in the User collection
    const documentCount = await User.countDocuments({});

    // Send the count as a JSON response
    res.json({ count: documentCount });
  } catch (error) {
    // If an error occurs during the counting process
    console.error('Error counting documents:', error);
    // Send a 500 status response with an error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export {userRouter} ;
