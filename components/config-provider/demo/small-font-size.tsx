/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Checkbox, ConfigProvider, Modal, Space } from 'antd';

const App: React.FC = () => (
  <>
    {/* <ConfigProvider componentSize="small" theme={{ token: { experimentSmallFontSize: 12 } }}>
      <Button type="primary">Primary Button</Button>
      <Alert message="Success Text" description="desc" type="success" />
      <Space.Compact block>
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
      </Space.Compact>
    </ConfigProvider>
    <br />
    <ConfigProvider theme={{ token: { experimentSmallFontSize: 12 } }}>
      <Button type="primary">Primary Button</Button>
      <Button size="small">Small Button</Button>
      <Space.Compact block>
        <Button type="primary">Button 1</Button>
        <Button size="small">Button 2</Button>
      </Space.Compact>
    </ConfigProvider> */}
    <ConfigProvider theme={{ token: { experimentSmallFontSize: 12 } }}>
      <ConfigProvider componentSize="small">
        <Button size="small">Small Button</Button>
        <Checkbox>user</Checkbox>
      </ConfigProvider>
      <Button size="small">Small Button</Button>
      <hr />
      <ConfigProvider componentSize="middle">
        <Button type="primary">Primary Button</Button>
      </ConfigProvider>
    </ConfigProvider>

    {/* <ConfigProvider componentSize="small" theme={{ token: { experimentSmallFontSize: 12 } }}>
      <Alert description="desc" type="success" />
    </ConfigProvider>
    <ConfigProvider componentSize="small" theme={{ token: { experimentSmallFontSize: 13 } }}>
      <Alert description="desc" type="success" />
    </ConfigProvider> */}

    <ConfigProvider theme={{ token: { experimentSmallFontSize: 12 } }}>
      <ConfigProvider componentSize="small">
        <Checkbox>12px</Checkbox>
      </ConfigProvider>
      <Checkbox>14px</Checkbox>
    </ConfigProvider>

    {/* fontSize 设置 12px，fontSizeSM 设置 12px，避免被计算变成 10px 显得文字特别小 */}
    <ConfigProvider componentSize="small" theme={{ token: { fontSize: 12, fontSizeSM: 12 } }}>
      {/* 页面内组件都是 12px 大小 */}
      <Checkbox>12px</Checkbox>
      {/* 弹窗等场景，因为脱离页面，需要用 middle 显示，这里重新设置 fontSize 14px */}
      <ConfigProvider componentSize="middle" theme={{ token: { fontSize: 14 } }}>
        <Modal>
          <Checkbox>14px</Checkbox>
        </Modal>
      </ConfigProvider>
    </ConfigProvider>
  </>
);

export default App;
