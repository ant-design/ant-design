import React from 'react';
import { AutoComplete } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';
import { Block, locales } from '../../select/demo/_semantic';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
  label: str.repeat(repeat),
});

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  const [options, setOptions] = React.useState([
    { value: 'aojunhao123', label: 'aojunhao123' },
    { value: 'thinkasany', label: 'thinkasany' },
  ]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <SemanticPreview
      semantics={[{ name: 'popup', desc: locale.popup, version: '5.25.0' }]}
      height={200}
    >
      <Block
        component={AutoComplete}
        style={{ width: 200 }}
        options={options}
        onSearch={(text: string) => setOptions(getPanelValue(text))}
        placeholder="input here"
      />
    </SemanticPreview>
  );
};

export default App;
