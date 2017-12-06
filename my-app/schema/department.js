var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 部门Schema
const deptSchema = new Schema({
  department_name:String,
  department_id:Schema.Types.ObjectId,
  department_pid:{
    type:Schema.Types.ObjectId,
    default:0
  }
 });
module.exports = deptSchema;