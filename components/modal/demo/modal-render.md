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
    customVisible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showCustomRender = () => {
    this.setState({
      customVisible: true,
    });
  }

  handleCustomOk = e => {
    console.log(e);
    this.setState({
      customVisible: false,
    });
  };

  handleCustomCancel = e => {
    console.log(e);
    this.setState({
      customVisible: false,
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
        <Button type="primary" onClick={this.showCustomRender}>
          Custom modal content render
        </Button>
        <br/>
        <br/>
        <Button onClick={this.showModal}>
          Open Draggable Modal
        </Button>
        <Modal
          title="Custom modal content render"
          visible={this.state.customVisible}
          onOk={this.handleCustomOk}
          onCancel={this.handleCustomCancel}
          modalRender={node => {
            return React.cloneElement(node, {
              ...node.props,
              style: { opacity: .5 },
            })
          }}
        >
          <p>
            Just don&apos;t learn physics at school and your life will be full of magic and
            miracles.
          </p>
          <br />
          <p>Day before yesterday I saw a rabbit, and yesterday a deer, and today, you.</p>
        </Modal>
        <Modal
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
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
