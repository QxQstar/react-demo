import React from 'react'
import List from '../../../components/g-list.js'
import {connect} from 'react-redux'
function dayOffList(props) {
    return <List offset={123} delHandle={props.delHandle} data={props.data} cols={props.cols} title={props.title} onSelectAll={props.onSelectAll} onSelectOne={props.onSelectOne}/>
}
function getData(day_off,keyword) {
    if(!keyword) return day_off;
    else{
        return day_off.filter(item => {
            return item.member_name.indexOf(keyword) >= 0 || (item.work_num + '').indexOf(keyword) >= 0;
        })
    }
}
export default connect((state,ownProps) => {
    return {
        data:getData(state.holiday.day_off,ownProps.keyword)
    }
},(dispatch) => {
    return {
        onSelectAll(flag){
            dispatch({
                type:'selectAll_day_off',
                params:{
                    checked:flag
                }
            })
        },
        onSelectOne(params){
            dispatch({
                type:'selectOne_day_off',
                params:params
            })
        }
    }
})(dayOffList)