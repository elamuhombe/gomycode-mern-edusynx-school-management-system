import express, { Request, Response } from "express";
import {Teacher} from "../models/Teacher";
import { TeacherWithClassName } from "./../models/types"; // Import the TeacherWithClassName type

const teacherRouter = express.Router();

// Create a new teacher
teacherRouter.post("/teachers", async (req: Request, res: Response) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all teachers
teacherRouter.get("/teachers", async (req: Request, res: Response) => {
  try {
    const teachers = await Teacher.find();
    res.send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single teacher by ID
teacherRouter.get("/teachers/:id", async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const teacher = await Teacher.findById(_id);
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a teacher by ID
teacherRouter.put("/teachers/:id", async (req: Request, res: Response) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a teacher by ID
teacherRouter.delete("/teachers/:id", async (req: Request, res: Response) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { teacherRouter };
