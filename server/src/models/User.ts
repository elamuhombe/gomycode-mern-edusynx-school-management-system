import { Schema, Document, model } from 'mongoose';

interface UserInterface extends Document {
    school: string;
    username: string;
    email: string;
    role: string;
    firstname: string;
    lastname: string;
    gender: string; 
}

const UserSchema = new Schema<UserInterface>({
    school: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true } // Adding gender field to schema
});

const User = model<UserInterface>('User', UserSchema);

export default User;
