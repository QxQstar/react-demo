import React,{Component} from 'react'
class ParentCom extends Component{
    render(){
        return <ChildrenCom propFunc={function (elem){ this.input = elem}.bind(this)}/>
    }
    componentDidMount(){
       this.input.focus();
    }
}
function ChildrenCom(props) {
    return <input ref={props.propFunc} style={{marginLeft:'200px'}}/>
}
export default ParentCom