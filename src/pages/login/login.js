import React , { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import bg from './../../assets/images/bg.jpg'
import './login.scss';
import { UserLogin } from './../../redux/user.redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.loginDom = React.createRef();
        this.state = {
            phone: '',
            pwd: '',
        }
    }
    render() {
        return (
            <Fragment>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <div className='login' ref={this.loginDom}>
                    <img src={bg} alt=""/>
                    <input type="text" onChange={this.handleChange.bind(this)} name='phone' placeholder='请输入手机号码' />
                    <input type="password" onChange={this.handleChange.bind(this)} name='pwd' placeholder='请输入密码' />
                    <button className='loginBtn' onClick={this.handleLogin.bind(this)}>登录</button>
                </div>
            </Fragment>
            
        )
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleLogin() {
        let { phone , pwd } = this.state;
        if(!/^1[3|4|5|7|8][0-9]{9}$/.test(phone) || !pwd) {
            return alert('用户名密码必须输入')
        } else {
            this.props.UserLogin({phone , pwd})
        }
       
    }
    componentDidMount() {
        this.loginDom.current.style.height = (window.screen.height - 10) + "px";
    }
}


const mapState = (state) => {
	return {
        name: state.user.name,
        num: state.user.num,
        redirectTo: state.user.redirectTo
	}
}

const mapDispath = (dispatch) => {
    return {
        UserLogin({phone , pwd}) {
            dispatch(UserLogin({phone , pwd}))
        }
    }
}


export default connect(mapState,mapDispath)(Login);