import React ,{Component} from 'react';
import {Button,message} from 'antd';
import OptDept from './../../components/g-selectData.js';
export default class  extends Component {
    constructor(props){
        super(props);
        this.state={
            optDept:false,
            member_id:this.props.member_id || undefined,
            member_name:this.props.member_name || '',
            department_id:this.props.department_id || '',
            department_name:this.props.department_name || '',
            work_num:this.props.work_num || ''
        };
        this.onChangeTree = this.onChangeTree.bind(this);
        this.getOptDept = this.getOptDept.bind(this);
	this.curDept = [];
	if(this.props.department_id && this.props.department_name){
	   this.curDept = [{department_id:this.props.department_id,department_name:this.props.department_name}]
	}
    }
    changeVal(filed,val){
        this.setState({
            [filed]:val
        })
    }
    onChangeTree(flag){
        this.setState({
            optDept:flag
        })
    }
    getOptDept(data = []){
        this.setState({
            department_id:data[0].department_id || '',
            department_name:data[0].department_name || ''
        })
        this.curDept = data;
    }
    render(){
        return (
            <div className='m-member-edit'>
                <table className='g-from'>
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
                            {this.state.department_name?<span className='result-p' onClick={() => this.getOptDept()}>{this.state.department_name}</span>:null}
                            <OptDept maxNum={1} type='dept' dataBaseDept={this.depts} visible={this.state.optDept} onOk={this.getOptDept} onChangeTree={this.onChangeTree} selectedData={this.curDept}/>
                        </td>
                    </tr>
                    <tr>
                        <td className='in-h'>工号</td>
                        <td>
                            <input className='input' value={this.state.work_num} onChange={(event) => this.changeVal('work_num',event.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td className='in-h'></td>
                        <td>
                            <button type='button' className='submit' style={{marginRight:'10px'}}>确定</button>
                            <button type='button' className='cancel' onClick={() => this.props.changeState('list')}>取消</button>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
    componentDidMount(){
        this.$http.post('/dept/list').then((res) => {
            const resData = res.data || {};
            if(resData.code + '' === '0'){
                this.depts = resData.data || [];
            } else {
                message.error('获取部门列表失败');
            }
        })
    }
}