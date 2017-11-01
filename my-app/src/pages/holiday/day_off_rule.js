import React,{Component} from 'react';
import ShowRule from './container/dayOffRule_show.js';
import EditRule from './container/dayOffRule_edit.js'
import './css/dayoffrule.css'
export default class extends Component {
    constructor(props){
        super(props);
        this.state={
            edit:false
        };
        this.changeState = this.changeState.bind(this);
    }
    changeState(boolean){
        this.setState({
            edit:boolean
        })
    }
    render(){
        if(this.state.edit){
            return <EditRule changeState={this.changeState}/>
        } else {
            return <ShowRule changeState={this.changeState}/>
        }
    }
}