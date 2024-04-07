import mongoose, { Document, Model, Types } from "mongoose";
import { ISchool } from "./School";

// Interface for the Student document
interface IStudent extends Document {
  name: string;
  gender: string;
  school: Types.ObjectId | ISchool;
  class: string;
}

// Interface for the Student model
interface IStudentModel extends Model<IStudent> {}

// Define the schema for Student
const studentSchema = new mongoose.Schema<IStudent>({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
});

// Create models

const Student: Model<IStudent> = mongoose.model<IStudent, IStudentModel>(
  "Student",
  studentSchema
);

export { Student, IStudent};
