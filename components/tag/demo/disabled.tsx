import React from 'react';
import { Space, Tag, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const handleClick = (tagName: string) => {
    console.log(`Tag ${tagName} clicked`);
    message.info(`Tag ${tagName} clicked`);
  };

  const handleClose = (tagName: string) => {
    console.log(`Tag ${tagName} closed`);
    message.info(`Tag ${tagName} closed`);
  };

  return (
    <Space direction="vertical">
      <Space size={[0, 8]} wrap>
        <Tag disabled onClick={() => handleClick('Basic')}>
          Tag
        </Tag>
        <Tag disabled onClick={() => handleClick('Link')}>
          <a href="https://ant.design">Link Tag</a>
        </Tag>
        <Tag
          disabled
          color="success"
          icon={<CheckCircleOutlined />}
          onClick={() => handleClick('Success')}
        >
          Success
        </Tag>
        <Tag disabled color="red" onClick={() => handleClick('Red')}>
          Red
        </Tag>
        <Tag disabled color="#f50" onClick={() => handleClick('#f50')}>
          #f50
        </Tag>
      </Space>

      <Space size={[0, 8]} wrap>
        <Tag
          disabled
          closable
          onClick={() => handleClick('Closable 1')}
          onClose={() => handleClose('Closable 1')}
        >
          Tag
        </Tag>
        <Tag
          disabled
          closable
          onClick={() => handleClick('Closable Link')}
          onClose={() => handleClose('Closable Link')}
        >
          <a href="https://ant.design">Link Tag</a>
        </Tag>
        <Tag
          disabled
          closable
          color="success"
          icon={<CheckCircleOutlined />}
          onClick={() => handleClick('Closable Success')}
          onClose={() => handleClose('Closable Success')}
        >
          Success
        </Tag>
        <Tag
          disabled
          closable
          color="red"
          onClick={() => handleClick('Closable Red')}
          onClose={() => handleClose('Closable Red')}
        >
          Red
        </Tag>
        <Tag disabled color="#f50" onClick={() => handleClick('#f50')}>
          #f50
        </Tag>
      </Space>

      <Space size={[0, 8]} wrap>
        <Tag disabled onClick={() => handleClick('Click Test')}>
          Disabled Click
        </Tag>
        <Tag
          disabled
          closable
          onClick={() => handleClick('Close Test')}
          onClose={() => handleClose('Close Test')}
        >
          Disabled Close
        </Tag>
      </Space>

      <Space size={[0, 8]} wrap>
        <Tag disabled bordered={false} onClick={() => handleClick('Borderless')}>
          Borderless Tag
        </Tag>
        <Tag
          disabled
          bordered={false}
          color="success"
          icon={<CheckCircleOutlined />}
          onClick={() => handleClick('Borderless Success')}
        >
          Borderless Success
        </Tag>
        <Tag disabled bordered={false} color="red" onClick={() => handleClick('Borderless Red')}>
          Borderless Red
        </Tag>
        <Tag
          disabled
          bordered={false}
          closable
          onClick={() => handleClick('Borderless Closable')}
          onClose={() => handleClose('Borderless Closable')}
        >
          Borderless Closable
        </Tag>
      </Space>
    </Space>
  );
};

export default App;
