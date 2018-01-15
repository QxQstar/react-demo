var DeptModel = require('./../model/department.js');
exports.deptList =  function (req, res) {
    const department_id = req.body.department_id;
    let param = {};
    if(department_id){
        param = {
            department_id:department_id
        };
    }
  DeptModel
    .find(param)
    .exec(function (err, depts) {
      if(err){
        res.status(err.status).json({code:122,msg:'部门列表获取失败'});
      } else{
        res.json({data:depts,code:0,msg:'部门列表获取成功'});
      }
    });
};
exports.addDept = function (req, res) {
  const reqBody = req.body;
  if(!reqBody.department_name){
    res.status(200).send('缺少部门名称，添加失败').end();
  }
    const MS = new Date().getTime();
    const uid = (MS + '').slice(-3) * 1 + (Math.random() * (MS + '').slice(0,3) + '').replace('.','') * 1;
  // 获得现在存在的部门数
          const dept = new DeptModel({
              department_name:reqBody.department_name,
              department_pid:reqBody.department_pid,
              department_id:uid
          });
          dept.save(function (err) {
              if(!err){
                  res.status(200).send({code:0,msg:'部门添加成功'}).end();
              }
              else{
                  res.status(200).send({code:111,msg:'部门添加成功'}).end();
              }
          });
};
exports.editDept = function (req, res) {
    const resBody = req.body;
    if(!resBody.department_id){
        res.status(200).send({code:123,msg:'缺少部门id，编辑失败'}).end();
    }
    let updateParm = {};
    if(resBody.department_name !== undefined){
        updateParm.department_name = resBody.department_name;
    }
    if(resBody.leader_member_name !== undefined){
        updateParm.leader_member_name = resBody.leader_member_name;
    }
    if(resBody.leader_member_id !== undefined){
        updateParm.leader_member_id = resBody.leader_member_id;
    }
    DeptModel.findOneAndUpdate({
        department_id:resBody.department_id
    },updateParm,{new:false},function (err,result) {
      if(!err){
        res.status(200).send({code:0,msg:'部门编辑成功',data:result}).end();
      }else{
        res.status(200).send({code:125,msg:err+'部门编辑失败'}).end()
      }
    })
};
exports.delDept = function (req, res) {
  const resBody = req.body;
  if(!resBody.department_id){
    res.status(200).send({code:123,msg:'缺少部门id，删除失败'}).end();
  }
  DeptModel.remove({
    department_id:resBody.department_id
  },function (err) {
    if(err){
      res.status(200).send({code:124,msg:err+'删除部门失败'}).end();
    } else {
      res.status(200).send({code:0,msg:'删除部门成功'}).end();
    }
  });
}