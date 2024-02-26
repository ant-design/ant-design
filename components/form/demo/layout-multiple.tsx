import React from 'react';
import { Button, Col, Flex, Form, Input, Radio, Row, Space } from 'antd';

const getFields = () => {
  const count = 3;
  const children = [];
  for (let i = 0; i < count; i++) {
    children.push(
      <Form.Item
        key={i}
        name={`field-${i}`}
        label={`Field ${i}`}
        style={{ marginBottom: 0 }}
        layout="vertical"
      >
        <Input placeholder="placeholder" />
      </Form.Item>,
    );
  }
  return children;
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} name="layout-multiple">
      <Row gutter={24} style={{ marginBottom: 8 }}>
        <Col span={16}>
          <Flex gap={8}>{getFields()}</Flex>
        </Col>
        <Col
          span={8}
          style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}
        >
          <Space>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button onClick={() => form.resetFields()}>Clear</Button>
          </Space>
        </Col>
      </Row>
      <Flex gap={8}>
        <Form.Item name="fruit" label="fruit" layout="inline">
          <Radio.Group optionType="button" options={['Apple', 'Orange']} />
        </Form.Item>
        <Form.Item name="type" label="type" layout="inline">
          <Radio.Group optionType="button" options={['Option A', 'Option B']} />
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default App;
