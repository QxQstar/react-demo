var StaffModel = require('./../model/staff.js');
// 获取职员列表
exports.staffList = function (req, res) {
    const dept_id = req.body.department_id;
    let param = {};
    if(dept_id){
        param = {
            department_id:dept_id
        };
    }
  StaffModel
    .find(param)
    .populate('Department','department_name')
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
    res.status(200).send({code:124,msg:'缺少员工姓名'}).end();
  }
  if(!reqBody.department_id){
    res.status(200).send({code:125,msg:'缺少部门id'}).end();
  }
  const MS = new Date().getTime();
  const uid = (MS + '').slice(-3) * 1 + (Math.random() * (MS + '').slice(0,3) + '').replace('.','') * 1;
      const staff = new StaffModel({
          member_name:reqBody.member_name,
          work_num:reqBody.work_num,
          department_id:reqBody.department_id,
          member_id:uid,
          department_name:reqBody.department_name
      });
      staff.save(function (err) {
          if(!err){
              res.status(200).send({code:0,msg:'员工添加成功'}).end();
          }
          else{
              res.status(200).send({code:125,msg:'员工添加失败'}).end();
          }
      });

};
// 删除员工
exports.delStaff =  function (req, res) {
  const resBody = req.body;
  if(!resBody.member_id){
    res.status(200).send({msg:'缺少员工id',code:134}).end();
  }
  StaffModel.remove({
    member_id:resBody.member_id
  },function (err) {
    if(err){
      res.status(200).send({code:126,msg:'删除职员失败'}).end();
    } else {
      res.status(200).send({code:0,msg:'删除职员成功'}).end();
    }
  });
};
// 编辑员工
exports.editStaff = function (req, res) {
  const reqBody = req.body;
  if(!reqBody.member_id){
    res.status(200).send({code:123,msg:'缺少员工id'}).end();
  }
  StaffModel.findOneAndUpdate({member_id:reqBody.member_id},{
    member_name:reqBody.member_name,
    department_id:reqBody.department_id,
    work_num:reqBody.work_num,
      department_name:reqBody.department_name
  },{new:false},function (err, result) {
      if(!err){
        res.status(200).send({code:0,data:result}).end();
      } else {
        res.status(200).send({code:124,msg:'部门编辑失败'}).end();
      }
  })
};