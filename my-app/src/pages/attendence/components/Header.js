import React,{Component} from 'react';
import GSearch from '../../../components/g-search.js'
import GFilterLetter from '../../../components/g-filter-letter.js'
class Header extends Component{
    render(){
        return(
            <div className="g-header">
                <GSearch search={this.props.search} placeholder={this.props.placeholder}/>
                <GFilterLetter style={{marginLeft:'20px'}} letter={this.props.letter} selectLetter={this.props.selectLetter}/>
                {this.props.addContact ? this.props.addContact:null}
            </div>
        )
    }
}
export default Header;