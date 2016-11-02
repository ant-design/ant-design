---
order: 21
title:
  en-US: Dynamic Settings
  zh-CN: 动态控制表格属性
---

## zh-CN

选择不同配置组合查看效果。

## en-US

Select different settings to see the result.

````jsx
import { Table, Icon, Select, Form } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions<Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
}];

const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Here is title';
const footer = () => 'Here is footer';

class Demo extends React.Component {
  state = {
    size: 'default',
    pagination: true,
    expandedRowRender,
    loading: false,
    bordered: true,
    header: true,
    title,
    footer,
  }

  handleToggle = (prop) => {
    return (value) => {
      this.setState({ [prop]: value === 'show' });
    };
  }

  handleSizeChange = (value) => {
    this.setState({ size: value });
  }

  handleExpandChange = (value) => {
    this.setState({ expandedRowRender: value === 'enabled' ? expandedRowRender : false });
  }

  handleTitleChange = (value) => {
    this.setState({ title: value === 'show' ? title : undefined });
  }

  handleFooterChange = (value) => {
    this.setState({ footer: value === 'show' ? footer : undefined });
  }

  render() {
    return (
      <div>
        <div className="components-table-demo-control-bar">
          <Form inline>
            <FormItem>
              <Select defaultValue="show" onChange={this.handleToggle('pagination')}>
                <Option value="show">Show Pagination</Option>
                <Option value="hide">Hide Pagination</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select defaultValue="default" onChange={this.handleSizeChange}>
                <Option value="default">Default Size</Option>
                <Option value="small">Small Size</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select defaultValue="show" onChange={this.handleToggle('bordered')}>
                <Option value="show">Show Border</Option>
                <Option value="hide">Hide Border</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select defaultValue="show" onChange={this.handleToggle('showHeader')}>
                <Option value="show">Show Header</Option>
                <Option value="hide">Hide Header</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select defaultValue="show" onChange={this.handleTitleChange}>
                <Option value="show">Show Title</Option>
                <Option value="hide">Hide Title</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select defaultValue="show" onChange={this.handleFooterChange}>
                <Option value="show">Show Footer</Option>
                <Option value="hide">Hide Footer</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select defaultValue="enabled" onChange={this.handleExpandChange}>
                <Option value="enabled">Enable Expand Row</Option>
                <Option value="disabled">Disable Expand Row</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Select defaultValue="hide" onChange={this.handleToggle('loading')}>
                <Option value="show">Show Loading</Option>
                <Option value="hide">Hide Loading</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
        <Table {...this.state} columns={columns} dataSource={data} />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
````

<style>
.components-table-demo-control-bar {
  margin-bottom: 10px;
}
</style>
