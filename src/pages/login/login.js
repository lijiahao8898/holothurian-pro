import React, {Component} from 'react';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import action from '@/store/action';
import {Form, Button, Input, message, Icon} from 'antd';
// function
import Api from '@/utils/api/index';
import Cookies from 'js-cookie';

// style
import './login.scss';

const FormItem = Form.Item;

// const mapStateToProps = (state, ownProps) => {
//     return state;
// };
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return bindActionCreators(action, dispatch);
// };

class Login extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            isAjax: false
        };
        this.wrapperRef = React.createRef();
    }

    componentDidMount () {
        this.wrapperRef.current.style.height = `${window.innerHeight}px`;
    }

    submit (e) {
        e.preventDefault();
        this.props.form.validateFields(async (err, value) => {
            if (!err) {
                if (this.state.isAjax) {
                    message.info('请勿重复提交！');
                    return;
                }
                this.setState({isAjax: true});
                const data = await Api('post', 'login', value, 'headers');
                if (data.code === 200) {
                    Cookies.set('token', data.data.token);
                    message.success('登录成功！正在跳转中...', 0.5);
                    setTimeout(() => {
                        this.setState({isAjax: false});
                        this.props.history.push('/index/orders');
                    }, 1000);
                } else {
                    this.setState({isAjax: false});
                }
            }
        });
    }

    render () {
        const {getFieldDecorator} = this.props.form;
        const {isAjax} = this.state;

        return (
            <div className="login" ref={this.wrapperRef} id="wrap">
                <div className="login-bg img" id="bg">
                </div>
                <div className="login-wrapper">
                    <div className="login-title">登录</div>
                    <Form onSubmit={this.submit.bind(this)} className="login-form">
                        <div className="login-form__container">
                            <FormItem>
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '请输入用户名!'}],
                                })(
                                    <Input
                                        className="no-radius"
                                        placeholder="请输入用户名"
                                        type='text'
                                        size="large"
                                        addonBefore={<Icon type="user"/>}
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入密码!'}],
                                })(
                                    <Input
                                        className="no-radius"
                                        placeholder="请输入密码"
                                        type="password"
                                        size="large"
                                        addonBefore={<Icon type="lock"/>}
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary"
                                        className="login-form__button"
                                        htmlType="submit" loading={isAjax}>{isAjax ? '正在拼命登录中...' : '登录'}</Button>
                            </FormItem>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

Login = Form.create()(Login);

export default Login;
