# 高级搜索

- order: 10

三列栅格式的表单排列方式，常用于数据表格的高级搜索。

有部分定制的样式代码，由于输入标签长度不确定，需要根据具体情况自行调整。

---

````jsx
import { Form, Input, Row, Col, Button } from 'antd';
const FormItem = Form.Item;

ReactDOM.render(
<Form horizontal className="advanced-search-form">
  <Row>
    <Col span="8">
      <FormItem
        label="搜索名称："
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}>
        <Input placeholder="请输入搜索名称" />
      </FormItem>
      <FormItem
        label="较长搜索名称："
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}>
        <Input placeholder="请输入搜索名称" />
      </FormItem>
      <FormItem
        label="搜索名称："
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}>
        <Input placeholder="请输入搜索名称" />
      </FormItem>
    </Col>
    <Col span="8">
      <FormItem
        label="搜索名称："
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}>
        <Input placeholder="请输入搜索名称" />
      </FormItem>
      <FormItem
        label="较长搜索名称："
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}>
        <Input placeholder="请输入搜索名称" />
      </FormItem>
      <FormItem
        label="搜索名称："
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}>
        <Input placeholder="请输入搜索名称" />
      </FormItem>
    </Col>
    <Col span="8">
      <FormItem
        label="搜索名称："
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}>
        <Input placeholder="请输入搜索名称" />
      </FormItem>
      <FormItem
        label="较长搜索名称："
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}>
        <Input placeholder="请输入搜索名称" />
      </FormItem>
      <FormItem
        label="搜索名称："
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}>
        <Input placeholder="请输入搜索名称" />
      </FormItem>
    </Col>
  </Row>
  <Row>
    <Col span="8" offset="16" style={{ textAlign: 'right' }}>
      <Button type="primary" htmlType="submit">搜索</Button>
      <Button>清除条件</Button>
    </Col>
  </Row>
</Form>
, mountNode);
````

````css
/* 定制样式 */

.advanced-search-form {
  padding: 16px 8px;
  background: #f8f8f8;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

/* 由于输入标签长度不确定，所以需要微调使之看上去居中 */
.advanced-search-form > .row {
  margin-left: -10px;
}

.advanced-search-form > .row > .col-8 {
  padding: 0 8px;
}

.advanced-search-form .ant-form-item {
  margin-bottom: 16px;
}

.advanced-search-form .ant-btn + .ant-btn {
  margin-left: 8px;
}
````

<style>
#components-form-demo-advanced-search-form .ant-form-horizontal {
  max-width: none;
}
</style>
