import React ,{Component} from 'react';
import Edit from './container/groupedit.js';
import {Button} from 'antd'
class Group extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:'list'
        };
        this.changeState = this.changeState.bind(this);
    }
    changeState(status){
        this.setState({
            status
        });
    }
    render(){
        return (
            <div className="m-att-group">
                {this.state.status !== 'edit' ? <div className="g-header f-clearFix">
                    <Button type='primary' className='f-fr' onClick={() => this.changeState('edit')}>新增分组</Button>
                </div>:null}
                {this.state.status === 'edit'?<Edit onChangeState={() => this.changeState('list')}/>:null}
            </div>
        )
    }
}
export default Group