var StaffModel = require('./../model/staff.js');
// 获取职员列表
exports.staffList = function (req, res) {
  StaffModel
    .find()
    .exec(function (err, staffs) {
      if(err){
        res.status(err.status).end();
      } else {
        res.json({code :0,data:staffs});
      }
    });
}
// 添加职员
exports.addStaff =  function (req, res) {
  const reqBody = req.body;
  if(!reqBody.member_name){
    res.status(1230).send('缺少员工姓名，添加失败').end();
  }
  if(!reqBody.department_name){
    res.status(1231).send('缺少部门名称，添加失败').end();
  }
  if(!reqBody.department_id){
    res.status(1232).send('缺少部门id，添加失败').end();
  }
  const staff = new StaffModel({
    member_name:reqBody.member_name,
    department_name:reqBody.department_name,
    department_id:reqBody.department_id
  });
  staff.save(function (err) {
    if(!err){
      res.statusCode(200).send('员工添加成功').end();
    }
    else{
      res.status(1233).send('员工添加失败').end();
    }
  });
};
// 删除员工
exports.delStaff =  function (req, res) {
  const resBody = req.body;
  if(!resBody.member_id){
    res.status(1331).send('缺少员工id，删除失败').end();
  }
  StaffModel.remove({
    member_id:resBody.member_id
  },function (err) {
    if(!err){
      res.status(1332).send('删除职员失败').end();
    } else {
      res.statusCode(200).send('删除职员成功').end();
    }
  });
}