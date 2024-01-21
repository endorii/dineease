
const { Schema, model } = require('mongoose');

const Dish = new Schema({
    name: String,
    price: Number,
    time: Number,
    amount: Number,
    categoryName: String,
    ingredients: [String],
    calories: String,
    weight: String,
    logoPath: String,
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    category: { type: Schema.Types.ObjectId, ref: 'MenuCategory' },
})

module.exports = model("Dish", Dish); 