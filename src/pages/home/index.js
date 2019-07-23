import React from 'react';
import {Switch, Route, withRouter, Link} from 'react-router-dom'
import {
    Layout,
    Breadcrumb,
} from 'antd';
import HeaderComponent from '@/components/header/header'
import SidebarComponent from '@/components/sidebar/sidebar'
import OrderList from '../order/orderList'

const {Content, Footer} = Layout;

const breadcrumbNameMap = {
    '/index': '订单',
    '/index/orders': '订单列表',
};

function Home (props) {
    const { location } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    // console.log(pathSnippets);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        // console.log(url);
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">首页</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
        <Layout>
            <HeaderComponent />
            <Content style={{padding: '0 10px'}}>
                <Breadcrumb style={{margin: '15px 0'}}>
                    {breadcrumbItems}
                </Breadcrumb>
                <Layout style={{padding: '10px 0', background: '#fff'}}>
                    <SidebarComponent></SidebarComponent>
                    <Content style={{padding: '0 5px', minHeight: 280}}>
                        <Switch>
                            <Route path="/index/orders" component={OrderList}/>
                        </Switch>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}> ©2019 Created by LJH</Footer>
        </Layout>
    );
}

export default withRouter(Home);
