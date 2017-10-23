import React,{Component} from 'react';
import Main from './main.js'
import LeftNav from './components/leftNav.js'
import Layout from '../../components/layout.js'
class Index extends Component {
    componentDidMount(){
        this.props.history.push('/attendence/staff')
    }
    render(){
        return (
            <Layout type={2} left={<LeftNav {...this.props}/>} right={<Main {...this.props}/>}></Layout>
        )
    }
}
export default Index;