
var mongoose = require('mongoose');
const config = require('../config/config.js')();

mongoose.Promise = global.Promise;
mongoose.set('debug',true);
// mongoose.connect('mongodb://localhost:27017/Sawjidb');
mongoose.connect(config.db);
// mongoose.connect('mongodb://superAdmin:admin123@3.17.141.18:27017/admin?authSource=admin');
// mongoose.connect('mongodb+srv://admin:admin@cluster0-zfrfj.gcp.mongodb.net/test?retryWrites=true');
module.exports = {mongoose};

