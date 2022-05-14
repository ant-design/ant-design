---
order: 7
title:
  zh-CN: 菜单隐藏方式
  en-US: The way of hiding menu.
---

## zh-CN

默认是点击关闭菜单，可以关闭此功能。

## en-US

The default is to close the menu when you click on menu items, this feature can be turned off.

```jsx
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default () => {
  const [visible, setVisible] = React.useState(false);

  const handleMenuClick = e => {
    if (e.key === '3') {
      setVisible(false);
    }
  };

  const handleVisibleChange = flag => {
    setVisible(flag);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'Clicking me will not close the menu.',
          key: '1',
        },
        {
          label: 'Clicking me will not close the menu also.',
          key: '2',
        },
        {
          label: 'Clicking me will close the menu.',
          key: '3',
        },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={visible}>
      <a onClick={e => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
```
