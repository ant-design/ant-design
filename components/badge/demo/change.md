---
order: 4
title:
  zh-CN: 动态
  en-US: Dynamic
only: true
---

## zh-CN

展示动态变化的效果。

## en-US

The count will be animated as it changes.

```jsx
import { Badge, Button, Switch } from 'antd';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';

const ButtonGroup = Button.Group;

class Demo extends React.Component {
  state = {
    count: 5,
    show: true,
  };

  increase = () => {
    const count = this.state.count + 1;
    this.setState({ count });
  };

  decline = () => {
    let count = this.state.count - 1;
    if (count < 0) {
      count = 0;
    }
    this.setState({ count });
  };

  random = () => {
    const count = Math.floor(Math.random() * 100);
    this.setState({ count });
  };

  onChange = show => {
    this.setState({ show });
  };

  render() {
    return (
      <div>
        <div>
          <Badge count={this.state.count}>
            <a href="#" className="head-example" />
          </Badge>
          <ButtonGroup>
            <Button onClick={this.decline}>
              <MinusOutlined />
            </Button>
            <Button onClick={this.increase}>
              <PlusOutlined />
            </Button>
            <Button onClick={this.random}>
              <QuestionOutlined />
            </Button>
          </ButtonGroup>
        </div>
        <div style={{ marginTop: 10 }}>
          <Badge dot={this.state.show}>
            <a href="#" className="head-example" />
          </Badge>
          <Switch onChange={this.onChange} checked={this.state.show} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
