import React from 'react';
import { Button, Result } from 'antd';
import type { ResultProps } from 'antd';

const classNamesObject: ResultProps['classNames'] = {
  root: 'demo-result-root',
  title: 'demo-result-title',
  subTitle: 'demo-result-subtitle',
  icon: 'demo-result-icon',
  extra: 'demo-result-extra',
  body: 'demo-result-body',
};

const classNamesFn: ResultProps['classNames'] = (info) => {
  if (info.props.status === 'success') {
    return { root: 'demo-result-root--success' };
  }
  return { root: 'demo-result-root--default' };
};

const stylesObject: ResultProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed', padding: 16 },
  title: { fontStyle: 'italic', color: '#1890ff' },
  subTitle: { fontWeight: 'bold' },
  icon: { opacity: 0.8 },
  extra: { backgroundColor: '#f0f0f0', padding: 8 },
  body: { backgroundColor: '#fafafa', padding: 12 },
};

const stylesFn: ResultProps['styles'] = (info) => {
  if (info.props.status === 'error') {
    return {
      root: { backgroundColor: '#fff2f0', borderColor: '#ff4d4f' },
      title: { color: '#ff4d4f' },
    };
  }
  return {
    root: { backgroundColor: '#f6ffed', borderColor: '#52c41a' },
    title: { color: '#52c41a' },
  };
};

const App: React.FC = () => {
  return (
    <>
      <Result
        status="info"
        title="classNames Object"
        subTitle="This is a subtitle"
        styles={stylesObject}
        classNames={classNamesObject}
        extra={<Button type="primary">Action</Button>}
      >
        <div>Content area</div>
      </Result>
      <Result
        status="success"
        title="classNames Function"
        subTitle="Dynamic class names"
        styles={stylesFn}
        classNames={classNamesFn}
        extra={<Button>Action</Button>}
      />
    </>
  );
};

export default App;
