var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 公司职员Schema
const staffSchema = new Schema({
  member_name:String,
  member_id:{
    type:Number
  },
  department_id:Number,
  work_num:[String,Number],
  department_name:String
});
module.exports =  staffSchema;