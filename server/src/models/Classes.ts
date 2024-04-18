import mongoose, { Schema, Document, model, Types } from "mongoose";
import { ISchool} from "./School";


interface IClass extends Document {
  school: Types.ObjectId | ISchool;
  className: string;
  year: number;

}

const ClassSchema = new Schema<IClass>({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  className: { type: String, required: true },
  year:{type: Number, required: true}
 
});

const Classes = model<IClass>("Class", ClassSchema);

export { IClass, Classes };
