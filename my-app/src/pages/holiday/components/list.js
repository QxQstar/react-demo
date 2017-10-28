import React,{Component} from 'react'
import { Checkbox } from 'antd';
import './list.css'
import fixHeight from './../../../global/fixHeight.js'
const height = fixHeight({offset:55});
export default class  extends Component {
    constructor(props){
        super(props);
        this.selectAll = this.selectAll.bind(this);
    }
    selectAll(){
        this.props.onSelectAll(!this.props.selectAll);
    }
    render(){
        return <div className='holiday_list' style={{height:height+'px'}}>
            <div className='g-list-warp'>
                <div className='g-list-header'>
                    {this.props.title}
                </div>
                <div className='g-list-body'>
                    <table className='g-list-table' style={{width:'100%'}}>
                        <thead>
                            <tr>
                                {this.props.cols.map((col,index) => {
                                   if(col.type === 'action'){
                                       return <td key={index} width={col.width&&col.width}>操作</td>
                                   } else if(col.type === 'selection'){
                                        return <td key={index} width={col.width&&col.width}><Checkbox onChange={this.selectAll} checked={this.props.selectAll}/></td>
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
                                                <Checkbox checked={item.checked}/>
                                            </td>
                                        } else {
                                            return <td key={index} width={col.width&&col.width}>{item[col.key+'_text']?item[col.key+'_text']:item[col.key]}</td>
                                        }
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}