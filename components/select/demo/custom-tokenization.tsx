import React from 'react';
import { Select } from 'antd';

const tokenize = (input: string): string[] => {
  const tokens: string[] = [];
  const regex = /"([^"]*)"|([^,\n]+)/g;
  let match: RegExpExecArray | null = regex.exec(input);
  while (match) {
    tokens.push((match[1] ?? match[2]).trim());
    match = regex.exec(input);
  }
  return tokens.filter(Boolean);
};

const App: React.FC = () => (
  <Select
    mode="tags"
    style={{ width: '100%' }}
    tokenSeparators={tokenize}
    placeholder='Try paste: "San Francisco, CA", New York'
  />
);

export default App;
