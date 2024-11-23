"use strict";
import pkg from 'mongoose';
const { Schema, model } = pkg;

const userSchema = new Schema({
    username: String,
    password: String
}, {
    timestamps: true
});

const Users = model('Address', userSchema);
export default Users;