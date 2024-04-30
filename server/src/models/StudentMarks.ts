import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";
import { ISchool } from "./School";
import { ISubject } from "./Subject";

// Interface for the StudentMarks document
interface IStudentMarks extends Document {
  studentId: ObjectId;
  examId: ObjectId;
  subjectMarks: {
    subjectName: string;
    marks: number;
  }[];
}

// Interface for the StudentMarks model
interface IStudentMarksModel extends Model<IStudentMarks> {}

// Define the schema
const studentMarksSchema = new mongoose.Schema<IStudentMarks>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student", // Reference to the Student model
    required: true,
  },
  examId: {
    type: Schema.Types.ObjectId,
    ref: "Exam", // Reference to the Exam model
    required: true,
  },
  subjectMarks: [
    {
      subjectName: {
        type: String,
        required: true,
      },
      marks: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Create a Mongoose model based on the schema
const StudentMarks: Model<IStudentMarks> = mongoose.model<
  IStudentMarks,
  IStudentMarksModel
>("StudentMarks", studentMarksSchema);

export { StudentMarks, IStudentMarks };
