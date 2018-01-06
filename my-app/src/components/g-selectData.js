import React,{Component} from 'react';
import GSearch from './g-search.js'
import {Modal} from 'antd'
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
            selectedData:[...props.selectedData]
        };
        this.searchByKeyword = this.searchByKeyword.bind(this);
        this.changeSelectedData = this.changeSelectedData.bind(this);
	this.onOk = this.onOk.bind(this);
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
    delSelectData(id){
        let result
        if(this.props.type !== 'dept'){
            result = this.state.selectedData.filter((item) => item.member_id !== id);
        } else {
            result = this.state.selectedData.filter((item) => item.department_id !== id);
        }

        this.changeSelectedData(result);
    }
    onOk(){
      if(!this.props.maxNum || this.state.selectedData.length <= this.props.maxNum){
         this.props.onOk(this.state.selectedData);

         this.props.onChangeTree(false)
       }
    }
    changeSelectedData(selectedData){
        this.setState({
            selectedData
        })
    }
    createSearchBar(){
        return <ul className="search-bar f-clearFix">
            {this.searchBarVal.map((val,index) => {
                return <li key={index} className={'f-fl '+ (val === this.state.letter?'active':'')} onClick={() => this.searchByLetter(val ==='全部'?'':val)}>{val}</li>
            })}
        </ul>
    }
    render(){
        return (
            <Modal visible={this.props.visible} width={661} onCancel={() => this.props.onChangeTree(false)} onOk={this.onOk}>
                <div className="g-select-warp">
                    <div className="search_inpt">
                        <GSearch placeholder="请输入关键字" search={this.searchByKeyword} style={{width:'100%'}}/>
                    </div>
                    {this.createSearchBar()}
                    <div className="data">
                        <div className="left-result">
                            <Tree type={this.props.type} keyword={this.state.keyword} letter={this.state.letter} selectedData={this.state.selectedData} changeSelectedData={this.changeSelectedData}/>
                        </div>
                        <div className="right-result">
                             {this.props.maxNum?<p style={{margin:'10px 0 10px 10px',color:this.state.selectedData.length > this.props.maxNum?'red':'#444'}}>
                               最多选择{this.props.maxNum}项，已选{this.state.selectedData.length}项</p>
                              :null}
                            {this.state.selectedData.map(data => {
                                return <span key={data.member_id || data.department_id} className="result" onClick={() => this.delSelectData(this.props.type === 'dept'?data.department_id:data.member_id)}>{this.props.type !== 'dept'?data.member_name:data.department_name}</span>
                            })}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
SelectData.defaultProps = {
    type:'dept',
    selectedData:[]
};
export default SelectData;