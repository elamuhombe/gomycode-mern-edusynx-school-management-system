import express,{ Request, Response } from "express";
import mongoose from 'mongoose';

import cors from "cors";
import sendEmail from "./services/sendEmail"; // Import the sendEmail function
import { schoolRouter } from "./routes/schoolRoute";
import { loginRouter } from "./routes/loginRoute"
import {studentRouter} from "./routes/studentRoute";
import {teacherRouter} from "./routes/teacherRoute";
import {userRouter} from "./routes/userRoute";
import {guardianRouter} from "./routes/guardianRoute";
import classRouter from "./routes/classRoute";
import subjectRouter from "./routes/subjectRoute";
import countStudentGenderRouter from "./routes/countStudentGenderDataRoute";
import { User } from "./models/User";
import { Student } from "./models/Student";
import attendanceRouter from "./routes/attendanceRouter";
import examMarksEntryRouter from "./routes/examMarksEntryRoute";
import examRouter from "./routes/examRoute";
import studentMarksRouter from "./routes/studentMarksRoute";

// import { teacherRouter } from "./routes/teacherRoute";

require('dotenv').config();

const app = express();
const port = 5100;

app.use(express.json());

const uri = process.env.MONGODB_URI as string;

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error: any) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

app.use(cors());

app.use((req,res) =>{
  res.send('API is running')
})

// Mount School route
app.use(schoolRouter)

// Mount User route
app.use(userRouter)

// Mount Login route
app.use(loginRouter)

// Mount Class route
app.use(classRouter)
// Mount Student route
app.use(studentRouter)

// Mount Guardian route
app.use(guardianRouter)

// Mount Teacher route
app.use(teacherRouter)

// Mount Subjectroute
app.use(subjectRouter)

//Mount Guardian route
app.use(guardianRouter)

//Mount countStudentGenderRoute
app.use(countStudentGenderRouter)

//Mount Attendance route
app.use(attendanceRouter)

//Mount exam  entry route
app.use(examRouter)

//Mount exam marks entry route
app.use(examMarksEntryRouter)

//Mount student marks entry route
app.use(studentMarksRouter)

// Dashboard details
app.get('/api/dashboard/:id', async(req:Request, res:Response)=>{
  const [numTeachers, numStudents, numGuardians] = await Promise.all([
    User.countDocuments({ school: req.params.id, role: 'teacher' }),
    Student.countDocuments({ school: req.params.id }),
    User.countDocuments({ school: req.params.id, role: 'guardian' })
  ]);
  
  res.send({numTeachers, numStudents,numGuardians})
})
// Route handler for signup form submissions
app.use('/sendEmail', async (req, res) => {
  // Assuming you extract necessary data from the signup form
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  

  // Prepare email parameters
  const emailParams = {
    to: email,
    subject: 'Feedback',
    text: 'Thanks for signing up! We appreciate your interest and will reach out to you soon.'
  };

  try {
    // Send feedback email
    const emailResponse = await sendEmail(emailParams);

    if (emailResponse.success) {
      // Email sent successfully
      console.log('Feedback email sent successfully to:', email);
      // Assuming you send some response to the client indicating successful signup
      res.status(200).json({ message: 'Signup successful' });
    } else {
      // Error occurred while sending email
      console.error('Failed to send feedback email:', emailResponse.error);
      // Assuming you send some response to the client indicating signup failure
      res.status(500).json({ error: 'Failed to complete signup process' });
    }
  } catch (error) {
    // Unexpected error occurred
    console.error('An unexpected error occurred:', error);
    // Assuming you send some response to the client indicating unexpected error
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});


// Listen for incoming connections
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
