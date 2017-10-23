import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import List from './staffList.js'
import Detail from './detail.js'
export default class  extends Component {
    componentDidMount(){
        this.props.history.push('/attendence/staff/list')
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/attendence/staff/list' component={List}/>
                    <Route path='/attendence/staff/detail' render={(props) => <Detail {...props} type='staff'/>}/>
                    <Route component={List}/>
                </Switch>
            </div>
        )
    }
}