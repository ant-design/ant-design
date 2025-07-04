import React from 'react';
import { AutoComplete } from 'antd';

import SelectSemanticTemplate from '../../../.dumi/theme/common/SelectSemanticTemplate';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
  label: str.repeat(repeat),
});

const getPanelValue = (searchText: string) =>
  !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

const App: React.FC = () => {
  const [options, setOptions] = React.useState([
    { value: 'aojunhao123', label: 'aojunhao123' },
    { value: 'thinkasany', label: 'thinkasany' },
  ]);

  return (
    <SelectSemanticTemplate
      component={AutoComplete}
      componentName="AutoComplete"
      style={{ width: 200 }}
      options={options}
      onSearch={(text: string) => setOptions(getPanelValue(text))}
      placeholder="input here"
    />
  );
};

export default App;
