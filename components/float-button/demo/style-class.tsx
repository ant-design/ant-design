import React from 'react';
import { FloatButton } from 'antd';
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
    return { root: { backgroundColor: '#fffbe6', borderColor: '#d9d9d9' } };
  }
  return { root: { backgroundColor: '#fafafa', borderColor: '#ffe58f' } };
};

const App: React.FC = () => (
  <>
    <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 + 70 }}>
      <FloatButton
        type="primary"
        classNames={classNamesFn}
        href="https://ant.design/index-cn"
        tooltip={<div>custom style class</div>}
      />
      <FloatButton type="default" classNames={classNamesObject} />
    </FloatButton.Group>
    <FloatButton.Group shape="square">
      <FloatButton styles={stylesObject} />
      <FloatButton styles={stylesFn} />
    </FloatButton.Group>
  </>
);

export default App;
