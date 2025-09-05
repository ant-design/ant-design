import React from 'react';
import { FloatButton, Space } from 'antd';
import type { FloatButtonProps } from 'antd';

const classNamesObject: FloatButtonProps['classNames'] = {
  root: 'demo-float-btn-root',
  icon: 'demo-float-btn-icon',
  content: 'demo-float-btn-content',
};

const classNamesFn: FloatButtonProps['classNames'] = (info) => {
  if (info.props.type === 'primary') {
    return { root: 'demo-float-btn-root--primary' };
  }
  return { root: 'demo-float-btn-root--default' };
};

const stylesObject: FloatButtonProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  icon: { opacity: 0.85 },
  content: { fontStyle: 'italic' },
};

const stylesFn: FloatButtonProps['styles'] = (info) => {
  if (info.props.shape === 'square') {
    return { root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' } };
  }
  return { root: { backgroundColor: '#fffbe6', borderColor: '#ffe58f' } };
};

const App: React.FC = () => (
  <Space size={[8, 16]} wrap>
    <FloatButton type="default" classNames={classNamesObject} />
    <FloatButton type="primary" classNames={classNamesFn} />
    <FloatButton shape="circle" styles={stylesObject} />
    <FloatButton shape="square" styles={stylesFn} />
  </Space>
);

export default App;
