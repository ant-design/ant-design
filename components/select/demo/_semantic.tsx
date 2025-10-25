import React from 'react';
import { Select } from 'antd';

import SelectSemanticTemplate from '../../../.dumi/theme/common/SelectSemanticTemplate';

const App: React.FC = () => {
  return (
    <SelectSemanticTemplate
      component={Select}
      componentName="Select"
      prefix="prefix"
      style={{ width: 300 }}
      multipleProps={{ mode: 'multiple' }}
      options={[
        { value: 'aojunhao123', label: 'aojunhao123' },
        { value: 'thinkasany', label: 'thinkasany' },
        { value: 'meet-student', label: 'meet-student' },
      ]}
    />
  );
};

export default App;
