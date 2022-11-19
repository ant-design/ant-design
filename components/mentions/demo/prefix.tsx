import React, { useState } from 'react';
import { Mentions } from 'antd';

const { Option } = Mentions;

const MOCK_DATA = {
  '@': ['afc163', 'zombiej', 'yesmeck'],
  '#': ['1.0', '2.0', '3.0'],
};

type PrefixType = keyof typeof MOCK_DATA;

const App: React.FC = () => {
  const [prefix, setPrefix] = useState<PrefixType>('@');

  const onSearch = (_: string, newPrefix: PrefixType) => {
    setPrefix(newPrefix);
  };

  return (
    <Mentions
      style={{ width: '100%' }}
      placeholder="input @ to mention people, # to mention tag"
      prefix={['@', '#']}
      onSearch={onSearch}
    >
      {(MOCK_DATA[prefix] || []).map((value) => (
        <Option key={value} value={value}>
          {value}
        </Option>
      ))}
    </Mentions>
  );
};

export default App;
