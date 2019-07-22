import React from 'react';
import {Layout, Menu} from 'antd';

const {Header} = Layout;

class HeaderComponent extends React.Component {
    render () {
        return (
            <Header className="header">
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '52px'}}
                >
                    <Menu.Item key="1">订单</Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default HeaderComponent
