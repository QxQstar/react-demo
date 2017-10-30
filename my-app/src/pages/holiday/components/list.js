import React,{Component} from 'react'
import { Checkbox ,Button,Icon} from 'antd';
import './list.css'
import fixHeight from './../../../global/fixHeight.js'
const height = fixHeight({offset:145});
export default class  extends Component {
    constructor(props){
        super(props);
        this.selectAll = this.selectAll.bind(this);
        this.selectedAll = '';
    }
    selectAll(){
        this.props.onSelectAll(!this.selectedAll);
    }
    render(){
        this.selectedAll = this.props.data.filter((item) => {return item.checked}).length >= this.props.data.length;
        return <div className='holiday_list' style={{height:height+'px'}}>
            <div className='g-list-warp'>
                <div className='g-list-header'>
                    {this.props.title}
                    {this.props.data.filter((item) => {return item.checked}).length > 0 ? <Button style={{marginLeft:'20px'}} onClick={() => this.props.delHandle({},true)}>批量删除</Button>:null}
                </div>
                {this.props.data.length > 0 ?
                    <div className='g-list-body'>
                        <table className='g-list-table' style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    {this.props.cols.map((col,index) => {
                                       if(col.type === 'action'){
                                           return <td key={index} width={col.width&&col.width}>操作</td>
                                       } else if(col.type === 'selection'){
                                            return <td key={index} width={col.width&&col.width}><Checkbox onChange={this.selectAll} checked={this.selectedAll}/></td>
                                       } else {
                                            return <td key={index} width={col.width&&col.width}>{col.title}</td>
                                       }
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.data.map(item => {
                                    return <tr key={item.id}>
                                        {this.props.cols.map((col,index) => {
                                            if(col.type ==='action'){
                                                return <td key={index} width={col.width&&col.width}>{col.render(item)}</td>
                                            } else if(col.type === 'selection') {
                                                return <td key={index} width={col.width&&col.width}>
                                                    <Checkbox onChange={() => this.props.onSelectOne({...item,...{checked:!item.checked}})} checked={item.checked}/>
                                                </td>
                                            } else {
                                                return <td key={index} width={col.width&&col.width}>{item[col.key+'_text']?item[col.key+'_text']:item[col.key]}</td>
                                            }
                                        })}
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>:
                    <div className="g-empty">
                        <Icon type="frown-o" style={{color:'#b8e0c8',fontSize:'50px'}}/>
                        <p className="word">暂无数据</p>
                    </div>
                }

            </div>
        </div>
    }
}