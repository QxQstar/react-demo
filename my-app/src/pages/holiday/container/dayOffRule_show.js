import React from 'react';
import {connect} from 'react-redux'
import {Button} from 'antd'
function DayOffRule(props) {
    return <div className="dayOffRuleShow">
        <div className="g-header">
            <Button type="primary" onClick={() => props.changeState(true)}>修改</Button>
        </div>
        <div className="main">
            <div className="item f-clearFix">
                <span className="info f-fl">调休规则</span>
                <div className="desc">
                    {props.rule.type + '' === '1'?'手动维护':'手动维护+加班兑换 '}
                </div>
            </div>
        {props.rule.type + '' !== '1' ?
            <div className="item f-clearFix">
                <span className="info f-fl">加班兑换规则</span>
                <div className="desc f-fl">
                    <p>工作日加班{props.rule.weekday}小时换1小时调休</p>
                    <p>休息日加班{props.rule.weekend}小时换1小时调休</p>
                    <p>法定节假日加班{props.rule.holiday}小时换1小时调休</p>
                </div>
            </div>
        :null}
    {props.rule.type + '' !== '1' ?
            <div className="item f-clearFix">
                <span className="info f-fl">日时长折算规则</span>
                <div className="desc">{props.rule.convery}小时=1天</div>
            </div>
        :null}
        </div>
    </div>
}
export default connect(state => {
    return {
        rule:state.holiday.day_off_rule
    }
})(DayOffRule)
