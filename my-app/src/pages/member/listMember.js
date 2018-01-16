import React,{Component} from 'react';
import {connect} from 'react-redux';
import Table from './../../components/g-list.js'

class List extends Component{
    render(){
        const {columns,tb_data} = this.props;
        return <Table cols={columns} data={tb_data} offset={55} title='员工管理'/>
    }
}
export default connect((state) => {
    return {
        tb_data:(function(staff){
            return staff.map(data => ({...data,key:data.member_id}))
        })(state.baseData.staff)
    }
})(List);