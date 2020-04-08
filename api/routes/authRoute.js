'use strict'
module.exports = function (app) {

    // handler files
    var userHandler = require('../controllers/userController.js');
    var productHandler = require('../controllers/productController.js');



    // route files
    app.route('/auth/regitser')
        .post(userHandler.sign_up);

    app.route('/auth/sign_in')
        .post(userHandler.sign_in);
    app.route('/confirmation')
        .post(userHandler.confirmation)

    // route files
    app.route('/product/list')
        .get(productHandler.productList);

    // app.route('/product/:id')
    //    .get(userHandler.register);
    app.route('/product/add')
        .post(productHandler.AddProduct);
    app.route('/csvUpload')
        .post(productHandler.CSVUpload)
}