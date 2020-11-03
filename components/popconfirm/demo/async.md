---
order: 1
title:
  zh-CN: 异步关闭
  en-US: Asynchronously close
---

## zh-CN

点击确定后异步关闭气泡确认框，例如提交表单。

## en-US

Asynchronously close a popconfirm when a the OK button is pressed. For example, you can use this pattern when you submit a form.

```jsx
import { Popconfirm, Button } from 'antd';

class App extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  showPopconfirm = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <>
        <Popconfirm
          title="Title"
          visible={visible}
          onConfirm={this.handleOk}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={this.handleCancel}
        >
          <Button type="primary" onClick={this.showPopconfirm}>
            Open Popconfirm with async logic
          </Button>
        </Popconfirm>
      </>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
