import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Select} from 'antd';
const Option = Select.Option;
class DeptOption extends Component {
    render(){
        return <Select style={{ width: 300 }} dropdownClassName={'filterOpt'} className='g-filter-depts' onChange={this.props.onChange}>
            {this.props.depts.map(dept => {
                return <Option key={JSON.stringify({department_id:dept.department_id,department_name:dept.department_name})}>
                    <span style={{paddingLeft:dept.level * 15 + 'px'}} className='name'>{dept.department_name}</span>
                </Option>
            })}
        </Select>
    }
}
function getOrderDepts(depts) {
    const orderDept = [];
    function fn(pid,level=0) {
        const i = level;
        depts.forEach(dep => {
            if(dep.department_pid * 1 === pid * 1){
                orderDept.push({...dep,level:i});
                if(depts.find(subDep => subDep.department_pid * 1 === dep.department_id)){
                    fn(dep.department_id,level+1);
                }
            }
        })
    }
    fn(0,0);
    return orderDept;
}
export  default connect((state) => {
    return {
        depts:getOrderDepts(state.baseData.dept)
    }
})(DeptOption);