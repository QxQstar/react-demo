import React,{Component} from 'react';
import {Table,Button,message} from 'antd';
import SelectLeader from './../../components/g-selectData.js';
import {updateDept} from './../../global/initBaseData.js';
export default class  extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false
        };
        this.onChangeTree = this.onChangeTree.bind(this);
        this.onOk = this.onOk.bind(this);
        this.columns = [
            {
                title:'姓名',
                key:'member_name',
                dataIndex:'member_name',
                width:400
            },
            {
                title:'部门',
                key:'department_name',
                dataIndex:'department_name',
                width:300
            },
            {
                title:'工号',
                key:'work_num',
                dataIndex:'work_num',
                width:300
            }
        ]
    }
    onChangeTree(flag){
        this.setState({
            visible:flag
        });
    }
    // 修改部门负责人
    onOk(leader){
        this.$http.post('/dept/edit',{
            department_id:this.props.dept_id,
            leader_member_name:(leader[0]||{}).member_name || '',
            leader_member_id:(leader[0] || {}).member_id||0
        }).then(res => {
            const resData = res.data || {};
            if(resData.code + '' === '0'){
                message.success('修改部门负责人成功');
                this.props.getDeptLeader();
                updateDept.bind(this)();
            } else {
                message.error('修改部门负责人失败');
            }
        })
    }
    render(){
        return <div style={{padding:'0 20px'}} className='m-dept-member'>
            {this.props.dept_id * 1?<div className='g-header'>
                <span>部门负责人:</span>
                {this.props.dept_leader}
                <Button className="primary opt-leader" onClick={() => {this.onChangeTree(true)}}>{!this.props.dept_leader?'选择部门负责人':'修改部门负责人'}</Button>
                {this.state.visible?<SelectLeader type='staff' maxNum={1} visible={this.state.visible} onChangeTree={this.onChangeTree} onOk={this.onOk}/>:null}
            </div>:null}
            <Table dataSource={this.props.tb_data} columns={this.columns} bordered={true} pagination={false}/>
        </div>
    }

    componentDidMount(){

    }
}