---
order: 0
title:
  zh-CN: 拖拽
  en-US: Draggable
---

## zh-CN

可拖拽的对话框。

## en-US

Drag and drop dialog.

```jsx
import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';

class App extends React.Component {
  state = {
    visible: false,
    disabled: true,
  };

  showModal = () => {
    this.setState({
      visible: true,
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
          Open Draggable Modal
        </Button>
        <Modal
          title={
            <div
              style={{
                width: '100%',
                cursor: 'pointer',
              }}
              onMouseOver={() => {
                if (this.state.disabled) {
                  this.setState({
                    disabled: true,
                  });
                }
              }}
              onMouseOut={() => {
                this.setState({
                  disabled: false,
                });
              }}
              // fix eslintjsx-a11y/mouse-events-have-key-events
              // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
              onFocus={() => {}}
              onBlur={() => {}}
              // end
            >
              Draggable Modal
            </div>
          }
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          modalRender={modal => <Draggable disabled={this.state.disabled}>{modal}</Draggable>}
        >
          <p>
            Just don&apos;t learn physics at school and your life will be full of magic and
            miracles.
          </p>
          <br />
          <p>Day before yesterday I saw a rabbit, and yesterday a deer, and today, you.</p>
        </Modal>
      </>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
