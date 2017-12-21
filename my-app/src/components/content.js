import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Attendence from './../pages/attendence/index.js'
import Holiday from './../pages/holiday/index.js'
import Att from './../pages/att/index.js';
import Department from './../pages/department/index.js';
import Member from './../pages/member/index.js';
export default class  extends Component{
    componentDidMount(){
        this.props.history.push('/attendence')
    }
    render(){
        return <div>
            <Switch>
                <Route path='/attendence' component={Attendence}/>
                <Route path='/holiday' component={Holiday}/>
                <Route path='/att' component={Att}/>
                <Route path='/department' component={Department}/>
                <Route path='/member' component={Member}/>
                <Route component={Attendence}/>
            </Switch>
        </div>
    }
}