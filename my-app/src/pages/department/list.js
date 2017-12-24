import React,{Component} from 'react';
import {Table} from 'antd'
export default class  extends Component{
    constructor(props){
        super(props);
        this.state = {
            tb_data:[]
        };
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
    render(){
        return <div style={{padding:'20px'}}>
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