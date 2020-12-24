---
order: 13
title:
  zh-CN: 自定义渲染对话框
  en-US: Custom modal content render
---

## zh-CN

自定义渲染对话框, 可通过 `react-draggable` 来实现拖拽。

## en-US

Custom modal content render. use `react-draggable` implements draggable.

```jsx
import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';

class App extends React.Component {
  state = {
    visible: false,
    disabled: true,
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
  };

  draggleRef = React.createRef();

  showModal = () => {
    this.setState(
      {
        visible: true,
      },
      () => {
        this.setBounds();
      },
    );
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

  setBounds = () => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = this.draggleRef?.current.getBoundingClientRect();
    this.setState({
      bounds: {
        left: -targetRect.left,
        right: clientWidth - targetRect?.right,
        top: -targetRect.top,
        bottom: clientHeight - targetRect?.bottom,
      },
    });
  };

  render() {
    const { bounds, disabled, visible } = this.state;
    return (
      <>
        <Button onClick={this.showModal}>Open Draggable Modal</Button>
        <Modal
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if (disabled) {
                  this.setState({
                    disabled: false,
                  });
                }
              }}
              onMouseOut={() => {
                this.setState({
                  disabled: true,
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
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          modalRender={modal => (
            <Draggable disabled={disabled} bounds={bounds}>
              <div ref={this.draggleRef}>{modal}</div>
            </Draggable>
          )}
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
