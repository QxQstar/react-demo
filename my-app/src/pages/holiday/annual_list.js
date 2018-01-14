import React,{Component} from 'react';
import {Button} from 'antd'
import GSearch from "../../components/g-search.js";
import List from './container/annualList.js';
export default class extends Component{
    constructor(props){
        super(props);
        this.state = {
            keyword:''
        };
        this.search = this.search.bind(this);
        this.cols = [
            {
                title:'姓名',
                key:'member_name'
            },
            {
                title:'部门',
                key:'department_name'
            },
            {
                title:'工号',
                key:'work_num'
            },
            {
                title:'剩余年假(小时)',
                key:'remove_time'
            },
            {
                title:'年假总额(小时)',
                key:'all_time'
            },
            {
                title:'操作',
                type:'action',
                render:(item) => {
                    return <div>
                        <span className="action" onClick={() => this.editDayOff('编辑年假','edit_ann',item)}>编辑</span>
                        <span className="action" onClick={() => this.delHandle(item)}>删除</span>
                    </div>
                }
            }
        ];
    }
    search(value){
        this.setState({
            keyword:value
        })
    }
    render(){
        return (
            <div>
                <div className="g-header">
                    <GSearch placeholder='姓名/工号' search={this.search}/>
                    <Button type='primary' className='f-fr' >新增年假</Button>
                </div>
                <List cols={this.cols} title='年假时间' keyword={this.state.keyword}/>
            </div>
        )
    }
}