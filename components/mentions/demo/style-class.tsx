import React from 'react';
import { Mentions, Space } from 'antd';

const options = [
  {
    value: 'afc163',
    label: 'afc163',
  },
  {
    value: 'zombieJ',
    label: 'zombieJ',
  },
  {
    value: 'yesmeck',
    label: 'yesmeck',
  },
];

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    {/* 对象形式的 classNames 和 styles */}
    <Mentions
      placeholder="使用对象形式的 classNames 和 styles"
      options={options}
      classNames={{
        root: 'custom-mentions-root',
        textarea: 'custom-mentions-textarea',
        popup: 'custom-mentions-popup',
      }}
      styles={{
        root: {
          border: '2px solid #1890ff',
          borderRadius: '8px',
        },
        textarea: {
          backgroundColor: '#f6ffed',
          fontSize: '16px',
        },
        popup: {
          backgroundColor: '#fff7e6',
          border: '1px solid #ffa940',
        },
      }}
    />

    {/* 函数形式的 classNames 和 styles */}
    <Mentions
      placeholder="使用函数形式的 classNames 和 styles"
      options={options}
      disabled={false}
      loading={false}
      classNames={(info) => ({
        root: info.props.disabled ? 'disabled-mentions-root' : 'enabled-mentions-root',
        textarea: `dynamic-textarea-${info.props.loading ? 'loading' : 'normal'}`,
        popup: 'dynamic-popup',
      })}
      styles={(info) => ({
        root: {
          border: info.props.disabled ? '2px solid #d9d9d9' : '2px solid #52c41a',
          borderRadius: '6px',
          opacity: info.props.disabled ? 0.6 : 1,
        },
        textarea: {
          backgroundColor: info.props.loading ? '#f0f0f0' : '#f6ffed',
          color: info.props.disabled ? '#999' : '#000',
        },
        popup: {
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      })}
    />

    {/* 禁用状态的函数形式 */}
    <Mentions
      placeholder="禁用状态的动态样式"
      options={options}
      disabled
      classNames={(info) => ({
        root: info.props.disabled ? 'disabled-mentions' : 'enabled-mentions',
        textarea: 'textarea-disabled',
        popup: 'popup-disabled',
      })}
      styles={(info) => ({
        root: {
          border: '2px solid #ff4d4f',
          borderRadius: '4px',
          backgroundColor: info.props.disabled ? '#f5f5f5' : '#fff',
        },
        textarea: {
          color: info.props.disabled ? '#bfbfbf' : '#000',
        },
        popup: {
          backgroundColor: '#fff2f0',
        },
      })}
    />
  </Space>
);

export default App;
