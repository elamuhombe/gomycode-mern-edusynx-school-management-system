import express, { Request, Response } from 'express';
import { IClass, Classes} from './../models/Classes';

const classRouter = express.Router();

// Validation middleware for creating or updating a school class
const validateSchoolClass = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { className, year, school } = req.body;
    console.log("Received class name:", className);
    console.log("Received year:", year);
    console.log("Received school", school);
   
  
    // Continue to the next middleware if validation passes
    next();
};

// POST route to create a new school class
classRouter.post('/class', validateSchoolClass, async (req: Request, res: Response) => {
    const { className, year, school } = req.body;

    try {
        const SchoolClass = new Classes({ className, year, school });
        const savedClass = await SchoolClass.save();
        console.log({ savedClass });
        res.status(201).json({ savedClass, success: true });
    } catch (error: any) {
        console.error('Error creating school class:', error);
        res.status(400).send(error.message);
    }
});

// GET route to fetch all school classes
classRouter.get('/class', async (req: Request, res: Response) => {
    try {
        const SchoolClass = await Classes.find();
        res.status(200).json(SchoolClass);
    } catch (error) {
        console.error('Error fetching school classes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default classRouter;
