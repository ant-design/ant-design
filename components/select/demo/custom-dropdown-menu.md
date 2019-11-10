---
order: 21
title:
  zh-CN: 扩展菜单
  en-US: Custom dropdown
---

## zh-CN

使用 `dropdownRender` 对下拉菜单进行自由扩展。自定义内容点击时会关闭浮层，如果不喜欢关闭，可以添加 `onMouseDown={e => e.preventDefault()}` 进行阻止（更多详情见 [#13448](https://github.com/ant-design/ant-design/issues/13448)）。

## en-US

Customize the dropdown menu via `dropdownRender`. The selection will be closed if click `dropdownRender` area, you can prevent it by wrapping `onMouseDown={e => e.preventDefault()}` (see more at [#13448](https://github.com/ant-design/ant-design/issues/13448)).

```jsx
import { Select, Icon, Divider } from 'antd';

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
            <div
              style={{ padding: '4px 8px', cursor: 'pointer' }}
              onMouseDown={e => e.preventDefault()}
              onClick={this.addItem}
            >
              <Icon type="plus" /> Add item
            </div>
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
