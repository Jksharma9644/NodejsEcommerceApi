'use strict';
var mongoose = require('mongoose');
// mongoose.connect('mongodb://13.127.56.24:27017/test');
var jsonwebToken = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var Token = mongoose.model('Token');
var Admin = mongoose.model('Admin');
var crypto = require('crypto');
var sha512 = require('js-sha512');

exports.createHash=function (req, res) {
    var salt = 'eCwWELxi';
    // console.log(req.body);
    var request = req.body;
    var hashSequence = "mkey|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10";
    var arrHashKeys = hashSequence.split('|');
    var hashString = '';
    for (var i = 0; i<arrHashKeys.length; i++) {
        if (request[arrHashKeys[i]]) {
            hashString += request[arrHashKeys[i]]
        }
        hashString += '|';
    }
    hashString +=salt;
    var hash = sha512(hashString).toLowerCase();
    console.log(hashString);
    console.log("================================");
    console.log(hash);
    res.send({success : true, hash: hash});
}

exports.PaymentStatus= function(req,res){
    // console.log(req.body);
    //    return  res.send(req.body);
   
        res.redirect('http://localhost:4200/Home/orderConfiramtion/'+req.body.txnid+'/'+req.body.status+'/'+req.body.mihpayid)
    
      
        // return res.status(200).json({ status: req.body.status,info:req.body })
}