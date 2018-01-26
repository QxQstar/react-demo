import React,{Component} from 'react'
import {Icon} from 'antd';
import ListItem from './listItem.js';
import fixHeight from '../../../global/fixHeight.js'
import {connect} from 'react-redux'
const height = fixHeight({offset:95});
class List extends Component {
    render(){
        if(this.props.data.length > 0){
            const items = this.props.data.map((item) => {
                return <ListItem key={item.member_id} type={this.props.type} {...item} member={item} changeCur = {this.props.changeCur} delCommon={this.props.delCommon} setCommon={this.props.setCommon} addCommon={this.props.addCommon} delIcon={this.props.delIcon} del={this.props.delExter} gotoDetail={this.props.gotoDetail}/>
            });
            return <div className="content" style={{height:height}}>
                {this.props.header && this.props.header()}
                {/*列表*/}
                <ul className="list f-clearFix">{items}</ul>
            </div>
        } else {
            return <div className="g-empty">
                <Icon type="frown-o" style={{color:'#b8e0c8',fontSize:'50px'}}/>
                <p className="word">暂无数据</p>
            </div>
        }
    }
}
function getData(state, ownProps) {
    return state[ownProps.filed1][ownProps.filed2].filter((item) => {
            let match = true;
            if(ownProps.letter !== '' && item.letter !== ownProps.letter) match = false;
            if(match && ownProps.keyword !== '' && item.member_name.indexOf(ownProps.keyword) < 0) match = false;
            return match;
        });
}
export default connect((state,ownProps) => {
    return {
        data:getData(state,ownProps)
    }
},(dispatch,ownProps) => {
    return{
        setCommon(flag,member_id){
            dispatch({
                type:'changeCommon',
                flag,
                member_id
            })
        },
        addCommon(member){
            dispatch({
                type:'addCommon',
                member
            });
            dispatch({
                type:'exitExternal',
                params:{...member,like:!member.like * 1}
            })
        },
        delCommon(member){
            dispatch({
                type:'delCommon',
                member,
            });
            dispatch({
                type:'exitExternal',
                params:{...member,like:!member.like * 1}
            })
        },
        changeCur(member){
            dispatch({
                type:'changeCur',
                param:member
            })
        },
        delExter(member_id){
            dispatch({
                type:'delExternal',
                member_id
            })
        }
    }
})(List)