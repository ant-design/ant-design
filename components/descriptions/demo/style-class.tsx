import React from 'react';
import { Descriptions, Divider } from 'antd';
import type { DescriptionsProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  label: css`
    background-color: red;
  `,
}));

// Function-based styles
const stylesFn: DescriptionsProps['styles'] = (info) => {
  if (info.props.size === 'small') {
    return {
      label: { color: 'green' },
      content: { color: 'red' },
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
  const { styles } = useStyle();

  const descriptionsProps: DescriptionsProps = {
    title: 'User Info',
    items: rootStyleItems,
    bordered: true,
    classNames: {
      label: styles.label,
    },
  };

  return (
    <>
      <Descriptions {...descriptionsProps} styles={{ label: { color: 'green' } }} />
      <Divider />
      <Descriptions {...descriptionsProps} styles={stylesFn} size="small" />
    </>
  );
};

export default App;
