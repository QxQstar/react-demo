import React,{Component} from 'react';
import {connect} from 'react-redux';
import {message} from 'antd'
class DayOffRule extends Component{
    constructor(props){
        super(props);
        this.state = {
            editData:props.rule
        };
        this.submit = this.submit.bind(this);
    }
    changeField(field,value,type='text'){
        if(type==='num') value = value.replace(/[^\d]/g,'');
        this.setState((prevS) => {
            return {
                editData:{...prevS.editData,...{[field]:value}}
            }
        })
    }
    submit(){
        if(this.verifyFrom()) this.props.submit(this.state.editData);
    }
    verifyFrom(){
        if(this.trim(this.state.editData.weekday).length <= 0){
            message.warning('请输入工作日加班兑换规则');
            return false
        } else if(this.trim(this.state.editData.weekend).length <= 0){
            message.warning('请输入休息日加班兑换规则');
            return false
        } else if(this.trim(this.state.editData.holiday).length <= 0){
            message.warning('请输入节假日加班兑换规则');
            return false
        } else if(this.trim(this.state.editData.convery).length <= 0){
            message.warning('请输入日时长折算规则');
            return false
        }
        else {
            return true;
        }
    }
    trim(value){
        return (value + '').replace(/\s/g,'')
    }
    render(){
        return <table className="g-from dayOffRuleShow" style={{marginLeft:'50px'}}>
            <tbody>
            <tr>
                <td className="in-h">
                    调休规则<span className="in-star">*</span>
                </td>
                <td height='50'>
                    <label><input type="radio" checked={this.state.editData.type+ '' === '1'} onChange={() => this.changeField('type',1)}/>手动维护</label>
                    <label><input type="radio" checked={this.state.editData.type+ '' === '2'} onChange={() => this.changeField('type',2)}/>手动维护+加班兑换</label>
                </td>
            </tr>
            {this.state.editData.type+ '' !== '1'?
                <tr>
                    <td className="in-h" style={{verticalAlign: 'top'}}>
                        加班兑换规则<span className="in-star">*</span>
                    </td>
                    <td height='80' style={{verticalAlign: 'top'}}>
                        <div className="item">工作日加班1小时换<input type="text" className="small input" value={this.state.editData.weekday} onChange={(event) => this.changeField('weekday',event.target.value,'num')}/>小时调休</div>
                        <div className="item">休息日加班1小时换<input type="text" className="small input" value={this.state.editData.weekend} onChange={(event) => this.changeField('weekend',event.target.value,'num')}/>小时调休</div>
                        <div className="item">法定节假日加班1小时换<input type="text" className="small input" value={this.state.editData.holiday} onChange={(event) => this.changeField('holiday',event.target.value,'num')}/>小时调休</div>
                    </td>
                </tr>
            :null}
            {this.state.editData.type+ '' !== '1'?
                <tr>
                    <td className="in-h">
                        日时长折算规则<span className="in-star">*</span>
                    </td>
                    <td>
                        <input type="text" className="small input" value={this.state.editData.convery} onChange={(event) => this.changeField('convery',event.target.value,'num')}/>小时=1天
                    </td>
                </tr>
            :null
            }
            <tr>
                <td></td>
                <td height='50'>
                    <button className="cancel" onClick={() => this.props.changeState(false)}>取消</button>
                    <button className="submit" onClick={() => this.submit()} style={{marginLeft:'10px'}}>提交</button>
                </td>
            </tr>
            </tbody>
        </table>
    }
}
function getRule(rule) {
    if(rule.type + '' === '1'){
        return {
            type:1,
            weekday:1,
            weekend:1,
            holiday:1,
            convery:8
        }
    }
    return rule;
}
export default connect(state => {
    return {
        rule:getRule(state.holiday.day_off_rule)
    }
},((dispatch,ownProps) => {
    return {
        submit(params){
            dispatch({
                type:'editDayOffRule',
                params
            });
            ownProps.changeState(false)
        }
    }
}))(DayOffRule)
