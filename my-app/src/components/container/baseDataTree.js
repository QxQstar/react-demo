import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Icon} from 'antd';
import GHeaderImg from './../g-headerImg.js'
class BaseDataTree extends Component{
    changeChecked(member){
        const member_id = member.member_id;
        const len = this.props.selectedData.length;
        let index = -1;
        for(let i = 0;i<len;i++){
            const cur = this.props.selectedData[i];
            if(member_id === cur.member_id){
                index = i;
                break;
            }
        }
        if(index > -1){
            const data = [...this.props.selectedData];
            data.splice(index,1);
            this.props.changeSelectedData(data);
        } else {
            this.props.changeSelectedData([...this.props.selectedData,member]);
        }
    }
    verifyChecked(member_id){
        const member_ids = this.props.selectedData.map(data => data.member_id);
        return member_ids.join(',').includes(member_id);
    }
    render(){
        const props = this.props;
        return (
            <div className={'m-baseTree '+ (props.className ? props.className:'')} style={props.style?this.props.style:{}}>
                {props.type === 'staff'?
                    <ul>
                        {props[props.type].map((data,index) => {
                            return <li key={index}>
                                <input type="checkbox" checked={this.verifyChecked(data.member_id)} onChange={() => this.changeChecked(data)}/>
                                <GHeaderImg {...data} style={{height:'30px',width:'30px'}}/>
                                <span>{data.member_name}</span>
                            </li>
                        })}
                    </ul>
                    :null
                }
            </div>
        )
    }
}
export default connect(state => {
    return {
        staff:state.baseData.staff,
        dept:state.baseData.dept,
        dept_and_staff:(function (staffs, depts) {
            return depts.map(dept => {
                const dept_id = dept.dept_id +'';
                const children = staffs.filter(staff => staff.dept_id + '' === dept_id);
                return {...dept,...{children}};
            })
        })(state.baseData.staff,state.baseData.dept),
        dept_obj:(function (dept) {
            const obj = {};
            dept.forEach(item => {
                obj[item.dept_id] = item
            });
            return obj;
        })(state.baseData.dept)
    }
})(BaseDataTree)