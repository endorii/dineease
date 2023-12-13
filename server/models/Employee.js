const { Schema, model } = require('mongoose');

const WorkingTime = new Schema({
    date: String
});

const Employee = new Schema({
    name: String,
    age: Number,
    experience: String,
    isOnline: Boolean,
    email: String,
    password: String,
    position: String,
    pin: String,
    restaurant: String,
    salary: String,
    workingTime: {WorkingTime}
});

module.exports = model("Employee", Employee);
