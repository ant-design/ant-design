---
order: 10
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
import { Form, Input, Row, Col, Button, DatePicker } from 'antd';
const FormItem = Form.Item;

ReactDOM.render(
  <Form horizontal className="ant-advanced-search-form">
    <Row gutter={16}>
      <Col sm={8}>
        <FormItem
          label="Search name"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="Please input the search name" size="default" />
        </FormItem>
        <FormItem
          label="Long search name"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <DatePicker size="default" />
        </FormItem>
        <FormItem
          label="Search name"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="Please input the search name" size="default" />
        </FormItem>
      </Col>
      <Col sm={8}>
        <FormItem
          label="Search name"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="Please input the search name" size="default" />
        </FormItem>
        <FormItem
          label="Long search name"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <DatePicker size="default" />
        </FormItem>
        <FormItem
          label="Search name"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="Please input the search name" size="default" />
        </FormItem>
      </Col>
      <Col sm={8}>
        <FormItem
          label="Search name"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="Please input the search name" size="default" />
        </FormItem>
        <FormItem
          label="Long search name"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <DatePicker size="default" />
        </FormItem>
        <FormItem
          label="Search name"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="Please input the search name" size="default" />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={12} offset={12} style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">Search</Button>
        <Button>Clear</Button>
      </Col>
    </Row>
  </Form>
, mountNode);
````

````css
/* custom style */

.ant-advanced-search-form {
  padding: 16px 8px;
  background: #f8f8f8;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

/* because the label length is variable, you may need to adjust the left edge to have the form centered */

.ant-advanced-search-form > .ant-row {
  position: relative;
  left: -6px;
}

.ant-advanced-search-form .ant-btn + .ant-btn {
  margin-left: 8px;
}
````

<style>
#components-form-demo-advanced-search-form .ant-form-horizontal {
  max-width: none;
}
</style>
