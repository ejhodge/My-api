import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itemSchema = new Schema ({
    name: { type: String, required: true},
    description: String,
    price: { type: Number, required: true},
    quantity: { type: Number, required: true } 
});

export default mongoose.model('Item', itemSchema, 'items');