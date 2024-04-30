import express, { Request, Response } from "express";
import { Exam } from "./../models/Exam";

const examRouter = express.Router();

// Validation middleware for creating or updating an exam
const validateExam = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { examName, examDate } = req.body;
  // Add your validation logic here

  // Continue to the next middleware if validation passes
  next();
};

// POST route to create a new exam
examRouter.post("/exam", validateExam, async (req: Request, res: Response) => {
  const { examName, examDate, ...others } = req.body;

  try {
    const exam = new Exam({ examName, examDate, ...others }); // Create a new exam instance
    let savedExam = await exam.save(); // Save the exam to the database
    console.log({ savedExam });
    if (!savedExam) throw Error("Error occurred while creating exam");
    res.status(201).json({ savedExam, success: true });
  } catch (error: any) {
    console.log({ examError: error.message });
    res.status(400).send(error.message);
  }
});

// Update exam route
examRouter.put("/exam/:examId", async (req, res) => {
  const examId = req.params.examId;
  const updatedExamData = req.body;

  try {
    const exam = await Exam.findByIdAndUpdate(examId, updatedExamData, {
      new: true,
    });

    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res.json({ message: "Exam updated successfully", exam });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to update exam" });
  }
});

// Delete an exam by ID
examRouter.delete("/exam/:examId", async (req, res) => {
  const examId = req.params.examId; // Extract the exam ID from the request parameters
  try {
    // Find the exam by ID and delete it
    const deletedExam = await Exam.findByIdAndDelete(examId);

    // Check if exam exists
    if (!deletedExam) {
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    }

    // Exam successfully deleted
    res
      .status(200)
      .json({
        success: true,
        message: "Exam deleted successfully",
        deletedExam,
      });
  } catch (error: any) {
    console.error("Error deleting exam:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET route to fetch all exams
examRouter.get("/exam", async (req: Request, res: Response) => {
  try {
    // Fetch all exams from the database
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default examRouter;
