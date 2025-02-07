import React, { useState } from 'react';
import { Flex, Rate, RateProps } from 'antd';

const desc: RateProps['tooltips'] = [
  'terrible',
  { placement: 'top', title: 'bad', trigger: 'hover' },
  'normal',
  'good',
  'wonderful',
];

function getDescTitle(value: number, desc: RateProps['tooltips']) {
  const item = desc?.[value - 1];
  return typeof item === 'object' ? item.title : item;
}

const App: React.FC = () => {
  const [value, setValue] = useState(3);

  return (
    <Flex gap="middle" vertical>
      <Rate tooltips={desc} onChange={setValue} value={value} />
      {value ? <span>{getDescTitle(value, desc) as React.ReactNode}</span> : null}
      {value}
    </Flex>
  );
};

export default App;
