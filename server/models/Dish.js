
const { Schema, model } = require('mongoose');

const Dish = new Schema({
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    category: { type: Schema.Types.ObjectId, ref: 'MenuCategory' },
    categoryName: String,
    name: String,
    price: Number,
    time: Number,
    amount: Number,
    weight: String,
    calories: Number,
    ingredients: [String],
    logoPath: String,
})


module.exports = model("Dish", Dish); 