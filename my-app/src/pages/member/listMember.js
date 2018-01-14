import React,{Component} from 'react';
import {connect} from 'react-redux';
import getHeight from './../../global/fixHeight.js';
import {Table} from 'antd';
const height = getHeight({offset:120});

class List extends Component{
    render(){
        const {columns,tb_data} = this.props;
        return <Table scroll={{ x: true, y: height }} bordered={true} columns={columns} dataSource={tb_data} pagination={false}/>
    }
}
export default connect((state,props) => {
    return {
        tb_data:(function(staff){
            return staff.map(data => ({...data,key:data.member_id}))
        })(state.baseData.staff)
    }
})(List);