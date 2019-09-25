---
order: 3
title:
  zh-CN: 三种大小
  en-US: Sizes
---

## zh-CN

三种大小的选择框，当 size 分别为 `large` 和 `small` 时，输入框高度为 `40px` 和 `24px` ，默认高度为 `32px`。

## en-US

The height of the input field for the select defaults to 32px. If size is set to large, the height will be 40px, and if set to small, 24px.

```jsx
import { Select, Radio } from 'antd';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

class SelectSizesDemo extends React.Component {
  state = {
    size: 'default',
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <div>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        <Select size={size} defaultValue="a1" onChange={handleChange} style={{ width: 200 }}>
          {children}
        </Select>
        <br />
        <Select
          mode="multiple"
          size={size}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {children}
        </Select>
        <br />
        <Select
          mode="tags"
          size={size}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {children}
        </Select>
      </div>
    );
  }
}

ReactDOM.render(<SelectSizesDemo />, mountNode);
```

```css
.code-box-demo .ant-select {
  margin: 0 8px 10px 0;
}

#components-select-demo-search-box .code-box-demo .ant-select {
  margin: 0;
}
```
