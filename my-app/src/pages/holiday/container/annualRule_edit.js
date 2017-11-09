import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Icon,message} from 'antd'
class Edit extends Component{
    constructor(props){
        super(props);
        this.state = {
            type:props.ruleType,
            rules:props.rules
        };
        this.submit = this.submit.bind(this);
    }
    changeType(type){
        this.setState({
            type:type
        })
    }
    addRule(type){
        this.setState(function (prevS) {
            prevS.rules.push({
                id:new Date(),
                type,
                gt:'',
                lt:'',
                annual:''
            });
            return {
                rules:prevS.rules
            }
        })
    }
    delRule(index){
        this.setState(function (prevS) {
            if(prevS.rules.length === 1){
                message.warning('至少要有一条累加规则');
                return;
            }
            prevS.rules.splice(index,1);
            return {
                rules:prevS.rules
            }
        })
    }
    submit(){
        if(this.verifyRule()) this.props.submit(this.state.type,this.state.rules);
    }
    verifyRule(){
        const len = this.state.rules.length;
        let flag = true;
        for(let index = 0;index<len;++index){
            const rule = this.state.rules[index];
            if(!(rule.gt.length <= 0 && rule.lt.length <= 0 && rule.annual.length <= 0)){
                if(rule.gt.length <= 0){
                    message.warning('请输入第'+(index+1)+'条累计规则的起始时间');
                    flag = false;
                    break;
                }
                if(rule.lt.length <= 0){
                    message.warning('请输入第'+(index+1)+'条累计规则的截至时间');
                    flag = false;
                    break;
                }
                if(rule.annual.length <= 0){
                    message.warning('请输入第'+(index+1)+'条累计规则的年假时间');
                    flag = false;
                    break;
                }
                if(rule.annual * 1 === 0){
                    message.warning('请输入第'+(index+1)+'条累计规则的年假时间为0');
                    flag = false;
                    break;
                }
                if(rule.gt > rule.lt){
                    message.warning('请输入第'+(index+1)+'条累计规则的起始时间大于截至时间');
                    flag = false;
                    break;
                }
            }
        }
        return flag;

    }
    editRule(index,filed,value,type = 'text'){
        if(type === 'num'){
            value = value.replace(/[^\d]/g,'')
        }
        this.setState(function (prevS) {
            prevS.rules[index][filed] = (value+'').trim();
            return {
                rules:prevS.rules
            }
        })
    }
    render(){
        return <div style={{marginLeft:'100px'}}>
            <table className="g-from">
                <tbody>
                    <tr height={30}>
                        <td className="in-h">年假规则<span className="in-star">*</span></td>
                        <td>
                            <label><input type="radio" name='type' checked={this.state.type === 1} onChange={() => this.changeType(1)}/>手动维护</label>
                            <label><input type="radio" name='type' checked={this.state.type === 2} onChange={() => this.changeType(2)}/>手动维护+自动累加</label>
                        </td>
                    </tr>
                    {this.state.type === 2?<tr>
                        <td className="in-h" style={{verticalAlign:'text-top'}}>累加规则<span className="in-star">*</span></td>
                        <td>
                            <table>
                                <tbody>
                                    <tr style={{height:'40px'}}>
                                        <td>
                                            <button className="submit" onClick={() => this.addRule(1)} style={{marginRight:'10px'}}>新增司龄</button>
                                            <button className="submit" onClick={() => this.addRule(2)}>新增公龄</button>
                                        </td>
                                    </tr>
                                    {this.state.rules.map((rule,index) => {
                                        return <tr key={index}>
                                            <td>
                                                <input type="text" className="input small" value={rule.gt} onChange={(event) => this.editRule(index,'gt',event.target.value,'num')}/>年 小于等于
                                                {rule.type === 1?'司龄':'工龄'}小于
                                                <input type="text" className="input small" value={rule.lt} onChange={(event) => this.editRule(index,'lt',event.target.value,'num')}/>年
                                                <span style={{marginLeft:'20px'}}>年假<input type="text" className="input small" value={rule.annual} onChange={(event) => this.editRule(index,'annual',event.target.value,'num')}/>天</span>
                                                <Icon style={{marginLeft:'20px'}} onClick={() => this.delRule(index)} type="delete"/>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </td>
                    </tr>:null}
                    <tr>
                        <td className="in-h"></td>
                        <td>
                            <button className="cancel" onClick={() => this.props.changeState('show')}>取消</button>
                            <button className="submit" onClick={this.submit} style={{marginLeft:'10px'}}>提交</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    }
}
export default connect((state) => {
    return {
        ruleType:state.holiday.annual_type,
        rules:state.holiday.annual_type === 1?[{type:1,gt:'',lt:'',annual:'',id:new Date()}]:state.holiday.annual_rules
    }
},(dispatch,ownProps) => {
    return {
        submit(type,rules){
            dispatch({
                type:'edit_annual_type',
                state:type
            });
            dispatch({
                type:'edit_annual_rules',
                rules
            });
            ownProps.changeState('show');
        }
    }
})(Edit)