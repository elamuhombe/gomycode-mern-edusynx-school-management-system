import express from 'express';
import { Student } from './../models/Student';
import { User} from './../models/User';



const studentRouter = express.Router();

// Validation middleware for creating or updating a student
const validateStudent = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { firstName, lastName,gender, school,  guardian, schoolClass, familyNumber,previousSchool, registrationDate, dateOfBirth } = req.body;
  // console.log(req.body)

  // Check if required fields are provided
  // if (!gender || !school || !studentClass || !previousSchool || !registrationDate || !dateOfBirth ) {
    // return res.status(400).json({ message: 'All fields are required' });
  // }

  // Add additional validation as needed for each field

  // Continue to the next middleware if validation passes
  next();
};

// Create a student
studentRouter.post('/student', validateStudent, async (req, res) => {
  const { firstName, lastName, gender, school, guardianFamilyNumber,schoolClass, previousSchool, registrationDate, dateOfBirth, familyNumber } = req.body;

  try {
    // Find the guardian user with the provided familyNumber and role 'guardian'
    const guardian= await User.findOne({ familyNumber, role: 'guardian' });
    console.log(guardian)

    if (!guardian) {
      return res.status(404).json({ message: 'Guardian not found with the provided family number' });
    }

    // Create a new student instance and associate it with the found guardian
    const student = new Student({
      firstName,
      lastName,
      gender,
      school,
      schoolClass,
      previousSchool,
      registrationDate,
      dateOfBirth,
      guardianFamilyNumber: guardianFamilyNumber, // Store the guardian's family number in the student document
    });

    const savedStudent = await student.save(); // Save the student to the database

    if (!savedStudent) throw Error('Error occurred while creating student');

    res.status(201).json({ savedStudent, success: true });
  } catch (error: any) {
    console.log({ studentError: error.message });
    res.status(400).send(error.message);
  }
});

/*
  Create a new student by extracting data from the request body and saving it to the database.
  
  studentRouter.post('/student', validateStudent, async (req, res) => {
    const { ...others } = req.body;
    try {
      const student = new Student({ ...others }); // Create a new student instance
      let savedStudent = await student.save(); // Save the student to the database
      console.log({ savedStudent });
      if (!savedStudent) throw Error('error occurred while creating student');
      res.status(201).json({ savedStudent, success: true });
    } catch (error: any) {
      console.log({ studentError: error.message });
      res.status(400).send(error.message);
    }
  });
*/  


// Get all students
studentRouter.get('/student', async (req, res) => {
  try {
    const students = await Student.find().populate('school');
    res.json(students);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get a single student by ID
studentRouter.get('/student/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get a single student by ID with populated guardian field
studentRouter.get('/student/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('guardian');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to handle PUT requests to update student data by ID
studentRouter.put('/student/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, gender, studentClass, previousSchool } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { firstName, lastName, gender, studentClass, previousSchool },
      { new: true } // Return the updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student data updated successfully', student: updatedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





// Delete a student by ID
studentRouter.delete('/student/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

export {studentRouter};
