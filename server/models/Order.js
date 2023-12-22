const { Schema, model } = require('mongoose');

const OrderItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: false
    },
    ingredients: {
        type: [String],
        required: false
    }
});

const GuestSchema = new Schema({
    id: Number,
    guest: [OrderItemSchema]
});

const Order = new Schema({
    tableNumber: String,
    isOpen: {
        type: Boolean,
        default: true,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    openingTime: String,
    order: [GuestSchema]
});

module.exports = model("Order", Order); 
