import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const purchaseSchema = new Schema ({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    description: String,
    total: { type: Number, required: true },
    quantity: { type: Number, default: 0, required: true }
});

export default mongoose.model('Purchase', purchaseSchema, 'purchases');