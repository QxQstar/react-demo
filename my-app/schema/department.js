var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 部门Schema
const deptSchema = new Schema({
  department_name:String,
  department_id:{
    type:Number,
    unique:true
  },
  department_pid:{
    type:Number,
    default:0
  }
 });
module.exports = deptSchema;