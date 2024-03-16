const { Schema, model } = require('mongoose');

const OrderItemSchema = new Schema({
    name: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
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
    waiter: { type: Schema.Types.ObjectId, ref: 'Employee'},
    date: String,
    time: String,
    items: [GuestSchema]
});

module.exports = model("Order", Order); 
