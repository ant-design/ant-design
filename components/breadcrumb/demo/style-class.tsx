import React from 'react';
import { Breadcrumb, Flex } from 'antd';
import type { BreadcrumbProps } from 'antd';

const classNamesObject: BreadcrumbProps['classNames'] = {
  root: 'demo-breadcrumb-root',
  item: 'demo-breadcrumb-item',
  separator: 'demo-breadcrumb-separator',
};

const classNamesFn: BreadcrumbProps['classNames'] = (info) => {
  const items = info.props.items || [];
  if (items.length > 2) {
    return {
      root: 'demo-breadcrumb-root--long',
    } satisfies BreadcrumbProps['classNames'];
  }
  return {
    root: 'demo-breadcrumb-root--short',
  } satisfies BreadcrumbProps['classNames'];
};

const stylesObject: BreadcrumbProps['styles'] = {
  root: { border: '1px solid #f0f0f0', padding: 8, borderRadius: 4 },
  item: { color: '#1890ff' },
  separator: { color: 'rgba(0, 0, 0, 0.45)' },
};

const stylesFn: BreadcrumbProps['styles'] = (info) => {
  const items = info.props.items || [];
  if (items.length > 2) {
    return {
      root: {
        backgroundColor: '#f0f9ff',
      },
    } satisfies BreadcrumbProps['styles'];
  }
  return {
    root: {
      backgroundColor: '#fff',
    },
  } satisfies BreadcrumbProps['styles'];
};

const items = [
  { title: 'Ant Design' },
  { title: <a href="">Component</a> },
  { title: 'Breadcrumb' },
];

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Breadcrumb
      classNames={classNamesObject}
      items={items.slice(0, 2)}
      aria-label="Breadcrumb with classNames Object"
    />
    <Breadcrumb
      classNames={classNamesFn}
      items={items}
      aria-label="Breadcrumb with classNames Function"
    />
    <Breadcrumb
      styles={stylesObject}
      items={items.slice(0, 2)}
      aria-label="Breadcrumb with styles Object"
    />
    <Breadcrumb styles={stylesFn} items={items} aria-label="Breadcrumb with styles Function" />
  </Flex>
);

export default App;
