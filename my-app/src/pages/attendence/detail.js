import React,{Component} from 'react'
import GBreadcrumb from './../../components/g-breadcrumb.js'
import GHeaderImg from './../../components/g-headerImg.js'
import {Button} from 'antd'
import {connect} from 'react-redux'
import './detail.css';
class Detail extends Component {
    constructor(props){
        super(props);
        this.breadcrumbs = {
            'common':[
                {
                    link:'/common/list',
                    label:'常用联系人'
                },
                {
                    label:'常用联系人详情'
                }
            ],
            'external':[
                {
                    link:'/external/list',
                    label:'外部联系人'
                },
                {
                    label:'外部联系人详情'
                }
            ],
            'staff':[
                {
                    link:'/staff/list',
                    label:'公司职员'
                },
                {
                    label:'公司职员详情'
                }
            ]
        };
        this.state = {
            btn_loading:false
        };
        this.del = this.del.bind(this);
        this.edit = this.edit.bind(this);
    }
    del(){
        this.props.delExter(this.props.data.member_id);
        this.props.delCommon(this.props.data);
        this.props.history.push('/attendence/external/list');
    }
    edit(){
        this.props.history.push('/attendence/external/edit');
    }
    render(){
        const {data} = this.props;
        return (
            <div className='m-detail'>
                <GBreadcrumb breadcrumbs={this.breadcrumbs[this.props.type]}/>
                {this.props.type !== 'external'?null : (
                    <div className='g-top-col'>
                        <Button type='default' style={{marginRight:'20px'}} loading={this.state.btn_loading} onClick={this.del}>删除</Button>
                        <Button type='primary' loading={this.state.btn_loading} onClick={this.edit}>编辑</Button>
                    </div>
                )}
                <div className='m-content'>
                    <div className='base f-clearFix'>
                        <GHeaderImg {...data} className='img'/>
                        <div className='word'>
                            <span className='name'>{data.member_name}</span>
                            <p>
                                <span className='title'>部门:</span>
                                {data.dpart_name}
                            </p>
                            <p>
                                <span className='title'>职位:</span>
                                {data.position}
                            </p>
                        </div>
                    </div>
                    <div className='add'>
                        <p>
                            <span className='title'>电话:</span>{data.phone}
                        </p>
                        <p>
                            <span className='title'>邮箱:</span>{data.email}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        data:state.attrendance.curMember
    }
},(dispatch) => {
    return {
        delExter(member_id) {
            dispatch({
                type: 'delExternal',
                member_id
            })
        },
        delCommon(member){
            dispatch({
                type:'delCommon',
                member
            })
        },
    }
})(Detail)