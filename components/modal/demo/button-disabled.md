---
order: 11
title:
  zh-CN: 禁用页脚按钮
  en-US: Footer buttons disable
---

## zh-CN

使用 `okButtonDisabled` 和 `cancelButtonDisabled` 可分别禁用确定按钮和取消按钮。

## en-US

Using `okButtonDisabled` and `cancelButtonDisabled` can disable the ok button and cancel button.

````jsx
import { Modal, Button } from 'antd';

class App extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonDisabled
          cancelButtonDisabled
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
