const { Schema, model } = require('mongoose');

const Restaurant = new Schema({
    name: {type: String, required: true},
    address: String,
    isOpen: Boolean,
    location: String,
});

module.exports = model("Restaurant", Restaurant);
