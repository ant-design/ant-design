---
order: 3
title:
  zh-CN: 全局化配置
  en-US: ConfigProvider
---

## zh-CN

自定义全局组件的 Empty 样式。

## en-US

Use ConfigProvider set global empty style.

```jsx
import {
  ConfigProvider, Switch, Divider, Icon,
  TreeSelect, Select, Cascader,
} from 'antd';

const customizeRenderEmpty = () => (
  <div>
    <Icon type="smile" /> Smile!
  </div>
);

const style = { width: 200, display: 'block', marginBottom: 16 };

class Demo extends React.Component {
  state = {
    customize: false,
  };

  render() {
    const { customize } = this.state;
    return (
      <div>
        <Switch
          unCheckedChildren="default"
          checkedChildren="customize"
          checked={customize}
          onChange={(val) => {
            this.setState({ customize: val });
          }}
        />

        <Divider />

        <ConfigProvider renderEmpty={customize && customizeRenderEmpty}>
          <Select style={style} />
          <TreeSelect style={style} treeData={[]} />
          <Cascader style={style} showSearch />
        </ConfigProvider>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
