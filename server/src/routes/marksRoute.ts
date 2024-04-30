// routes/studentRoutes.ts
import express, { Request, Response } from "express";
import { Student } from "../models/Student";
import { Types } from "mongoose";

const studentMarksRouter = express.Router();

// Add marks for a subject for a student
studentMarksRouter.post(
  "/:studentId/marks/:subjectName",
  async (req: Request, res: Response) => {
    const { studentId, subject_name } = req.params;
    const { marks } = req.body;

    try {
      const student = await Student.findById(studentId);

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Use non-null assertion operator (!) to inform TypeScript that student.marks will not be undefined
      student.marks![subject_name] = marks;
      await student.save();

      res.status(200).json({ message: "Marks added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Calculate total marks for a student
studentMarksRouter.get(
  "/:studentId/total-marks",
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    try {
      const student = await Student.findById(studentId);

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Use non-null assertion operator (!) to inform TypeScript that student.marks will not be undefined
      const totalMarks = Object.values(student.marks!).reduce(
        (total, mark) => total + mark,
        0
      );

      res.status(200).json({ totalMarks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default studentMarksRouter;
