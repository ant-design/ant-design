---
order: 13
title:
  zh-CN: 自定义模态的宽度
  en-US: To customize the width of modal
---

## zh-CN

使用 `width` 来设置模态对话框的宽度。

## en-US

Use `width` to set the width of the modal dialog.

```jsx
import { Modal, Button } from 'antd';

class App extends React.Component {
  state = {
    modalVisible: false,
  };

  setmodalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    return (
      <>
        <Button type="primary" onClick={() => this.setmodalVisible(true)}>
          Vertically centered modal dialog
        </Button>
        <Modal
          title="Vertically centered modal dialog"
          centered
          visible={this.state.modalVisible}
          onOk={() => this.setmodalVisible(false)}
          onCancel={() => this.setmodalVisible(false)}
          width={1000}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
