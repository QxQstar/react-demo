var DeptModel = require('./../model/department.js');
exports.deptList =  function (req, res) {
  DeptModel
    .find()
    .exec(function (err, depts) {
      if(err){
        res.status(err.status).status('获取部门列表失败').end();
      } else{
        res.json(depts);
      }
    });
}
exports.addDept = function (req, res) {
  const reqBody = req.body;
  if(!reqBody.department_name){
    res.status(1231).send('缺少部门名称，添加失败').end();
  }
  const dept = new DeptModel({
    department_name:reqBody.department_name,
    department_pid:reqBody.department_pid
  });
  dept.save(function (err) {
    if(!err){
      res.statusCode(200).send('部门添加成功').end();
    }
    else{
      res.status(1233).send('部门添加失败').end();
    }
  });
};
exports.delDept = function (req, res) {
  const resBody = req.body;
  if(!resBody.department_id){
    res.status(1331).send('缺少部门id，删除失败').end();
  }
  DeptModel.remove({
    department_id:resBody.department_id
  },function (err) {
    if(!err){
      res.status(1332).send('删除部门失败').end();
    } else {
      res.statusCode(200).send('删除部门成功').end();
    }
  });
}