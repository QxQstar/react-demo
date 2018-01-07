import React,{Component} from 'react';
import Layout from './../../components/layout.js';
import DeptTree from './deptTree.js'
import RightList from './list.js';
import './index.css'
import {message} from "antd/lib/index";
export default class  extends Component{
    constructor(props){
        super(props);
        this.state = {
            dept_id:0,
            staff:[],
            leader_member_name:''
        };
        this.selectDept = this.selectDept.bind(this);
        this.getDeptLeader = this.getDeptLeader.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }
    selectDept(dept_id){
        this.fetchData(dept_id);
        this.getDeptLeader(dept_id);
    }
    fetchData(dept_id=this.state.dept_id){
        this.$http.post('/staff/list',{
            department_id:dept_id * 1?dept_id * 1:undefined
        }).then(res => {
            const resData = res.data || {};
            if(resData.code +'' === '0'){
                const data = (resData.data || []).map(data => ({...data,key:data.member_id}));
                this.setState({
                    staff:data,
                    dept_id
                });
            }
        })
    }
    // 获取部门负责人
    getDeptLeader(dept_id=this.state.dept_id){
        if(dept_id * 1){
            this.$http.post('/dept/list',{
                department_id:dept_id * 1
            }).then((res) => {
                const resData = res.data || {};
                if (resData.code + '' === '0'){
                    this.setState({
                        leader_member_name:(resData.data[0] || {}).leader_member_name
                    })
                } else {
                    message.error('获取部门负责人失败');
                }
            })
        } else {
            this.setState({
                leader_member_name:''
            })
        }
    }
    componentDidMount(){
        this.fetchData(this.state.dept_id);
        this.getDeptLeader(this.state.dept_id);
    }
    render(){
        return <Layout left={<DeptTree selected_id={this.state.dept_id} selectDept={this.selectDept}/>} type='2' right={<RightList updateList={this.fetchData} getDeptLeader={this.getDeptLeader} dept_leader={this.state.leader_member_name} tb_data={this.state.staff} dept_id={this.state.dept_id}/>} />
    }
}