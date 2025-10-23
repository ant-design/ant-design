import React from 'react';
import { TreeSelect } from 'antd';

import TreeSelectSemanticTemplate from '../../../.dumi/theme/common/TreeSelectSemanticTemplate';

const App: React.FC = () => {
  const treeData = [
    {
      value: 'contributors',
      title: 'contributors',
      children: [
        {
          value: 'aojunhao123',
          title: 'aojunhao123',
        },
        {
          value: 'thinkasany',
          title: 'thinkasany',
        },
        {
          value: 'Meet-student',
          title: 'Meet-student',
        },
      ],
    },
  ];

  return (
    <TreeSelectSemanticTemplate
      component={TreeSelect}
      componentName="TreeSelect"
      prefix="prefix"
      style={{ width: 300 }}
      multipleProps={{ multiple: true }}
      treeData={treeData}
      treeDefaultExpandAll
      showSearch
      allowClear
    />
  );
};

export default App;
