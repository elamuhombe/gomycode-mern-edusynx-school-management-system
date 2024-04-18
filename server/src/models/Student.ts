// Student.ts
import mongoose, { Document, Model, Types } from "mongoose";
import { ISchool } from "./School";
import { IGuardian } from "./Guardian";
import { IClass } from "./Classes";

// Interface for the Student document
interface IStudent extends Document {
  firstName: string;
  lastName: string;
  gender: string;
  school: Types.ObjectId | ISchool;
  schoolClass: Types.ObjectId | IClass;
  previousSchool: string;
  registrationDate: Date;
  dateOfBirth: Date;
  guardianFamilyNumber: Number;
  guardian: Types.ObjectId | IGuardian;
}

// Interface for the Student model
interface IStudentModel extends Model<IStudent> {}

// Define the schema for Student
const studentSchema = new mongoose.Schema<IStudent>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  schoolClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schoolClass",
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },

  guardian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guardian",
    required: true,
  },
  guardianFamilyNumber: {
    type: Number, 
    required: true,
  },
  previousSchool: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
});

// Create models

const Student: Model<IStudent> = mongoose.model<IStudent, IStudentModel>(
  "Student",
  studentSchema
);

export { Student, IStudent };
