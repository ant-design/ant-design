import React from 'react';
import type { GetProps } from 'antd';
import { Flex, Radio } from 'antd';

const options = [
  { label: 'Hangzhou', value: 'a' },
  { label: 'Shanghai', value: 'b' },
  { label: 'Beijing', value: 'c' },
];

const sharedProps: GetProps<typeof Radio.Group> = {
  defaultValue: 'a',
  options,
};

const renderGroup = (optionType?: 'button') => (
  <>
    <Radio.Group {...sharedProps} optionType={optionType} size="large" />
    <Radio.Group {...sharedProps} optionType={optionType} />
    <Radio.Group {...sharedProps} optionType={optionType} size="small" />
  </>
);

const App: React.FC = () => (
  <Flex vertical gap="medium">
    {renderGroup()}
    {renderGroup('button')}
  </Flex>
);

export default App;
