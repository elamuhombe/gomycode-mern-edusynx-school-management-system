import mongoose, { Schema, Document } from 'mongoose';
import { IStudentAttendance } from './StudentAttendance';

// Define interface for the document
interface IAttendance extends Document {
    className: string;
    date: string;
    studentAttendances: IStudentAttendance[]; // Array of student attendance data
}

// Define the schema
const AttendanceSchema: Schema = new Schema({
    className: {
        type: String,
        ref: "Classes",
        required: true,
    },
    date: { type: Date, required: true },
    studentAttendances: [{
        studentName: {
            type: String, // Store the student's name as a string
            ref: "Student",
            required: true
          },
        isPresent: { type: Boolean, required: true }
    }]
});

// Define and export the model
const Attendance = mongoose.model<IAttendance>('Attendance', AttendanceSchema);

export { IAttendance, Attendance };
