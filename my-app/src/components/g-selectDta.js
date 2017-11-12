import React,{Component} from 'react';
import GSearch from './g-search.js'
import Tree from './container/baseDataTree.js'
import './../css/tree.css'
class SelectData extends Component{
    constructor(props){
        super(props);
        this.searchBarVal = ['全部'];
        this.getSearchBarVal();
        this.state = {
            keyword:'',
            letter:'',
            selectedData:[...props.initData]
        };
        this.searchByKeyword = this.searchByKeyword.bind(this);
        this.changeSelectedData = this.changeSelectedData.bind(this);
    }
    getSearchBarVal(){
        for(let i = 65;i<91;i++){
            this.searchBarVal.push(String.fromCharCode(i))
        }
    }
    searchByKeyword(keyword){
        this.setState({
            keyword
        })
    }

    searchByLetter(letter){
        this.setState({
            letter
        })
    }
    changeSelectedData(selectedData){
        this.setState({
            selectedData
        })
    }
    createSearchBar(){
        return <ul className="search-bar f-clearFix">
            {this.searchBarVal.map((val,index) => {
                return <li key={index} className={'f-fl '+ (val === this.state.letter?'active':'')} onClick={() => this.searchByLetter(val)}>{val}</li>
            })}
        </ul>
    }
    render(){
        return (
            <div className="g-select-warp">
                <div className="search_inpt">
                    <GSearch placeholder="请输入关键字" search={this.searchByKeyword} style={{width:'100%'}}/>
                </div>
                {this.createSearchBar()}
                <div className="data">
                   <Tree type={this.props.type} keyword={this.state.keyword} letter={this.state.letter} selectedData={this.state.selectedData} changeSelectedData={this.changeSelectedData}/>
                    <div className="right-result">
                        {this.state.selectedData.map(data => {
                            return <span key={data.member_id || data.dept_id}>{data.member_name}</span>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
SelectData.defaultProps = {
    type:'dept',
    initData:[]
};
export default SelectData;