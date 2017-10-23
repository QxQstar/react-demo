import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import List from './externalList.js'
import Edit from './externalEdit.js'
import Detail from './detail.js'
export default class extends Component {
     componentDidMount(){
        this.props.history.push('/external/list')
    }
    render(){
        return (
            <div>
                <Route path='/external/list' component={List}/>
                <Route path='/external/edit' render={props => <Edit {...props} type='edit'/>}/>
                <Route path='/external/add' render={props => <Edit {...props} type='add'/>}/>
                <Route path='/external/detail' render={props => <Detail {...props} type='external'/>}/>
            </div>
        )
    }
}