import mongoose, { Schema, Document, model, Types } from "mongoose";
import { ISchool } from "./School";
import { IClass } from "./Classes";
import { ISubject } from "./Subject";

interface IUser extends Document {
  school: Types.ObjectId | ISchool;
  className: string | IClass;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  role: string;
  password?: string;
  familyNumber?: number; // Optional string representing the family number
  subject_name?: string | ISubject

  teachingSubjects?: string[]; // Optional array of teaching subjects
  teacher_id?: string;
  isClassTeacher?: boolean; // Optional boolean indicating whether the teacher is a class teacher
}

const UserSchema = new Schema<IUser>({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
 className: {
    type: String,
    ref: "Class",
  },
  teacher_id: {
    type: String,
  },
  // username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: [
      "admin",
      "accountant",
      "headteacher",
      "enrollmentOfficer",
      "guardian",
      "teacher",
      "guardian",
    ],
    required: true,
  },
  password: { type: String },
  familyNumber: {type:Number},
  isClassTeacher: { type: Boolean, required: false }, // Make it optional by setting required to false
  subject_name:{type:String, required: false},
});

// Conditional inclusion of teachingSubjects and isClassTeacher fields based on user role
UserSchema.add({
  teachingSubjects: {
    type: [String],
    required: function () {
      return this.role === "teacher";
    },
  },
  isClassTeacher: {
    type: Boolean,
    required: function () {
      return this.role === "teacher";
    },
  },
});

const User = model<IUser>("User", UserSchema);

export { IUser, User };
