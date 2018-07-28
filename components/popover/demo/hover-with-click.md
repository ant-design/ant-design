---
order: 3
title:
  zh-CN: 悬停点击弹出窗口
  en-US: Hover with click popover
---

## zh-CN

以下示例显示如何创建可悬停和单击的弹出窗口。

## en-US

The following example shows how to create a popover which can be hovered and clicked.

````jsx
import { Popover, Button } from 'antd';

const hoverContent = (
  <div>
    This is hover content.
  </div>
);

const clickContent = (
  <div>
    This is click content.
  </div>
);

const initalState = {
  clicked: false,
  hovered: false,
};

class App extends React.Component {
  state = initalState;

  hide = () => {
    this.setState({
      ...initalState,
    });
  }

  handleHoverChange = (visible) => {
    this.setState({
      hovered: visible,
      clicked: false,
    });
  }

  handleClickChange = (visible) => {
    this.setState({
      clicked: visible,
      hovered: false,
    });
  }

  render() {
    return (
      <Popover
        key="1"
        style={{ width: 500 }}
        content={hoverContent}
        title="Hover title"
        trigger="hover"
        visible={this.state.hovered}
        onVisibleChange={this.handleHoverChange}
      >
        <Popover
          key="2"
          content={[clickContent, <a onClick={this.hide}>Close</a>]}
          title="Click title"
          trigger="click"
          visible={this.state.clicked}
          onVisibleChange={this.handleClickChange}
        >
          <Button>Hover and click / 悬停并单击</Button>
        </Popover>
      </Popover>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
