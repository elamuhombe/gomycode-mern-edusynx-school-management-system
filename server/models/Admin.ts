import { Document, model, Schema } from 'mongoose';

// Define the interface for Admin document
interface IAdmin extends Document {
    username: string;
    password: string;
    email: string;
    role: 'admin' | 'moderator';
}

// Define admin schema
const adminSchema = new Schema<IAdmin>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['admin', 'moderator'], default: 'admin' }
});

// Create and export Admin model
const Admin = model<IAdmin>('Admin', adminSchema);
export default Admin;

