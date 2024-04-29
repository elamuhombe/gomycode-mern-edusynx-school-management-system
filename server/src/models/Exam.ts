import mongoose, { Document, Model, ObjectId, Schema, Types } from 'mongoose';
import {  ISchool } from './School';
import { ISubject } from './Subject';

// Interface for the Exam document
interface IExam extends Document {
  examName: string;
  examDate: string;
  //subject: ObjectId;
}

// Interface for the Exam model
interface IExamModel extends Model<IExam> {}

// Define the schema
const examSchema = new mongoose.Schema<IExam>({
  examName: {
    type: String,
    required: true
  },
  examDate: {
    type: String,
    required: true
  },
//   subject: {
//     type: Schema.Types.ObjectId,
//     ref: "Subject", // Reference to the Subject model
//     required: true
// },

});

// Create a Mongoose model based on the schema
const Exam: Model<IExam> = mongoose.model<IExam, IExamModel>('Exam', examSchema);

export { Exam, IExam };
