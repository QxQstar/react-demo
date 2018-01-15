import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd'
import List from '../../../components/g-list.js'
function ListRule(props) {
    return (
        <div>
            <div className="g-header">
                <Button type='primary' onClick={() => props.changeState('edit')}>修改规则</Button>
            </div>
            <div style={{padding:'20px 20px 0 20px'}}>{props.ruleType === 1?'手动维护':'手动维护+司龄（自动累加）+工龄（自动累加)'}</div>
            {props.ruleType === 2?<List data={props.data} cols={props.cols} offset={162}/>:null}
        </div>
    )
}
const getRules = (rules) => {
    return rules.map(rule => {
        const type_text = {
            1:'司龄',
            2:'工龄'
        };
        rule.type_text = type_text[rule.type];
        return rule
    })
};
export default connect((state) => {
    return {
        data:getRules(state.holiday.annual_rules),
        ruleType:state.holiday.annual_type
    }
})(ListRule)