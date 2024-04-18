import express, {Request, Response } from 'express';
import { User } from '../models/User';


const teacherRouter = express.Router();

// Import the User model


// Route to get all teachers
teacherRouter.get('/teacher', async (req: Request, res: Response) => {
    try {
        // Find all users with role 'teacher'
        const teachers = await User.find({ role: 'teacher' });

        res.json(teachers);
    } catch (err) {
        console.error('Error getting teachers:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to add a new teacher
teacherRouter.post('/teacher', async (req: Request, res: Response) => {
    const { username, email, firstname, lastname, gender, school, teachingSubjects, isClassTeacher } = req.body;

    try {
        // Create a new teacher
        const newTeacher = new User({
            username,
            email,
            firstname,
            lastname,
            gender,
            school,
            role: 'teacher',
            teachingSubjects,
            isClassTeacher
        });

        // Save the new teacher to the database
        await newTeacher.save();

        res.status(201).json(newTeacher);
    } catch (err) {
        console.error('Error adding teacher:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

export{teacherRouter};
