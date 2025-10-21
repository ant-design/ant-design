import React from 'react';
import { Cascader } from 'antd';

import TemplateSemanticPreview from '../../../.dumi/theme/common/SelectSemanticTemplate';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'contributors',
    label: 'contributors',
    children: [
      {
        value: 'aojunhao123',
        label: 'aojunhao123',
      },
      {
        value: 'thinkasany',
        label: 'thinkasany',
      },
      {
        value: 'Meet-student',
        label: 'Meet-student',
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
      defaultValue={['contributors', 'thinkasany']}
      prefix="prefix"
      style={{ width: 200 }}
      options={options}
      multipleProps={{ multiple: true }}
    />
  );
};

export default App;
