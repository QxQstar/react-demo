import React,{Component} from 'react';
import Header from './components/Header.js'
import MemberList from "./components/MemberList.js";
import { Button } from 'antd';
class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            letter:'',
            keyword:''
        };
        this.gotoDetail = this.gotoDetail.bind(this);
    }
    // 按字母进行筛选
    selectLetter(letter){
        this.setState({letter})
    }
    // 按关键字搜索
    search(keyword){
        this.setState({keyword});
    }
    addContact() {
        const {history} = this.props;
        history.push('/attendence/external/add')
    }
     gotoDetail(){
        this.props.history.push('/attendence/external/detail');
    }
    render(){
        return (
            <div style={{...this.props.style}}>
                <Header selectLetter={this.selectLetter.bind(this)} letter={this.state.letter} search={this.search.bind(this)}
                        placeholder='请输入姓名'
                        addContact={<Button style={{float:'right'}} onClick={this.addContact.bind(this)}>添加联系人</Button>}/>
                <MemberList type='getExternal' filed1='attrendance' filed2='externals' url="/api/get/externalList" title="外部联系人" letter={this.state.letter} keyword={this.state.keyword} delIcon={true} gotoDetail={this.gotoDetail}/>
            </div>
        )
    }
}
export default Main;