import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import List from './staffList.js'
import Detail from './detail.js'
export default class  extends Component {
    componentDidMount(){
        this.props.history.push('/staff/list')
    }
    render(){
        return (
            <div>
                <Route path='/staff/list' component={List}/>
                <Route path='/staff/detail' render={(props) => <Detail {...props} type='staff'/>}/>
            </div>
        )
    }
}