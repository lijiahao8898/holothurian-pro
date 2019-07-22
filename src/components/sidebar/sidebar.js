import React from 'react';
import {Link} from 'react-router-dom';
import {Icon, Layout, Menu} from 'antd';

const {SubMenu} = Menu;
const {Sider} = Layout;

class SidebarComponent extends React.Component {
    render () {
        return (
            <Sider width={200} style={{background: '#fff'}}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub']}
                    style={{height: '100%'}}
                >
                    <SubMenu
                        key="sub"
                        title={<span><Icon type="laptop"/>订单管理</span>}
                    >
                        <Menu.Item key="5">
                            <Link to='/index/orders'>订单列表</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default SidebarComponent;
