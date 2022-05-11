---
order: 4
title:
  zh-CN: 自定义渲染
  en-US: Custom Render
---

## zh-CN

使用 ReactNode 自定义渲染每一个 Segmented Item。

## en-US

Custom each Segmented Item by ReactNode.

```jsx
import { Avatar, Segmented } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default () => (
  <>
    <Segmented
      options={[
        {
          label: (
            <div style={{ padding: 4 }}>
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <div>User 1</div>
            </div>
          ),
          value: 'user1',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              <div>User 2</div>
            </div>
          ),
          value: 'user2',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              <div>User 3</div>
            </div>
          ),
          value: 'user3',
        },
      ]}
    />
    <br />
    <Segmented
      options={[
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Spring</div>
              <div>Jan-Mar</div>
            </div>
          ),
          value: 'spring',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Summer</div>
              <div>Apr-Jun</div>
            </div>
          ),
          value: 'summer',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Autumn</div>
              <div>Jul-Sept</div>
            </div>
          ),
          value: 'autumn',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Winter</div>
              <div>Oct-Dec</div>
            </div>
          ),
          value: 'winter',
        },
      ]}
    />
  </>
);
```
