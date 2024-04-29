import mongoose, { Document, Model, Types } from "mongoose";
import { IUser } from "./User";

// Interface for the Subject document
interface ISubject extends Document {
  subject_name: string;
  department: string;
  teacher: Types.ObjectId | IUser;
}

// Interface for the Subject model
interface ISubjectModel extends Model<ISubject> {}

// Define the schema for Subject
const subjectSchema = new mongoose.Schema<ISubject>({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  subject_name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

// Create models
const Subject: Model<ISubject> = mongoose.model<ISubject, ISubjectModel>(
  "Subject",
  subjectSchema
);

export { Subject, ISubject };
