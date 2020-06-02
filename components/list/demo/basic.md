---
order: 1
title:
  zh-CN: 基础列表
  en-US: Basic list
---

## zh-CN

基础列表。

## en-US

Basic list.

```jsx
import { List, Card } from 'antd';

ReactDOM.render(
  <div className="App">
    <List
      dataSource={new Array(100).fill(100)}
      pagination={{
        position: 'both',
        pageSize: 20,
        showSizeChanger: true,
        onChange: (page, pageSize) => {
          console.warn('onChange', page, pageSize);
        },
      }}
      renderItem={(item, i) => {
        return (
          <List.Item>
            <Card>
              <h2>[{i + 1}]</h2>
            </Card>
          </List.Item>
        );
      }}
    />
  </div>,
  mountNode,
);
```
