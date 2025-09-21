import React from 'react';
import { Tag, Space, Divider } from 'antd';
import type { TagProps } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const App: React.FC = () => {
  const classNamesObject: TagProps['classNames'] = {
    root: 'custom-tag-root',
    icon: 'custom-tag-icon',
    content: 'custom-tag-content',
  };
  const stylesObject: TagProps['styles'] = {
    root: {
      backgroundColor: '#f0f8ff',
      border: '2px solid #1890ff',
      borderRadius: '8px',
      padding: '4px 12px',
    },
    icon: {
      color: '#52c41a',
      fontSize: '16px',
    },
    content: {
      fontWeight: 'bold',
      color: '#1890ff',
    },
  };
  const classNamesFunction: TagProps['classNames'] = (info) => ({
    root: info.props.variant === 'filled' ? 'filled-tag' : 'outlined-tag',
    icon: `icon-${info.props.color}`,
    content: `content-${info.props.variant}`,
  });
  const stylesFunction: TagProps['styles'] = (info) => ({
    root: {
      backgroundColor: info.props.color === 'blue' ? '#e6f7ff' : '#f6ffed',
      border: `2px solid ${info.props.color === 'blue' ? '#1890ff' : '#52c41a'}`,
      borderRadius: info.props.variant === 'filled' ? '16px' : '4px',
      padding: '8px 16px',
      transform: 'scale(1.05)',
    },
    icon: {
      color: info.props.color === 'blue' ? '#1890ff' : '#52c41a',
      fontSize: '18px',
      marginRight: '8px',
    },
    content: {
      color: info.props.color === 'blue' ? '#1890ff' : '#52c41a',
      fontWeight: info.props.variant === 'filled' ? 'bold' : 'normal',
    },
  });
  return (
    <Space size="large" style={{ width: '100%' }}>
      <div>
        <h4> classNames and styles object</h4>
        <Space wrap>
          <Tag classNames={classNamesObject} styles={stylesObject} icon={<CheckCircleOutlined />}>
            成功标签
          </Tag>

          <Tag
            color="red"
            classNames={classNamesObject}
            styles={stylesObject}
            icon={<CloseCircleOutlined />}
          >
            错误标签
          </Tag>
        </Space>
      </div>

      <Divider />

      <div>
        <h4>classNames and styles function</h4>
        <Space wrap>
          <Tag
            variant="filled"
            color="blue"
            icon={<SyncOutlined />}
            classNames={classNamesFunction}
            styles={stylesFunction}
          >
            动态样式标签
          </Tag>

          <Tag
            variant="outlined"
            color="orange"
            disabled={false}
            icon={<ExclamationCircleOutlined />}
            classNames={classNamesFunction}
            styles={stylesFunction}
          >
            警告标签
          </Tag>
        </Space>
      </div>

      <Divider />
    </Space>
  );
};

export default App;
