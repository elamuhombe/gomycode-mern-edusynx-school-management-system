import express, { Request, Response } from 'express';
import { User } from '../models/User'; // Import the User model

const guardianRouter = express.Router();

// Route to find guardians by family number
guardianRouter.get('/guardians', async (req: Request, res: Response) => {
  const { familyNumber } = req.query;

  try {
    // Find users with role 'guardian' and matching family number
    const guardians = await User.find({ role: 'guardian', familyNumber });

    if (guardians.length === 0) {
      return res.status(404).json({ message: 'No guardians found for the provided family number.' });
    }

    res.status(200).json(guardians);
  } catch (error) {
    console.error('Error finding guardians:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to find all guardians
guardianRouter.get('/guardian', async (req: Request, res: Response) => {
  //const { familyNumber } = req.query;

  try {
    // Find users with role 'guardian' and matching family number
    const guardians = await User.find({ role: 'guardian' });

    if (guardians.length === 0) {
      return res.status(404).json({ message: 'No guardians found for the provided family number.' });
    }

    res.status(200).json(guardians);
  } catch (error) {
    console.error('Error finding guardians:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
export { guardianRouter };
