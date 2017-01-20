---
order: 7
title:
  zh-CN: 自定义位置
  en-US: To customize the position of modal
---

## zh-CN

`1.0` 之后，Modal 的 `align` 属性被移除，您可以直接使用 `style.top` 或配合其他样式来设置对话框位置。

## en-US

After release `1.0`,  Modal's `align` prop was removed. You can use `style.top` or other styles to
set position of modal dialog.

````__react
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
        <Button type="primary" onClick={() => this.setModal1Visible(true)}>Display a modal dialog at 20px to Top</Button>
        <Modal
          title="20px to Top"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
        <br /><br />
        <Button type="primary" onClick={() => this.setModal2Visible(true)}>Vertically centered modal dialog</Button>
        <Modal
          title="Vertically centered modal dialog"
          wrapClassName="vertical-center-modal"
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>
    );
  },
});

ReactDOM.render(<App />, mountNode);
````

````css
/* use css to set position of modal */
.vertical-center-modal {
  text-align: center;
  white-space: nowrap;
}

.vertical-center-modal:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  width: 0;
}

.vertical-center-modal .ant-modal {
  display: inline-block;
  vertical-align: middle;
  top: 0;
  text-align: left;
}

/*
// Use flex which not working in IE
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vertical-center-modal .ant-modal {
  top: 0;
}
*/
````
