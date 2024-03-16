import { Document, Schema, model, Types } from 'mongoose';

// Define a string literal type representing gender
type Gender = "male" | "female";

// Define a string literal type representing student type
type StudentType = "day" | "boarding";

// Define interface for Guardian
interface Guardian {
    GuardianName: string;
    ContactNumber: number;
    EmailAddress: string;
}

// Define the interface for Student Document
interface IStudent extends Document {
    studentID: number;
    studentNames: string;
    studentDateOfBirth: Date;
    gender: Gender;
    studentType: StudentType;
    classID: number;
    className: string;
    previousSchool: string;
    enrollmentDate: Date;
    guardian: Guardian | null; // Guardian details (father, mother, or other)
}

// Define student schema
const studentSchema = new Schema<IStudent>({
    studentID: { type: Number, required: true },
    studentNames: { type: String, required: true },
    studentDateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    studentType: { type: String, enum: ['day', 'boarding'], required: true },
    classID: { type: Number, required: true },
    className: { type: String, required: true },
    previousSchool: { type: String, required: true },
    enrollmentDate: { type: Date, required: true },
    guardian: { type: Object } 
});

// Create and export Student model
const Student = model<IStudent>('Student', studentSchema);
export default Student;
