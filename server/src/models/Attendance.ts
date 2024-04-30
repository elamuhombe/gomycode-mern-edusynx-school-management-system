import mongoose, { Schema, Document } from 'mongoose';
import { IStudentAttendance } from './StudentAttendance';

// Define interface for the Attendance document
interface IAttendance extends Document {
    className: string; // Name of the class for which attendance is being recorded
    date: string; // Date of the attendance record
    studentAttendances: IStudentAttendance[]; // Array of student attendance data
}

// Define the schema for the Attendance collection
const AttendanceSchema: Schema = new Schema({
    className: {
        type: String,
        ref: "Classes", // Reference to the Classes model
        required: true, // Class name is required
    },
    date: { type: Date, required: true }, // Attendance date is required
    studentAttendances: [{ // Array containing individual student attendance data
        studentName: {
            type: String, // Store the student's name as a string
            ref: "Student", // Reference to the Student model
            required: true // Student name is required
          },
        isPresent: { type: Boolean, required: true } // Boolean indicating whether the student is present
    }]
});

// Define and export the model for the Attendance collection
const Attendance = mongoose.model<IAttendance>('Attendance', AttendanceSchema);

export { IAttendance, Attendance };
