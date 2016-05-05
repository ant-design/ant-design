---
order: 7
title: 自定义位置
---

`1.0` 之后，Modal 的 `align` 属性被移除，您可以直接使用 `style.top` 或配合其他样式来设置对话框位置。

````jsx
import { Modal, Button } from 'antd';

const App = React.createClass({
  getInitialState() {
    return { visible: false };
  },
  setModalVisible(visible) {
    this.setState({ visible });
  },
  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.setModalVisible(true)}>显示垂直居中的对话框</Button>
        <Modal
          title="垂直居中的对话框"
          className="vertical-center-modal"
          style={{ top: '50%' }}
          visible={this.state.visible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}>
          <p>对话框的内容</p>
          <p>对话框的内容</p>
          <p>对话框的内容</p>
        </Modal>
      </div>
    );
  },
});

ReactDOM.render(<App />, mountNode);
````

````css
/* 使用 css 技巧来动态设置的对话框位置 */
.vertical-center-modal .ant-modal-content {
  transform: translateY(-50%);
}
````
