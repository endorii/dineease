const { Schema, model } = require('mongoose');

const Feedback = new Schema({
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    waiterName: String,
    message: String,
    time: String,
    date: String
});

module.exports = model("Feedback", Feedback); 