---
order: 6
title:
  zh-CN: 位置
  en-US: Position
---

## zh-CN

有四个位置，`tabPosition="left|right|top|bottom"`。在移动端下，`left|right` 会自动切换成 `top`。

## en-US

Tab's position: left, right, top or bottom. Will auto switch to `top` in mobile.

```jsx
import { Tabs, Select, Space } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

class Demo extends React.Component {
  state = {
    tabPosition: 'top',
  };

  changeTabPosition = tabPosition => {
    this.setState({ tabPosition });
  };

  render() {
    return (
      <div>
        <Space style={{ marginBottom: 16 }}>
          Tab position：
          <Select
            value={this.state.tabPosition}
            onChange={this.changeTabPosition}
            dropdownMatchSelectWidth={false}
          >
            <Option value="top">top</Option>
            <Option value="bottom">bottom</Option>
            <Option value="left">left</Option>
            <Option value="right">right</Option>
          </Select>
        </Space>
        <Tabs tabPosition={this.state.tabPosition}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
