import React,{Component} from 'react';
import {Table,Button,message,Modal} from 'antd';
import SelectLeader from './../../components/g-selectData.js';
import {updateDept,updateStaff} from './../../global/initBaseData.js';
import FilterDept from './../../components/g-filter-dept.js';
import {connect} from 'react-redux';
 class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            changeDept:false
        };
        this.onChangeTree = this.onChangeTree.bind(this);
        this.onOk = this.onOk.bind(this);
        this.action = this.action.bind(this);
        this.onChange = this.onChange.bind(this);
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
            },
            {
                title:'操作',
                key:'action',
                render:(text,record) => {
                    return (
                        <div>
                            <span className='action' onClick={() => this.handle(record)}>修改部门</span>
                        </div>
                    )
                }
            }
        ]
    }
    onChangeTree(flag){
        this.setState({
            visible:flag
        });
    }
    // 修改部门
    handle(member){
        this.member = member;
        this.setState({
            changeDept:true
        })
    }
    action(){
        this.$http.post('/staff/edit',{
            ...this.member,
            ...this.optDept
        }).then(res => {
            const resData = res.data || {};
            if(resData.code + '' === '0'){
                message.success('修改员工部门成功');
                this.setState({
                    changeDept:false
                });
                updateStaff.bind(this)();
            } else {
                message.error('修改员工部门失败');
            }
        });
    }
    onChange(data){
        this.optDept = JSON.parse(data);
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
            <Table className='tab-list' dataSource={this.props.tb_data} columns={this.columns} bordered={true} pagination={false}/>
            {this.state.changeDept?
                <Modal onOk={this.action} onCancel={() => {this.setState({changeDept:false})}} width={470} visible={true} title={'修改部门'} closable={true}>
                    <table className='g-from'>
                        <tbody>
                            <tr>
                                <td className='in-h' width="100">姓名</td>
                                <td>{this.member.member_name}</td>
                            </tr>
                            <tr>
                                <td className='in-h'>部门</td>
                                <td>{this.member.department_name}</td>
                            </tr>
                            <tr>
                                <td className='in-h'>新部门</td>
                                <td>
                                    <FilterDept onChange={this.onChange}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal>
            :null}
        </div>
    }
}
export default connect((state,props) => {
    return {
        tb_data:((staffs) => {
            const resultStaff = [];
            staffs.forEach(staff => {
                if(!props.dept_id){
                    resultStaff.push({...staff,key:staff.member_id});
                } else if(staff.department_id * 1 === props.dept_id * 1){
                    resultStaff.push({...staff,key:staff.member_id});
                }
            });
            return resultStaff;
        })(state.baseData.staff),
        dept_leader:(depts => {
            const curDept = depts.find(dept => {
                return dept.department_id * 1 === props.dept_id * 1;
            });
            return (curDept || {}).leader_member_name;
        })(state.baseData.dept)
    }
})(List);