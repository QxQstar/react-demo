/**
 * Created by Gouuse on 2018/1/15 0015.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
class Detail extends Component {
    getAttType(){
        if (this.props.att_type * 1 === 1){
            return <span>固定班制-每日相同班次</span>
        } else if(this.props.att_type * 1 === 2){
            return <span>固定班制-每日不同班次</span>
        } else {
            return <span>排班制</span>
        }
    }
    getIsFlexible(){
        if(!this.props.is_flexible){
            return <span>不弹性</span>
        } else {
            return <p>上下班之前的弹性时长{this.props.ex_time}分钟，上下班之后的弹性时长{this.props.last_time}分钟</p>
        }
    }
    getAttClass(){
        const curClass = this.props.att_classes.find(item => item.id * 1 === this.props.att_class * 1 );
        return (curClass || {}).type;
    }
    getMembers(){
        return this.props.members.map(member => member.member_name);
    }
    render(){
        return <table className="g-from">
            <tbody>
                <tr>
                    <td className="in-h">分组名称</td>
                    <td>{this.props.group_name}</td>
                </tr>
                <tr>
                    <td className="in-h">考勤类型</td>
                    <td>{this.getAttType()}</td>
                </tr>
                <tr>
                    <td className="in-h">弹性</td>
                    <td>{this.getIsFlexible()}</td>
                </tr>
                <tr>
                    <td className="in-h">考勤班次</td>
                    <td>{this.getAttClass()}</td>
                </tr>
                <tr>
                    <td className="in-h">分组成员</td>
                    <td>{this.getMembers()}</td>
                </tr>
            </tbody>
        </table>
    }
}
export default connect((state) => {
    return {
        att_classes:state.att.att_class
    }
})(Detail)