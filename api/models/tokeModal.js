'use strict';
var mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
Schema = mongoose.Schema;
const validator = require('validator');

var TokenSchema= new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
    otp:{ type: String, required: false },
    MobileNo:{ type: Number, required: false }

})

mongoose.model('Token',TokenSchema);