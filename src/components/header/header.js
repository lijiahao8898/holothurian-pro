import React from 'react';
import {withRouter} from "react-router-dom";
import {Layout, Menu} from 'antd';
import Cookies from 'js-cookie';
import './heder.scss';

const {Header} = Layout;

class HeaderComponent extends React.Component {

    logout = async () => {
        // const data = await Api('post', 'getLogout');
        // if(data.success) {
        // 服务端人员说不用请求接口
        Cookies.remove('token');
        this.props.history.push('/login')
        // }
    };

    render () {
        return (
            <div className="header">
                <Header>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{lineHeight: '52px', float: 'left'}}
                    >
                        <Menu.Item key="1">订单</Menu.Item>
                    </Menu>
                    <div className="logout" onClick={this.logout}>登出</div>
                </Header>
            </div>
        )
    }
}

export default withRouter(HeaderComponent)
