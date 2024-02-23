const { Schema, model } = require('mongoose');

const WorkingTimeEntry = new Schema({
    start: {type: String, default: '00:00:00'},
    end: {type: String, default: '00:00:00'},
});

const WorkingTime = new Schema({
    date: {type: String},
    entries: WorkingTimeEntry,
    servedTablesNumber: {type: Number, default: 0}
});

const Employee = new Schema({
    name: String,
    age: Number,
    location: String,
    experience: String,
    isOnline: { type: Boolean, default: false },
    email: String,
    password: String,
    position: String,
    pin: String,
    phone: String,
    registrationDate: String,
    typeOfWorkingTime: String,
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    salary: String,
    workingTime: [WorkingTime]
});

module.exports = model("Employee", Employee);
