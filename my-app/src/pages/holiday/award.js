import React,{Component} from 'react'
import GSearch from './../../components/g-search.js'
import {Button} from 'antd'
import List from './container/awardList.js'
import PopTip from './container/popTip.js'
export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword:'',
            showPopTip:false
        };
        this.search = this.search.bind(this);
        this.onClose = this.onClose.bind(this);
        this.delAward = this.delAward.bind(this);
        this.popTipTitle = '';
        this.popTipType='';
        this.popTipDispatch = '';
        this.cols = [
            {
                type:'selection',
                width:60
            },
            {
                title:'姓名',
                key:'member_name'
            },
            {
                title:'工号',
                key:'work_num'
            },
            {
                title:'部门',
                key:'department_name'
            },
            {
                title:'奖励假总天数(天)',
                key:'total_day'
            },
            {
                title:'剩余时长(天)',
                key:'remove_day'
            },
            {
                type:'action',
                title:'操作',
                render:(item) =>{
                    return <div>
                        <span className='action'>编辑</span>
                        <span onClick={() => this.delAward(item)} className='action'>删除</span>
                    </div>
                }
            }
        ]
    }
    search(value){
        this.setState({
            keyword:value
        })
    }
    onClose(){
        this.setState({
            showPopTip:false
        });
    }
    delAward(item={},batch = false){
        if(batch){
            this.popTipTitle = '批量删除调休';
            this.popTipType='delAwardBatch';
            this.popTipDispatch = 'del_award_batch';
        } else {
            this.popTipTitle = '删除调休';
            this.popTipType='delAward';
            this.popTipDispatch = 'del_award';
            this.popTipData = item
        }
        this.setState({
           showPopTip:true
        })
    }
    render(){
        return <div className='m-holiday_award'>
            <div className='g-header'>
                <GSearch placeholder='姓名/工号' search={this.search}/>
                <Button type='primary' className='f-fr'>新增奖励假</Button>
            </div>
            <List keyword={this.state.keyword} title='奖励假时间' cols={this.cols}/>
            {this.state.showPopTip ? <PopTip onClose={this.onClose} data={this.popTipData} title={this.popTipTitle} type={this.popTipType} dispatch={this.popTipDispatch}/>:null}
        </div>
    }
}