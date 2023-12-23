const { Schema, model } = require('mongoose');

const Menu = new Schema({
    category: String,
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    items: [{
        name: String,
        price: Number,
        ingredients: [String],
        calories: String,
        weight: String,
        readyTime: String
    }]
});

module.exports = model("Menu", Menu); 