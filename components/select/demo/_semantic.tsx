import React from 'react';
import { Select } from 'antd';

import SelectSemanticTemplate from '../../../.dumi/theme/common/SelectSemanticTemplate';

const App: React.FC = () => {
  return (
    <SelectSemanticTemplate
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
