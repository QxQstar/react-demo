/**
 * Created by Gouuse on 2018/1/26 0026.
 */
import React ,{ Component }from 'react';
import {Icon} from 'antd';
import {NavLink as Link} from 'react-router-dom';
import './index.css'
export default class Warn extends Component{
    render(){
        return <div className="m-warn">
            <Icon type="frown-o" className="warning"/>
            <p className="info">你没有连接数据库，部分数据或功能会出现异常！！！<Link to={`/attendence`} >继续访问</Link></p>
        </div>
    }
};