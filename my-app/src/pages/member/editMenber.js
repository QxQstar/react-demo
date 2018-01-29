import React ,{Component} from 'react';
import {Button,message} from 'antd';
import OptDept from './../../components/g-selectData.js';
export default class  extends Component {
    constructor(props){
        super(props);
        this.state={
            optDept:false,
            member_id:props.meberMsg.member_id || undefined,
            member_name:props.meberMsg.member_name || '',
            department_id:props.meberMsg.department_id || '',
            department_name:props.meberMsg.department_name || '',
            work_num:props.meberMsg.work_num || ''
        };
        this.onChangeTree = this.onChangeTree.bind(this);
        this.getOptDept = this.getOptDept.bind(this);
        this.submit = this.submit.bind(this);
	    this.curDept = [];
        if(props.meberMsg.department_id && props.meberMsg.department_name){
           this.curDept = [{department_id:props.meberMsg.department_id,department_name:props.meberMsg.department_name}];
        }
    }
    changeVal(filed,val,type='text'){
        if(type === 'num'){
            val = val.replace(/[^\d]/g,'');
        }
        this.setState({
            [filed]:val
        });
    }
    onChangeTree(flag){
        this.setState({
            optDept:flag
        });
    }
    getOptDept(data = []){
        this.curDept = data;
        this.setState({
            department_id:(data[0] || {}).department_id || '',
            department_name:(data[0] || {}).department_name || ''
        });
    }
    verifyFrom(param){
        if(!param.member_name){
            message.warning('请输入员工姓名');
            return false;
        } else if(!param.department_name || !param.department_id){
            message.warning('请选择员工部门');
            return false;
        } else {
            return true;
        }
    }
    submit(){
        const param = {
            member_name:this.state.member_name.replace(/^\s+|\s+$/g,''),
            department_id:this.state.department_id,
            work_num:this.state.work_num ,
            department_name:this.state.department_name
        };
        if(!this.verifyFrom(param)) return false;
        const type = this.state.member_id?'edit':'add';
        const data = {
            add:{
                url:'/staff/add',
                param:param,
                success:'新增员工成功',
                error:',员工新增失败'
            },
            edit:{
                url:'/staff/edit',
                param:{...param,member_id:this.state.member_id},
                success:'编辑员工成功',
                error:',员工编辑失败'
            }
        }[type];
        this.$http.post(data.url,data.param).then(res => {
            const resData = res.data || {};
            if(resData.code + '' === '0'){
                message.success(data.success);
                this.props.changeState('list',true);
            } else {
                message.error(resData.msg+data.error);
            }
        });
    }
    render(){
        return (
            <div className='m-member-edit'>
                <table className='g-from'>
                    <tbody>
                        <tr>
                            <td className='in-h'>姓名<span className='in-star'>*</span></td>
                            <td>
                                <input className='input' value={this.state.member_name} onChange={(event) => this.changeVal('member_name',event.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='in-h'>部门<span className='in-star'>*</span></td>
                            <td>
                                <Button onClick={() => this.onChangeTree(true)}>部门</Button>
                                {this.state.department_name?<span className='result-p'>{this.state.department_name}</span>:null}
                                {this.state.optDept?<OptDept maxNum={1} type='dept' visible={this.state.optDept} onOk={this.getOptDept} onChangeTree={this.onChangeTree} selectedData={this.curDept}/>:null}
                            </td>
                        </tr>
                        <tr>
                            <td className='in-h'>工号</td>
                            <td>
                                <input className='input' value={this.state.work_num} onChange={(event) => this.changeVal('work_num',event.target.value,'num')}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='in-h'></td>
                            <td>
                                <button type='button' className='submit' style={{marginRight:'10px'}} onClick={this.submit}>确定</button>
                                <button type='button' className='cancel' onClick={() => this.props.changeState('list')}>取消</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}