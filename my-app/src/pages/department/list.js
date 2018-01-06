import React,{Component} from 'react';
import {Table,Button} from 'antd';
import SelectLeader from './../../components/g-selectData.js';
export default class  extends Component{
    constructor(props){
        super(props);
        this.state = {
            tb_data:[],
            dept_leader:'',
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
    onOk(){}
    render(){
        return <div style={{padding:'0 20px'}} className='m-dept-member'>
            {this.props.dept_id * 1?<div className='g-header'>
                <span>部门负责人:</span>
                {this.state.dept_leader}
                <Button className="primary opt-leader" onClick={() => {this.onChangeTree(true)}}>{!this.state.dept_leader?'选择部门负责人':'修改部门负责人'}</Button>
                <SelectLeader type='staff' maxNum={1} visible={this.state.visible} onChangeTree={this.onChangeTree} onOk={this.onOk}/>
            </div>:null}
            <Table dataSource={this.state.tb_data} columns={this.columns} bordered={true} pagination={false}/>
        </div>
    }
    fetchData(){
      this.$http.post('/staff/list',{
          department_id:this.props.dept_id * 1?this.props.dept_id * 1:undefined
      }).then(res => {
        const resData = res.data || {};
        if(resData.code +'' === '0'){
            const data = (resData.data || []).map(data => ({...data,key:data.member_id}));
            this.setState({
                tb_data:data
            })
        }
      })
    }
    componentDidMount(){
        this.fetchData();
    }
    componentDidUpdate(){
        this.fetchData()
    }
}