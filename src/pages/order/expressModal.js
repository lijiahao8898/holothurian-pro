import React from 'react';
import {Modal, Timeline, Button} from 'antd';

class ExpressModal extends React.Component {
    constructor (props) {
        super(props)
    }

    handleCancel = e => {
        this.props.handleCancel();
    };

    render () {
        const {visible, currentExpress} = this.props;
        let currentE;
        if(currentExpress) {
            currentE = JSON.parse(currentExpress.expressTraces);
        }
        console.log(currentE);
        return (
            <Modal
                title="物流信息"
                visible={visible}
                onCancel={this.handleCancel}
                footer={null}
            >
                <div style={{
                    height: '450px',
                    overflow: 'auto'
                }}>
                <Timeline>
                    {currentE && currentE.Traces.map((item, index) => {
                        if((index + 1) === currentE.Traces.length) {
                            return (
                                <Timeline.Item color="green">
                                    <p>{item.AcceptTime} {item.AcceptStation}</p>
                                </Timeline.Item>
                            )
                        } else {
                            return (
                                <Timeline.Item color="blue">
                                    <p>{item.AcceptTime} {item.AcceptStation}</p>
                                </Timeline.Item>
                            )
                        }
                    })}
                    {(!currentE || currentE.Traces.length <= 0) && <div>暂无物流信息</div>}
                </Timeline>
                </div>
            </Modal>
        );
    }
}

export default ExpressModal;
