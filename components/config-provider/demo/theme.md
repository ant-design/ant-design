---
order: 5
title:
  zh-CN: 全局样式
  en-US: Global Theme
only: true
---

## zh-CN

修改全局主题色。

## en-US

Modify global theme color.

```jsx
import { SketchPicker } from 'react-color';
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import {
  ConfigProvider,
  Button,
  Radio,
  Space,
  Form,
  Input,
  Row,
  Col,
  Typography,
  Menu,
  Dropdown,
  Divider,
} from 'antd';

const SplitSpace = props => <Space split={<Divider type="vertical" />} size={4} {...props} />;

const FormSizeDemo = () => {
  const [color, setColor] = useState({
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
  });

  function onColorChange(nextColor) {
    const mergedNextColor = {
      ...color,
      ...nextColor,
    };
    setColor(mergedNextColor);
    ConfigProvider.config({
      theme: mergedNextColor,
    });
  }

  return (
    <Row gutter={16}>
      <Col flex="none">
        <Space direction="vertical" align="center">
          {/* Primary Color */}
          <SketchPicker
            presetColors={['#1890ff', '#25b864', '#ff6f00']}
            color={color.primaryColor}
            onChange={({ hex }) => {
              onColorChange({
                primaryColor: hex,
              });
            }}
          />

          <span style={{ color: 'var(--ant-primary-color)' }}>var(`--ant-primary-color`)</span>

          {/* Error Color */}
          <SketchPicker
            presetColors={['#ff4d4f']}
            color={color.errorColor}
            onChange={({ hex }) => {
              onColorChange({
                errorColor: hex,
              });
            }}
          />

          <span style={{ color: 'var(--ant-error-color)' }}>var(`--ant-error-color`)</span>

          {/* Warning Color */}
          <SketchPicker
            presetColors={['#faad14']}
            color={color.warningColor}
            onChange={({ hex }) => {
              onColorChange({
                warningColor: hex,
              });
            }}
          />

          <span style={{ color: 'var(--ant-warning-color)' }}>var(`--ant-warning-color`)</span>
        </Space>
      </Col>

      <Col>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {/* Primary Button */}
          <SplitSpace>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="text">Text</Button>
            <Button type="link">Link</Button>
          </SplitSpace>

          {/* Danger Button */}
          <SplitSpace>
            <Button danger type="primary">
              Primary
            </Button>
            <Button danger>Default</Button>
            <Button danger type="dashed">
              Dashed
            </Button>
            <Button danger type="text">
              Text
            </Button>
            <Button danger type="link">
              Link
            </Button>
          </SplitSpace>

          {/* Ghost Button */}
          <SplitSpace style={{ background: 'rgb(190, 200, 200)' }}>
            <Button type="primary" ghost>
              Primary
            </Button>
            <Button ghost>Default</Button>
            <Button type="dashed" ghost>
              Dashed
            </Button>
            <Button type="primary" ghost danger>
              Primary
            </Button>
            <Button ghost danger>
              Default
            </Button>
            <Button type="dashed" ghost danger>
              Dashed
            </Button>
          </SplitSpace>

          {/* Typography */}
          <SplitSpace>
            <Typography.Text type="success">Text (success)</Typography.Text>
            <Typography.Text type="warning">Text(warning)</Typography.Text>
            <Typography.Text type="danger">Text(danger)</Typography.Text>
            <Typography.Link href="https://ant.design" target="_blank">
              Link
            </Typography.Link>
            <Typography.Text copyable>Text</Typography.Text>

            {/* Dropdown */}
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>1st menu item</Menu.Item>
                  <Menu.Item danger>a danger item</Menu.Item>
                </Menu>
              }
            >
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Hover me <DownOutlined />
              </a>
            </Dropdown>
          </SplitSpace>

          <SplitSpace>
            <Radio.Group defaultValue="bamboo">
              <Radio value="bamboo">Bamboo</Radio>
              <Radio value="light">Light</Radio>
              <Radio value="little">Little</Radio>
            </Radio.Group>
          </SplitSpace>

          <SplitSpace>
            <Form>
              <Form.Item status="error">
                <Input />
              </Form.Item>
            </Form>
          </SplitSpace>
        </Space>
      </Col>
    </Row>
  );
};
ReactDOM.render(<FormSizeDemo />, mountNode);
```
