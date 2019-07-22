import React from 'react';
import {Table, Pagination, Button, Popconfirm, Icon, Form, Input, Select} from 'antd';
import Api from '@/utils/api/index';
import './orderList.scss';
import {accDiv, getColumnStatus} from '@/utils/tool/common';
import SendGoodsModal from './sendGoodsModal'

const { Option } = Select;

const deliveryType = [{
    label: '快递',
    value: 1
}, {
    label: '其他',
    value: 2
}];

const orderStatus = [{
    label: '待付款',
    value: 0
}, {
    label: '已付款',
    value: 1
}, {
    label: '已发货',
    value: 2
}, {
    label: '已签收',
    value: 3
}, {
    label: '交易完成',
    value: 4
}, {
    label: '退货申请',
    value: -1
}, {
    label: '退货中',
    value: -2
}, {
    label: '已退货',
    value: -3
}, {
    label: '取消交易',
    value: -4
}, {
    label: '订单超时',
    value: -5
}];

class OrderList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            pagination: {
                pageSize: 20,
                pageNum: 1,
                pageTotal: 0
            },
            searchParams: {

            },
            pageLoading: false,
            visible: false,
            currentItem: null,
            orderList: []
        };
    }

    componentDidMount () {
        this.getOrderList();
    }

    async getOrderList () {
        this.setState({
            pageLoading: true
        });
        const data = await Api('post', 'getOrderList', {
            ...this.state.searchParams,
            ...this.state.pagination
        });
        const pagination = {...this.state.pagination};
        if (data.code === 200) {
            this.setState({
                orderList: [...data.data.rows],
                pagination: Object.assign(pagination, {
                    pageTotal: data.data.total
                })
            });
        }
        this.setState({
            pageLoading: false
        })
    }

    changePage (page, pageSize) {
        const pagination = {...this.state.pagination};
        this.setState({
            pagination: Object.assign(pagination, {
                pageNum: page
            })
        }, () => {
            this.getOrderList()
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const searchParams = {...this.state.searchParams};
                this.setState({
                    searchParams: Object.assign(searchParams, fieldsValue)
                }, () => {
                    this.getOrderList();
                })
            }
        });
    };

    showSendGoodsModal (record) {
        this.setState({
            currentItem: record,
            visible: true
        })
    }

    cancelSendGoods = () => {
        this.setState({
            visible: false
        })
    };

    deleteItem () {

    }

    render () {
        const {orderList, pagination, pageLoading, visible, currentItem} = this.state;
        const { getFieldDecorator } = this.props.form;
        console.log('render');
        const columns = [
            {
                title: '商品信息',
                dataIndex: 'orderSkuDTOList',
                key: 'orderSkuDTOList',
                width: 400,
                render: (text, record, index) => {
                    return (
                        <div>
                            {text.map(item => {
                                return (
                                    <div className="order-item" key={item.id}>
                                        <img className="order-item__img" src={item.imgUrl} alt={item.itemName}/>
                                        <div className="order-item__info">
                                            <p className="order-item__itemname">{item.itemName}</p>
                                            <p>{item.skuAttr}</p>
                                            <p className="price">单价：{accDiv(item.skuSalePrice, 100)}</p>
                                            <p className="price">数量：{item.skuNumber}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                }
            }, {
                title: '买家信息',
                dataIndex: 'recipientAddressDTO',
                key: 'recipientAddressDTO',
                width: 250,
                render: (text, record, index) => {
                    return (
                        <div className="user-tr">
                            <p>{text.userName}&nbsp;{text.phone}</p>
                            <p className="user-tr__address">{text.province}{text.city}{text.area}{text.street}{text.detailAddress}</p>
                        </div>
                    );
                }
            }, {
                title: '订单信息',
                dataIndex: 'orderSn',
                key: 'orderSn',
                width: 300,
                render: (text, record) => {
                    return (
                        <div className="order-tr">
                            <p>订单编号：{record.orderSn}</p>
                            <p>订单状态：{getColumnStatus(record.orderStatus, orderStatus)}</p>
                            <p>订单总价：{accDiv(record.totalPrice, 100)}</p>
                            <p>备注：{record.remark}</p>
                        </div>
                    );
                }
            }, {
                title: '发货信息',
                dataIndex: 'expressNo',
                key: 'expressNo',
                width: 200,
                render: (text, record) => {
                    return (
                        <div className="order-tr">
                            <p>发货时间：{record.deliveryTime}</p>
                            <p>发货方式：{getColumnStatus(record.deliveryType, deliveryType)}</p>
                            <p>快递公司：{record.expressCompany}</p>
                            <p>快递号：{record.expressNo}</p>
                        </div>
                    );
                }
            }, {
                title: '操作',
                dataIndex: 'address',
                key: 'address',
                align: 'center',
                width: 120,
                fixed: 'right',
                render: (text, record, index) => {
                    return (
                        <div>
                            {record.orderStatus >= 1 && <Button className="m-r-xs m-b-xs" type="primary" size="small"
                                     onClick={this.showSendGoodsModal.bind(this, record)} ghost>发货</Button>}
                            {<Popconfirm
                                title="真的要删除这个配置吗?"
                                okText="确定"
                                cancelText="取消"
                                placement="left"
                                icon={<Icon type="question-circle" style={{fontSize: '14px'}}/>}
                                onConfirm={this.deleteItem.bind(this, record)}
                            >
                                <Button type="primary" size="small" ghost>关闭</Button>
                            </Popconfirm>}
                        </div>
                    );
                }
            },
        ];

        const TableComponent = () => {
            return (
                <div>
                    <Table
                        rowKey={'id'}
                        bordered={true}
                        dataSource={orderList}
                        columns={columns}
                        pagination={false}
                        loading={pageLoading}
                        scroll={{ x: '120%'}}/>
                    <div style={{textAlign: 'right', marginTop: '10px'}}>
                        <Pagination
                            defaultCurrent={pagination.pageNum}
                            total={pagination.pageTotal}
                            pageSize={pagination.pageSize}
                            onChange={(page, pageSize) => {
                                this.changePage(page, pageSize)
                            }}
                        />
                    </div>
                </div>
            );
        };

        return (
            <div>
                <Form onSubmit={this.handleSubmit} layout={'inline'} className="m-b-xs">
                    <Form.Item label="订单状态">
                        {getFieldDecorator('orderStatus')(
                            <Select
                                placeholder="请选择订单状态"
                                style={{
                                    width: '200px'
                                }}
                            >
                                {orderStatus.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.value}>
                                            {item.label}
                                        </Option>
                                    )
                                })}
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
                <TableComponent/>
                <SendGoodsModal
                    handleCancel={this.cancelSendGoods}
                    visible={visible}
                    currentItem={currentItem}
                ></SendGoodsModal>
            </div>
        );
    }
}

OrderList = Form.create()(OrderList);

export default OrderList;
