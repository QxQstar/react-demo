var dept = require('./../controller/dept.js');
var staff = require('./../controller/staff.js');
module.exports = function (app) {

  app.post('/staff/list',staff.staffList);
  app.post('/staff/add',staff.addStaff);
  app.post('/staff/del',staff.delStaff);
  app.post('/staff/edit',staff.editStaff)

  app.post('/dept/list',dept.deptList);
  app.post('/dept/add',dept.addDept);
  app.post('/dept/del',dept.delDept);
  app.post('/dept/edit',dept.editDept);
};