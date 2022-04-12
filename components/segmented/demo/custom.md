---
order: 1
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

ReactDOM.render(
  <>
    <Segmented
      options={[
        {
          label: (
            <>
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <div>User 1</div>
            </>
          ),
          value: 'user1',
        },
        {
          label: (
            <>
              <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              <div>User 2</div>
            </>
          ),
          value: 'user2',
        },
        {
          label: (
            <>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              <div>User 3</div>
            </>
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
            <>
              <div>Spring</div>
              <div>Jan-Mar</div>
            </>
          ),
          value: 'spring',
        },
        {
          label: (
            <>
              <div>Summer</div>
              <div>Apr-Jun</div>
            </>
          ),
          value: 'summer',
        },
        {
          label: (
            <>
              <div>Autumn</div>
              <div>Jul-Sept</div>
            </>
          ),
          value: 'autumn',
        },
        {
          label: (
            <>
              <div>Winter</div>
              <div>Oct-Dec</div>
            </>
          ),
          value: 'winter',
        },
      ]}
    />
  </>,
  mountNode,
);
```
