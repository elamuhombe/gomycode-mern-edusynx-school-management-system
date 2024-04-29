// Student.ts
import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { ISchool } from "./School";
import { IUser } from "./User";
import { IClass } from "./Classes";

// Enum for student gender
enum Gender {
  BOY = 'boy',
  GIRL = 'girl',
}
// Interface for the Student document
interface IStudent extends Document {
  studentFirstName: string;
  studentLastName: string;
  studentGender: Gender;
  school: string | ISchool;
  student: string | IStudent;
  className: Types.ObjectId | IClass;
  previousSchool: string;
  registrationDate: Date;
  dateOfBirth: Date;
  adm: number;
  guardian: Types.ObjectId | IUser;
  exam: Schema.Types.ObjectId;
  studentId?: String;

}

// Interface for the Student model
interface IStudentModel extends Model<IStudent> {}

// Define the schema for Student
const studentSchema = new mongoose.Schema<IStudent>({
  studentFirstName: {
    type: String,
    required: true,
  },
  studentLastName: {
    type: String,
    required: true,
  },
  adm: {
    type: Number,
    required: true,
  },
  studentGender: {
    type: String,
    enum: Object.values(Gender), // Ensure only values from the enum are allowed
    required: true,
  },
  className: {
    type: String,
    ref: "Class",
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
  exam: { type: Schema.Types.ObjectId, ref: 'Exam' },
  studentId: { type: String }
});

// Create models

const Student: Model<IStudent> = mongoose.model<IStudent, IStudentModel>(
  "Student",
  studentSchema
);

export { Student, IStudent };
