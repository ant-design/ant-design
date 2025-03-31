import React from 'react';
import { AutoComplete, AutoCompleteProps } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    popup: '弹出菜单元素',
    list: '列表元素',
    listItem: '条目元素',
    input: '输入框元素',
  },
  en: {
    root: 'Root element',
    popup: 'Popup element',
    list: 'List element',
    listItem: 'Item element',
    input: 'Input element',
  },
};
const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});
const Block = (prop: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [options, setOptions] = React.useState<AutoCompleteProps['options']>([
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
        styles={{ root: { zIndex: 1000, width: 200 } }}
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
      componentName="AutoComplete"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'input', desc: locale.input, version: '6.0.0' },
        { name: 'popup', desc: locale.popup, version: '6.0.0' },
        { name: 'list', desc: locale.list, version: '6.0.0' },
        { name: 'listItem', desc: locale.listItem, version: '6.0.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
