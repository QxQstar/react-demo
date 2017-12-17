import React,{Component} from 'react';
import {Icon,Dropdown,Menu,Modal,message} from 'antd'
// 递归遍历出部门的树状结构
class Dept extends Component {
    constructor(props){
        super(props);
        this.state = {
            showHandle:false,
            changeSpread:false
        };
        this.action = this.action.bind(this);
        this.changeCaretState = this.changeCaretState.bind(this);
    }
    getMenu(dept_id,dept_name){
       return (
           <Menu onClick={({key}) => this.action(key,dept_id,dept_name)}>
               <Menu.Item key="0" >
                   新增子部门
               </Menu.Item>
               {dept_id > 0?<Menu.Item key="1">
                    编辑部门
               </Menu.Item>:null}
               {!this.checkChildren(dept_id)?<Menu.Item key="2">
                   删除部门
               </Menu.Item>:null}
           </Menu>
       )
    }
    // 检查部门是否有子部门
    checkChildren(dept_id){
        return this.props.depts.find((dept) => dept.department_pid * 1 === dept_id * 1);
    }
    // 修改部门是否展开的状态
    changeCaretState(dept){
        this.props.depts.some(cur => {
            if(cur.department_id * 1=== dept.department_id * 1){
                cur.spread = !cur.spread;
                return true
            }
        });
        this.setState(function (prevState) {
            return {
                changeSpread:!prevState.changeSpread
            }
        })
    }
    action(key,dept_id,dept_name){
        if(key * 1 === 0){
            this.props.changeDept(dept_id,'add')
        } else if(key * 1 === 1){
            this.props.changeDept(dept_id,'edit',dept_name)
        } else {
            this.props.changeDept(dept_id,'del');
        }
    }
    render(){
        const props = this.props;
        return (
            <div data-changeSpread={this.state.changeSpread}>
                {
                    props.depts.map(dept => {
                        if(dept.department_pid * 1 === props.pid * 1){
                            return <div key={dept.department_id} style={{paddingLeft:8*props.level + 'px'}}>
                                <span className='dept_name'>
                                    { this.checkChildren(dept.department_id) ? <Icon className ='arrow' type={dept.spread?'caret-down':'caret-right'} onClick={() => this.changeCaretState(dept)}/> :null}
                                    {dept.department_name}
                                    <Dropdown overlay={this.getMenu(dept.department_id,dept.department_name)} trigger={['click']}>
                                        <Icon type="edit" className='ellipsis'/>
                                    </Dropdown>
                                </span>
                                {dept.spread?<Dept pid={dept.department_id} changeDept={props.changeDept} depts={props.depts} level={props.level + 1}/>:null}
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
        this.modelType = '';
        this.param = '';
        this.state = {
            depts:[],
            addDeptModel:false,
            dept_name:''
        };
        this.changeDept = this.changeDept.bind(this);
        this.okAction = this.okAction.bind(this);
        this.closeModel = this.closeModel.bind(this);
    }
    // 修改部门
    changeDept(dept_id,type,dept_name=''){
        this.modelType = type;
        this.param = {
            add:{
                url:'/dept/add',
                params:{
                    department_pid:dept_id
                },
                info:{
                    error:'部门添加失败',
                    success:'部门添加成功'
                }
            },
            edit:{
                'url':'/dept/edit',
                params:{
                    department_id:dept_id,
                },
                info:{
                    error:'部门编辑失败',
                    success:'部门编辑成功'
                }
            },
            del:{
                'url':'/dept/del',
                params:{
                    department_id:dept_id
                },
                info:{
                    error:'部门删除失败',
                    success:'部门删除成功'
                }
            }
        }[type];
        this.setState({
            addDeptModel:true,
            dept_name:dept_name,
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
    // 获取部门列表
    fetchData(){
        this.$http.get('/dept/list').then(res => {
            const resData = res.data || {};
            if(resData.code + '' === '0'){
                this.setState({
                    depts:[
                        {
                            department_name:'QxQstar',
                            department_pid:-1,
                            department_id:0,
                            spread:true
                        },
                        ...resData.data
                    ]
                });
            }else {
                message.error('获取部门列表失败');
            }
        })
    }
    // 确认操作
    okAction(){
        this.$http.post(this.param.url,{
            ...this.param.params,
            department_name:this.state.dept_name
        }).then((res) => {
            const resData = res.data || {};
            if(resData.code + '' ==='0'){
                message.success(this.param.info.success);
                this.fetchData();
                this.closeModel();
            }else {
                message.error(this.param.info.error);
            }
        });
    }
    render(){
        return (
            <div className='m-deptTree'>
                <Dept pid={-1} depts={this.state.depts} changeDept={this.changeDept} level={1}/>
                {this.state.addDeptModel?<Modal onOk={this.okAction} onCancel={this.closeModel} width={400} visible={true}>
                    {this.modelType !== 'del'
                        ?<table className='g-from' style={{marginTop:'30px'}}>
                            <tbody>
                                <tr>
                                    <td className='in-h'>部门名称</td>
                                    <td><input value={this.state.dept_name} className='input'  onChange={(event) => {this.changeDeptName(event)}}/></td>
                                </tr>
                            </tbody>

                        </table>
                        :<p>部门中的职员也会被删除，确定删除该部门？</p>
                    }
                </Modal>:null}
            </div>
        )
    }
    componentDidMount(){
        this.fetchData();
    }
}