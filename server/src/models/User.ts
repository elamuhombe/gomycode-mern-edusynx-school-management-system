import mongoose, { Schema, Document, model, Types } from "mongoose";
import { ISchool } from "./School";

interface IUser extends Document {
  school: Types.ObjectId | ISchool;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  role: string;
  password?: string;
  familyNumber?: number; // Optional string representing the family number

  teachingSubjects?: string[]; // Optional array of teaching subjects
  isClassTeacher?: boolean; // Optional boolean indicating whether the teacher is a class teacher
}

const UserSchema = new Schema<IUser>({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
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
