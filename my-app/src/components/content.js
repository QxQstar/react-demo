import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Attendence from './../pages/attendence/index.js'
import Holiday from './../pages/holiday/index.js'
import Att from './../pages/att/index.js';
import Deparment from './../pages/department/index.js'
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
                <Route paht='/department' component={Deparment}/>
                <Route componen={Attendence}/>
            </Switch>
        </div>
    }
}