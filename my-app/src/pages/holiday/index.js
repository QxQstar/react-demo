import React, { Component } from 'react';
import Layout from './../../components/layout.js'
import Main from './components/Main.js'
import LeftNav from './components/leftNav.js'
export default class  extends Component{
    render(){
        return (
            <Layout type={2} left={<LeftNav {...this.props}/>} right={<Main {...this.props}/>}/>
        )
    }
}