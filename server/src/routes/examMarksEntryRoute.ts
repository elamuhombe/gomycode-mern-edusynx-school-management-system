// routes/examRoutes.ts
import express, { Request, Response } from "express";
import { Exam } from "../models/Exam";
import { Student } from "../models/Student";
import { Subject } from "../models/Subject";

const examMarksEntryRouter = express.Router();

// Fetch students, subjects, and marks data based on the selected exam
examMarksEntryRouter.get(
  "/:examId/data",
  async (req: Request, res: Response) => {
    const { examId } = req.params;

    try {
      // Fetch the exam
      const exam = await Exam.findById(examId);

      if (!exam) {
        return res.status(404).json({ message: "Exam not found" });
      }

      // Fetch students for the exam
      const students = await Student.find({ exam: examId }).select("_id name");

      // Fetch subjects for the exam (assuming subjects are stored in a separate model)
      // Replace 'Subject' with the actual model name for subjects
      const subjects = await Subject.find({ exam: examId }).select(
        "subject_name"
      );

      // Fetch marks for the students and subjects
      // Implement your logic to fetch marks based on the exam, students, and subjects
      const marks = {}; // Placeholder, replace with actual logic

      res.status(200).json({ exam, students, subjects, marks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default examMarksEntryRouter;
