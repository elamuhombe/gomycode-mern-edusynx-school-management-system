import express, { Router, Request, Response } from "express";
import { Student } from "../models/Student";
import { Exam } from "../models/Exam";
import { MarksEntry } from "../models/MarksEntry";

const studentExamEntryRouter: Router = express.Router();

// POST route to create a new student exam entry
studentExamEntryRouter.post(
  "/student-exam-entry",
  async (req: Request, res: Response) => {
    try {
      const { studentId, examId, score } = req.body;

      // Validate request data
      if (!studentId || !examId || score === undefined) {
        return res.status(400).json({ error: "Invalid request data" });
      }

      // Check if the student exists
      const student = await Student.findById(studentId);
      if (!student) {
        return res
          .status(404)
          .json({ error: `Student with ID ${studentId} not found` });
      }

      // Check if the exam exists
      const exam = await Exam.findById(examId);
      if (!exam) {
        return res
          .status(404)
          .json({ error: `Exam with ID ${examId} not found` });
      }

      // Create student exam entry
      const studentExamEntry = new StudentExamEntry({
        student: studentId,
        exam: examId,
        score: score,
      });

      // Save student exam entry
      await studentExamEntry.save();

      res.status(201).json(studentExamEntry);
    } catch (error) {
      console.error("Error creating student exam entry:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// GET route to retrieve all student exam entries
studentExamEntryRouter.get(
  "/student-exam-entry",
  async (req: Request, res: Response) => {
    try {
      const studentExamEntries = await StudentExamEntry.find().populate(
        "student exam"
      );

      res.status(200).json(studentExamEntries);
    } catch (error) {
      console.error("Error retrieving student exam entries:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// DELETE route to delete all student exam entries
studentExamEntryRouter.delete(
  "/student-exam-entry",
  async (req: Request, res: Response) => {
    try {
      // Delete all student exam entries
      await StudentExamEntry.deleteMany({});

      res
        .status(200)
        .json({ message: "All student exam entries deleted successfully." });
    } catch (error) {
      console.error("Error deleting student exam entries:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default studentExamEntryRouter;
