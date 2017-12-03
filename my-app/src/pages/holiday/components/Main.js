import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom'
import Type from './../type.js'
import Day_off from './../day_off.js'
import Award from './../award.js'
import Annual from './../annual.js'
export default class  extends Component{
    constructor(props){
        super(props);
        const {history} = props;
        history.push('/holiday/type');
    }
    render(){
        return <div>
            <Switch>
                <Route path='/holiday/type' component={Type}/>
                <Route path='/holiday/day_off' component={Day_off}/>
                <Route path='/holiday/award' component={Award}/>
                <Route path='/holiday/annual' component={Annual}/>
                <Route component={Type}/>
            </Switch>
        </div>
    }
}