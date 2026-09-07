import React from 'react';
import { Flex, Select } from 'antd';

const longLabel = 'A very very very very very very very long selected label';

const options = [
  { value: 'long', label: longLabel },
  { value: 'short', label: 'Short option' },
];

const selectStyle: React.CSSProperties = { width: 280 };

const App: React.FC = () => {
  const suffixIcon = (
    <button
      type="button"
      onMouseDown={(event) => event.stopPropagation()}
      onClick={() => console.log('suffix clicked')}
      style={{
        border: '1px solid #d9d9d9',
        borderRadius: 4,
        padding: '0 8px',
        color: 'rgba(0, 0, 0, 0.88)',
        background: '#fff',
        cursor: 'pointer',
      }}
    >
      Suffix
    </button>
  );

  return (
    <Flex vertical gap="middle">
      <Flex vertical gap="small">
        <span>Interactive suffix</span>
        <Select
          allowClear
          defaultValue="long"
          suffixIcon={suffixIcon}
          options={options}
          style={selectStyle}
        />
      </Flex>

      <Flex vertical gap="small">
        <span>No suffix</span>
        <Select
          allowClear
          defaultValue="long"
          suffixIcon={null}
          options={options}
          style={selectStyle}
        />
      </Flex>
    </Flex>
  );
};

export default App;
