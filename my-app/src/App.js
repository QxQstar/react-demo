import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Layout from './components/layout.js'
import './App.css';
import './css/leftNav.css'
import Menu from './components/menu.js'
import Main from './components/content.js'
import Warn from './pages/warn/index.js'
export default class  extends Component {
    componentDidMount(){
        this.$http.get('/check_connect').then((res) => {
            const resData = res.data;
            if(resData.code + '' === '0'){
                if(!(resData.data.connect_database * 1)){
                    this.props.history.push('/warn')
                }
            }
        });
    }
    render(){
        return (
               <Switch>
                    <Route path="/warn" component={Warn}/>
                    <Route path="/" render={(props) => {
                        return <Layout type={2} left={<Menu {...props}/>} right={<Main {...props}/>}/>
                    }}/>
                </Switch>
        )
    }
}