import { Schema, model } from "mongoose";

const Refresh = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Employee'},
    refreshToken: {type: String, require: true}
})

module.exports = model('Refresh', Refresh)