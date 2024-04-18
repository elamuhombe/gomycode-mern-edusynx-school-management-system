import express, { Request, Response } from 'express';
import { Subject, ISubject } from './../models/Subject';

const subjectRouter = express.Router();

// Validation middleware for creating or updating a subject
const validateSubject = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { subject_name } = req.body;
    // Add your validation logic here

    // Continue to the next middleware if validation passes
    next();
};

// POST route to create a new subject
subjectRouter.post('/subject', validateSubject, async (req: Request, res: Response) => {
    const { ...others } = req.body;
    
    try {
        const subject = new Subject({ ...others }); // Create a new subject instance
        let savedSubject = await subject.save(); // Save the subject to the database
        console.log({ savedSubject });
        if (!savedSubject) throw Error('Error occurred while creating subject');
        res.status(201).json({ savedSubject, success: true });
    } catch (error: any) {
        console.log({ subjectError: error.message });
        res.status(400).send(error.message);
    }
});

// GET route to fetch all subjects
subjectRouter.get('/subject', async (req: Request, res: Response) => {
    try {
        // Fetch all subjects from the database
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default subjectRouter;
