import React ,{Component} from 'react';
import {Route} from 'react-router-dom'
import Group from './group.js';
export default class Index extends Component{
    render(){
        return (
            <Route component={Group}/>
        )
    }
}