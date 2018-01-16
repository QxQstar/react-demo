/**
 * Created by Gouuse on 2018/1/15 0015.
 */
import {combineReducers} from 'redux'
const default_group = [
    {
        id:1,
        group_name:'默认分组',
        is_default:1,
        att_type:1,
        is_flexible:0,
        ex_time:0,
        last_time:0,
        att_class:2,
        members:[]
    }
];
const default_class=[
    {
       id:2,
       type:'考勤默认班次9:00-18:00'
    },
    {
        id:1,
        type:'休息'
    }
];
function att_group(group=default_group,action) {
    switch (action.type){
        case 'edit_att_group':
            if(!action.data.is_flexible){
                action.data.ex_time = 0;
                action.data.last_time = 0;
            }
            if(!action.data.id) {
                return [...group,{...action.data,id:new Date().getTime()}];
            } else {
                return group.map(item => {
                    if(item.id * 1 === action.data.id * 1){
                        return action.data;
                    } else {
                        return item;
                    }
                })
            }
        case 'del_att_group':
            return group.filter(item => item.id !== action.data.id);
        default:
            return group
    }
}
function att_class(classes = default_class, action) {
    switch (action.type){
        default:
            return classes;
    }
}
export default combineReducers({
    att_group,
    att_class
})