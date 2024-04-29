import express, { Request, Response } from "express";
import { countStudentsByGender } from './../utils/countStudentsByGender'; // Import the function to count students by gender


const countStudentGenderRouter = express.Router();

// Define a route to count boys and girls
countStudentGenderRouter.get('/students/countStudentsByGender', async (req: Request, res: Response) => {
    try {
      const { boys, girls } = await countStudentsByGender(); // Call the function to count students by gender
      res.json({ boys, girls }); // Send the counts as JSON response
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' }); // Send 500 status code and error message
    }
  });
  

export default countStudentGenderRouter;
