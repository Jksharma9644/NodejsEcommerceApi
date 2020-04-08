'use strict';
// var mongoose = require('mongoose'),
var { mongoose } = require('../../server/db/mongoose'),
    jsonwebToken = require('jsonwebtoken'),
    csv = require('csvtojson'),
    bcrypt = require('bcrypt');
const Categories = mongoose.model('Categories');

exports.createCategories = function (req, res) {
    var db = new Categories();
    db.TYPE = req.body.TYPE;
    db.CATEGORY = req.body.CATEGORY;
    db.ID=req.body.ID;
    
    db.save(function (err, data) {
        if (err) {
            // console.log(err);
            res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." })
        } else {
            res.status(200).send({ status: true, message: "category has been added for id:" + data._id })
        }
    })

}


exports.categoryList=function (req, res) {
    Categories.find({ ISDELETED: false })
    .then(categories => {
        res.status(200).send({ status: true, data: categories })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

}
exports.getCategoryById = function (req, res) {
    const id = req.params.id;
    Categories.findOne({ _id: id }, function (err, data) {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." })

        } else {
            res.status(200).send({ status: true, data: data })


        }
    })
}
exports.editCategoryById = function (req, res) {
    const id = req.params.id;
  
    Categories.findByIdAndUpdate(id, req.body, {new: true}, function (err,data) {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." })

        } else {
            console.log(data);
            res.status(200).send({ status: true, message: "your Category has been Edited" })


        }
    })


}

exports.delteCategory=function(req,res){
    var id = req.params.id;
    Categories.findByIdAndRemove({_id:id},function(err){
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." })

        } else {
            res.status(200).send({ status: true, message: "your Category has been DELETED" })


        }
    })
}

