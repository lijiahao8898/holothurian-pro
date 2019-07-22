import React from 'react';
import {Modal, Form, Input, Select, Button, message} from 'antd';
import Api from '@/utils/api/index';

class SendGoodsModal extends React.Component {
    constructor (props) {
        super(props);
    }

    handleOk = (e) => {
        this.props.form.validateFields(async (err, fieldsValue) => {
            if (!err) {
                // 发货
                const data = await Api('patch', 'sendGoods', {
                    id: this.props.currentItem.id,
                    expressNo: fieldsValue.expressNo
                });
                if (data.code === 200) {
                    message.success('发货成功！');
                }
                this.props.handleCancel();
            }
        });
    };

    handleCancel = e => {
        this.props.handleCancel();
    };

    render () {
        const {visible} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <Modal
                title="发货"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确认"
                cancelText="取消"
            >
                <Form layout={'inline'}>
                    <Form.Item label="物流单号">
                        {getFieldDecorator('expressNo')(
                            <Input
                                placeholder="请输入物流单号"
                                style={{
                                    width: '200px'
                                }}
                            >
                            </Input>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

SendGoodsModal = Form.create()(SendGoodsModal);

export default SendGoodsModal;
