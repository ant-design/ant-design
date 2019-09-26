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
import { Select, Divider } from 'antd';
import { Plus } from '@ant-design/icons';

const { Option } = Select;

let index = 0;

class App extends React.Component {
  state = {
    items: ['jack', 'lucy'],
  };

  addItem = () => {
    console.log('addItem');
    const { items } = this.state;
    this.setState({
      items: [...items, `New item ${index++}`],
    });
  };

  render() {
    const { items } = this.state;
    return (
      <Select
        style={{ width: 240 }}
        placeholder="custom dropdown render"
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <a
              style={{ padding: '8px', display: 'block', cursor: 'pointer' }}
              onClick={this.addItem}
            >
              <Plus /> Add item
            </a>
          </div>
        )}
      >
        {items.map(item => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
