import React,{Component} from 'react'
class One extends Component{
    componentWillMount(){
        console.log('willmount1')
    }
    render(){
        return <div>one</div>
    }
}
class Two extends Component{
    componentWillMount(){
        console.log('willmount2')
    }
    render(){
        return <div>two</div>
    }
}
class Diff extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:'1'
        }
    }
    handleChange(event){
        const val = event.target.value;
        this.setState({
            value:val
        })
    }
    render(){
        const com = this.state.value === '1' ? <One/> : <Two/>
        return (<div>
            <input type="radio" name="show" value="1" checked={this.state.value === '1'} onChange={this.handleChange.bind(this)}/>one
            <input type="radio" name="show" value="2" checked={this.state.value === '2'} onChange={this.handleChange.bind(this)}/>two
            {com}
        </div>)
    }
}
export default Diff