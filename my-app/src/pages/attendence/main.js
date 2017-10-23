import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import Staff from './staff.js'
import Common from './common.js'
import External from './external.js'
export default class extends Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/attendence/staff' component={Staff}/>
                    <Route path='/attendence/external' component={External}/>
                    <Route path='/attendence/common' component={Common}/>
                    <Route component={Staff}/>
                </Switch>
            </div>
        )
    }
}