import mongoose, { Schema, Document, model, Types } from "mongoose";
import { ISchool } from "./School";

// Define the structure of a class document in the MongoDB database
interface IClass extends Document {
  school: Types.ObjectId | ISchool; // Reference to the class's school
  className: string; // Name of the class
  year: number; // Year of the class
}

// Define the schema for the Class collection in MongoDB
const ClassSchema = new Schema<IClass>({
  school: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectID referencing the School collection
    ref: "School", // Reference to the School model
    required: true, // School field is required
  },
  className: { type: String, required: true }, // Class name is required
  year: { type: Number, required: true }, // Year of the class is required
});

// Create a model for the Class collection using the ClassSchema
const Classes = model<IClass>("Class", ClassSchema);

// Export the IClass interface and the Classes model for use in other modules
export { IClass, Classes };
