import {Schema, Document} from 'mongoose';

// Define a string literal type representing gender
type Gender = "male || female";

// Define a string literal type representing student type
type StudentType = "day || boarding";

// Define the interface for Student Document
interface Student{
    StudentID: Number,
    StudentNames: String,
    StudentDateOfBirth: Date,
    Gender: Gender,
    StudentType: StudentType,
    ClassID: Number,
    ClassName: String,
    PreviousSchool: String,
    EnrollmentDate: Date,

}