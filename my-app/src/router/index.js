import React,{Component} from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import App from './../App.js';
export default class  extends Component {
    render() {
        return <Router>
            <Route component={App}/>
        </Router>
    }
}