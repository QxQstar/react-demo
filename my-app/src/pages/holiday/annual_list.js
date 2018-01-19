import React,{Component} from 'react';
import {Button} from 'antd'
import GSearch from "../../components/g-search.js";
import List from './container/annualList.js';
import EditModel from './container/editModel.js';
import DelAnn from './container/popTip.js';
import {message} from "antd/lib/index";
export default class extends Component{
    constructor(props){
        super(props);
        this.state = {
            keyword:'',
            editPop:false,
            editData:'',
            delPop:false
        };
        this.search = this.search.bind(this);
        this.editAnn = this.editAnn.bind(this);
        this.verifyFrom = this.verifyFrom.bind(this);
        this.onClose = this.onClose.bind(this);
        this.cols = [
            {
                title:'姓名',
                key:'member_name'
            },
            {
                title:'部门',
                key:'department_name',
                width:200,
            },
            {
                title:'工号',
                key:'work_num',
                width:100,
            },
            {
                title:'年假总额(小时)',
                key:'all_time',
                width:150,
            },
            {
                title:'剩余年假(小时)',
                key:'remove_time',
                width:150,
            },
            {
                title:'操作',
                type:'action',
                width:150,
                render:(item) => {
                    return <div>
                        <span className="action" onClick={() => this.editAnn('编辑年假','edit_ann',item)}>编辑</span>
                        <span className="action" onClick={() => this.delHandle(item)}>删除</span>
                    </div>
                }
            }
        ];
        this.editType = '';
        this.editModelTitle = '';
    }
    search(value){
        this.setState({
            keyword:value
        })
    }
    onClose(){
        this.setState({
            editPop:false,
            delPop:false
        });
    }
    delHandle(data){
        this.setState({
            delPop:true
        });
        this.delData = data;
    }
    editAnn(title,type,data={member_name:'',department_name:'',remove_time:'',all_time:'',work_num:''}){
        this.editModelTitle = title;
        this.editType = type;
        this.setState({
            editPop:true,
            editData:data
        })
    }
    trim(value){
        return (value + '').replace(/\s/g,'');
    }
    verifyFrom(){
        if(this.trim(this.state.editData.member_name).length <= 0){
            message.warning('请输入姓名');
            return false;
        } else if(this.trim(this.state.editData.department_name).length <= 0){
            message.warning('请输入部门');
            return false;
        } else if(this.trim(this.state.editData.all_time).length <= 0){
            message.warning('请输入年假总额');
            return false;
        } else if(this.trim(this.state.editData.remove_time).length <= 0){
            message.warning('请输入剩余年假时间');
            return false;
        } else if(this.trim(this.state.editData.remove_time) * 1  > this.trim(this.state.editData.all_time) * 1){
            message.warning('剩余年假时间不能大于年假总额');
            return false;
        }
        else {
            return true;
        }
    }
    handleFromChange(filed,value,type='text',decimal=0){
        if(type==='num' && decimal===0){
            value = value.replace(/[^\d]/g,'')
        }
        if(type === 'num' && decimal > 0){
            value = value.replace(/^\./,'');
            value = value.replace(/[^\d\.]/g,'');
            const valueArr = value.split('.');
            if(valueArr[1] != undefined){
                value = valueArr[0] +'.'+  valueArr[1].slice(0,decimal);
            } else {
                value = valueArr[0]
            }

        }
        this.setState(function (prevS) {
            return {
                editData:{...prevS.editData,...{[filed]:value}}
            }
        });
    }
    // 表单
    renderFrom(){
        return <table className="g-from">
            <tbody>
            <tr>
                <td className="in-h">
                    姓名<span className="in-star">*</span></td>
                <td>
                    {this.editType === 'add_ann'?<input type="text" value={this.state.editData.member_name} onChange={(event) => this.handleFromChange('member_name',event.target.value)} className="input"/>:this.state.editData.member_name}
                </td>
            </tr>
            <tr>
                <td className="in-h">
                    部门<span className="in-star">*</span>
                </td>
                <td>
                    {this.editType === 'add_ann'?<input type="text" value={this.state.editData.department_name} onChange={(event) => this.handleFromChange('department_name',event.target.value)} className="input"/> :this.state.editData.department_name}
                </td>
            </tr>
            <tr>
                <td className="in-h">工号</td>
                <td>
                    {this.editType === 'add_ann'?<input type="text" value={this.state.editData.work_num} onChange={(event) => this.handleFromChange('work_num',event.target.value,'num')} className="input"/>:this.state.editData.work_num}
                </td>
            </tr>
            <tr>
                <td className="in-h">
                    年假总额<span className="in-star">*</span></td>
                <td>
                    <input type="text" value={this.state.editData.all_time} onChange={(event) => this.handleFromChange('all_time',event.target.value,'num',1)} className="input"/>(小时)
                </td>
            </tr>
            <tr>
                <td className="in-h">
                    剩余年假时间<span className="in-star">*</span></td>
                <td>
                    <input type="text" value={this.state.editData.remove_time} onChange={(event) => this.handleFromChange('remove_time',event.target.value,'num',1)} className="input"/>(小时)
                </td>
            </tr>
            </tbody>
        </table>
    }
    render(){
        return (
            <div>
                <div className="g-header">
                    <GSearch placeholder='姓名/工号' search={this.search}/>
                    <Button type='primary' className='f-fr' onClick={() => this.editAnn('新增年假','add_ann')}>新增年假</Button>
                </div>
                <List cols={this.cols} title='年假时间' keyword={this.state.keyword}/>
                {this.state.editPop ?<EditModel render={() => this.renderFrom()} verifyFrom={this.verifyFrom} onClose={this.onClose} title={this.editModelTitle} type={this.editType} data={this.state.editData}/>:null}
                {this.state.delPop?<DelAnn type='del_ann' title='删除年假' onClose={this.onClose} dispatch='del_ann' data={this.delData}/>:null}
            </div>
        )
    }
}