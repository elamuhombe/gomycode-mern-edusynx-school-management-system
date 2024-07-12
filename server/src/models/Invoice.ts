import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { ISchool } from "./School";
import { IStudent } from "./Student";

// Enum for Status
enum Status{
    PENDING="pending",
    OVERDUE="overdue",
    COMPLETED="completed"
}
// interface for the invoice document
interface IInvoice extends Document{
    amount:Float32Array;
    dueDate: Date;
    status: Status;
    studentId: string | IStudent
}

// inteface for the invoice model
interface IInvoiceModel extends Model <IInvoice>{}


