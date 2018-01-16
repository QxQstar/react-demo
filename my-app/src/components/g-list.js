import React,{Component} from 'react'
import { Checkbox ,Button,Icon} from 'antd';
import '../pages/holiday/css/list.css'
import fixHeight from './../global/fixHeight.js'
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
        this.height = fixHeight({offset:this.props.offset || 0})
        this.selectedAll = this.props.data.filter((item) => {return item.checked}).length >= this.props.data.length;
        return <div className='holiday_list'>
            <div className='g-list-warp'>
                <div className='g-list-header'>
                    {this.props.title}
                    {this.props.data.filter((item) => {return item.checked}).length > 0 ? <Button style={{marginLeft:'20px'}} onClick={() => this.props.delHandle({},true)}>批量删除</Button>:null}
                </div>
                {this.props.data.length > 0 ?
                    <div className='g-list-body'>
                        <table className='g-list-table g-list-table-head'>
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
                        </table>
                        <div className="g-list-table-main" style={{height:(this.height-138)+'px'}}>
                            <table className="g-list-table">
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
                                                } else if(col.render){
                                                    return <td key={index} width={col.width&&col.width}>{col.render(item)}</td>
                                                } else {
                                                    return <td key={index} width={col.width&&col.width}>{item[col.key+'_text']?item[col.key+'_text']:item[col.key]}</td>
                                                }
                                            })}
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
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