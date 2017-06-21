---
order: 1
title:
  zh-CN: 异步关闭
  en-US: Asynchronously close
---

## zh-CN

点击确定后异步关闭对话框，例如提交表单。

## en-US

Asynchronously close a modal dialog when a user clicked OK button, for example,
you can use this pattern when you submit a form.

````jsx
import { Modal, Button } from 'antd';

class App extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
        <Modal title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
