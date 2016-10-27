---
order: 3
title:
  zh-CN: 高级搜索
  en-US: Advanced search
---

## zh-CN

三列栅格式的表单排列方式，常用于数据表格的高级搜索。

有部分定制的样式代码，由于输入标签长度不确定，需要根据具体情况自行调整。

## en-US

Three columns layout is often used for advanced searching of data table.

Because the width of label is not fixed, you may need to adjust it by customizing its style.


````jsx
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

const usualShowedChildren = 2 * 3; // row * col
const AdvancedSearchForm = Form.create()(React.createClass({
  getInitialState() {
    return {
      expand: false,
    };
  },
  handleSearch(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
    });
  },
  handleReset() {
    this.props.form.resetFields();
  },
  toggle(expand) {
    this.setState({ expand });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    // To generate mock Form.Item
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i}>
          <FormItem
            {...formItemLayout}
            label={`Field ${i}`}
          >
            {getFieldDecorator(`field-${i}`)(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
      );
    }

    const expand = this.state.expand;
    const showedChildren = expand ? children.length : usualShowedChildren;
    return (
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          {children.slice(0, showedChildren)}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Search</Button>
            <Button onClick={this.handleReset}>Clear</Button>
            {
              expand ? (
                <a className="ant-dropdown-link" onClick={() => this.toggle(false)}>
                  Collapse <Icon type="up" />
                </a>
              ) : (
                <a className="ant-dropdown-link" onClick={() => this.toggle(true)}>
                  Expand <Icon type="down" />
                </a>
              )
            }
          </Col>
        </Row>
      </Form>
    );
  },
}));

ReactDOM.render(<AdvancedSearchForm />, mountNode);
````

````css
#components-form-demo-advanced-search .ant-advanced-search-form {
  padding: 24px;
  background: #f8f8f8;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
#components-form-demo-advanced-search .ant-advanced-search-form .ant-btn + .ant-btn {
  margin-left: 8px;
}
#components-form-demo-advanced-search .ant-advanced-search-form .ant-dropdown-link {
  margin-left: 16px;
}
````

<style>
#components-form-demo-advanced-search .ant-form-horizontal {
  max-width: none;
}
</style>
