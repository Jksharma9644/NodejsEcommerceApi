'use strict';
var mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
Schema = mongoose.Schema;
const validator = require('validator');

var OTPSchema= new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
    otp:{ type: String, required: false },
    MobileNo:{ type: Number, required: false }

})

mongoose.model('Otp',OTPSchema);