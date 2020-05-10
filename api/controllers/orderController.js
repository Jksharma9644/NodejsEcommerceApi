'use strict';
// var mongoose = require('mongoose'),
var { mongoose } = require('../../server/db/mongoose'),
    csv = require('csvtojson'),
    bcrypt = require('bcrypt'),
    Orders = mongoose.model('Orders');
var fs = require('fs');
var path = require('path');

exports.placeorder = function (req, res) {
    var response = {};
    var id = 'Sawji-order-'+new Date().getFullYear()+ '_' + Math.random().toString(36).substr(2, 9);
    var db = new Orders();
    db.ORDER_ID = id;
    db.ORDER_DETAILS = req.body.ORDER_DETAILS;
    db.CLIENT_ID = req.body.CLIENT_ID;
    db.ORDER_STATUS = req.body.ORDER_STATUS;
    db.CLIENT_INFO = req.body.CLIENT_INFO;
    db.TOTAL_AMOUNT =req.body.TOTAL_AMOUNT;
    db.PAYMENT_STATUS = req.body.PAYMENT_STATUS;
    db.PAYMENT_MODE = req.body.PAYMENT_MODE,
    db.platform =req.body.platform

    var obj = {};
    obj[id] = db;
    db.save(function (err, data) {
        if (err) {
            console.log(err);
            response = { "status": false, "message": err };
        } else {
            response = { "status": true, "message": "Data added for ID :" + data._id, "OrderId": data.ORDER_ID };
        }
        res.json(response);
    })



}


exports.getAllorders = function(req, res){
    Orders.find()
    .then(orders => {
        res.status(200).send({ status: true, data: orders })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

}

exports.getOrderByClientId =  function(req, res){
    const id = req.params.id;
    var query=Orders.find({ CLIENT_ID: id });
    query.exec(function (err, orders) {
        if (err){
            res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." })
        }else{
            res.status(200).send({ status: true, data: orders })
 
        }
        // athletes contains an ordered list of 5 athletes who play Tennis
      })

}

exports.editOrderById = function(req,res){
    const id = req.params.id;
    var myquery = { ORDER_ID: id };
    var newvalues = { $set: req.body };
    Orders.updateOne(myquery, newvalues, function (err) {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." })

        } else {
            res.status(200).send({ status: true, message: "your product has been Edited" })

        }
    })


}

exports.deleteOrderById = function(req,res){
    var id = req.params.id;
    Orders.findByIdAndRemove({ _id: id }, function (err) {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." })

        } else {
            res.status(200).send({ status: true, message: "your product has been DELETED" })


        }
    })
}