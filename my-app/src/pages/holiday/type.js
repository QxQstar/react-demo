import React,{Component} from 'react'
import {Button,message} from 'antd'
import List from './container/typeList.js'
import PopTip from './container/popTip.js'
import EditModel from './container/editModel.js';
export default class extends Component {
    constructor(props){
        super(props);
        this.cols = [
            {
                title:'假期类型',
                key:'type'
            },
            {
                title:'状态',
                key:'status',
                width:100
            },
            {
                title:'假期上限(天)',
                key:'max_time',
                width:150
            },
            {
                title:'周期',
                key:'period',
                width:150
            },
            {
                title:'附件证明',
                key:'attachment',
                width:100
            },
            {
                type:'action',
                width:200,
                title:'操作',
                render:(item) => {
                    return <div className='action'>
                        <span className='action' onClick={() => this.editHandel('edit_type','编辑类型',item)}>编辑</span>
                        {item.status === 1?<span className='action' onClick={() => this.actionHandle('停用假期类型','stopType','change_status',{...item,...{status:0}})}>停用</span>:<span className='action' onClick={() => this.actionHandle('启用假期类型','startType','change_status',{...item,...{status:1}})}>启用</span>}
                        {item.default === 1?null:<span className='action' onClick={() => this.actionHandle('删除假期类型','delType','del_type',item)}>删除</span>}
                    </div>
                }
            }
        ];
        this.closePopTip = this.closePopTip.bind(this);
        this.actionHandle = this.actionHandle.bind(this);
        this.renderFrom = this.renderFrom.bind(this);
        this.verifyFrom = this.verifyFrom.bind(this);
        this.changeTree = this.changeTree.bind(this);
        this.popTipTitle = '';
        this.popTipType = '';
        this.popTipDispatch = '';
        this.popTipData = '';
        this.editModelTitle = '';
        this.editModelType = '';
        this.state = {
            showPopTip:false,
            showEditModel:false,
            editData:'',
            visible:true
        };
    }
    closePopTip(){
        this.setState({
            showEditModel:false,
            showPopTip:false
        })
    }
    changeTree(boolean){
        this.setState({
            visible:boolean
        });
    }
    renderFrom(){
        return <table className='g-from'>
            <tbody>
             <tr className='item'>
                <td className='in-h'>
                    类型<span className='in-star'>*</span>
                </td>
                 <td>
                     <input className='input' type='text' onChange={(event) =>this.formValueChange('type',event.target.value) } value={this.state.editData.type}/>
                 </td>
            </tr>
            <tr className='item'>
                <td className='in-h'>
                    假期上限 <span className='in-star'>*</span>
                </td>
                 <td>
                     <input type='text' className='input' onChange={(event) =>this.formValueChange('max_time',event.target.value,'num') } value={this.state.editData.max_time}/>
                 </td>
            </tr>
            <tr className='item' height='40'>
                <td className='in-h'>
                    周期<span className='in-star'>*</span>
                </td>
                 <td>
                     <label htmlFor="mouth">每月<input type='radio' onChange={(event) =>this.formValueChange('period',2) } classID='mouth' checked={this.state.editData.period === 2} name='period' value={2}/></label>
                     <label htmlFor="year">每年<input type='radio' onChange={(event) =>this.formValueChange('period',1) } classID='year' checked={this.state.editData.period === 1} name='period' value={1}/></label>
                     <label htmlFor="forever">永久<input type='radio' onChange={(event) =>this.formValueChange('period',3) } classID='forever' checked={this.state.editData.period === 3} name='period' value={3}/></label>
                 </td>
            </tr>
            <tr className='item' height='40'>
                <td className='in-h'>
                    附件证明 <span className='in-star'>*</span>
                </td>
                 <td>
                     <label htmlFor="yes">是<input type='radio' onChange={() =>this.formValueChange('attachment',1) } classID='yes' checked={this.state.editData.attachment === 1} name='attachment' value={1}/></label>
                     <label htmlFor="no">否<input type='radio' onChange={() =>this.formValueChange('attachment',0) } classID='no' checked={this.state.editData.attachment === 0} name='attachment' value={0}/></label>
                 </td>
            </tr>
            </tbody>
        </table>
    }
    verifyFrom(){
        if(this.state.editData.type.replace(/\s/g,'').length <= 0){
            message.warning('请输入假期类型');
            return false
        } else if ((this.state.editData.max_time + '').replace(/\s/g,'').length <= 0) {
             message.warning('请输入假期上限');
            return false
        } else {
            return true;
        }
    }
    actionHandle(title,type,dispatch,data){
      this.popTipTitle = title;
      this.popTipType = type;
      this.popTipData = data;
      this.popTipDispatch = dispatch;
      this.setState({
          showPopTip:true
      });
    }
    formValueChange(filed,value,type='text'){
        if(type === 'num'){
            value = value.replace(/[^\d]/g,'')
        }
        this.setState((prevS) => {
            Object.assign(prevS.editData,{[filed]:value});
            return {
                editData:prevS.editData
            }
        })
    }
    editHandel(type,title,data={max_time:0,period:1,attachment:0,type:''}){
        this.editModelTitle = title;
        this.editModelType = type;
        this.setState({
            showEditModel:true,
            editData:data
        });
    }
    render(){
        return <div className='m-holiday_type'>
            <div className="g-header">
                <Button onClick={() => this.editHandel('add_type','新增类型')}>新增类型</Button>
            </div>
            <List cols={this.cols} title='假期类型'/>
            {this.state.showPopTip ? <PopTip onClose={this.closePopTip} data={this.popTipData} title={this.popTipTitle} type={this.popTipType} dispatch={this.popTipDispatch}/>:null}
            {this.state.showEditModel ? <EditModel onClose={this.closePopTip} render={() => this.renderFrom()} verifyFrom={this.verifyFrom} data={this.state.editData} title={this.editModelTitle} type={this.editModelType}/>:null}
        </div>
    }
}