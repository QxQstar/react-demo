var dept = require('./../controller/dept.js');
var staff = require('./../controller/staff.js');
module.exports = function (app) {

  app.get('/staff/list',staff.staffList);
  app.post('/staff/add',staff.addStaff);
  app.post('/staff/del',staff.delStaff);

  app.get('/dept/list',dept.deptList);
  app.post('/dept/add',dept.addDept);
  app.post('/dept/del',dept.delDept);
};