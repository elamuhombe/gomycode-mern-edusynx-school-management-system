import { Document, Schema, model, Types } from 'mongoose';
import { Gender, Guardian } from './types';


// Define the interface for Parent Document
interface IParent extends Document {
    parentID: number;
    fullName: string;
    gender: Gender;
    children: Types.ObjectId[]; // Array of child IDs
    guardians: Guardian[]; // Array of guardians
}

// Define parent schema
const parentSchema = new Schema<IParent>({
    parentID: { type: Number, required: true },
    fullName: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    children: [{ type: Schema.Types.ObjectId, ref: 'Student' }], // References to Student documents
    guardians: [{ 
        guardianName: { type: String, required: true },
        contactNumber1: { type: Number, required: true },
        contactNumber2: { type: Number, required: false },
        emailAddress: { type: String, required: true }
    }] // Array of guardian subdocuments
});

// Create and export Parent model
const Parent = model<IParent>('Parent', parentSchema);
export default Parent;
