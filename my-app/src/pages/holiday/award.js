import React,{Component} from 'react'
import GSearch from './../../components/g-search.js'
import {Button,message} from 'antd'
import List from './container/awardList.js'
import PopTip from './container/popTip.js'
import EditModel from './container/editModel.js'
export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword:'',
            showPopTip:false,
            showEditModel:false,
            editModelData:''
        };
        this.search = this.search.bind(this);
        this.onClose = this.onClose.bind(this);
        this.delAward = this.delAward.bind(this);
        this.verifyFrom = this.verifyFrom.bind(this);
        this.popTipTitle = '';
        this.popTipType='';
        this.popTipDispatch = '';
        this.editModelType='';
        this.editModelTitle='';
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
                title:'工号',
                key:'work_num',
                width:100
            },
            {
                title:'部门',
                key:'department_name',
                width:150
            },
            {
                title:'总天数(天)',
                key:'total_day',
                width:150
            },
            {
                title:'剩余时长(天)',
                key:'remove_day',
                width:150
            },
            {
                type:'action',
                title:'操作',
                width:150,
                render:(item) =>{
                    return <div>
                        <span className='action' onClick={() => this.editAward('编辑奖励假','edit_award',item)}>编辑</span>
                        <span onClick={() => this.delAward(item)} className='action'>删除</span>
                    </div>
                }
            }
        ]
    }
    search(value){
        this.setState({
            keyword:value
        })
    }
    onClose(){
        this.setState({
            showPopTip:false,
            showEditModel:false
        });
    }
    renderFrom(){
        return <table className="g-from">
            <tbody>
            <tr>
                <td className="in-h">
                    姓名<span className="in-star">*</span></td>
                <td>
                    {this.editModelType === 'add_award'?<input type="text" value={this.state.editModelData.member_name} onChange={(event) => this.handleFromChange('member_name',event.target.value)} className="input"/>:this.state.editModelData.member_name}
                </td>
            </tr>
            <tr>
                <td className="in-h">
                    部门<span className="in-star">*</span>
                </td>
                <td>
                    {this.editModelType === 'add_award'?<input type="text" value={this.state.editModelData.department_name} onChange={(event) => this.handleFromChange('department_name',event.target.value)} className="input"/>:this.state.editModelData.department_name}
                </td>
            </tr>
            <tr>
                <td className="in-h">工号</td>
                <td>
                    {this.editModelType === 'add_award'?<input type="text" value={this.state.editModelData.work_num} onChange={(event) => this.handleFromChange('work_num',event.target.value)} className="input"/>:this.state.editModelData.work_num}
                </td>
            </tr>
            <tr>
                <td className="in-h">
                    年假总额<span className="in-star">*</span>
                </td>
                <td>
                    <input type="text" value={this.state.editModelData.total_day} onChange={(event) => this.handleFromChange('total_day',event.target.value,'num')} className="input"/>(天)
                </td>
            </tr>
            <tr>
                <td className="in-h">
                    剩余年假<span className="in-star">*</span></td>
                <td>
                    <input type="text" value={this.state.editModelData.remove_day} onChange={(event) => this.handleFromChange('remove_day',event.target.value,'num')} className="input"/>(天)
                </td>
            </tr>
            </tbody>
        </table>
    }
    verifyFrom(){
        if(this.trim(this.state.editModelData.member_name).length <= 0){
            message.warning('请输入姓名');
            return false;
        } else if (this.trim(this.state.editModelData.department_name).length <= 0){
            message.warning('请输入部门');
            return false;
        } else if(this.trim(this.state.editModelData.total_day).length <= 0){
            message.warning('请输入年假总额');
            return false;
        } else if(this.trim(this.state.editModelData.remove_day).length <= 0){
             message.warning('请输入剩余年假');
            return false;
        } else if(this.state.editModelData.remove_day > this.state.editModelData.total_day){
            message.warning('年假总额小于剩余年假');
            return false
        }
        else {
            return true
        }
    }
     trim(value){
        return (value+'').replace(/\s/g,'')
    }
    handleFromChange(filed,value,type='text'){
         if(type === 'num'){
             value = value.replace(/[^\d]/g,'')
         }
        this.setState(function (prevS) {
            return {
                editModelData:{...prevS.editModelData,...{[filed]:value}}
            }
        });
    }
    editAward(title,type,data={member_name:'',department_name:'',total_day:0,remove_day:0,work_num:''}){
        this.editModelTitle = title;
        this.editModelType = type;
        this.setState({
            editModelData:data,
            showEditModel:true
        })
    }
    delAward(item={},batch = false){
        if(batch){
            this.popTipTitle = '批量删除调休';
            this.popTipType='delAwardBatch';
            this.popTipDispatch = 'del_award_batch';
        } else {
            this.popTipTitle = '删除调休';
            this.popTipType='delAward';
            this.popTipDispatch = 'del_award';
            this.popTipData = item
        }
        this.setState({
           showPopTip:true
        })
    }
    render(){
        return <div className='m-holiday_award'>
            <div className='g-header'>
                <GSearch placeholder='姓名/工号' search={this.search}/>
                <Button type='primary' className='f-fr' onClick={() => this.editAward('新增奖励假','add_award')}>新增奖励假</Button>
            </div>
            <List keyword={this.state.keyword} title='奖励假时间' cols={this.cols} delAward={this.delAward}/>
            {this.state.showPopTip ? <PopTip onClose={this.onClose} data={this.popTipData} title={this.popTipTitle} type={this.popTipType} dispatch={this.popTipDispatch}/>:null}
            {this.state.showEditModel ? <EditModel onClose={this.onClose} verifyFrom={this.verifyFrom} data={this.state.editModelData} title={this.editModelTitle} type={this.editModelType} render={() => this.renderFrom()}/> :null}
        </div>
    }
}