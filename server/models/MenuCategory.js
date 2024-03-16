const { Schema, model } = require('mongoose');

const MenuCategory = new Schema({
    category: {type: String, unique: true},
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
});

module.exports = model("MenuCategory", MenuCategory); 