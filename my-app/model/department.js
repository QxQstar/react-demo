var mongoose = require('mongoose');
var deptSchma = require('./../schema/department.js');
const deptModel = mongoose.model('Department',deptSchma);
module.exports = deptModel;
