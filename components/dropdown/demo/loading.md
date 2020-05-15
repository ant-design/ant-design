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
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item key="1">
      Submit And Continue
    </Menu.Item>
  </Menu>
);

class App extends React.Component {
  state = {
    loadings: [],
  };

  enterLoading = index => {
    const newLoadings = [...this.state.loadings];
    newLoadings[index] = true;
    this.setState({
      loadings: newLoadings,
    });
    setTimeout(() => {
      newLoadings[index] = false;
      this.setState({ loadings: newLoadings });
    }, 6000);
  };

  render() {
    const { loadings } = this.state;
    return (
      <div id="components-dropdown-demo-dropdown-button-loading">
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
          onClick={() => this.enterLoading(0)}
        >
          Submit
        </Dropdown.Button>
        <Dropdown.Button 
          icon={<DownOutlined />}
          loading={loadings[1]} 
          overlay={menu} 
          onClick={() => this.enterLoading(1)}
        >
          Submit
        </Dropdown.Button>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

```css
#components-dropdown-demo-dropdown-button-loading .ant-dropdown-button {
  margin: 0 8px 8px 0;
}

#components-dropdown-demo-dropdown-button-loading .ant-btn-group-rtl.ant-dropdown-button {
  margin: 0 0 8px 8px;
}
```
