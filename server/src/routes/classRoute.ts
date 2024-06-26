import express, { Request, Response } from 'express';
import { IClass, Classes} from './../models/Classes';
import { Student } from '../models/Student';

const classRouter = express.Router();

// Validation middleware for creating or updating a school class
const validateSchoolClass = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { clas, year, school } = req.body;
    console.log("Received class name:", clas);
    console.log("Received year:", year);
    console.log("Received school", school);
   
  
    // Continue to the next middleware if validation passes
    next();
};

// POST route to create a new school class
classRouter.post('/class', validateSchoolClass, async (req: Request, res: Response) => {
    const { clas, year, school } = req.body;

    try {
        const SchoolClass = new Classes({ clas, year, school });
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

// Define the route to fetch all classes
classRouter.get('/classes', async (req, res) => {
    try {
      // Query the database to get all classes
      const classes = await Classes.find();
  
      // Extract class names from the classes
      const classNames = classes.map(cls => cls.className);
  console.log(classNames)
      res.json(classNames);
    } catch (error) {
      console.error('Error fetching classes:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  


classRouter.get('/classes/students/:schoolId', async (req: Request, res: Response) => {
    try {
        const {schoolId} = req.params
        const [classes, students]= await Promise.all([
            Classes.find({school:schoolId}),
            Student.find({school:schoolId}),

        ]) 
        res.status(200).json({classes,students});
    } catch (error) {
        console.error('Error fetching school classes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default classRouter;
