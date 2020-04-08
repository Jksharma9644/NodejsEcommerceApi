
'use strict';
var mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
Schema = mongoose.Schema;
const validator = require('validator');



/* User Schema*/
var AdminSchema = new mongoose.Schema({
    name:{
     type:String,
     trim:true,
     required:true
    },
    email: {
        type: String,
        lowercase:true,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created:{
        type:Date,
        default:Date.now
    },
    roles: [{ type: 'String' }],
    isVerified: { type: Boolean, default: false },
    passwordResetToken: String,
    passwordResetExpires: Date
});

AdminSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

mongoose.model('Admin',AdminSchema);