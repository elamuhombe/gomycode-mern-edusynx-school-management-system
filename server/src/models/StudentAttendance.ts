// StudentAttendance.ts

import mongoose, { Document, Model, Schema, Types, model } from "mongoose";
import { IStudent } from "./Student";

// Interface for Student Attendance document
interface IStudentAttendance extends Document {
  student: string | IStudent; // Assuming studentId is stored as ObjectId
  isPresent: boolean;
}

// Interface for the Student model
interface IStudentAttendanceModel extends Model<IStudentAttendance> {}

// Define the schema
const StudentAttendanceSchema: Schema = new Schema({
  student: { type: Types.ObjectId, ref: "Student", required: true },
  isPresent: { type: Boolean, required: true },
});

// Define the interface using Model<T>
interface IStudentAttendance extends Document {
  student: string | IStudent;
  isPresent: boolean;
}

const StudentAttendance: Model<IStudentAttendance> = mongoose.model<
  IStudentAttendance,
  IStudentAttendanceModel
>("Student", StudentAttendanceSchema);
export { IStudentAttendance, StudentAttendance };
