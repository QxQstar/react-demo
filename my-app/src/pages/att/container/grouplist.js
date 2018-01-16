import React from 'react';
import {connect} from 'react-redux';
import GList from './../../../components/g-list.js';
import {Button} from 'antd'
function List(props) {
    return <div>
            <div className="g-header f-clearFix">
                <Button type='primary' className='f-fr' onClick={props.onChangeState}>新增分组</Button>
            </div>
            <GList cols={props.cols} title={props.title} data={props.data} offset={55}/>
        </div>
}
export default connect((state) => {
    return {
        data:state.att.att_group
    }
})(List)
