import React, { useState } from 'react';
import { Flex, Tag } from 'antd';

const presetColors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

const App: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(['magenta', 'blue']);
  const [statusChecked, setStatusChecked] = useState(true);
  const [customChecked, setCustomChecked] = useState(false);

  const handleChange = (color: string, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, color] : prev.filter((item) => item !== color)));
  };

  return (
    <Flex gap="small" wrap>
      {presetColors.map((color) => (
        <Tag.CheckableTag
          key={color}
          color={color}
          checked={selected.includes(color)}
          onChange={(checked) => handleChange(color, checked)}
        >
          {color}
        </Tag.CheckableTag>
      ))}
      <Tag.CheckableTag color="success" checked={statusChecked} onChange={setStatusChecked}>
        success
      </Tag.CheckableTag>
      <Tag.CheckableTag color="#2db7f5" checked={customChecked} onChange={setCustomChecked}>
        #2db7f5
      </Tag.CheckableTag>
    </Flex>
  );
};

export default App;
