import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IStudent } from "./Student";

// Enum for Status
enum Status {
    PENDING = "pending",
    OVERDUE = "overdue",
    COMPLETED = "completed"
}

// Interface for the invoice document
interface IInvoice extends Document {
    amount: number;
    dueDate: Date;
    status: Status;
    studentId: Types.ObjectId | IStudent;
}

// Interface for the invoice model
interface IInvoiceModel extends Model<IInvoice> {}

// Schema for the invoice
const InvoiceSchema: Schema<IInvoice> = new Schema({
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: Status,
        default: Status.PENDING
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true
    }
}, {
    timestamps: true
});

const Invoice: IInvoiceModel = mongoose.model<IInvoice, IInvoiceModel>("Invoice", InvoiceSchema);

export { IInvoice, IInvoiceModel, Invoice };
