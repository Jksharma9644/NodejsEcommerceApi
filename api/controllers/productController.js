'use strict';
// var mongoose = require('mongoose'),
var { mongoose } = require('../../server/db/mongoose'),
    csv = require('csvtojson'),
    bcrypt = require('bcrypt'),
    Products = mongoose.model('Products');
var fs = require('fs');
var path = require('path');


/*------------Save new Product -----*/
// exports.AddProduct = function(req,res){
//     //  console.log(req.body);
//    var db = new Products();
//    var response ={};
//    db.product_id = Record_count;
//    db.images=req.body.images;
//    db.product_type = req.body.product_type;
//    db.product_name = req.body.product_name;
//    db.product_price = req.body.product_price;
//    db.description = req.body.description;
//    db.default_qty = req.body.default_qty;
//    db.is_active = req.body.is_active;
//    db.is_deleted = req.body.is_deleted;
//    db.created_by_id = req.body.created_by_id;
//    db.created_date = req.body.created_date;
//    db.updated_by_id = req.body.updated_by_id;
//    db.updated_date = req.body.updated_date;

//    db.save(function(err,data){
//        if(err){
//         console.log(err);
//         response = { "error": true, "message": err };
//        }else{
//         response = { "error": false, "message": "Data added for ID :" + data._id ," Product Id ": data.product_id };
//        }
//        res.json(response);
//    })
// }

// exports.productList =function (req, res) {
//     var response = {error:"test mesfalse},function (err, data) {
//     //     // Mongo command to fetch all data from collection.
//     //     if (err) {
//     //         response = { "error": true, "message": err };
//     //     } else {
//     //         response = { "error": false, "message": "success" ,"data": data };
//     //     }
//         res.json(response);sage`"};
//     // Products.find({is_deleted:
//     // });
// }
exports.AddProduct = function (req, res) {
    // var id = checkexistingrecord();

    var db = new Products();
    var response = {};
    var id = 'SAW' + '_' + Math.random().toString(36).substr(2, 9);
    db.PRODUCT_ID = id;
    db.images = req.body.images;
    db.QTY = req.body.QTY;
    db.NAME = req.body.NAME;
    db.DESCRIPTION = req.body.DESCRIPTION;
    db.BRAND = req.body.BRAND;
    db.STOCKLEVEL = req.body.STOCKLEVEL;
    db.TYPE = req.body.TYPE;
    db.CATEGORY = req.body.CATEGORY;
    db.SUBCATEGORY = req.body.SUBCATEGORY;
    db.MRP = req.body.MRP;
    db.SHIPPINGCHARGES = req.body.SHIPPINGCHARGES;
    db.DISCOUNTRATE = req.body.DISCOUNTRATE;
    db.TAXRATE = req.body.TAXRATE;
    db.NETPRICE = req.body.NETPRICE;
    db.CATEGORY = req.body.CATEGORY;
    db.ISACTIVE = req.body.ISACTIVE;
    db.ISDELETED = req.body.ISDELETED;
    db.CREATED_BY_ID = req.body.CREATED_BY_ID;
    db.CREATED_BY_NAME = req.body.CREATED_BY_NAME;
    db.UPDATED_BY_ID = req.body.CREATED_BY_ID;
    var obj = {};
    obj[id] = db;
    db.save(function (err, data) {
        if (err) {
            console.log(err);
            response = { "status": false, "message": err };
        } else {
            response = { "status": true, "message": "Data added for ID :" + data._id, " Product Id ": data.PRODUCT_ID };
        }
        res.json(response);
    })
}

exports.ProductList = function (req, res) {
    Products.find({ ISDELETED: false })
        .then(products => {
            res.status(200).send({ status: true, data: products })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });


}
exports.ProductListAdmin = function (req, res) {
    Products.find()
        .then(products => {
            res.status(200).send({ status: true, data: products })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });


}
exports.getProductById = function (req, res) {
    const id = req.params.id;
    Products.findOne({ PRODUCT_ID: id }, function (err, data) {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." })

        } else {
            res.status(200).send({ status: true, data: data })


        }
    })
}

exports.getProductByCategory = function (req, res) {
    const cat = req.params.cat;

    var query=Products.find({ CATEGORY: cat });
    query.exec(function (err, products) {
        if (err){
            res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." })
        }else{
            res.status(200).send({ status: true, data: products })
 
        }
        // athletes contains an ordered list of 5 athletes who play Tennis
      })
    // Products.find({ 'TYPE': cat }, function (err, data) {
    //     if (err) {
    //         res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." })

    //     } else {
    //         res.status(200).send({ status: true, data: data })


    //     }
    // })
   
}
exports.editProductById = function (req, res) {
    const id = req.params.id;
    var myquery = { PRODUCT_ID: id };
    var newvalues = { $set: req.body };
    Products.updateOne(myquery, newvalues, function (err) {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." })

        } else {
            res.status(200).send({ status: true, message: "your product has been Edited" })


        }
    })


}
exports.deleteProduct = function (req, res) {
    var id = req.params.id;
    Products.findByIdAndRemove({ _id: id }, function (err) {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." })

        } else {
            res.status(200).send({ status: true, message: "your product has been DELETED" })


        }
    })
}



exports.CSVUpload = function (req, res) {
    // console.log(req);
    var csvFilePath = path.dirname(__filename) + '/products.csv';
    csv()
        .fromFile(csvFilePath)
        .then((data) => {
            // console.log(data);
            for (var index = 0; index < data.length; index++) {
                var id = 'SAW' + '_' + Math.random().toString(36).substr(2, 9);
                var db = new Products();
                db.PRODUCT_ID = id;
                db.images = data[index].images;
                db.NAME = data[index].NAME;
                db.DESCRIPTION = data[index].DESCRIPTION;
                db.SKU = data[index].SKU
                db.BRAND = data[index].BRAND;
                db.STOCKLEVEL = data[index].STOCKLEVEL;
                db.TYPE = data[index].TYPE;
                db.CATEGORY = data[index].CATEGORY;
                db.SUBCATEGORY = data[index].SUBCATEGORY;
                db.MRP = data[index].MRP;
                db.SHIPPINGCHARGES = checknumber(data[index].SHIPPINGCHARGES).isNumber;
                db.DISCOUNTRATE = checknumber(data[index].DISCOUNTRATE);
                db.TAXRATE = checknumber(data[index].TAXRATE);
                db.ISREDUCESTOCK = checknumber(data[index].ISREDUCESTOCK);
                db.NET_PRICE = checknumber(data[index].NET_PRICE);
                db.CATEGORY = data[index].CATEGORY;
                db.ISACTIVE = checkActive(data[index].ISACTIVE);
                db.ISDELETED = checkDeleted(data[index].ISDELETED);
                db.CREATED_BY_ID = data[index].CREATED_BY_ID;
                db.UPDATED_BY_ID = data[index].updated_by_id;

                db.save(function (err) {

                    if (err) {
                        console.log(err.message)
                    }
                    // Create a verification token for this user


                })
            }


        })

}

function checkActive(flag) {
    if (flag == "1") {
        return true;
    } else {
        return false;
    }

}
function checkDeleted(flag) {
    if (flag == "1") {
        return true;
    } else {
        return false;
    }

}
function checknumber(number) {
    var temp = parseInt(number);
    if (temp.isNumber) {
        return temp;
    } else {
        return 0;
    }
}

function checkexistingrecord() {
    var id = 'SAW' + '_' + Math.random().toString(36).substr(2, 9);
    Products.findOne({ PRODUCT_ID: id }, function (err, product) {
        if (product) {
            checkexistingrecord();
        } else {
            return id;
        }


    })
}

