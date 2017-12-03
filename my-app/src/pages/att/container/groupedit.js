import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Steps,Button } from 'antd';
import SelectPerson from './../../../components/g-selectData.js'
import './../css/groupedit.css'
const Step = Steps.Step;
class Edit extends Component{
    constructor(props){
        super(props);
        this.state = {
            step:0,
            selectPerson:false,
            fromData:{
                group_name:'',
                person:[],
                is_att:1,
                att_type:1,
                is_flexible:0,
                banci:['','','','','','',''],
            }
        };
        this.att_banci = [
            {
                value:'1',
                option:'班次一(9:00~18:00)'
            },
            {
                value:'2',
                option:'班次二(12:00~21:00)'
            },
            {
                value:'3',
                option:'休息'
            }
        ];
    }
    selectPerson(boolean){
        this.setState({selectPerson:boolean});
    }
    changeFromData(filed,value){
        this.setState((prevState) => {
            const fromData = {...prevState.fromData,[filed]:value};
            return {
                fromData
            }
        });
    }
    delPerson(index){
        const person = this.state.fromData.person;
        person.splice(index,1);
        this.changeFromData('person',person);
    }
    changeStep(falg){
        this.setState(prevState=>{
            return {
               step:prevState.step+falg
            }
        })
    }
    render(){
        return (
            <div className="m-group-edit">
                <div className="g-header">
                    <span className="link" onClick={this.props.onChangeState}>考勤分组</span> > <span>新增考勤分组</span>
                </div>
                <div className="m-step">
                    <Steps current={this.state.step}>
                        <Step title="分组基本信息" />
                        {this.state.fromData.is_att?<Step title="设置规则" />:null}
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
                                    {this.state.fromData.person.map((p,index)=> {
                                        return <span key={p.member_id} className="result-p" onClick={() => this.delPerson(index)}>{p.member_name}</span>
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <td className="in-h">是否考勤<span className="in-star">*</span></td>
                                <td style={{height:'80px'}}>
                                    <label>
                                        <input type="radio" name="is_att" checked={this.state.fromData.is_att === 1} onChange={() => this.changeFromData('is_att',1)}/>考勤
                                    </label>
                                    <label>
                                        <input type="radio" name="is_att" checked={this.state.fromData.is_att === 0} onChange={() => this.changeFromData('is_att',0)}/>不考勤
                                    </label>
                                </td>
                            </tr>
                            {this.state.fromData.is_att === 1?<tr>
                                <td className="in-h">考勤类型<span className="in-star">*</span></td>
                                <td style={{height:'100px'}}>
                                    <label>
                                        <input type="radio" name="att_type" checked={this.state.fromData.att_type === 1} onChange={() => this.changeFromData('att_type',1)}/>固定班制-每日相同班次 （如每个工作日09:00-18:00,工作日相同班次）
                                    </label>
                                    <label>
                                        <input type="radio" name="att_type" checked={this.state.fromData.att_type === 2} onChange={() => this.changeFromData('att_type',2)}/>固定班制-每日不同班次 （如周一09:00-18:00，周二08:00-19:00，工作日有不同班次，按周循环）
                                    </label>
                                    <label>
                                        <input type="radio" name="att_type" checked={this.state.fromData.att_type === 3} onChange={() => this.changeFromData('att_type',3)}/>（每天的考勤时间不固定，可以灵活的设置考勤时间）
                                    </label>
                                </td>
                            </tr>:null}
                            {this.state.fromData.is_att === 1?<tr>
                                <td className="in-h">是否弹性</td>
                                <td style={{height:'80px'}}>
                                    <label>
                                        <input type="radio" name="is_flexible" checked={this.state.fromData.is_flexible === 0} onChange={() => this.changeFromData('is_flexible',0)}/>无弹性(严格按照上下班时间考勤)
                                    </label>
                                    <label>
                                        <input type="radio" name="is_flexible" checked={this.state.fromData.is_flexible === 1} onChange={() => this.changeFromData('is_flexible',1)}/>部分弹性(上下班时间前后弹性一段时间
                                    </label>
                                </td>
                            </tr>:null}
                            <tr>
                                <td className="in-h"></td>
                                <td>
                                    <Button className="cancel">取消</Button>
                                    {this.state.step > 0?<Button className="submit" style={{margin:'0 10px'}} onClick={() => this.changeStep(-1)}>上一步</Button>:null}
                                    <Button className="submit" style={{margin:'0 10px'}} onClick={() => this.changeStep(1)}>保存并进入下一步</Button>
                                </td>
                            </tr>
                        </tbody>:null}
                        {this.state.step === 1 ? <tbody>
                            <tr>
                                <td className="in-h">考勤班次<span className="in-star">*</span></td>
                                <td>
                                    {this.state.fromData.banci.map((item,index) => {
                                        return <span key={index} className={'select'+index}>
                                            <select value={item} >{
                                                this.att_banci.map(item => {
                                                    return <option value={item.value} key={item.value}>{item.option}</option>
                                                })
                                            }</select>
                                        </span>
                                    })}
                                </td>
                            </tr>
                        </tbody>:null}
                    </table>
                </div>
                {this.state.selectPerson?<SelectPerson visible={this.state.selectPerson} type="staff" selectedData={this.state.fromData.person} onChangeTree={() => this.selectPerson(false)} onOk={(data) => this.changeFromData('person',data)}/>:null}
            </div>
        )
    }
}
export default connect((state) => {
    return {

    }
})(Edit)