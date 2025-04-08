import React from 'react';
import { Select } from 'antd';

import TemplateSemanticPreview from '../../../.dumi/components/TemplateSemanticPreview';

const App: React.FC = () => {
  return (
    <TemplateSemanticPreview
      component={Select}
      componentName="Select"
      style={{ width: 200 }}
      defaultValue="aojunhao123"
      options={[
        { value: 'aojunhao123', label: 'aojunhao123' },
        { value: 'thinkasany', label: 'thinkasany' },
      ]}
    />
  );
};

export default App;
