import React from 'react'
import List from '../../../components/g-list.js'
import {connect} from 'react-redux'
function AwardList(props) {
    return <List offset={55} delHandle={props.delAward} cols={props.cols} data={props.data} title={props.title} onSelectAll={props.onSelectAll} onSelectOne={props.onSelectOne}/>
}
function filterData(data,keyword) {
    return data.filter(item => {
        if(!keyword) return true;
        return item.member_name.indexOf(keyword) >= 0 || (item.work_num + '').indexOf(keyword) >= 0;
    });
}
export default connect((state,ownsProps) => {
    return {
        data:filterData(state.holiday.award,ownsProps.keyword)
    }
},(dispatch) => {
    return {
        onSelectAll(flag){
            dispatch({
                type:'selectAll_award',
                params:{
                    checked:flag
                }
            });
        },
        onSelectOne(params){
            dispatch({
                type:'selectOne_award',
                params
            })
        }
    }
})(AwardList)