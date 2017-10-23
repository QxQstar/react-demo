import React,{Component} from 'react'
import HeaderImg from '../../../components/g-headerImg.js'
import {Icon,Tooltip,Row, Col} from 'antd'
class Heart extends Component{
    setLike(){
        const flag = this.props.like ? 0:1;
        if(this.props.type !== 'getCommon')  this.props.setCommon(flag,this.props.id);
        if(flag === 0){
            this.props.delCommon(this.props.member);
        } else {
            this.props.addCommon(this.props.member);
        }
    }
    render(){
        return <Tooltip placement="bottom" title={this.props.like===1?'取消关注':'关注'}>
            <Icon onClick={this.setLike.bind(this)} type={this.props.like===1?'heart':"heart-o"} className={'heart '+ (this.props.like ? 'like':'')} style={{ fontSize: 16 }} />
        </Tooltip>
    }
}
class Del extends Component{
    constructor(props){
        super(props);
        this.handleDel = this.handleDel.bind(this);
    }
    handleDel(){
        this.props.del(this.props.id);
        this.props.delCommon({member_id:this.props.id});
    }
    render(){
        return <Icon type='delete' className='del' onClick={this.handleDel}/>
    }
}
class ListItem extends Component{
    constructor(props){
        super(props);
        this.gotoDetail = this.gotoDetail.bind(this);
    }
    gotoDetail(){
        this.props.changeCur(this.props.member);
        this.props.gotoDetail();
    }
    render(){
        let content;
        if(this.props.type === 'cart'){
            content = <div className="f-clearFix" style={{position:'relative'}}>
                <HeaderImg className="f-fl headimg" {...this.props} onClick={this.gotoDetail}/>
                <div className="f-fl" style={{marginLeft:'10px'}}>
                    <p>
                        <span className="name" onClick={this.gotoDetail}>{this.props.member_name}</span>
                        <span className="tel">{this.props.phone}</span>
                    </p>
                    <p>
                        {this.props.position && <span className="position">{this.props.position}</span>}
                        {this.props.leader && <span className="leader">部门负责人</span>}
                    </p>
                </div>
                <Heart type={this.props.type} like={this.props.like} member={this.props.member} addCommon={this.props.addCommon} delCommon={this.props.delCommon} id={this.props.member_id} setCommon={this.props.setCommon}/>
                {this.props.delIcon ? <Del id={this.props.member_id} delCommon={this.props.delCommon} del={this.props.del}/>:null}
            </div>
        } else {
            content = <Row className="f-clearFix listRow">
                <Col span={8} className='col col-1' onClick={this.gotoDetail}>
                    {this.props.member_name}
                    {this.props.leader && <span className="leader">部门负责人</span>}
                </Col>
                <Col span={6} className='col'>{this.props.position}</Col>
                <Col span={6} className='col'>{this.props.phone}</Col>
                <Col span={4} className='col'>
                    <Heart type={this.props.type} like={this.props.like} member={this.props.member} addCommon={this.props.addCommon} delCommon={this.props.delCommon} id={this.props.member_id} setCommon={this.props.setCommon}/>
                    {this.props.delIcon ? <Del id={this.props.member_id} delCommon={this.props.delCommon} del={this.props.del}/>:null}
                </Col>
            </Row>
        }
        return (
            <li className={this.props.type+"Item"}>{content}</li>
        );
    }
}
ListItem.defaultProps = {
    type:'cart'
};
export default ListItem