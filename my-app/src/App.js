import React, { Component } from 'react';
import Layout from './components/layout.js'
import './App.css';
import './css/leftNav.css'
import Menu from './components/menu.js'
import Main from './components/content.js'
export default class  extends Component {
    render(){
        return (
            <Layout type={2} left={<Menu {...this.props}/>} right={<Main {...this.props}/>}></Layout>
        )
    }
}