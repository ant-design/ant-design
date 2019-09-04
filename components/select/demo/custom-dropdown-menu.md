---
order: 21
title:
  zh-CN: 扩展菜单
  en-US: Custom dropdown
---

## zh-CN

使用 `dropdownRender` 对下拉菜单进行自由扩展。

## en-US

Customize the dropdown menu via `dropdownRender`.

```jsx
import { Select, Divider, message } from 'antd';
import { Plus } from '@ant-design/icons';

const { Option } = Select;

ReactDOM.render(
  <Select
    defaultValue="lucy"
    style={{ width: 120 }}
    dropdownRender={menu => (
      <div>
        {menu}
        <Divider style={{ margin: '4px 0' }} />
        <a
          style={{ padding: '8px', display: 'block', cursor: 'pointer' }}
          onClick={() => {
            message.info('Add an item!');
          }}
        >
          <Plus /> Add item
        </a>
      </div>
    )}
  >
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
  </Select>,
  mountNode,
);
```
