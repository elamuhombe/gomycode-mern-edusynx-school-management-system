import mongoose, { Document, Model } from 'mongoose';

// Interface for the School document
interface ISchool  {
  name: string,
  email: string,
  username: string,
  city: string,
  password: string;
  role: string;
status: { type: String, default: 'inactive' } // Default status is 'inactive'
paymentID: String, // New field for payment ID
paymentUsername: String // New field for username associated with payment
}

// Interface for the School model
interface ISchoolModel extends Model<ISchool> {}

// Define the schema
const schoolSchema = new mongoose.Schema<ISchool>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of email addresses
    lowercase: true // Converts email addresses to lowercase before saving
  },
  username:{
    type: String,
    unique: true,
    lowercase: true
  },
  city: {
    type: String,
    required: true,
    default: ''
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: String,
    default: 'admin'
  }
});

// Create a Mongoose model based on the schema
const School: Model<ISchool> = mongoose.model<ISchool, ISchoolModel>('School', schoolSchema);

export {School, ISchool};
