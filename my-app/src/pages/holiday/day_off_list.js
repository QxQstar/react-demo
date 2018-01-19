import React,{Component} from 'react'
import GSearch from './../../components/g-search.js'
import {Button,message} from 'antd'
import List from './container/dayOffList.js'
import PopTip from './container/popTip.js'
import EditModel from './container/editModel.js'
export default class  extends Component{
    constructor(props){
        super(props);
        this.state={
            keyword:'',
            showPopTip:false,
            showEditModel:false,
            editModelData:''
        };
        this.popTipTitle='';
        this.popTipData='';
        this.popTipDispatch='';
        this.popTipType='';
        this.editModelTitle = '';
        this.editModelType = '';
        this.search = this.search.bind(this);
        this.onClose = this.onClose.bind(this);
        this.delHandle = this.delHandle.bind(this);
        this.verifyFrom = this.verifyFrom.bind(this);
        this.cols = [
            {
                type:'selection',
                width:60
            },
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
                title:'可调休时间(小时)',
                key:'remove_time',
                width:200
            },
            {
                type:'action',
                width:200,
                render:(item) => {
                    return <div>
                        <span className="action" onClick={() => this.editDayOff('编辑调休','edit_day_off',item)}>编辑</span>
                        <span className="action" onClick={() => this.delHandle(item)}>删除</span>
                    </div>
                }
            }
        ]
    }
    search(keyword){
        this.setState({
            keyword
        })
    }
    delHandle(item={},batch=false){
        if(!batch){
            this.popTipTitle = '删除调休';
            this.popTipData = item;
            this.popTipType = 'del_day_off';
            this.popTipDispatch = 'del_day_off'
        } else {
            this.popTipTitle = '批量删除调休';
            this.popTipData = item;
            this.popTipType = 'del_day_off_batch';
            this.popTipDispatch = 'del_day_off_batch'
        }
        this.setState({
            showPopTip:true
        })
    }
    onClose(){
        this.setState({
            showPopTip:false,
            showEditModel:false
        })
    }
    renderFrom(){
        return <table className="g-from">
            <tbody>
            <tr>
                <td className="in-h">
                    姓名<span className="in-star">*</span></td>
                <td>
                    {this.editModelType === 'add_day_off'?<input type="text" value={this.state.editModelData.member_name} onChange={(event) => this.handleFromChange('member_name',event.target.value)} className="input"/>:this.state.editModelData.member_name}
                </td>
            </tr>
            <tr>
                <td className="in-h">
                    部门<span className="in-star">*</span>
                </td>
                <td>
                    {this.editModelType === 'add_day_off'?<input type="text" value={this.state.editModelData.department_name} onChange={(event) => this.handleFromChange('department_name',event.target.value)} className="input"/> :this.state.editModelData.department_name}
                </td>
            </tr>
            <tr>
                <td className="in-h">工号</td>
                <td>
                    {this.editModelType === 'add_day_off'?<input type="text" value={this.state.editModelData.work_num} onChange={(event) => this.handleFromChange('work_num',event.target.value,'num')} className="input"/>:this.state.editModelData.work_num}
                </td>
            </tr>
            <tr>
                <td className="in-h">
                    剩余调休时间<span className="in-star">*</span></td>
                <td>
                    <input type="text" value={this.state.editModelData.remove_time} onChange={(event) => this.handleFromChange('remove_time',event.target.value,'num',1)} className="input"/>(小时)
                </td>
            </tr>
            </tbody>
        </table>
    }
    verifyFrom(){
        if(this.trim(this.state.editModelData.member_name).length <= 0){
            message.warning('请输入姓名');
            return false;
        } else if(this.trim(this.state.editModelData.department_name).length <= 0){
            message.warning('请输入部门');
            return false;
        } else if(this.trim(this.state.editModelData.remove_time).length <= 0){
            message.warning('请输入剩余调休时间');
            return false;
        }
        else {
            return true;
        }
    }
    trim(value){
        return (value + '').replace(/\s/g,'');
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
                editModelData:{...prevS.editModelData,...{[filed]:value}}
            }
        });
    }
    editDayOff(title,type,data={member_name:'',department_name:'',remove_time:0,work_num:''}){
        this.editModelTitle = title;
        this.editModelType = type;
        this.setState({
            editModelData:data,
            showEditModel:true
        })
    }
    render(){
        return <div>
            <div className="g-header">
                <GSearch placeholder="姓名工号" search={this.search}/>
                <Button type='primary' className='f-fr' onClick={() => this.editDayOff('新增调休','add_day_off')}>新增调休</Button>
            </div>
            <List keyword={this.state.keyword} cols={this.cols} title="调休时间" delHandle={this.delHandle}/>
            {this.state.showPopTip?<PopTip onClose={this.onClose} title={this.popTipTitle} data={this.popTipData} dispatch={this.popTipDispatch} type={this.popTipType}/>:null}
            {this.state.showEditModel ? <EditModel onClose={this.onClose} verifyFrom={this.verifyFrom} title={this.editModelTitle} type={this.editModelType} data={this.state.editModelData} render={() => this.renderFrom()}/>:null}
        </div>
    }
}