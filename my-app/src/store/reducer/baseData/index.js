import {combineReducers} from 'redux';

const defaultDept = [
    {
        dept_id:0,
        dept_pid:-1,
        dept_name:'QxQstar'
    },
    {
        dept_id:1,
        dept_pid:0,
        dept_name:'研发部'
    },
    {
        dept_id:2,
        dept_pid:0,
        dept_name:'产品部'
    },
    {
        dept_id:3,
        dept_pid:2,
        dept_name:'销售部'
    },
    {
        dept_id:4,
        dept_pid:0,
        dept_name:'web前端'
    }
];
const defaultStaff = [
    {
        member_id:1,
        letter:'Q',
        member_name:"秦煜祺",
        dept_id:1,
    },
    {
        member_id:2,
        letter:'Z',
        member_name:"张玉洁",
        dept_id:1,
    },
    {
        member_id:3,
        letter:'D',
        member_name:"董宇环",
        dept_id:2,
    },
    {
        member_id:4,
        letter:'D',
        member_name:"杜江",
        dept_id:3,
    }
];
function dept(dept = defaultDept, action) {
    switch (action.type){
        case 'getDept':
            return action.data;
        default:
            return dept;
    }
}
function staff(staff = defaultStaff, action) {
    switch (action.type){
        case 'getStaff':
            return action.data;
        default:
            return staff;
    }
}
export default combineReducers({
    dept,
    staff
})