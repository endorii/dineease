const { Schema, model } = require('mongoose');

const WorkingTime = new Schema({
    date: {type: String, default: '00:00-00:00' }
});

const Employee = new Schema({
    name: String,
    age: Number,
    experience: String,
    isOnline: { type: Boolean, default: false },
    email: String,
    password: String,
    position: String,
    pin: String,
    restaurant: String,
    salary: String,
    workingTime: { type: WorkingTime }
});


module.exports = model("Employee", Employee);
