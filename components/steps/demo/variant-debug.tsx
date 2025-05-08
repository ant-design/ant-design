import React from 'react';
import { ConfigProvider, Divider, Flex, Steps, StepsProps } from 'antd';

const items: StepsProps['items'] = [
  {
    title: 'Finished',
    description: 'This is a description.',
  },
  {
    title: 'In Progress',
    description: 'This is a description.',
    status: 'error',
  },
  {
    title: 'Waiting',
    description: 'This is a description.',
  },
];

const App: React.FC = () => {
  const [current, setCurrent] = React.useState(1);

  const sharedProps: StepsProps = {
    current,
    variant: 'outlined',
    onChange: (current: number) => {
      setCurrent(current);
    },
    items,
  };

  const sharedPercentProps: StepsProps = {
    current,
    variant: 'outlined',
    onChange: (current: number) => {
      setCurrent(current);
    },
    items: items.map(({ status, ...item }) => item),
    percent: 60,
  };

  return (
    <Flex vertical gap="middle">
      <Steps {...sharedProps} variant="filled" />
      <Steps {...sharedProps} />
      <Steps {...sharedProps} size="small" />
      <Steps {...sharedPercentProps} size="small" />
      <Flex gap="middle">
        <Steps {...sharedPercentProps} orientation="vertical" />
        <Steps {...sharedPercentProps} size="small" orientation="vertical" />
      </Flex>
      <Flex gap="middle">
        <Steps {...sharedProps} orientation="vertical" />
        <Steps {...sharedProps} orientation="vertical" size="small" />
      </Flex>
      <Steps {...sharedProps} progressDot size="small" />
      <Flex gap="middle">
        <Steps {...sharedProps} progressDot size="small" orientation="vertical" />
        <Steps {...sharedProps} type="navigation" size="small" orientation="vertical" />
      </Flex>
      <Divider />
      <ConfigProvider
        theme={{
          components: {
            Steps: {
              descriptionMaxWidth: 140,
              customIconSize: 22,
            },
          },
        }}
      >
        <Steps {...sharedProps} progressDot />
        <Steps {...sharedProps} labelPlacement="vertical" />
        <Steps {...sharedProps} labelPlacement="vertical" size="small" />
      </ConfigProvider>
    </Flex>
  );
};

export default App;
