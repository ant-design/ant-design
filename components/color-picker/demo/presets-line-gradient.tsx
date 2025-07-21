import React from 'react';
import { ColorPicker } from 'antd';

const PRESET_COLORS = [
  ['rgb(42, 188, 191)', 'rgb(56, 54, 221)'],
  ['rgb(34, 73, 254)', 'rgb(199, 74, 168)'],
  ['rgb(255, 111, 4)', 'rgb(243, 48, 171)'],
  ['rgb(244, 170, 6)', 'rgb(229, 70, 49)'],
];

const Demo: React.FC = () => {
  return (
    <ColorPicker
      mode={['single', 'gradient']}
      presets={[
        {
          label: 'Liner',
          colors: PRESET_COLORS.map((colors) => [
            {
              color: colors[0],
              percent: 0,
            },
            {
              color: colors[1],
              percent: 100,
            },
          ]),
          defaultOpen: true,
        },
      ]}
    />
  );
};

export default Demo;
