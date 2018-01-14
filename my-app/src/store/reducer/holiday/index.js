import {combineReducers} from 'redux'
const default_holiday_type = [
    {
        id:1,
        type:'年假',
        status:1,
        max_time:0,
        period:1,
        default:1,
        attachment:0,
    },
    {
        id:2,
        type:'调休',
        status:1,
        max_time:0,
        period:1,
        default:1,
        attachment:0,
    },
    {
        id:3,
        type:'奖励假',
        status:1,
        max_time:0,
        period:1,
        default:1,
        attachment:0,
    },
    {
        id:4,
        type:'test',
        status:1,
        max_time:0,
        period:1,
        default:0,
        attachment:0,
    },
];
const default_award = [
    {
        id:1,
        member_name:'QxQsatr',
        work_num:123,
        department_name:'Web奇安达',
        total_day:12,
        remove_day:10
    },
    {
        id:2,
        member_name:'东方酒店',
        work_num:123,
        department_name:'HpH奇安达',
        total_day:12,
        remove_day:10
    },
    {
        id:3,
        member_name:'大多数',
        work_num:123,
        department_name:'PHP奇安达',
        total_day:12,
        remove_day:10
    }
];
const default_day_off = [
    {
        id:1,
        member_name:'的房间打开',
        department_name:'Web前端',
        work_num:12,
        remove_time:12
    },
    {
        id:2,
        member_name:'的打开',
        department_name:'PHP开发',
        work_num:14,
        remove_time:12
    },
    {
        id:3,
        member_name:'房间打开',
        department_name:'Ios开发',
        work_num:13,
        remove_time:12
    }
];
const default_annual = [
    {
        id:1,
        member_name:'qxq',
        department_name:'web',
        work_num:12,
        remove_time:12,
        all_time:12
    }
];
const default_day_off_rule = {
    type:1
};
function holiday_type(holiday_type=default_holiday_type,action) {
    switch (action.type){
        case 'add_type':
            return [...holiday_type,{...action.params,...{id:new Date().getTime(),status:1}},];
        case 'edit_type':
            return holiday_type.map(type => {
                if(type.id === action.params.id){
                    return action.params
                } else {
                    return type
                }
            });
        case 'del_type':
            return holiday_type.filter(type => {
                return type.id !== action.params.id
            });
        case 'change_status':
            return holiday_type.map(type => {
                if(type.id === action.params.id){
                    return Object.assign({},type,{status:action.params.status})
                } else {
                    return type
                }
            });
        default:
            return holiday_type
    }
}
function award(award=default_award,action) {
    switch(action.type){
        case 'selectAll_award':
            return award.map((item) => {
                return {...item,...action.params}
            });
        case 'selectOne_award':
            return award.map(item => {
                if(item.id === action.params.id){
                    return action.params;
                } else {
                    return item
                }
            });
        case 'del_award':
            return award.filter(item => {
                return item.id !== action.params.id
            });
        case 'del_award_batch':
            return award.filter(item => {
                return !item.checked
            });
        case 'add_award':
            return [...award,{...action.params,...{id:new Date().getTime()}}]
        case 'edit_award':
            return award.map(item => {
                if(item.id === action.params.id){
                    return {...item,...action.params}
                } else {
                    return item
                }
            });
        default:
            return award
    }
}
function annual(annual=default_annual,action) {
    switch (action.type){
        case 'del_ann':
            return annual.filter(item => item.id !== action.params.id);
        case 'add_ann':
            return [...annual,{...action.params,...{id:new Date().getTime()}}];
        case 'edit_ann':
            return annual.map(item => {
                if(item.id === action.params.id){
                    return action.params;
                } else {
                    return item;
                }
            });
        default:
            return annual;
    }
}
function day_off(day_off = default_day_off, action) {
    switch (action.type){
        case 'del_day_off':
            return day_off.filter(item => {
                return item.id !== action.params.id;
            });
        case 'del_day_off_batch':
            return day_off.filter(item => {
                return !item.checked
            });
        case 'selectAll_day_off':
            return day_off.map((item) => {
                return {...item,...action.params}
            });
        case 'add_day_off':
            return [...day_off,{...action.params,...{id:new Date().getTime()}}]
        case 'edit_day_off':
            return day_off.map(item => {
                if(item.id === action.params.id){
                    return {...item,...action.params}
                } else {
                    return item
                }
            });
        case 'selectOne_day_off':
            return day_off.map(item => {
                if(item.id === action.params.id){
                    return action.params;
                } else {
                    return item
                }
            });
        default:
            return day_off
    }
}
function day_off_rule(rule=default_day_off_rule, action) {
    switch (action.type){
        case "editDayOffRule":
            return action.params;
        default:
            return rule
    }
}
function annual_rules(rules=[],action) {
    switch (action.type){
        case 'edit_annual_rules':
            return action.rules;
        default:
            return rules
    }
}
function annual_type(annual_type=1, action) {
    switch (action.type){
        case 'edit_annual_type':
            return action.state;
        default:
            return annual_type;
    }
}

export default combineReducers({
    holiday_type,
    award,
    day_off,
    day_off_rule,
    annual_rules,
    annual_type,
    annual
})