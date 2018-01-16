import React from 'react'
import {Modal} from 'antd'
import {connect} from 'react-redux'
function EditModel(props) {
    return <Modal onOk={props.onOk} onCancel={props.onClose} visible={true} title={props.title} closable={false}>
        {props.render()}
    </Modal>
}
export default connect(() => {return{}},(dispatch,ownProps) => {
    return {
        onOk(){
            if(ownProps.verifyFrom()){
                dispatch({
                    type:ownProps.type,
                    params:ownProps.data
                });
                ownProps.onClose();
            }
        }
    }
})(EditModel)