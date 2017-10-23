import React ,{Component} from 'react';
import {Icon} from 'antd';
import List from './list.js';
import '../list.css';
class MemberList extends Component{
    constructor(props){
        super(props);
        this.state = {
            type:'cart',
            showModal:false
        };
        this.header = this.header.bind(this);
    }
    header(){
        return <div className="listHeader">
            <span>{this.props.title}</span>
            <div className="switch f-fr">
                <Icon type="bars" onClick={this.switchType.bind(this,'list')} className={'icon ' + (this.state.type === 'list' ? 'active' :'')} style={{fontSize:'16px'}}/>
                <Icon type="appstore" onClick={this.switchType.bind(this,'cart')} className={'icon ' + (this.state.type === 'cart' ? 'active' :'')} style={{fontSize:'16px'}}/>
            </div>
        </div>;
    }
    render(){
        return <div>
            <List filed1={this.props.filed1} filed2={this.props.filed2} letter={this.props.letter} keyword={this.props.keyword} type={this.state.type} header={this.header} delIcon={this.props.delIcon} gotoDetail={this.props.gotoDetail}/>
        </div>
    }
    switchType(type){
        this.setState({type})
    }
}
MemberList.defaultProps = {
    title:'gouuse',
    delIcon:false
};
export default MemberList;