import mongoose, { Schema, Document, Types } from 'mongoose';
import { IStudent } from "./../models/Student";

// Define interface for the document
interface IAttendance extends Document {
    date: Date;
    remarks?: string;
    status: 'Present' | 'Absent' | 'Late' | 'Leave';
    student: Types.ObjectId | IStudent;
}

// Define the schema
const AttendanceSchema: Schema = new Schema({
    date: { type: Date, required: true },
    remarks: { type: String },
    status: { type: String, enum: ['Present', 'Absent', 'Late', 'Leave'], required: true },
   student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
});

// Define and export the model
const Attendance = mongoose.model<IAttendance>('Attendance', AttendanceSchema);

export { IAttendance, Attendance };
