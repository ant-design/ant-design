import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';

const App: React.FC = () => (
  <div className="site-input-group-wrapper">
    <Input.Group compact>
      <Input
        style={{ width: 'calc(100% - 200px)' }}
        defaultValue="git@github.com:ant-design/ant-design.git"
      />
      <Tooltip title="search git url">
        <Button icon={<SearchOutlined />} />
      </Tooltip>
    </Input.Group>
    <Input.Group compact>
      <Input
        style={{ width: 'calc(100% - 200px)' }}
        defaultValue="git@github.com:ant-design/ant-design.git"
      />
      <Button icon={<SearchOutlined />} />
    </Input.Group>
    <Input.Group compact>
      <Input style={{ width: 'calc(100% - 200px)' }} />
      <Button icon={<SearchOutlined />} />
    </Input.Group>
    <Input.Group compact>
      <Input style={{ width: 'calc(100% - 200px)' }} />
      <Button icon={<SearchOutlined />}>Search</Button>
    </Input.Group>
    <Input.Search placeholder="input search text" style={{ width: 200 }} />
  </div>
);

export default App;
