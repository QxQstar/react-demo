import React from 'react';
import {connect} from 'react-redux';
import GList from './../../../components/g-list.js';
function List(props) {
    console.log(props.data);
    return <GList cols={props.cols} title={props.title} data={props.data}/>
}
export default connect((state) => {
    return {
        data:state.att.att_group
    }
})(List)
