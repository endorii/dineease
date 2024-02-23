const { Schema, model } = require('mongoose');

const Restaurant = new Schema({
    name: {type: String, required: true},
    address: String,
    isOpen: Boolean,
    location: String,
    menu: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    needs: [{ type: Schema.Types.ObjectId, ref: 'Need' }],
    feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
});

module.exports = model("Restaurant", Restaurant);
