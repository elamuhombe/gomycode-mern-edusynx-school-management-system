import express, { Request, Response } from "express";
import { User } from "../models/User"; // Import the User model

const teacherRouter = express.Router();
// Route to find all teachers
teacherRouter.get("/teacher", async (req: Request, res: Response) => {
  try {
    // Find users with role 'teachers'
    const teachers = await User.find({ role: "teacher" });

    if (teachers.length === 0) {
      return res.status(404).json({ message: "No teachers found." });
    }

    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error finding teachers", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export { teacherRouter };
