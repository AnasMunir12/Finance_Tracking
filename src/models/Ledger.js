import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
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

if (process.env.NODE_ENV !== "production") {
    delete mongoose.models.Ledger;
}

export default mongoose.models.Ledger ||
    mongoose.model("Ledger", ledgerSchema);