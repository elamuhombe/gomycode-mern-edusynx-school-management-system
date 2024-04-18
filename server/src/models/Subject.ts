import mongoose, { Document, Model, Types } from "mongoose";

// Interface for the Subject document
interface ISubject extends Document {
  subject_name: string;
  teachers: Types.ObjectId[];
  classes: Types.ObjectId[];
}

// Interface for the Subject model
interface ISubjectModel extends Model<ISubject> {}

// Define the schema for Subject
const subjectSchema = new mongoose.Schema<ISubject>({
  subject_name: {
    type: String,
    required: true,
  },
  teachers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Teacher",
    default: [],
  },
  classes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Class",
    default: [],
  },
});

// Create models
const Subject: Model<ISubject> = mongoose.model<ISubject, ISubjectModel>(
  "Subject",
  subjectSchema
);

export { Subject, ISubject };
