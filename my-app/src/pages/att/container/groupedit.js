import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Select} from 'antd';
import { Steps,Button,message } from 'antd';
import SelectPerson from './../../../components/g-selectData.js'
import Detail from './groupdetail.js';
const Step = Steps.Step;
const Option = Select.Option;
class Edit extends Component{
    constructor(props){
        super(props);
        this.state = {
            step:0,
            selectPerson:false,
            fromData:this.props.fromData || {
                group_name:'',
                members:[],
                att_type:1,
                is_flexible:0,
                // 默认值为30分钟
                ex_time:30,
                last_time:30,
                att_class:2
            }
        };
        this.submit = this.submit.bind(this);
    }
    selectPerson(boolean){
        this.setState({selectPerson:boolean});
    }
    changeFromData(filed,value){
        if(filed === 'is_flexible') {
            this.changeFromData('ex_time',30);
            this.changeFromData('last_time',30);
        }
        this.setState((prevState) => {
            const fromData = {...prevState.fromData,[filed]:value};
            return {
                fromData
            }
        });
    }
    delPerson(index){
        const person = this.state.fromData.members;
        person.splice(index,1);
        this.changeFromData('members',person);
    }

    verifyFromData(step){
        const needVerifyData = {
            0:{
                group_name:{
                    is_required: true,
                    msg:'请输入考勤分组名称'
                },
                members:{
                    is_required: !this.state.fromData.is_default,
                    msg:'请选择考勤分组成员'
                }
            },
            1:{
                ex_time:{
                    is_required: !!this.state.fromData.is_flexible,
                    msg:'请输入上/下班时间之前的弹性时间'
                },
                last_time:{
                    is_required: !!this.state.fromData.is_flexible,
                    msg:'请输入上/下班时间之后的弹性时间'
                }
            }
        }[step];
        const verifyKey = Object.keys(needVerifyData);
        const len = verifyKey.length;
        for(let i = 0;i < len ;i++){
            const curKey = verifyKey[i];
            const is_required = needVerifyData[curKey].is_required;
            if(is_required && (this.state.fromData[curKey] + '').length <= 0){
                message.warning(needVerifyData[curKey].msg);
                return false;
            }
        }
        return true;
    }
    changeStep(flag){
        if(flag > 0 && !this.verifyFromData(this.state.step)) return;
        this.setState(prevState=>{
            return {
               step:prevState.step+flag
            }
        })
    }
    submit(){
        this.props.submit(this.state.fromData);
        this.props.onChangeState();
    }
    createHeader(){
       const text = this.props.fromData.id?'编辑考勤分组':'新增考勤分组';
       return <div className="g-header">
           <span className="bread link" onClick={this.props.onChangeState}>考勤分组</span> > <span className="bread">{text}</span>
       </div>
    }
    render(){
        return (
            <div className="m-group-edit">
                {this.createHeader()}
                <div className="m-step">
                    <Steps current={this.state.step}>
                        <Step title="分组基本信息" />
                        <Step title="设置规则" />
                        <Step title="提交发布" />
                    </Steps>
                </div>
                <div className="m-from">
                    <table className="g-from">
                        {this.state.step === 0 ? <tbody>
                            <tr>
                                <td className="in-h">考勤分组名称<span className="in-star">*</span></td>
                                <td style={{height:'50px'}}>
                                    <input type="text" className="input" value={this.state.fromData.group_name} onChange={(event) => this.changeFromData('group_name',event.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="in-h">考勤分组成员<span className="in-star">*</span></td>
                                <td style={{height:'50px'}}>
                                    <Button className="primary" onClick={() => {this.selectPerson(true)}}>选择人员</Button>
                                    {this.state.fromData.members.map((p,index)=> {
                                        return <span key={p.member_id} className="result-p" onClick={() => this.delPerson(index)}>{p.member_name}</span>
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <td className="in-h">考勤类型<span className="in-star">*</span></td>
                                <td style={{height:'100px'}}>
                                    <label>
                                        <input type="radio" name="att_type" checked={this.state.fromData.att_type === 1} onChange={() => this.changeFromData('att_type',1)}/>固定班制-每日相同班次 （如每个工作日09:00-18:00,工作日相同班次）
                                    </label>
                                    <label>
                                        <input type="radio" name="att_type" checked={this.state.fromData.att_type === 2} onChange={() => this.changeFromData('att_type',2)}/>固定班制-每日不同班次 （如周一09:00-18:00，周二08:00-19:00，工作日有不同班次，按周循环）
                                    </label>
                                    <label>
                                        <input type="radio" name="att_type" checked={this.state.fromData.att_type === 3} onChange={() => this.changeFromData('att_type',3)}/>排版制（每天的考勤时间不固定，可以灵活的设置考勤时间）
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td className="in-h"></td>
                                <td>
                                    <Button className="cancel" onClick={this.props.onChangeState}>取消</Button>
                                    {this.state.step > 0?<Button className="submit" style={{margin:'0 10px'}} onClick={() => this.changeStep(-1)}>上一步</Button>:null}
                                    <Button className="submit" style={{margin:'0 10px'}} onClick={() => this.changeStep(1)}>保存并进入下一步</Button>
                                </td>
                            </tr>
                        </tbody>:null}
                        {this.state.step === 1 ? <tbody>
                           <tr>
                                <td className="in-h">是否弹性</td>
                                <td style={{height:'80px'}}>
                                    <label>
                                        <input type="radio" name="is_flexible" checked={this.state.fromData.is_flexible === 0} onChange={() => this.changeFromData('is_flexible',0)}/>无弹性(严格按照上下班时间考勤)
                                    </label>
                                    <label>
                                        <input type="radio" name="is_flexible" checked={this.state.fromData.is_flexible === 1} onChange={() => this.changeFromData('is_flexible',1)}/>部分弹性(上下班时间前后弹性一段时间)
                                    </label>
                                    {this.state.fromData.is_flexible === 1?
                                        <div>
                                            上下班之前的弹性时长<input type='text' value={this.state.fromData.ex_time} onChange={(event) => this.changeFromData('ex_time',event.target.value)} className='input small'/>分钟，
                                            上下班之后的弹性时长<input type='text' value={this.state.fromData.last_time} onChange={(event) => this.changeFromData('last_time',event.target.value)} className='input small'/>分钟
                                        </div>
                                    :null}
                                </td>
                            </tr>
                            <tr style={{height:'50px'}}>
                                <td className="in-h">考勤班次<span className="in-star">*</span></td>
                                <td>
                                    <Select style={{ width: 300 }} defaultValue={this.state.fromData.att_class + ''} placeholder='请选择考勤班次' dropdownClassName={'filterOpt'} className='g-filter-depts' onChange={(val) => this.changeFromData('att_class',val)}>
                                        {this.props.att_class.map(cls => {
                                            return <Option key={cls.id}>
                                                <span className='name'>{cls.type}</span>
                                            </Option>
                                        })}
                                    </Select>
                                </td>
                            </tr>
                           <tr >
                               <td className="in-h"></td>
                               <td>
                                   <Button className="cancel" onClick={this.props.onChangeState}>取消</Button>
                                   {this.state.step > 0?<Button className="submit" style={{margin:'0 10px'}} onClick={() => this.changeStep(-1)}>上一步</Button>:null}
                                   <Button className="submit" style={{margin:'0 10px'}} onClick={() => this.changeStep(1)}>保存并进入下一步</Button>
                               </td>
                           </tr>
                        </tbody>:null}
                        {this.state.step === 2 ? <tbody>
                            <tr>
                                <td>
                                    <Detail {...this.state.fromData}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button className="cancel" onClick={this.props.onChangeState}>取消</Button>
                                    {this.state.step > 0?<Button className="submit" style={{margin:'0 10px'}} onClick={() => this.changeStep(-1)}>上一步</Button>:null}
                                    <Button className="submit" style={{margin:'0 10px'}} onClick={this.submit}>提交</Button>
                                </td>
                            </tr>
                        </tbody> : null}
                    </table>
                </div>
                {this.state.selectPerson?<SelectPerson visible={this.state.selectPerson} type="staff" selectedData={this.state.fromData.members} onChangeTree={() => this.selectPerson(false)} onOk={(data) => this.changeFromData('members',data)}/>:null}
            </div>
        )
    }
}
export default connect((state) => {
    return {
        att_class:state.att.att_class
    }
},(dispatch) => {
    return {
        submit(data){
            dispatch({type:'edit_att_group',data:data})
        }
    }
})(Edit)