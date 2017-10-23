import React,{Component} from 'react'
import {NavLink as Link} from 'react-router-dom'
import '../leftNav.css'
class LeftNav extends Component {
    render(){
        return <ul className="m-leftNav">
            <li className="nav"><Link to={`/staff`} activeClassName='g-navActive' className='link'>公司职员</Link></li>
            <li className="nav"><Link to={`/external`} activeClassName='g-navActive' className='link'>外部联系人</Link></li>
            <li className="nav"><Link to={`/common`} activeClassName='g-navActive' className='link'>常用联系人</Link></li>
        </ul>
    }
}
export default LeftNav;