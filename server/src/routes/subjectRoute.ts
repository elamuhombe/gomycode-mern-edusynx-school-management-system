import express, { Request, Response } from "express";
import { Subject, ISubject } from "./../models/Subject";

const subjectRouter = express.Router();

// Validation middleware for creating or updating a subject
const validateSubject = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { subject_name } = req.body;
  // Add your validation logic here

  // Continue to the next middleware if validation passes
  next();
};

// POST route to create a new subject
subjectRouter.post(
  "/subject",
  validateSubject,
  async (req: Request, res: Response) => {
    const { ...others } = req.body;

    try {
      const subject = new Subject({ ...others }); // Create a new subject instance
      let savedSubject = await subject.save(); // Save the subject to the database
      console.log({ savedSubject });
      if (!savedSubject) throw Error("Error occurred while creating subject");
      res.status(201).json({ savedSubject, success: true });
    } catch (error: any) {
      console.log({ subjectError: error.message });
      res.status(400).send(error.message);
    }
  }
);

// Update subject route
subjectRouter.put("/subject/:subjectId", async (req, res) => {
  const subjectId = req.params.subjectId;
  const updatedSubjectData = req.body;

  try {
    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      updatedSubjectData,
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", subject });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to update subject" });
  }
});

// Delete a subject by ID
subjectRouter.delete("/subject/:subjectId", async (req, res) => {
  const _subjectId = req.params.subjectId; // Extract the user ID from the request parameters
  try {
    // Find the user by ID and delete it
    const deletedSubject = await Subject.findByIdAndDelete(_subjectId);

    // Check if user exists
    if (!deletedSubject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    // User successfully deleted
    res
      .status(200)
      .json({
        success: true,
        message: "User deleted successfully",
        deletedSubject,
      });
  } catch (error: any) {
    console.error("Error deleting subject:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET route to fetch all subjects
subjectRouter.get("/subject", async (req: Request, res: Response) => {
  try {
    // Fetch all subjects from the database
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default subjectRouter;
