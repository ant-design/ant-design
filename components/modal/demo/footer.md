---
order: 2
title:
  zh-CN: 自定义页脚
  en-US: Customized Footer
---

## zh-CN

更复杂的例子，自定义了页脚的按钮，点击提交后进入 loading 状态，完成后关闭。

不需要默认确定取消按钮时，你可以把 `footer` 设为 `null`。

## en-US

A more complex example which define a customized footer button bar. The dialog will change to loading state after clicking the submit button, and when the loading is done, the modal dialog will be closed.

You could set `footer` to `null` if you don't need default footer buttons.

```jsx
import React, {useState} from 'react'
import { Modal, Button } from 'antd';

const App = () => {
  const[modalSet,setModalSet] = useState({
    loading: false,
    visible: true
  });
  
  const showModal = () => {
    setModalSet({
      visible: true
    });
  };

  const handleOk = e => {
    console.log(e);
    setModalSet({
      loading: true
    });
    setTimeout(() => {
      setModalSet({
        loading: false,
        visible: false
      });
    },3000);
  };

  handleCancel = e => {
    console.log(e);
    setModalSet({ visible: false });
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal with customized footer
      </Button>
      <Modal
        visible={visible}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

ReactDOM.render(<App />, mountNode);
```
