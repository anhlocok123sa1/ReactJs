import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        // console.log("username: " + this.state.username);
        // console.log("password: " + this.state.password);
        this.setState({
            errMessage: ''
        })
        try {
            await handleLoginApi(this.state.username, this.state.password).then(res => {
                if( res && res.errCode !== 0) {
                    this.setState({
                        errMessage: res.message
                    })
                } else {
                    this.props.userLoginSuccess(res.user)
                    console.log('Login success');
                }
            });
            
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username: </label>
                            <input type="text" className='form-control' placeholder='Enter your username' value={this.state.username} onChange={(event => this.handleOnChangeUsername(event))} />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password: </label>
                            <div className="custom-input-password">
                                <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Enter your password' value={this.state.password} onChange={(event => this.handleOnChangePassword(event))} />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12 text-danger">
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 ">
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className='text-other-login'>Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fa-brands fa-google-plus-g google"></i>
                            <i className="fa-brands fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
