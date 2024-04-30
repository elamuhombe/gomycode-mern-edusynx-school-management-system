import mongoose, { Schema, Document, model, Types } from "mongoose";
import { ISchool } from "./School";
import { IClass } from "./Classes";
import { ISubject } from "./Subject";

// Define the structure of a user document in the MongoDB database
interface IUser extends Document {
  school: Types.ObjectId | ISchool; // Reference to the user's school
  className: string | IClass; // Reference to the user's class
  firstName: string; // User's first name
  lastName: string; // User's last name
  gender: string; // User's gender
  email: string; // User's email address
  role: string; // User's role in the system
  password?: string; // Optional password for the user
  familyNumber?: number; // Optional family number associated with the user
  subject_name?: string | ISubject // Optional reference to the subject the user teaches

  teachingSubjects?: string[]; // Optional array of teaching subjects for teachers
  teacher_id?: string; // Optional teacher ID
  isClassTeacher?: boolean; // Optional boolean indicating whether the user is a class teacher
}

// Define the schema for the User collection in MongoDB
const UserSchema = new Schema<IUser>({
  school: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectID referencing the School collection
    ref: "School", // Reference to the School model
    required: true, // School field is required
  },
 className: {
    type: String,
    ref: "Class", // Reference to the Class model
  },
  teacher_id: {
    type: String,
  },
  firstName: { type: String, required: true }, // User's first name is required
  lastName: { type: String, required: true }, // User's last name is required
  gender: { type: String, enum: ["male", "female"], required: true }, // User's gender must be either "male" or "female"
  email: { type: String, required: true, unique: true }, // User's email address is required and must be unique
  role: {
    type: String,
    enum: [
      "admin",
      "accountant",
      "headteacher",
      "enrollmentOfficer",
      "guardian",
      "teacher",
    ], // User's role must be one of the specified values
    required: true, // Role field is required
  },
  password: { type: String }, // Password field is optional
  familyNumber: {type:Number}, // Family number field is optional
  isClassTeacher: { type: Boolean, required: false }, // Make it optional by setting required to false
  subject_name:{type:String, required: false}, // Subject name field is optional
});

// Conditional inclusion of teachingSubjects and isClassTeacher fields based on user role
UserSchema.add({
  teachingSubjects: {
    type: [String],
    required: function () {
      return this.role === "teacher"; // Teaching subjects are required only for users with role "teacher"
    },
  },
  isClassTeacher: {
    type: Boolean,
    required: function () {
      return this.role === "teacher"; // isClassTeacher field is required only for users with role "teacher"
    },
  },
});

// Create a model for the User collection using the UserSchema
const User = model<IUser>("User", UserSchema);

// Export the IUser interface and the User model for use in other modules
export { IUser, User };
