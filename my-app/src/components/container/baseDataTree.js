import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Icon} from 'antd';
import GHeaderImg from './../g-headerImg.js'
class Person extends Component{
    render(){
        const {data,type} = this.props;
        let key = type==='dept'?'department_id':'member_id'

        return <li>
            <input type="checkbox" checked={this.props.checked(data[key])} onChange={() => this.props.changeChecked(data)}/>
            {type !== 'dept'?<GHeaderImg {...data} style={{height:'30px',width:'30px'}}/>:null}
            <span>{type !== 'dept'?data.member_name:data.department_name}</span>
        </li>
    }
}
class BaseDataTree extends Component{
    constructor(props){
        super(props);
        this.verifyChecked = this.verifyChecked.bind(this);
        this.changeChecked = this.changeChecked.bind(this);
    }
    changeChecked(data){
        let filed;
        if(this.props.type !== 'dept'){
            filed = 'member_id';
        }  else {
            filed = 'department_id';
        }
        const id = data[filed];
        const len = this.props.selectedData.length;
        let index = -1;
        for(let i = 0;i<len;i++){
            const cur = this.props.selectedData[i];
            if(id === cur[filed]){
                index = i;
                break;
            }
        }
        if(index > -1){
            const data = [...this.props.selectedData];
            data.splice(index,1);
            this.props.changeSelectedData(data);
        } else {
            this.props.changeSelectedData([...this.props.selectedData,data]);
        }
    }
    verifyChecked(id){
        const ids = this.props.selectedData.map(data => {
            if(this.props.type !== 'dept') return data.member_id;
            else return data.department_id
        });
        return ids.some(curId => id *1 === curId * 1);
    }
    render(){
        const props = this.props;
        return (
            <div className={'m-baseTree '+ (props.className ? props.className:'')} style={props.style?this.props.style:{}}>
                {props.type === 'staff' || props.keyword || props.letter?
                    <ul>
                        {props.staff.map((data,index) => {
                            return <Person type={props.type}  data={data} index={index} key={index} checked={this.verifyChecked} changeChecked={this.changeChecked}/>
                        })}
                    </ul>
                    :null
                }
                {props.type === 'dept'?
                    <ul>
                        {props.dept.map((data,index) => {
                            return <Person type={props.type} data={data} index={index} key={index} checked={this.verifyChecked} changeChecked={this.changeChecked}/>
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
        dept:state.baseData.dept
    }
})(BaseDataTree)