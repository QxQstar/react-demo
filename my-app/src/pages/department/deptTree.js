import React,{Component} from 'react';
import {Icon,Dropdown,Menu,Modal,message} from 'antd';
import {updateDept} from '../../global/initBaseData.js';
import {connect} from 'react-redux';
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
                                <span className='dept_name' onClick={(event) => {event.stopPropagation();props.selectDept(dept.department_id)}}>
                                    { this.checkChildren(dept.department_id) ? <Icon style={{color:dept.department_id === props.selected_id?'#25c870':''}} className ='arrow' type={dept.spread?'caret-down':'caret-right'} onClick={() => this.changeCaretState(dept)}/> :null}
                                    <span style={{color:dept.department_id === props.selected_id?'#25c870':''}}>{dept.department_name}</span>
                                    <Dropdown overlay={this.getMenu(dept.department_id,dept.department_name)} trigger={['click']} >
                                        <Icon type="edit" className='ellipsis' style={{color:dept.department_id === props.selected_id?'#25c870':''}}/>
                                    </Dropdown>
                                </span>
                                {dept.spread?<Dept selected_id={props.selected_id} pid={dept.department_id} selectDept={props.selectDept } changeDept={props.changeDept} depts={props.depts} level={props.level + 1}/>:null}
                            </div>
                        }
                    })
                }
            </div>
        )
    }
}



class Tree extends Component{
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
                },
                title:'新增子部门'
            },
            edit:{
                'url':'/dept/edit',
                params:{
                    department_id:dept_id,
                },
                info:{
                    error:'部门编辑失败',
                    success:'部门编辑成功'
                },
                title:'编辑部门'
            },
            del:{
                'url':'/dept/del',
                params:{
                    department_id:dept_id
                },
                info:{
                    error:'部门删除失败',
                    success:'部门删除成功'
                },
                title:'删除部门'
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
    updateList(){
        updateDept.bind(this)();
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
                this.updateList();
                this.closeModel();
            }else {
                message.error(this.param.info.error);
            }
        });
    }
    render(){
        return (
            <div className='m-deptTree'>
                <div className="name">部门管理</div>
                <Dept pid={-1} selected_id={this.props.selected_id} selectDept={this.props.selectDept } depts={this.props.depts} changeDept={this.changeDept} level={1}/>
                {this.state.addDeptModel?<Modal wrapClassName='g-popup-sure' closable={false} title={this.param.title} onOk={this.okAction} onCancel={this.closeModel} width={400} visible={true}>
                    {this.modelType !== 'del'
                        ?<table className='g-from'>
                            <tbody>
                                <tr>
                                    <td className='in-h'>部门名称</td>
                                    <td><input value={this.state.dept_name} className='input'  onChange={(event) => {this.changeDeptName(event)}}/></td>
                                </tr>
                            </tbody>

                        </table>
                        :<p className="title">部门中的职员也会被删除，确定删除该部门？</p>
                    }
                </Modal>:null}
            </div>
        )
    }
}
export default connect((state) => {
    return {
        depts:(function (depts) {
            const formatDepts = [
                {
                    department_name:'QxQstar',
                    department_pid:-1,
                    department_id:0,
                    spread:true
                },
                ...depts
            ];
            return formatDepts.map(dept => ({...dept,key:dept.department_id}));
        })(state.baseData.dept)
    }
})(Tree);