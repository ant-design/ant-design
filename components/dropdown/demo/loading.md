---
order: 9
title:
  zh-CN: 加载中状态
  en-US: Loading
---

## zh-CN

添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。

## en-US

A loading indicator can be added to a button by setting the `loading` property on the `Dropdown.Button`.

```jsx
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu
    items={[
      {
        label: 'Submit and continue',
        key: '1',
      },
    ]}
  />
);
export default () => {
  const [loadings, setLodings] = React.useState([]);

  const enterLoading = index => {
    const newLoadings = [...loadings];
    newLoadings[index] = true;
    setLodings(newLoadings);

    setTimeout(() => {
      setLodings(prevLoadings => {
        const temLoadings = [...prevLoadings];
        temLoadings[index] = false;
        return temLoadings;
      });
    }, 6000);
  };

  return (
    <Space direction="vertical">
      <Dropdown.Button type="primary" loading overlay={menu}>
        Submit
      </Dropdown.Button>
      <Dropdown.Button type="primary" size="small" loading overlay={menu}>
        Submit
      </Dropdown.Button>
      <Dropdown.Button
        type="primary"
        loading={loadings[0]}
        overlay={menu}
        onClick={() => enterLoading(0)}
      >
        Submit
      </Dropdown.Button>
      <Dropdown.Button
        icon={<DownOutlined />}
        loading={loadings[1]}
        overlay={menu}
        onClick={() => enterLoading(1)}
      >
        Submit
      </Dropdown.Button>
    </Space>
  );
};
```
