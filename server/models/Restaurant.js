const { Schema, model } = require('mongoose');

const MenuItem = new Schema({
    category: String,
    items: [{
        name: String,
        price: Number,
        ingredients: [String],
        calories: String,
        weight: String,
        readyTime: String
    }]
});

const Need = new Schema({
    waiterName: String,
    message: String,
    time: String,
    date: String,
    priority: String
});

const Feedback = new Schema({
    waiterName: String,
    message: String,
    time: String,
    date: String
});

const Restaurant = new Schema({
    name: {type: String, required: true},
    address: String,
    isOpen: Boolean,
    menu: [MenuItem],
    needs: [Need],
    feedback: [Feedback],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = model("Restaurant", Restaurant);
