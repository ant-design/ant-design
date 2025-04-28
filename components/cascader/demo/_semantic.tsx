import React from 'react';
import { Cascader } from 'antd';

import TemplateSemanticPreview from '../../../.dumi/components/SelectSemanticTemplate';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  return (
    <TemplateSemanticPreview
      open
      component={Cascader}
      componentName="Cascader"
      prefix="prefix"
      style={{ width: 200 }}
      options={options}
    />
  );
};

export default App;
