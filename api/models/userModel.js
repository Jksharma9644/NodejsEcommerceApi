
'use strict';
var mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
Schema = mongoose.Schema;
const validator = require('validator');



/* User Schema*/
var UserSchema = new mongoose.Schema({
    username:{
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
    mobile:{
        type: Number,
        required: true,
    },
    created:{
        type:Date,
        default:Date.now
    },
    platform:{
     type:String,
     default:''
    },
    roles: [{ type: 'String' }],
    isVerified: { type: Boolean, default: false },
    isNumberVerified:{type:Boolean,default:false},
    passwordResetToken: String,
    passwordResetExpires: Date
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

mongoose.model('User',UserSchema);