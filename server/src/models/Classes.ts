import mongoose, { Schema, Document, model, Types } from "mongoose";
import { ISchool} from "./School";


interface IClass extends Document {
  school: Types.ObjectId | ISchool;
  className: string ;
  year: number;
classId: string | IClass;

}

const ClassSchema = new Schema<IClass>({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  className: { type: String, required: true },
  classId: { type: String},
  year:{type: Number, required: true}
 
});

const Classes = model<IClass>("Class", ClassSchema);

export { IClass, Classes };
