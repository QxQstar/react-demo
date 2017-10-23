import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import List from './commonList.js'
import Detail from './detail.js'
export default class extends Component {
    componentDidMount(){
        this.props.history.push('/attendence/common/list')
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/attendence/common/list' component={List}/>
                    <Route path='/attendence/common/detail' render={props => <Detail {...props} type='common'/>}/>
                    <Route component={List}/>
                </Switch>
            </div>
        )
    }
}