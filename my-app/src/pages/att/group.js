import React ,{Component} from 'react';
import Edit from './container/groupedit.js';
import List from './container/grouplist.js';
import Detail from './container/groupdetail.js';
import DelGroup from './container/delGroup.js';
import './css/att_group.css'
class Group extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:'list',
            delGroup:false
        };
        this.fromData = '';
        this.changeState = this.changeState.bind(this);
        this.changeModelState = this.changeModelState.bind(this);
        this.cols = [
            {
                title:'分组名称',
                key:'group_name',
                width:150
            },
            {
                title:'考勤类型',
                key:'att_type',
                width:200,
                render:(item) => {
                    const text = {
                        1:'固定班制-每日相同班次',
                        2:'固定班制-每日不同班次',
                        3:'排班制'
                    }[item.att_type];
                    return <div>{text}</div>
                }
            },
            {
                title:'弹性',
                key:'is_flexible',
                width:100,
                render:(item) => {
                    const text = {
                        0:'不弹性',
                        1:'弹性',
                    }[item.is_flexible];
                    return <div>{text}</div>
                }
            },
            {
                title:'分组成员',
                key:'members',
                render:(item) => {
                    if(item.members.length <= 0){
                        return <div>未加入其它分组的全体員工</div>
                    } else {
                        const member_names = item.members.map(member => member.member_name).join(',');
                        return <div>{member_names}</div>
                    }
                }
            },
            {
                type:'action',
                width:200,
                render:(item) => {
                    return <div>
                        <span className="action" onClick={() => this.changeState('edit',() => {this.getRowData(item)})}>编辑</span>
                        {!item.is_default?<span className="action" onClick={() => this.changeModelState(true,() => {this.getRowData(item)})}>删除</span>:null}
                        <span className="action" onClick={() => this.changeState('detail',() => {this.getRowData(item)})}>详情</span>
                    </div>
                }
            }
        ];
    }
    getRowData(data=''){
        this.fromData = data;
    }
    changeState(status,callback){
        callback && callback();
        this.setState({
            status
        });
    }
    changeModelState(flag=false,callback){
        callback && callback();
        this.setState({
            delGroup:flag
        })
    }
    render(){
        return (
            <div className="m-att-group">
                {this.state.status === 'edit'?<Edit onChangeState={() => this.changeState('list')} fromData={this.fromData}/>:null}
                {this.state.status === 'list'?<List cols={this.cols} title='考勤分组' onChangeState={() => this.changeState('edit',() => {this.getRowData('')})}/>:null}
                {this.state.status === 'detail' ?<Detail {...this.fromData} showBread={true} onChangeState={() => this.changeState('list')} className='m-att_detail-page'/>:null}
                {this.state.delGroup?<DelGroup data={this.fromData} onCancel={this.changeModelState}/>:null}
            </div>
        )
    }
}
export default Group;