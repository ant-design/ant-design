---
order: 2
title:
  zh-CN: 骨架按钮
  en-US: Skeleton Button
---

## zh-CN

骨架按钮。

## en-US

Skeleton Button.

```jsx
import { Skeleton, Switch } from 'antd';

class Demo extends React.Component {
  state = {
    active: false,
  };

  onChange = checked => {
    this.setState({ active: checked });
  };

  render() {
    const { active } = this.state;
    return (
      <div>
        <Switch
          checkedChildren="Animation activated"
          unCheckedChildren="Animation not activated"
          checked={active}
          onChange={this.onChange}
        />
        <br />
        <br />
        <Skeleton.Button active={active} />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
