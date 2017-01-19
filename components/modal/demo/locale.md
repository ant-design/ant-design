---
order: 6
title: 
  zh-CN: 国际化
  en-US: Internationalization
---

## zh-CN

设置 `okText` 与 `cancelText` 以自定义按钮文字。

## en-US

To customize the text of the buttons, you need to set `okText` and `cancelText` props.

````__react
import { Modal, Button } from 'antd';

const LocalizedModal = React.createClass({
  getInitialState() {
    return { visible: false };
  },
  showModal() {
    this.setState({
      visible: true,
    });
  },
  handleOk() {
    this.setState({
      visible: false,
    });
  },
  handleCancel() {
    this.setState({
      visible: false,
    });
  },
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Show Modal</Button>
        <Modal title="Modal" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          okText="OK" cancelText="Cancel"
        >
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </Modal>
      </div>
    );
  },
});

function confirm() {
  Modal.confirm({
    title: 'Confirm',
    content: 'Bla bla ...',
    okText: 'OK',
    cancelText: 'Cancel',
  });
}

ReactDOM.render(<div>
  <LocalizedModal />
  <br />
  <Button onClick={confirm}>confirm</Button>
</div>, mountNode);
````

