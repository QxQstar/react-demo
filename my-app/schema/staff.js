var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 公司职员Schema
const staffSchema = new Schema({
  member_name:String,
  member_id:{
    type:Schema.Types.ObjectId
  },
  department_name:String,
  department_id:Schema.Types.ObjectId,
  mobile:Number
});
module.exports =  staffSchema;