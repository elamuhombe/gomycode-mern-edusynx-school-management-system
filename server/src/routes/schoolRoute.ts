import express, { Request, Response } from "express";
import { School } from "../models/School";

const schoolRouter = express.Router();

// Create a new school
schoolRouter.post("/schools", async (req: Request, res: Response) => {
  try {
    const school = new School(req.body);
    await school.save();
    res.status(201).send(school);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all schools
schoolRouter.get("/schools", async (req: Request, res: Response) => {
  try {
    const schools = await School.find();
    res.send(schools);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single school by ID
schoolRouter.get("/schools/:id", async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    const school = await School.findById(_id);
    if (!school) {
      return res.status(404).send();
    }
    res.send(school);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a school by ID
schoolRouter.put("/schools/:id", async (req: Request, res: Response) => {
  try {
    const school = await School.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!school) {
      return res.status(404).send();
    }

    res.send(school);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a school by ID
schoolRouter.delete("/schools/:id", async (req: Request, res: Response) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) {
      return res.status(404).send();
    }
    res.send(school);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { schoolRouter };
