import mongoose, { Document, Model } from 'mongoose';

// Enum to represent the possible genders
enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

// Interface for the Teacher document
interface ITeacher extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber?: string;
  gender: Gender;
  isClassTeacher: boolean;
  teachingSubjects: string[];
  school: string;
}

// Interface for the Teacher model
interface ITeacherModel extends Model<ITeacher> {}

// Define the schema
const teacherSchema = new mongoose.Schema<ITeacher>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phoneNumber: {
    type: String
  },
  gender: {
    type: String,
    enum: Object.values(Gender),
    required: true
  },
  isClassTeacher: {
    type: Boolean,
    required: true
  },
  teachingSubjects: {
    type: [String],
    default: []
  }
});

// Create a Mongoose model based on the schema
const Teacher: Model<ITeacher> = mongoose.model<ITeacher, ITeacherModel>('Teacher', teacherSchema);

export { Teacher, ITeacher, Gender };
