import React,{Component} from 'react'
import { Tabs } from 'antd';
import List from './day_off_list.js'
const TabPane = Tabs.TabPane;
export default class extends Component {
    render(){
        return <div className='m-holiday_dayOff' style={{padding:'20px'}}>
                <Tabs defaultActiveKey="list" type="card">
                    <TabPane tab="调休时间管理" key="list">
                        <List/>
                    </TabPane>
                    <TabPane tab="调休规则" key="rule">Content of Tab Pane 2</TabPane>
                </Tabs>
        </div>
    }
}