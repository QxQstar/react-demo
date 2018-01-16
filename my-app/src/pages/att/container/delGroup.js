/**
 * Created by Gouuse on 2018/1/16 0016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Modal} from 'antd';
function DelGroup(props) {
    return <Modal visible={true} wrapClassName='g-popup-sure' closable={false} onCancel={() => props.onCancel()} onOk={() => props.del(props.data)} title='删除考勤分组'>
        <p className="title">您是否要删除该考勤分组？</p>
        <p className="info">删除后该组成员将会根据规则自动进入其他分组
            规则：员工>部门>默认分组</p>
    </Modal>
}
export default connect(() => {
    return {}
},(dispatch,props) => {
    return {
        del(data){
            dispatch({
                type:'del_att_group',
                data:data
            });
            props.onCancel();
        }
    }
})(DelGroup);