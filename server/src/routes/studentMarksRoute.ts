import express, { Request, Response } from "express";
import { StudentMarks, IStudentMarks } from "./../models/StudentMarks"; // Import the StudentMarks model

const studentMarksRouter = express.Router();

// POST route to save student marks
studentMarksRouter.post(
  "/saveStudentMarks",
  async (req: Request, res: Response) => {
    try {
      // Extract data from the request body
      const { studentId, examId, subjectMarks } = req.body;

      // Create a new StudentMarks document
      const newStudentMarks: IStudentMarks = new StudentMarks({
        studentId,
        examId,
        subjectMarks,
      });

      // Save the new StudentMarks document
      await newStudentMarks.save();

      res.status(201).json({ message: "Student marks saved successfully" });
    } catch (error) {
      console.error("Error saving student marks:", error);
      res.status(500).json({ error: "Failed to save student marks" });
    }
  }
);

// GET route to fetch all student marks
studentMarksRouter.get("/getAllMarks", async (req: Request, res: Response) => {
  try {
    // Find all student marks
    const allStudentMarks: IStudentMarks[] = await StudentMarks.find();

    // If no student marks found, return 404 status
    if (!allStudentMarks || allStudentMarks.length === 0) {
      return res.status(404).json({ message: "Student marks not found" });
    }

    // If student marks found, return them
    res.json(allStudentMarks);
  } catch (error) {
    console.error("Error fetching student marks:", error);
    res.status(500).json({ error: "Failed to fetch student marks" });
  }
});

// Route to update student total marks
studentMarksRouter.post("/studentTotalMarks", async (req, res) => {
  try {
    const { studentId, totalMarks } = req.body;

    // Update student total marks in the database
    await StudentMarks.updateOne({ studentId }, { $set: { totalMarks } });

    res
      .status(200)
      .json({ message: "Student total marks updated successfully" });
  } catch (error) {
    console.error("Error updating student total marks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default studentMarksRouter;
