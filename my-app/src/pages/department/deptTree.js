import React,{Component} from 'react';
import {Icon,Dropdown,Menu,Modal} from 'antd'
class Tree extends Component {
    constructor(props){
        super(props);
        this.state = {
            showHandle:false
        };
        this.dept_id = '';
        this.action = this.action.bind(this);
    }
    getMenu(dept_id){
        this.dept_id = dept_id;
       return (
           <Menu onClick={this.action}>
               <Menu.Item key="0" >
                   新增子部门
               </Menu.Item>
               {dept_id > 0?<Menu.Item key="1">
                    编辑部门
               </Menu.Item>:null}
               {dept_id > 0?<Menu.Item key="2">
                   删除部门
               </Menu.Item>:null}
           </Menu>
       )
    }
    action({key}){
        if(key * 1 === 0){
            this.props.addDept(this.dept_id,'add')
        }
    }
    render(){
        const props = this.props;
        return (
            <div>
                {
                    props.depts.map(dept => {
                        if(dept.department_pid * 1 === props.pid * 1){
                            return <div key={dept.department_id}>
                                <span className='dept_name'>
                                     <Icon type="caret-right" />
                                    {dept.department_name}
                                    <Dropdown overlay={this.getMenu(dept.department_id)} trigger={['click']}>
                                        <Icon type="ellipsis" className='ellipsis'/>
                                    </Dropdown>
                                </span>
                                <Tree pid={dept.department_id} depts={props.depts}/>
                            </div>
                        }
                    })
                }
            </div>
        )
    }
}
export default class  extends Component{
    constructor(props){
        super(props);
        this.dept_pid = '';
        this.modelType = '';
        this.state = {
            depts:[{
                    department_name:'QxQstar',
                    department_pid:-1,
                    department_id:0
                }],
            addDeptModel:false,
            dept_name:''
        };
        this.addDept = this.addDept.bind(this);
        this.okAction = this.okAction.bind(this);
    }
    addDept(dept_pid,type,dept_name=''){
        this.dept_pid = dept_pid;
        this.modelType = type;
        this.setState({
            addDeptModel:true,
            dept_name:dept_name
        })
    }
    changeDeptName(event){
        const value = event.target.value;
        this.setState({
            dept_name:value
        })
    }
    closeModel(){
        this.setState({
            addDeptModel:false
        })
    }
    okAction(){
        if(this.modelType === 'add'){
            this.$http.post('/dept/add',{
                department_name:this.state.dept_name,
                department_pid:this.dept_pid
            }).then((res) =>{
                const resData = res.data || {};
                if(resData.code + '' ==='0'){

                }
            });
        }
    }
    render(){
        return (
            <div className='m-deptTree'>
                <Tree pid={-1} depts={this.state.depts} addDept={this.addDept}/>
                {this.state.addDeptModel?<Modal onOk={this.okAction} onCancel={this.closeModel} width={400} visible={true}>
                    {this.modelType !== 'del'
                        ?<input value={this.state.dept_name} onChange={(event) => {this.changeDeptName(event)}}/>
                        :<p>确定删除该部门？</p>
                    }
                </Modal>:null}
            </div>
        )
    }
    componentDidMount(){

    }
}