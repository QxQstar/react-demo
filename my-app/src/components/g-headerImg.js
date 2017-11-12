import React,{Component} from 'react';
import './headerImg.css'
class HeaderImg extends Component{
    constructor(props) {
        super(props);
        this.color = ['rgb(32, 167, 253)', 'rgb(255, 179, 52)', 'rgb(255, 131, 54)'];
        this.img = props.imgSrc ? props.imgSrc : props.member_name[0];
        this.style = Object.assign({background:this.color[props.member_id%3]},{...this.props.style});
    }
    render(){
        return (
            <div className={'m-headerImg '+this.props.className} style={this.style}>
                <div className="headerImg-inner" onClick={this.props.onClick}>
                    <div className='inner'>
                        {this.img}
                    </div>
                </div>
            </div>
        )
    }
}
HeaderImg.defaultProps = {
    className:'',
    onClick:function () {}
};
export default HeaderImg;