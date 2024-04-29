import express from 'express';
import { Student } from './../models/Student';
import { User} from './../models/User';

import mongoose from 'mongoose';



const studentRouter = express.Router();

// Validation middleware for creating or updating a student
const validateStudent = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { studentFirstName, studentLastName,studentGender, className, familyNumber,previousSchool, dateOfBirth } = req.body;
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
  const {  studentFirstName, studentLastName,studentGender,className, previousSchool, dateOfBirth, familyNumber } = req.body;
let fetchedAdmissionNumbers = await Student.find({},{adm: 1}),
  studentAdmissionNumbers = fetchedAdmissionNumbers.map(val =>val.adm).filter(val=>val !=null),
  createdAdm = studentAdmissionNumbers.length > 0? Math.max(...studentAdmissionNumbers)+1:500
  //res.send({createdAdm, studentAdmissionNumbers, fetchedAdmissionNumbers})
  

  try {
    // Find the guardian user with the provided familyNumber and role 'guardian'
    const guardian= await User.findOne({ familyNumber, role: 'guardian' }).populate('school');
    console.log(guardian)

    if (!guardian) {
      return res.status(404).json({ message: 'Guardian not found with the provided family number' });
    }

    if(!createdAdm) return res.send({msg: 'An error has occured'})
    // Create a new student instance and associate it with the found guardian
    const student = new Student({
      studentFirstName, 
      studentLastName,
      studentGender,
      school:guardian.school._id,
     className,
      previousSchool,
      registrationDate: Date.now(),
      dateOfBirth,
      adm: createdAdm,
      guardian:guardian._id, // Store the guardian's family number in the student document
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
// Get a single student name by ID
studentRouter.get('/student/:_id/name', async (req, res) => {
  const studentId = req.params._id; // Extract the student ID from the request parameters

  try {
    // Find the student by ID
    const student = await Student.findById(studentId);
    
    // Check if student exists
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Construct the student's full name
    const fullName = `${student.studentFirstName} ${student.studentLastName}`;
    console.log(fullName)
    
    // Send the student's full name in the response
    res.json({ fullName });
  } catch (error) {
    // If an error occurs
    console.error('Error fetching student name:', error);
    // Send a 500 status response with an error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all student names
studentRouter.get('/getAllStudentNames', async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await Student.find({}, 'studentFirstName studentLastName'); // Assuming 'studentFirstName' and 'studentLastName' are the fields storing first and last names

    // Concatenate first and last names and log them
    const studentNames = students.map(student => {
      const fullName = `${student.studentFirstName} ${student.studentLastName}`;
      console.log(fullName);
      return {
        _id: student._id, // Assuming you also want to include student IDs
        fullName: fullName
      };
    });

    // Send the student names as JSON response
    res.json(studentNames);
  } catch (error) {
    console.error('Error fetching student names:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to handle PUT requests to update student data by ID
studentRouter.put('/student/:id', async (req, res) => {
  const { id } = req.params;
  const {  studentFirstName, studentLastName,studentGender, studentClass, previousSchool } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {  studentFirstName, studentLastName,studentGender, studentClass, previousSchool },
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
studentRouter.delete('/student/:studentId', async (req, res) => {
  const _studentId = req.params.studentId; // Extract the user ID from the request parameters
  try {
    // Find the user by ID and delete it
    const deletedStudent = await Student.findByIdAndDelete(_studentId);

    // Check if user exists
    if (!deletedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // User successfully deleted
    res.status(200).json({ success: true, message: 'Student deleted successfully', deletedStudent });
  } catch (error: any) {
    console.error('Error deleting student:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Delete all student by ID
studentRouter.delete('/student/:id/:all', async (req, res) => {
  const {id, all = null} = req.params;
  try {
    const student = !all?await Student.findByIdAndDelete(id):await Student.deleteMany({});
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

studentRouter.get('/student/:id/:all', async (req, res) => {
  const { id, all } = req.params;
  console.log('Received ID:', id); // Log the received ID
  
  try {
    if (all === 'all') {
      // If 'all' parameter is provided and equal to 'all', count all documents
      const studentCount = await Student.countDocuments({});
      return res.json({ count: studentCount });
    } else {
      // If 'all' parameter is not provided or not equal to 'all', count by ID
      // Validate studentId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid studentId' });
      }

      // Count the number of documents matching the student ID
      const studentCount = await Student.countDocuments({ _id: id });
      return res.json({ count: studentCount });
    }
  } catch (error) {
    // If an error occurs during the counting process
    console.error('Error counting documents:', error);
    // Send a 500 status response with an error message
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export {studentRouter};
