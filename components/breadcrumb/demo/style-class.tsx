import React from 'react';
import { Breadcrumb, Flex } from 'antd';
import type { BreadcrumbProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  root: { padding: 8, borderRadius: 4 },
  item: { color: '#1890ff' },
  separator: { color: 'rgba(0, 0, 0, 0.45)' },
}));

const styles: BreadcrumbProps['styles'] = {
  root: { border: '1px solid #f0f0f0', padding: 8, borderRadius: 4 },
  item: { color: '#1890ff' },
  separator: { color: 'rgba(0, 0, 0, 0.45)' },
};

const stylesFn: BreadcrumbProps['styles'] = (info) => {
  const items = info.props.items || [];
  if (items.length > 2) {
    return {
      root: { border: '1px solid #F5EFFF', padding: 8, borderRadius: 4 },
      item: { color: '#8F87F1' },
    } satisfies BreadcrumbProps['styles'];
  }
  return {};
};

const items = [
  { title: 'Ant Design' },
  { title: <a href="">Component</a> },
  { title: 'Breadcrumb' },
];

const App: React.FC = () => {
  const { styles: classNames } = useStyles();

  return (
    <Flex vertical gap="middle">
      <Breadcrumb
        classNames={classNames}
        items={items.slice(0, 2)}
        styles={styles}
        aria-label="Breadcrumb with Object"
      />
      <Breadcrumb
        classNames={classNames}
        items={items}
        styles={stylesFn}
        aria-label="Breadcrumb with Function"
      />
    </Flex>
  );
};

export default App;
