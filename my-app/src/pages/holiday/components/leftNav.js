import React,{Component} from 'react'
import {NavLink as Link} from 'react-router-dom'
class LeftNav extends Component {
    render(){
        return <ul className="m-leftNav">
            <li className="nav"><Link to={`/holiday/type`} activeClassName='g-navActive' className='link'>假期类型</Link></li>
            <li className="nav"><Link to={`/holiday/day_off`} activeClassName='g-navActive' className='link'>调休</Link></li>
            <li className="nav"><Link to={`/holiday/award`} activeClassName='g-navActive' className='link'>奖励假</Link></li>
            <li className="nav"><Link to={`/holiday/annual`} activeClassName='g-navActive' className='link'>年假</Link></li>
        </ul>
    }
}
export default LeftNav;