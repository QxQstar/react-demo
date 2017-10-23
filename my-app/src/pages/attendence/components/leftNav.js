import React,{Component} from 'react'
import {NavLink as Link} from 'react-router-dom'
class LeftNav extends Component {
    render(){
        return <ul className="m-leftNav">
            <li className="nav"><Link to={`/attendence/staff`} activeClassName='g-navActive' className='link'>公司职员</Link></li>
            <li className="nav"><Link to={`/attendence/external`} activeClassName='g-navActive' className='link'>外部联系人</Link></li>
            <li className="nav"><Link to={`/attendence/common`} activeClassName='g-navActive' className='link'>常用联系人</Link></li>
        </ul>
    }
}
export default LeftNav;