const { Schema, model } = require('mongoose');

const MenuCategory = new Schema({
    category: String,
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
});

module.exports = model("MenuCategory", MenuCategory); 