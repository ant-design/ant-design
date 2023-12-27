import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const MAX_COUNT = 3;

const App: React.FC = () => {
  const [value, setValue] = React.useState<string[]>(['jack']);

  const suffix = (
    <>
      <span>
        {value.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );

  return (
    <Select
      mode="multiple"
      maxCount={MAX_COUNT}
      value={value}
      style={{ width: '100%' }}
      onChange={setValue}
      suffixIcon={suffix}
      placeholder="Please select"
      options={[
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
        { value: 'afc163', label: 'afc163' },
        { value: 'zombie', label: 'zombie' },
        { value: 'MadCcc', label: 'MadCcc' },
        { value: 'chenshuai2144', label: 'chenshuai2144' },
        { value: 'lijianan', label: 'lijianan' },
      ]}
    />
  );
};

export default App;
