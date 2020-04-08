'use strict';
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;
const validator = require('validator');


var ProductsSchema= new mongoose.Schema({
    "AUTHOR": { type: String },
    "SKU":"",
    "BRAND":{ type: String },
    "CATEGORY": { type: String },
    "COLOR": { type: String },
    "DESCRIPTION": { type: String },
    "DISCOUNTRATE": { type: Number},
    "FLOUR": { type: Boolean, default: false },
    "GRIHASTHI":{ type: Boolean, default: false },
    "ISACTIVE": { type: Boolean, default: true },
    "ISDELETED": { type: Boolean, default: false },
    "ISREDUCESTOCK": { type: Number,default:0},
    "QTY":{ type: Number,default:0},
    "MRP": "",
    "NAME":  { type: String },
    "OIL":  { type: Boolean, default: false },
    "PUBLISHER":  { type: String },
    "PULSE": { type: Boolean, default: false },
    "RICE": { type: Boolean, default: false },
    "SHIPPINGCHARGES":  { type: Number},
    "SKU": { type: String },
    "STOCKLEVEL":  { type: Number},
    "STYLE":  { type: String },
    "SUBCATEGORY":{ type: String },
    "TAXRATE":  { type: Number},
    "NETPRICE":{ type: Number},
    "TYPE": { type: String },
    "PRODUCT_ID": { type: String },
    "images": [],
    "CREATED_BY_ID": { type: String },
    "CREATED_DATE": { type: Date, default: Date.now },
    "UPDATED_BY_ID": { type: String },
    "UPDATED_DATE": { type: Date, default: Date.now }
})
mongoose.model('Products',ProductsSchema);