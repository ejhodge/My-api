const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema ({
    name: { type: String, required: true},
    description: String,
    price: { type: Number, required: true},
    quantity: { type: Number, required: true } 
});

module.exports = mongoose.model('Item', itemSchema, 'items');