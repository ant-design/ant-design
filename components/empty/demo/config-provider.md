---
order: 3
title:
  zh-CN: 全局化配置
  en-US: ConfigProvider
---

## zh-CN

自定义全局组件的 Empty 样式。

## en-US

Use ConfigProvider set global Empty style.

```jsx
import {
  ConfigProvider,
  Switch,
  Divider,
  Icon,
  TreeSelect,
  Select,
  Cascader,
  Transfer,
  Table,
  List,
} from 'antd';

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <Icon type="smile" style={{ fontSize: 20 }} />
    <p>Data Not Found</p>
  </div>
);

const style = { width: 200 };

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
          onChange={val => {
            this.setState({ customize: val });
          }}
        />

        <Divider />

        <ConfigProvider renderEmpty={customize && customizeRenderEmpty}>
          <div className="config-provider">
            <h3>Select</h3>
            <Select style={style} />

            <h3>TreeSelect</h3>
            <TreeSelect style={style} treeData={[]} />

            <h3>Cascader</h3>
            <Cascader style={style} options={[]} showSearch />

            <h3>Transfer</h3>
            <Transfer />

            <h3>Table</h3>
            <Table
              style={{ marginTop: 8 }}
              columns={[
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: 'Age',
                  dataIndex: 'age',
                  key: 'age',
                },
              ]}
            />

            <h3>List</h3>
            <List />
          </div>
        </ConfigProvider>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

<style>
.code-box-demo .config-provider h3 {
  font-size: inherit;
  margin: 16px 0 8px 0;
}
</style>
