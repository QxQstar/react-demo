import React from 'react'
import {connect} from 'react-redux'
import List from '../../../components/g-list.js'
function TypeList(props) {
    return <List offset={55} cols={props.cols} title={props.title} data={props.list}/>
}
function getTypeList(state) {
    return state.holiday.holiday_type.map(type => {
        let text = {
            status_text:{
                0:'停用',
                1:'启用'
            },
            attachment_text:{
                0:'否',
                1:'是'
            },
            period_text:{
                1:'每年',
                2:'每月',
                3:'永久'
            },
            max_time_text(value){
                if(value === 0){
                    return '不限'
                }
                return {
                    [value]:value
                }[value]
            }
        };
        return Object.assign({},type,{
            status_text:text.status_text[type.status],
            attachment_text:text.attachment_text[type.attachment],
            period_text:text.period_text[type.period],
            max_time_text:text.max_time_text(type.max_time)
        })
    })
}
export default connect(
    state=>{
        return {
            list:getTypeList(state)
        }
    }
)(TypeList);