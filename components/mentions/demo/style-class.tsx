import React from 'react';
import { Mentions, Space } from 'antd';
import type { MentionsProps } from 'antd';

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
    value: 'Meet-student',
    label: 'Meet-student',
  },
];

const classNamesObject: MentionsProps['classNames'] = {
  root: 'custom-mentions-root',
  textarea: 'custom-mentions-textarea',
  popup: 'custom-mentions-popup',
};

const stylesObject: MentionsProps['styles'] = {
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
};

const classNamesFunction: MentionsProps['classNames'] = (info) => ({
  root: info.props.disabled ? 'disabled-mentions-root' : 'enabled-mentions-root',
  textarea: `dynamic-textarea-${info.props.loading ? 'loading' : 'normal'}`,
  popup: 'dynamic-popup',
});

const stylesFunction: MentionsProps['styles'] = (info) => ({
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
});

const App: React.FC = () => (
  <Space style={{ width: '100%' }}>
    <Mentions
      placeholder="classNames and styles object"
      options={options}
      classNames={classNamesObject}
      styles={stylesObject}
    />

    <Mentions
      placeholder="classNames and styles function"
      options={options}
      disabled={false}
      loading={false}
      classNames={classNamesFunction}
      styles={stylesFunction}
    />
  </Space>
);

export default App;
