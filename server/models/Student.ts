import {Schema, Document} from 'mongoose';

// Define a string literal type representing gender
type Gender = "male || female";

// Define a string literal type representing student type
type StudentType = "day || boarding";

type HasGuardian = "yes || no";

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
    Father:{
        FatherName: String,
        ContactNumber: Number,
        EmailAddress: String
    }
    Mother:{
        MotherName: String,
        ContactNumber: Number,
        EmailAddress: String
    }
    Guardian: HasGuardian

}