// types.ts

// Define a string literal type representing gender
export type Gender = "male" | "female";

// Define a string literal type representing student type
export type StudentType = "day" | "boarding";

// Define interface for Guardian
export interface Guardian {
    guardianName: string;
    contactNumber1: number;
    contactNumber2: number;
    emailAddress: string;
}
