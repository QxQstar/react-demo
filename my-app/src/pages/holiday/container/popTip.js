import React from 'react'
import {Modal} from 'antd'
import {connect} from 'react-redux'
function Dialog(props) {
    const popTips = {
        stopType:{
            title:'您是否要停用该假期类型?',
            info:'停用后员工请假不能选择该类型假期'
        },
        startType:{
            title:'您是否要启用该假期类型?',
            info:'启用后员工请假可选择该类型假期'
        },
        delType:{
            title:'您是否要删除该假期类型?',
            info:'删除后员工请假不能选择该类型假期'
        },
        delAward:{
            title:'您是否要删除该员工的调休?',
            info:'删除后该员工的调休时间全部清零，将不能请调休'
        }
    };
    return <Modal visible={true} title={props.title} onCancel={props.onClose} onOk={props.onOk}>
        <div>
            <p className='title'>{popTips[props.type].title}</p>
            <p className='info'>{popTips[props.type].info}</p>
        </div>
    </Modal>
}
export default connect(()=> {return {}},(dispatch,ownProps) => {
    return {
        onOk(){
            dispatch({
                type:ownProps.dispatch,
                params:ownProps.data
            });
            ownProps.onClose();
        }
    }
})(Dialog)