import React from 'react';
import type { StepsProps } from 'antd';
import { Flex, Steps, theme } from 'antd';

const items: StepsProps['items'] = Array.from({ length: 5 }, (_, index) => ({
  title: `Step ${index + 1}`,
  subTitle: 'Sub Title',
  content: `This is Step ${index + 1}`,
}));

const App: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Flex vertical>
      <Steps type="inline" current={1} items={items} />
      <Steps
        type="inline"
        current={4}
        items={items}
        status="finish"
        styles={{
          itemTitle: {
            color: token.colorPrimaryText,
          },
          itemSubtitle: {
            color: token.colorPrimaryTextActive,
          },
          itemRail: {
            background: token.colorTextDisabled,
          },
        }}
      />
      <Steps type="inline" current={1} items={items.slice(2)} offset={2} />
    </Flex>
  );
};

export default App;
