import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Icon} from 'antd';
import GHeaderImg from './../g-headerImg.js'
class Person extends Component{
    render(){
        const {data} = this.props;
        return <li>
            <input type="checkbox" checked={this.props.checked(data.member_id)} onChange={() => this.props.changeChecked(data)}/>
            <GHeaderImg {...data} style={{height:'30px',width:'30px'}}/>
            <span>{data.member_name}</span>
        </li>
    }
}
class BaseDataTree extends Component{
    constructor(props){
        super(props);
        this.verifyChecked = this.verifyChecked.bind(this);
        this.changeChecked = this.changeChecked.bind(this);
    }
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
                {props.type === 'staff' || props.keyword || props.letter?
                    <ul>
                        {props.staff.map((data,index) => {
                            return <Person data={data} index={index} key={index} checked={this.verifyChecked} changeChecked={this.changeChecked}/>
                        })}
                    </ul>
                    :null
                }
                {props.type === 'dept_and_staff' && !props.keyword && !props.letter?
                    props.dept.map(data => {
                        if(data.dept_pid === props.pid){
                            return <div key={data.dept_id} style={{paddingLeft:5*this.props.level + 'px'}}>
                                <span>
                                    <Icon type="caret-right" />
                                    {data.dept_name}
                                </span>
                                <ul >
                                {props.staff.map(staff => {
                                    if(staff.dept_id === data.dept_id){
                                        return <Person data={staff}  key={staff.member_id} checked={this.verifyChecked} changeChecked={this.changeChecked}/>
                                    } else return null
                                })}
                                </ul>
                                <BaseDataTree {...props} type="dept_and_staff"  pid={data.dept_id} level={this.props.level+1}/>
                            </div>
                        }
                    })
                    :null
                }
            </div>
        )
    }
}
BaseDataTree.defaultProps = {
    pid:-1,
    level:0
}
function getStaff(staffs,keyword,letter) {
    return staffs.filter(staff => {
        if(!keyword && !letter) return true;
        else if(letter && !keyword) return [staff.member_name,staff.letter].join(',').indexOf(letter) >= 0;
        else if(!letter && keyword) return [staff.member_name,staff.letter].join(',').indexOf(keyword) >= 0;
        else return [staff.member_name,staff.letter].join(',').indexOf(keyword) >= 0 && [staff.member_name,staff.letter].join(',').indexOf(letter) >= 0
    })
}
export default connect((state,ownProps) => {
    return {
        staff:getStaff(state.baseData.staff,ownProps.keyword,ownProps.letter),
        dept:state.baseData.dept,
        dept_and_staff:(function (staffs, depts) {
            return depts.map(dept => {
                const dept_id = dept.dept_id +'';
                const children = staffs.filter(staff => staff.dept_id + '' === dept_id);
                return {...dept,children:children};
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