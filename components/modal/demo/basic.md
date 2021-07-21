---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

第一个对话框。

## en-US

Basic modals.

```jsx
import { Modal, Button } from 'antd';

class App extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  delModal = () => {
    Modal.delete({
      content: <p>Do you really wanted to delete? This process cannot be undone.</p>,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Button type="primary" onClick={this.delModal}>
          Delete Modal
        </Button>
      </>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
