import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import List from './externalList.js'
import Edit from './externalEdit.js'
import Detail from './detail.js'
export default class extends Component {
     componentDidMount(){
        this.props.history.push('/attendence/external/list')
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/attendence/external/list' component={List}/>
                    <Route path='/attendence/external/edit' render={props => <Edit {...props} type='edit'/>}/>
                    <Route path='/attendence/external/add' render={props => <Edit {...props} type='add'/>}/>
                    <Route path='/attendence/external/detail' render={props => <Detail {...props} type='external'/>}/>
                    <Route component={List}/>
                </Switch>
            </div>
        )
    }
}