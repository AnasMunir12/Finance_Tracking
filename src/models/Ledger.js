import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
    title: String,
    amount: Number,

    type: {
        type: String,
        enum: ["payable", "receivable"],
        required: true,
    },

    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },

    note: String,
    date: Date,

    isAddedToTransactions: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.models.Ledger ||
    mongoose.model("Ledger", ledgerSchema);