import React,{Component} from 'react'
import { Tabs } from 'antd';
import List from './day_off_list.js'
import Rule from './day_off_rule.js'
const TabPane = Tabs.TabPane;
export default class extends Component {
    render(){
        return <div className='m-holiday_dayOff'>
                <Tabs defaultActiveKey="list" type="card">
                    <TabPane tab="调休时间管理" key="list">
                        <List/>
                    </TabPane>
                    <TabPane tab="调休规则" key="rule">
                        <Rule/>
                    </TabPane>
                </Tabs>
        </div>
    }
}