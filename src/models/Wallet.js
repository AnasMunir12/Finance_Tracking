
import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
    cash: { type: Number, default: 0 },
    online: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);