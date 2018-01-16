import React ,{Component} from 'react';
import {Button,message,Modal} from 'antd'
import EditMember from './editMenber.js'
import Layout from './../../components/layout.js';
import {updateStaff} from './../../global/initBaseData.js';
import './index.css';
import ListMember from './listMember.js';
export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:'list',
            tb_data:[],
            delModel:false
        };
        this.changeState= this.changeState.bind(this);
        this.handle = this.handle.bind(this);
        this.del = this.del.bind(this);
        this.columns = [
            {
                title:'姓名',
                key:'member_name',
                dataIndex:'member_name',
                width:200
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
                render:(record) => {
                    return (
                        <div>
                            <span className="action" onClick={() => this.handle('edit',record)}>编辑</span>
                            <span className="action" style={{marginLeft:'10px'}} onClick={() => this.handle('del',record)}>删除</span>
                        </div>
                    )
                }
            }
        ]
    }
    handle(type,data={}){
        this.rowData = data;
        if(type !== 'del'){
            this.changeState('edit');
        } else {
            this.setState({
                delModel:true
            })
        }
    }
    updateList(){
        updateStaff.bind(this)();
    }
    del(){
        this.$http.post('/staff/del',{
            member_id:this.rowData.member_id
        }).then(res => {
            const resData = res.data || {};
            if(resData.code + '' === '0'){
                message.success('员工删除成功');
                this.setState({
                    delModel:false
                });
                this.updateList();
            } else {
                message.error('员工删除失败');
            }
        })
    }
    changeState(status,update){
        this.setState({
            status
        });
        update && this.updateList();
    }
    render(){
        return (
            <Layout type={1}>
                <div className='m-members' >
                    {this.state.status === 'list'?<div className='m-list'>
                        <div className='g-header'>
                            <Button type="primary" onClick={() => this.handle('add')}>新增员工</Button>
                        </div>
                        <ListMember columns={this.columns}/>
                    </div>:null}
                    {this.state.status ==='edit'?<EditMember meberMsg={this.rowData} changeState={this.changeState}/>:null}
                    {this.state.delModel?<Modal wrapClassName='g-popup-sure' closable={false} title='删除员工' onOk={this.del} onCancel={() => this.setState({delModel:false})} visible={true}>
                        <p className="info">确定删除该员工，删除之后数据将无法恢复？</p>
                    </Modal>:null}
                </div>
            </Layout>
        )
    }
}