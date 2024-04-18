import mongoose, { Document, Model, Types } from "mongoose";
import { ISchool } from "./School";

// Interface for the Guardian document
interface IGuardian extends Document {
  name: string;
  contact_number: string;
  email: string;
  address: string;
  school: Types.ObjectId | ISchool;
  familyNumber: number;
  
}

// Interface for the Guardian model
interface IGuardianModel extends Model<IGuardian> {}

// Define the schema for Guardian
const guardianSchema = new mongoose.Schema<IGuardian>({
  name: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  familyNumber:{
    type: Number,
    required: true
  }
});

// Create models
const Guardian: Model<IGuardian> = mongoose.model<IGuardian, IGuardianModel>(
  "Guardian",
  guardianSchema
);

export { Guardian, IGuardian };
