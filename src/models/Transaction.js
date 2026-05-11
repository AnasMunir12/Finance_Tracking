import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        type: {
            type: String,
            enum: ["income", "expense", "transfer"],
            required: true,
        },

        category: {
            type: String,
            default: "Other",
        },

        // 🔥 IMPORTANT (wallet system future proof)
        wallet: {
            type: String,
            enum: ["cash", "online", "bank"],
            default: "cash",
        },

        status: {
            type: String,
            enum: ["paid", "pending"],
            default: "paid",
        },

        // 🔥 for payable/receivable deadline
        dueDate: {
            type: Date,
        },

        date: {
            type: Date,
            default: Date.now,
        },

        note: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Transaction ||
    mongoose.model("Transaction", transactionSchema);