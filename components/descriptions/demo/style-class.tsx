import React from 'react';
import { Descriptions, Divider } from 'antd';
import type { DescriptionsProps } from 'antd';

// Object-based classNames
const classNamesObject: DescriptionsProps['classNames'] = {
  root: 'demo-descriptions-root',
  header: 'demo-descriptions-header',
  title: 'demo-descriptions-title',
  extra: 'demo-descriptions-extra',
  label: 'demo-descriptions-label',
  content: 'demo-descriptions-content',
};

// Function-based classNames
const classNamesFn: DescriptionsProps['classNames'] = (info) => {
  if (info.props.bordered) {
    return {
      root: 'demo-descriptions-root-fn',
      header: 'demo-descriptions-header-fn',
      title: 'demo-descriptions-title-fn',
      extra: 'demo-descriptions-extra-fn',
      label: 'demo-descriptions-label-fn',
      content: 'demo-descriptions-content-fn',
    };
  }
  return {};
};

// Object-based styles
const stylesObject: DescriptionsProps['styles'] = {
  label: { color: 'blue' },
  content: { color: 'red' },
};

// Function-based styles
const stylesFn: DescriptionsProps['styles'] = (info) => {
  if (info.props.bordered) {
    return {
      label: { background: 'green' },
      content: { background: 'red' },
    };
  }
  return {};
};

const rootStyleItems: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
];

const App: React.FC = () => {
  return (
    <>
      <Descriptions
        title="User Info"
        styles={stylesFn}
        classNames={classNamesFn}
        bordered
        items={rootStyleItems}
      />
      <Divider />
      <Descriptions
        title="User Info"
        styles={stylesObject}
        classNames={classNamesObject}
        items={rootStyleItems}
      />
    </>
  );
};

export default App;
