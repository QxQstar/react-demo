import React,{Component} from 'react'
import GSearch from './../../components/g-search.js'
import {Button} from 'antd'
import List from './container/awardList.js'
export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword:'',
            selectAll:false
        };
        this.search = this.search.bind(this);
        this.selectAllHandle = this.selectAllHandle.bind(this);
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
                render(item){
                    return <div>
                        <span className='action'>编辑</span>
                        <span className='action'>删除</span>
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
    selectAllHandle(flag){
        this.setState({
            selectAll:flag
        })
    }
    render(){
        return <div className='m-holiday_award'>
            <div className='g-header'>
                <GSearch placeholder='姓名/工号' search={this.search}/>
                <Button type='primary' className='f-fr'>新增奖励假</Button>
            </div>
            <List selectAll={this.state.selectAll} onSelectAll={this.selectAllHandle} keyword={this.state.keyword} title='奖励假时间' cols={this.cols}/>
        </div>
    }
}