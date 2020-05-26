---
order: 7
title:
  en-US: Icon Menu Item Columns
---

## en-US

Grid to use for adding an icon to a menu item.

```jsx
import { Menu } from '@allenai/varnish';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { IconMenuItemColumns } = Menu;

function handleClick(e) {
  console.log('click', e);
}

ReactDOM.render(
  <Menu onClick={handleClick} style={{ width: 256 }} mode="vertical">
    <Menu.Item key="1">
      <IconMenuItemColumns>
        <MailOutlined />
        <span>Option 1</span>
      </IconMenuItemColumns>
    </Menu.Item>
    <Menu.Item key="2">
      <IconMenuItemColumns>
        <AppstoreOutlined />
        <span>Option 2</span>
      </IconMenuItemColumns>
    </Menu.Item>
    <Menu.Item key="3">
      <IconMenuItemColumns>
        <SettingOutlined />
        <span>Option 3</span>
      </IconMenuItemColumns>
    </Menu.Item>
  </Menu>,
  mountNode,
);
```
