import React,{Component} from 'react';
import PropTypes from 'prop-types';
class Greeting extends Component{
    render(){
        return <div>welcome,{this.props.name}{this.props.elemt}</div>
    }
}
Greeting.propTypes = {
    name:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
        if (!/matchme/.test(propValue[key])) {
            return new Error(
                'Invalid prop `' + propFullName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    }),
    elemt:PropTypes.element.isRequired
}
class Hello extends Component{
    render(){
        return <Greeting name={2} customArrayProp={['matchme']} elemt={<p>childd<span>fffff</span></p>}/>
    }
}
export default Hello;