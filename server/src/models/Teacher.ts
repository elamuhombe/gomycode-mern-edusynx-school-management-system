import mongoose, { Document, Model, Types } from "mongoose";
// Import Subject interface


// Interface for the Teacher document
interface ITeacher extends Document {
  user: Types.ObjectId[];
  classrooms: Types.ObjectId[];
}

// Interface for the Teacher model
interface ITeacherModel extends Model<ITeacher> {}



// Define the schema for Teacher
const teacherSchema = new mongoose.Schema<ITeacher>({

  classrooms: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Class",
    default: [],
  },
});

// Create models
const Teacher: Model<ITeacher> = mongoose.model<ITeacher, ITeacherModel>(
  "Teacher",
  teacherSchema
);

export { Teacher, ITeacher };
