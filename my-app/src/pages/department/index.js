import React,{Component} from 'react';
import Layout from './../../components/layout.js';
import DeptTree from './deptTree.js'
import RightList from './list.js';
import './index.css'
export default class  extends Component{
    constructor(props){
        super(props);
        this.state = {
            dept_id:0,
            staff:[],
            leader_member_name:''
        };
        this.selectDept = this.selectDept.bind(this);
    }
    selectDept(dept_id){
        this.setState({
            dept_id:dept_id * 1
        });
    }
    render(){
        return <Layout left={<DeptTree selected_id={this.state.dept_id} selectDept={this.selectDept}/>} type='2' right={<RightList tb_data={this.state.staff} dept_id={this.state.dept_id}/>} />
    }
}