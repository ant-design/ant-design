---
order: 7
title: 自定义位置
---

`1.0` 之后，Modal 的 `align` 属性被移除，您可以直接使用 `style.top` 或配合其他样式来设置对话框位置。

````jsx
import { Modal, Button } from 'antd';

const App = React.createClass({
  getInitialState() {
    return {
      modal1Visible: false,
      modal2Visible: false,
    };
  },
  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  },
  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  },
  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.setModal1Visible(true)}>显示距离顶部 20px 的对话框</Button>
        <Modal
          title="距离顶部 20px 的对话框"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
          <p>对话框的内容</p>
          <p>对话框的内容</p>
          <p>对话框的内容</p>
        </Modal>
        <Button type="primary" onClick={() => this.setModal2Visible(true)}>显示垂直居中的对话框</Button>
        <Modal
          title="垂直居中的对话框"
          wrapClassName="vertical-center-modal"
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
        >
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
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vertical-center-modal .ant-modal {
  top: 0;
}
````
