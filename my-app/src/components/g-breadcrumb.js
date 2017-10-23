import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
class Breadcrumb extends Component {
    render(){
        const len = this.props.breadcrumbs.length;
        const bread = this.props.breadcrumbs.map((item,index) => {
            if(index < len -1){
                return <li key={index} className='f-fl'>
                    <Link className='link' to={`${item.link}`}>{item.label}</Link>
                    <span className='separator'>{this.props.separator}</span>
                </li>
            }
            return <li key={index} className='f-fl last'>{item.label}</li>
        });
        return (
            <ul className='g-breadcrumd f-clearFix'>
                {bread}
            </ul>
        )
    }
}
Breadcrumb.defaultProps = {
    breadcrumbs:[],
    separator:'>'
};
export default Breadcrumb;