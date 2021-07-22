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
import { DownOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {
  ConfigProvider,
  Steps,
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
  Pagination,
} from 'antd';

const SplitSpace = props => <Space split={<Divider type="vertical" />} size={4} {...props} />;

const FormSizeDemo = () => {
  const [color, setColor] = useState({
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a',
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
    <Row gutter={16} wrap={false}>
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

          {/* Success Color */}
          <SketchPicker
            presetColors={['#52c41a']}
            color={color.successColor}
            onChange={({ hex }) => {
              onColorChange({
                successColor: hex,
              });
            }}
          />

          <span style={{ color: 'var(--ant-success-color)' }}>var(`--ant-success-color`)</span>
        </Space>
      </Col>

      <Col flex="auto">
        <Space direction="vertical" split={<Divider />} style={{ width: '100%' }} size={0}>
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

          {/* Menu - horizontal */}
          <Row gutter={16}>
            <Col flex="1 1 50%">
              <Menu mode="horizontal">
                <Menu.Item key="mail" icon={<MailOutlined />}>
                  Mail
                </Menu.Item>
                <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />} title="Submenu">
                  <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                </Menu.SubMenu>
              </Menu>
            </Col>
            <Col flex="1 1 50%">
              <Menu mode="horizontal" theme="dark">
                <Menu.Item key="mail" icon={<MailOutlined />}>
                  Mail
                </Menu.Item>
                <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />} title="Submenu">
                  <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                </Menu.SubMenu>
              </Menu>
            </Col>
          </Row>

          {/* Menu - vertical */}
          <Row gutter={16}>
            <Col flex="1 1 50%">
              <Menu mode="inline">
                <Menu.Item key="mail" icon={<MailOutlined />}>
                  Mail
                </Menu.Item>
                <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />} title="Submenu">
                  <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                </Menu.SubMenu>
              </Menu>
            </Col>
            <Col flex="1 1 50%">
              <Menu mode="vertical" theme="dark">
                <Menu.Item key="mail" icon={<MailOutlined />}>
                  Mail
                </Menu.Item>
                <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />} title="Submenu">
                  <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                </Menu.SubMenu>
              </Menu>
            </Col>
          </Row>

          {/* Pagination */}
          <Pagination showQuickJumper defaultCurrent={2} total={500} />

          {/* Steps */}
          <Steps current={1} percent={60}>
            <Steps.Step title="Finished" description="This is a description." />
            <Steps.Step
              title="In Progress"
              subTitle="Left 00:00:08"
              description="This is a description."
            />
            <Steps.Step title="Waiting" description="This is a description." />
          </Steps>

          {/* Steps - dot */}
          <Steps current={2} status="error" progressDot>
            <Steps.Step title="Finished" description="You can hover on the dot." />
            <Steps.Step title="In Progress" description="You can hover on the dot." />
            <Steps.Step title="Error" description="You can hover on the dot." />
            <Steps.Step title="Waiting" description="You can hover on the dot." />
          </Steps>

          {/* Form */}
          <Form>
            <SplitSpace>
              <Form.Item>
                <Input />
              </Form.Item>
              <Form.Item hasFeedback validateStatus="success">
                <Input />
              </Form.Item>
              <Form.Item hasFeedback validateStatus="warning">
                <Input />
              </Form.Item>
              <Form.Item hasFeedback validateStatus="error">
                <Input />
              </Form.Item>
              <Form.Item hasFeedback validateStatus="validating">
                <Input />
              </Form.Item>
            </SplitSpace>
          </Form>

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
