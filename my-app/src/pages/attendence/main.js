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
                    <Route path='/staff' component={Staff}/>
                    <Route path='/external' component={External}/>
                    <Route path='/common' component={Common}/>
                    <Route component={Staff}/>
                </Switch>
            </div>
        )
    }
}