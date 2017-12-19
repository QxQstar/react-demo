import React ,{Component} from 'react';
import {Button,Table,message} from 'antd'
import EditMenber from './editMenber.js'
export default class  extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:'list',
            tb_data:[]
        };
        this.changeState= this.changeState.bind(this);
        this.handle = this.handle.bind(this);
        this.columns = [
            {
                title:'姓名',
                key:'member_name',
                dataIndex:'member_name'
            },
            {
                title:'部门',
                key:'department_name',
                dataIndex:'department_name'
            },
            {
                title:'工号',
                key:'work_num',
                dataIndex:'work_num'
            },
            {
                title:'操作',
                key:'action',
                render:(text,record) => {
                    return (
                        <div>
                            <Button type="primary" onClick={this.handle('edit',record)}>编辑</Button>
                            <Button onClick={this.handle('del',record)}>删除</Button>
                        </div>
                    )
                }
            }
        ]
    }
    handle(type,data={}){
        if(type !== 'del'){

        } else {
            this.changeState('edit');
        }
    }
    changeState(status){
        this.setState({
            status
        })
    }
    fetchData(){
        this.$http.get('/staff/list').then((res) => {
            const resData = res.data || {};
            if(resData.code + '' === '0'){
                this.setState({
                    tb_data:resData.data || []
                })
            } else {
                message.error('获取员工列表失败')
            }
        })
    }
    render(){
        return (
            <div className='m-members'>
                {this.state.status === 'list'?<div className='m-list'>
                    <div className='g-header'>
                        <Button type="primary" onClick={this.handle('add')}>新增员工</Button>
                    </div>
                    <Table columns={this.columns} dataSource={this.state.tb_data}/>
                </div>:null}
            </div>
        )
    }
    componentDidMount(){
        this.fetchData();
    }
}