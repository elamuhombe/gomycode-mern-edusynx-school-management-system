//src/routes/invoiceRoute.ts
import express, { Request, Response } from 'express';
import { Invoice } from './../models/Invoice';
import mongoose from 'mongoose';

const invoiceRouter = express.Router();

// Create a new invoice
invoiceRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { amount, dueDate, status, studentId } = req.body;
        const newInvoice = new Invoice({
            amount,
            dueDate,
            status,
            studentId: new mongoose.Types.ObjectId(studentId)
        });
        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

// Get all invoices
invoiceRouter.get('/', async (req: Request, res: Response) => {
    try {
        const invoices = await Invoice.find().populate('studentId');
        res.status(200).json(invoices);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single invoice by ID
invoiceRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('studentId');
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update an invoice
invoiceRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const { amount, dueDate, status, studentId } = req.body;
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            { amount, dueDate, status, studentId: new mongoose.Types.ObjectId(studentId) },
            { new: true, runValidators: true }
        );
        if (!updatedInvoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json(updatedInvoice);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

// Delete an invoice
invoiceRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default invoiceRouter;
