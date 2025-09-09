import React from 'react';
import { TreeSelect, Space } from 'antd';

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: 'leaf3',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    {/* 对象形式的 classNames 和 styles */}
    <TreeSelect
      placeholder="使用对象形式的 classNames 和 styles"
      treeData={treeData}
      style={{ width: '100%' }}
      classNames={{
        root: 'custom-tree-select-root',
        input: 'custom-tree-select-input',
        suffix: 'custom-tree-select-suffix',
        popup: {
          root: 'custom-tree-select-popup',
          item: 'custom-tree-select-item',
          itemTitle: 'custom-tree-select-item-title',
        },
      }}
      styles={{
        root: {
          border: '2px solid #1890ff',
          borderRadius: '8px',
        },
        input: {
          backgroundColor: '#f6ffed',
          fontSize: '16px',
        },
        suffix: {
          color: '#52c41a',
        },
        popup: {
          root: {
            backgroundColor: '#fff7e6',
            border: '1px solid #ffa940',
          },
          item: {
            padding: '8px 12px',
          },
          itemTitle: {
            fontWeight: 'bold',
          },
        },
      }}
    />

    {/* 函数形式的 classNames 和 styles */}
    <TreeSelect
      placeholder="使用函数形式的 classNames 和 styles"
      treeData={treeData}
      style={{ width: '100%' }}
      disabled={false}
      size="middle"
      classNames={(info) => ({
        root: info.props.disabled ? 'disabled-tree-select-root' : 'enabled-tree-select-root',
        input: `dynamic-input-${info.props.size}`,
        suffix: 'dynamic-suffix',
        popup: {
          root: 'dynamic-popup-root',
          item: info.props.disabled ? 'disabled-item' : 'enabled-item',
          itemTitle: 'dynamic-item-title',
        },
      })}
      styles={(info) => ({
        root: {
          border: info.props.disabled ? '2px solid #d9d9d9' : '2px solid #52c41a',
          borderRadius: '6px',
          opacity: info.props.disabled ? 0.6 : 1,
        },
        input: {
          backgroundColor: info.props.disabled ? '#f5f5f5' : '#f6ffed',
          color: info.props.disabled ? '#999' : '#000',
          fontSize: info.props.size === 'large' ? '16px' : '14px',
        },
        suffix: {
          color: info.props.disabled ? '#bfbfbf' : '#1890ff',
        },
        popup: {
          root: {
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          item: {
            padding: info.props.size === 'large' ? '10px 16px' : '6px 12px',
            backgroundColor: info.props.disabled ? '#fafafa' : 'transparent',
          },
          itemTitle: {
            color: info.props.disabled ? '#bfbfbf' : '#262626',
          },
        },
      })}
    />

    {/* 禁用状态的函数形式 */}
    <TreeSelect
      placeholder="禁用状态的动态样式"
      treeData={treeData}
      style={{ width: '100%' }}
      disabled
      size="large"
      classNames={(info) => ({
        root: info.props.disabled ? 'disabled-tree-select' : 'enabled-tree-select',
        input: 'input-disabled',
        suffix: 'suffix-disabled',
        popup: {
          root: 'popup-disabled',
          item: 'item-disabled',
          itemTitle: 'item-title-disabled',
        },
      })}
      styles={(info) => ({
        root: {
          border: '2px solid #ff4d4f',
          borderRadius: '4px',
          backgroundColor: info.props.disabled ? '#f5f5f5' : '#fff',
        },
        input: {
          color: info.props.disabled ? '#bfbfbf' : '#000',
          fontSize: '18px',
        },
        suffix: {
          color: '#ff4d4f',
        },
        popup: {
          root: {
            backgroundColor: '#fff2f0',
          },
          item: {
            padding: '12px 16px',
          },
          itemTitle: {
            color: '#ff4d4f',
          },
        },
      })}
    />
  </Space>
);

export default App;
