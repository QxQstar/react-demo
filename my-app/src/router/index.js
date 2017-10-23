import React,{Component} from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Attendence from './../pages/attendence/index.js'
export default class  extends Component {
    render() {
        return <Router>
            <Route component={Attendence}/>
        </Router>
    }
}