import { Schema, Document, Types } from 'mongoose';

// Define a string literal type representing gender
type Gender = "male" | "female";

// Define a string literal type representing student type
type StudentType = "day" | "boarding";

// Define a string literal type representing guardian type
type GuardianType = "father" | "mother" | "other";

// Define interface for Guardian
interface Guardian {
    type: GuardianType; // Type of guardian (father, mother, other)
    name: string;
    contactNumber: number;
    emailAddress: string;
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
