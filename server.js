'use strict';

// require('./server/config/config');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 8000,
    csvFilePath = './products.csv',
    csv = require('csvtojson'),
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'),
    Products = require('./api/models/productModel'),
    Admin = require('./api/models/adminModel'),
    Token = require('./api/models/tokeModal'),
    Categories = require('./api/models/categoriesModel'),
    Orders = require('./api/models/orderModel'),
    Otp=require('./api/models/otp'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    jsonwebToken = require('jsonwebtoken');
var userHandler = require('./api/controllers/userController.js');
var productHandler = require('./api/controllers/productController.js');
var payHandler = require('./api/controllers/paymentController.js');
var categoryHandler = require('./api/controllers/categoryController.js');
var orderHandler = require ('./api/controllers/orderController.js');
var env = process.env.NODE_ENV || 'staging';
var config = require('./server/config/config.js')[env];
const Multipart = require('multi-part');



// app config 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.multipart());
app.use(cors());
// app.use(Multipart());

// app.use(function (req, res, next) {
//     if (req.headers && req.headers.authorization && req.headers.authorization.split('')[0] == 'jwt') {
//         jsonwebToken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
//             if (err) req.user = undefined;
//             req.user = decode;
            
//         });
//     } else {
//         req.user = undefined;
      
//     }
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     // next();
// });






// route files
app.route('/auth/register')
    .post(userHandler.sign_up);
app.route('/auth/sign_in')
    .post(userHandler.sign_in);
app.route('/auth/confirmation')
    .post(userHandler.confirmationPost);
app.route('/auth/resend')
    .post(userHandler.resend);
app.route('/auth/sendOTP')
    .post(userHandler.sendVerificationCode);
app.route('/auth/verifyOTP')
    .post(userHandler.VerifyOTP);
app.route('/auth/editProfile/:id')
    .put(userHandler.editClientProfile);
app.route('/auth/getallUsers')
     .get(userHandler.getAllusers);
// payment gateway api

app.route('/createHash')
    .post(payHandler.createHash);
app.route('/PaymentStatus')
    .post(payHandler.PaymentStatus);


//admin login
app.route('/auth/admin/regitser')
    .post(userHandler.adminSignup);
app.route('/auth/admin/sign_in')
    .post(userHandler.adminSignin);



// route files
app.route('/product')
    .post(productHandler.AddProduct);
app.route('/product/csvupload')
    .get(productHandler.CSVUpload);
app.route('/addcategories')
    .post(categoryHandler.createCategories);
app.route('/categoryList')
    .get(categoryHandler.categoryList);
app.route('/category/:id')
    .get(categoryHandler.getCategoryById);
app.route('/category/update/:id')
    .put(categoryHandler.editCategoryById);
app.route('/category/remove/:id')
    .get(categoryHandler.delteCategory);

app.route('/productlist')
    .get(productHandler.ProductList);
app.route('/product/:cat')
    .get(productHandler.getProductByCategory);
app.route('/productlist/admin')
    .get(productHandler.ProductListAdmin);
app.route('/product/:id')
    .get(productHandler.getProductById);
app.route('/placeorder')
   .post(orderHandler.placeorder);
app.route('/orderlist')
    .get(orderHandler.getAllorders);
app.route('/order/:id')
    .get(orderHandler.getOrderByClientId);
app.route('/order/remove/:id')
    .put(orderHandler.deleteOrderById);
app.route('/order/update/:id')
    .put(orderHandler.editOrderById);
app.route('/product/remove/:id')
    .get(productHandler.deleteProduct);
app.route('/product/update/:id')
    .put(productHandler.editProductById);

// app.route('/product/addCategories')
//     .post(categoryHandler.createCategories)

// app.route('/product/:id')
//    .get(userHandler.register);


app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});


var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
});

console.log('todo list RESTful API server started on: ' + port);

module.exports = app;