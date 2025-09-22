import React, { useState } from 'react';
import { Descriptions, Divider, Switch } from 'antd';
import type { DescriptionsProps } from 'antd';

const backgroundRedStyle: React.CSSProperties = { background: 'red' };
const backgroundGreenStyle: React.CSSProperties = { background: 'green' };

const classNamesObject: DescriptionsProps['classNames'] = {
  root: 'demo-descriptions-root',
  header: 'demo-descriptions-header',
  title: 'demo-descriptions-title',
  extra: 'demo-descriptions-extra',
  label: 'demo-descriptions-label',
  content: 'demo-descriptions-content',
};

const stylesFn: DescriptionsProps['styles'] = (info) => {
  if (info.props.bordered) {
    return {
      label: backgroundRedStyle,
      content: backgroundGreenStyle,
    };
  }
  return {
    label: backgroundGreenStyle,
    content: backgroundRedStyle,
  };
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
  const [border, setBorder] = useState(true);

  return (
    <>
      <Switch
        checkedChildren="Border"
        unCheckedChildren="No Border"
        checked={border}
        onChange={(e) => setBorder(e)}
      />
      <Divider />
      <Descriptions
        title="User Info"
        styles={stylesFn}
        classNames={classNamesObject}
        bordered={border}
        items={rootStyleItems}
      />
    </>
  );
};

export default App;
