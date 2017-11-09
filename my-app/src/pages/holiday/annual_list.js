import React,{Component} from 'react';
import {Button} from 'antd'
import GSearch from "../../components/g-search.js";
export default class extends Component{
    constructor(props){
        super(props);
        this.state = {
            keyword:''
        };
        this.search = this.search.bind(this);
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
            </div>
        )
    }
}