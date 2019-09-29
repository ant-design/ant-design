---
order: 98
title:
  zh-CN: 滑动
  en-US: Slide
---

## zh-CN

可以左右滑动 容纳更多标签。

## en-US

In order to fit in more tabs, they can slide left and right.

```jsx
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class SlidingTabsDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
    };
  }

  render() {
    const { mode } = this.state;
    return (
      <div>
        <Tabs
          defaultActiveKey="1"
          tabPosition={mode}
          style={{ height: 220 }}
          slide={{ pageSize: 5, speed: 5 }}
        >
          {[...Array(30).keys()].map(i => (
            <TabPane tab={`Tab-${i}`} key={i}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 120,
                  backgroundColor: '#fff',
                }}
              >
                Content of tab {i}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

ReactDOM.render(<SlidingTabsDemo />, mountNode);
```
