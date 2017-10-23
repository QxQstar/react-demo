import React ,{Component} from 'react';
import { Button } from 'antd';
class ItemLetter extends Component {
    selectLetter(){
        this.props.changeSpread();
        this.props.selectLetter(this.props.value);
    }
    render(){
        return <li className={ 'f-di ' + (this.props.active ? 'active':'')} onClick={this.selectLetter.bind(this)}>
            {this.props.label}
        </li>
    }
}
class ListLetter extends Component {
    createListLetter(){
        let listLetter = [];
        for (let i = 65;i<= 90;i++){
            listLetter.push(String.fromCharCode(i));
        }
        this.listLetter = listLetter;
    }
    componentWillMount(){
        this.createListLetter();
    }
    render(){
        const list = this.listLetter.map((item) => {
            return <ItemLetter key={item} label={item} value={item} active={this.props.letter === item} changeSpread={this.props.changeSpread} selectLetter={this.props.selectLetter}/>
        });
        return (
            <ul className="list">
                <ItemLetter key='all' label="全部" value='' active={this.props.letter === '' || this.props.letter === ' '} changeSpread={this.props.changeSpread} selectLetter={this.props.selectLetter}/>
                {list}
            </ul>
        )
    }
}
class GFilterLetter extends Component {
    constructor(props){
        super(props);
        this.state = {
            spread:false
        }
    }
    changeSpread(){
        this.setState((prevState) => {
            return {
                spread:!prevState.spread
            }
        })
    }
    render(){
        return (
            <div className="f-di g-filter-letter" style={this.props.style}>
                <Button onClick={this.changeSpread.bind(this)}>{this.props.letter === ''?'按字母筛选':'按'+this.props.letter + '筛选'}</Button>
                {this.state.spread && <ListLetter letter={this.props.letter} changeSpread={this.changeSpread.bind(this)} selectLetter={this.props.selectLetter}/>}
            </div>
        )
    }
}
GFilterLetter.defaultProps = {
    letter:''
};
export default GFilterLetter;