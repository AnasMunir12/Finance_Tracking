
import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cash: { type: Number, default: 0 },
    online: { type: Number, default: 0 },
}, { timestamps: true });

if (process.env.NODE_ENV !== "production") {
    delete mongoose.models.Wallet;
}

export default mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);