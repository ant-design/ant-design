import React from 'react';
import { AutoComplete, AutoCompleteProps } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    popup: '弹出菜单元素',
  },
  en: {
    popup: 'Popup element',
  },
};
const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});
const Block = (prop: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [options, setOptions] = React.useState<AutoCompleteProps['options']>([
    { value: 'aojunhao123' },
    { value: 'thinkasany' },
  ]);
  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <div ref={divRef} style={{ position: 'absolute', marginBottom: 80 }}>
      <AutoComplete
        {...prop}
        open
        placement="bottomLeft"
        style={{ width: 200 }}
        styles={{ popup: { zIndex: 1 } }}
        getPopupContainer={() => divRef.current}
        onSearch={(text) => setOptions(getPanelValue(text))}
        placeholder="input here"
        options={options}
      />
    </div>
  );
};
const App: React.FC = () => {
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      semantics={[{ name: 'popup', desc: locale.popup, version: '5.25.0' }]}
      height={200}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
