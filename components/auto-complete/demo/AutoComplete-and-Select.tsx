import React from 'react';
import { AutoComplete, Flex, Select } from 'antd';

const AutoCompleteAndSelect = () => {
  return (
    <Flex vertical gap={16}>
      {(['small', 'middle', 'large'] as const).map((size) => (
        <Flex key={size}>
          <Select
            value="centered"
            size={size}
            style={{ width: 200 }}
            searchValue="centered"
            showSearch
          />
          <AutoComplete value="centered" size={size} style={{ width: 200 }} />
        </Flex>
      ))}
    </Flex>
  );
};

export default AutoCompleteAndSelect;
