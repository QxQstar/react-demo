import React,{Component} from 'react';
import { Input } from 'antd';
const Search = Input.Search;
class GSearch extends Component{
    render(){
        return <Search className="g-search f-di" style={this.props.style && this.props.style} placeholder={this.props.placeholder} onSearch={this.props.search}/>
    }
}
GSearch.defaultProps = {
    placeholder:'请输入...'
};
export default GSearch;