import React,{Component} from 'react';
import {connect} from 'react-redux'
import List from './../components/list.js';
class AnnualList extends Component {
    render(){
        return <List data={this.props.data} cols={this.props.cols} title={this.props.title}/>
    }
}
export default connect((state,props) => {
    return {
        data:(function (annnal, keyword) {
            return annnal.filter(item => {
                if(!keyword) return true;
                else return item.member_name.indexOf(keyword) >= 0 || (item.work_num + '').indexOf(keyword) >= 0;
            })
        })(state.holiday.annual,props.keyword)
    }
})(AnnualList);