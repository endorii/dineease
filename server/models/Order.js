const { Schema, model } = require('mongoose');

const OrderItemSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    quantity: {
        type: Number,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    }
});

const GuestSchema = new Schema({
    id: Number,
    orderInfo: [OrderItemSchema]
});

const Order = new Schema({
    tableNumber: String,
    isOpen: {
        type: Boolean,
        default: true,
        required: true
    },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    date: String,
    time: String,
    items: [GuestSchema]
});

module.exports = model("Order", Order); 
