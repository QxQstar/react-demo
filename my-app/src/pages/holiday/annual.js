import React,{Component} from 'react'
import { Tabs } from 'antd';
import List from './annual_list'
import RuleEdit from './container/annualRule_edit.js'
import RuleList from './container/annualRule_list.js'
const TabPane = Tabs.TabPane;
export default class extends Component {
    constructor(props){
        super(props);
        this.state={
            type:'show'
        };
        this.cols = [
            {
                title:'类型',
                key:'type_text'
            },
            {
                title:'大于等于年数',
                key:'gt'
            },
            {
                title:'小于年数',
                key:'lt'
            },
            {
                title:'年假天数',
                key:'annual'
            }
        ];
        this.changeState = this.changeState.bind(this);
    }
    changeState(state){
        this.setState({
            type:state
        })
    }
    render(){
        return <div className='m-holiday_annual'>
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="年假时间管理" key="1">
                    <List />
                </TabPane>
                <TabPane tab="年假规则" key="2">
                    {this.state.type ==='show'?<RuleList changeState={this.changeState} cols={this.cols}/>:<RuleEdit changeState={this.changeState}/>}
                </TabPane>
            </Tabs>
        </div>
    }
}