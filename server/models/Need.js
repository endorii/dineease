const { Schema, model } = require('mongoose');

const Need = new Schema({
    waiterName: String,
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    message: String,
    time: String,
    date: String,
    priority: String
});

module.exports = model("Need", Need);