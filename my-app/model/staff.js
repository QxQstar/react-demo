var mongoose = require('mongoose');
var staffSchma = require('./../schema/staff.js');
const staffModel = mongoose.model('Staff',staffSchma);
module.exports =  staffModel;