---
order: 3
title:
  zh-CN: 抽屉表单
  en-US: Submit form in drawer
---

## zh-CN

在抽屉中使用表单。

## en-US

Use a form in Drawer with a submit button.

```jsx
import React, {useCallback, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Row, Col, Button, Drawer, Form, Input, DatePicker, Select} from 'antd';

const {Option} = Select;

const DrawerForm = () => {
  const [drawVisible, setDrawVisible] = useState(false);
  const [form] = Form.useForm();

  const handleFormSubmit = useCallback(async () => {
    const data = await form.getFieldsValue();
    console.log(data);
  }, [form]);

  const handleDrawClose = useCallback(() => {
    setDrawVisible(false);
  }, []);

  return <>
    <Button type="primary" onClick={() => setDrawVisible(true)}>
      <PlusOutlined/> New account
    </Button>
    <Drawer
      title="Create a new account"
      width={720}
      onClose={handleDrawClose}
      visible={drawVisible}
      bodyStyle={{paddingBottom: 80}}
      footer={
        <div style={{textAlign: 'right'}}>
          <Button onClick={handleDrawClose} style={{marginRight: 8}}>
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{required: true, message: 'Please enter user name'}]}
            >
              <Input placeholder="Please enter user name"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="url"
              label="Url"
              rules={[{required: true, message: 'Please enter url'}]}
            >
              <Input
                style={{width: '100%'}}
                addonBefore="http://"
                addonAfter=".com"
                placeholder="Please enter url"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="owner"
              label="Owner"
              rules={[{required: true, message: 'Please select an owner'}]}
            >
              <Select placeholder="Please select an owner">
                <Option value="xiao">Xiaoxiao Fu</Option>
                <Option value="mao">Maomao Zhou</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label="Type"
              rules={[{required: true, message: 'Please choose the type'}]}
            >
              <Select placeholder="Please choose the type">
                <Option value="private">Private</Option>
                <Option value="public">Public</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="approver"
              label="Approver"
              rules={[{required: true, message: 'Please choose the approver'}]}
            >
              <Select placeholder="Please choose the approver">
                <Option value="jack">Jack Ma</Option>
                <Option value="tom">Tom Liu</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dateTime"
              label="DateTime"
              rules={[{required: true, message: 'Please choose the dateTime'}]}
            >
              <DatePicker.RangePicker
                style={{width: '100%'}}
                getPopupContainer={(trigger) => trigger.parentElement}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'please enter url description',
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="please enter url description"/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  </>;
};

ReactDOM.render(<DrawerForm/>, mountNode);
```

```css
.site-form-in-drawer-wrapper {
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 100%;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
  border-top: 1px solid #e9e9e9;
}
```

<style>
[data-theme="dark"] .site-form-in-drawer-wrapper {
  border-top: 1px solid #303030;
  background: #1f1f1f;
}
</style>
