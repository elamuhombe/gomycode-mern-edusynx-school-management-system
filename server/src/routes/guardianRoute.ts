import express, { Request, Response } from 'express';
import { Guardian, IGuardian } from './../models/Guardian';

const guardianRouter = express.Router();



// Validation middleware for creating or updating a guardian
const validateGuardian = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { name, contact_number, email, address, school, familyNumber } = req.body;
    // console.log(req.body)
  
    // Check if required fields are provided
    // if (!gender || !school || !studentClass || !previousSchool || !registrationDate || !dateOfBirth ) {
      // return res.status(400).json({ message: 'All fields are required' });
    // }
  
  
  
    // Continue to the next middleware if validation passes
    next();
  };
// POST route to create a new guardian
guardianRouter.post('/guardian', async (req: Request, res: Response) => {
    // Your code to create a new guardian


    const { ...others } = req.body;
    
        
        try {
            const guardian = new Guardian({ ...others }); // Create a new student instance
            let savedGuardian = await guardian.save(); // Save the student to the database
            console.log({ savedGuardian });
            if (!savedGuardian) throw Error('error occurred while creating student');
            res.status(201).json({ savedGuardian, success: true });
          } catch (error: any) {
            console.log({ guardianError: error.message });
            res.status(400).send(error.message);
          }
        });

// GET route to fetch all guardians
guardianRouter.get('/guardian', async (req: Request, res: Response) => {
    try {
      // Fetch all guardians from the database
      const guardian = await Guardian.find();
      res.status(200).json(guardian);
    } catch (error) {
      console.error('Error fetching guardians:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

export default guardianRouter;
