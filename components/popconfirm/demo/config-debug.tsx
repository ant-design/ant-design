import React from 'react';
import type { PopconfirmProps } from 'antd';
import { Button, ConfigProvider, message, Popconfirm, Popover, Tooltip } from 'antd';

const confirm: PopconfirmProps['onConfirm'] = (e) => {
  console.log(e);
  message.success('Click on Yes');
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
  message.error('Click on No');
};

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const App: React.FC = () => (
  <div>
    <ConfigProvider
      button={{
        className: 'test-test',
      }}
      popconfirm={{
        className: 'cutsom-popconfirm-test',
        style: { background: 'red' },
      }}
      tooltip={{
        className: 'cutsom-popconfirm-test',
        style: { background: 'red' },
      }}
      popover={{
        className: 'cutsom-popconfirm-test',
        style: { background: 'red' },
      }}
    >
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
      <Tooltip title="prompt text">
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
      <Popover content={content} title="Title">
        <Button type="primary">Hover me</Button>
      </Popover>
    </ConfigProvider>
  </div>
);

export default App;
