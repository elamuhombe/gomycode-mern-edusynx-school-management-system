import { Document, Schema, model, Types } from 'mongoose';
import { Gender, Guardian, StudentType } from './types';


// Define the interface for Student Document
interface IStudent extends Document {
    studentID: number;
    studentNames: string;
    studentDateOfBirth: Date;
    gender: Gender;
    studentType: StudentType;
    classNameID: number;
    classNameName: string;
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
    classNameID: { type: Number, required: true },
    classNameName: { type: String, required: true },
    previousSchool: { type: String, required: true },
    enrollmentDate: { type: Date, required: true },
    guardian: { type: Object } 
});

// Create and export Student model
const Student = model<IStudent>('Student', studentSchema);
export {IStudent, Student};
