import express, { Request, Response } from "express";
import { Student } from "./../models/Student";

// Create a new Express router
const countStudentGenderRouter = express.Router();

// Endpoint to get the number of boys and girls
countStudentGenderRouter.get('/gender-count', async (req, res) => {
  try {
      // Count documents where studentGender is 'boy'
      const boyCount = await Student.find({ studentGender: 'boy' }).countDocuments();
      // Count documents where studentGender is 'girl'
      const girlCount = await Student.find({ studentGender: 'girl' }).countDocuments();

      // Respond with JSON containing counts of boys and girls
      res.status(200).send([
          { gender: 'boy', count: boyCount },
          { gender: 'girl', count: girlCount }
      ]);
  } catch (error) {
      // Handle errors and respond with a 500 status code
      res.status(500).send(error);
  }
});

// Export the router to be used in other parts of the application
export default countStudentGenderRouter;
