import React, { useState } from 'react';
import type { RadioChangeEvent, RadioGroupProps } from 'antd';
import { Flex, Input, Radio } from 'antd';

const labelStyle: React.CSSProperties = {
  height: 32,
  lineHeight: '32px',
};

const buttonOptions: RadioGroupProps['options'] = [
  { label: 'Apple', value: 'Apple', className: 'label-1' },
  { label: 'Pear', value: 'Pear', className: 'label-2' },
  { label: 'Orange', value: 'Orange', title: 'Orange', className: 'label-3' },
];

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Flex align="start" gap="large">
      <div style={{ flex: 1 }}>
        <Radio.Group
          vertical
          onChange={onChange}
          value={value}
          options={[
            { value: 1, style: labelStyle, label: 'Option A' },
            { value: 2, style: labelStyle, label: 'Option B' },
            { value: 3, style: labelStyle, label: 'Option C' },
            {
              value: 4,
              style: labelStyle,
              label: (
                <>
                  More...
                  {value === 4 && (
                    <Input
                      variant="filled"
                      placeholder="please input"
                      style={{ width: 120, marginInlineStart: 12 }}
                    />
                  )}
                </>
              ),
            },
          ]}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Radio.Group options={buttonOptions} optionType="button" vertical />
      </div>
    </Flex>
  );
};

export default App;
