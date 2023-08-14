import { DownloadOutlined } from '@ant-design/icons';
import React from 'react';
import { Button, Tooltip } from 'antd';
import type { ButtonGroupProps } from 'antd/es/button';

const CustomGroup: React.FC<ButtonGroupProps> = (props) => (
  <Button.Group {...props}>
    <Button type="primary">Button 1</Button>
    <Button type="primary">Button 2</Button>
    <Tooltip title="Tooltip">
      <Button type="primary" icon={<DownloadOutlined />} disabled />
    </Tooltip>
    <Tooltip title="Tooltip">
      <Button type="primary" icon={<DownloadOutlined />} />
    </Tooltip>
  </Button.Group>
);

const App: React.FC = () => (
  <>
    <CustomGroup size="small" />
    <br />
    <CustomGroup />
    <br />
    <CustomGroup size="large" />
  </>
);

export default App;
