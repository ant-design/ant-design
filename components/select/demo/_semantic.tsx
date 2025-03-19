import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Select } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    prefix: '前缀元素',
    suffix: '后缀元素',
    popup: '弹出菜单元素',
    list: '列表元素',
    listItem: '条目元素',
    input: '输入框元素',
  },
  en: {
    root: 'Root element',
    prefix: 'Prefix element',
    suffix: 'Suffix element',
    popup: 'Popup element',
    list: 'List element',
    listItem: 'Item element',
    input: 'Input element',
  },
};
const Block = (prop: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} style={{ position: 'absolute', marginBottom: 80 }}>
      <Select
        {...prop}
        prefix="User"
        open
        placement="bottomLeft"
        suffixIcon={<SmileOutlined />}
        defaultValue="thinkasany"
        styles={{ root: { zIndex: 1000, width: 200 } }}
        getPopupContainer={() => divRef.current}
        options={[
          { value: 'thinkasany', label: 'thinkasany' },
          { value: 'lucy', label: 'Lucy' },
        ]}
      />
    </div>
  );
};
const App: React.FC = () => {
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'prefix', desc: locale.prefix, version: '6.0.0' },
        { name: 'input', desc: locale.input, version: '6.0.0' },
        { name: 'suffix', desc: locale.suffix, version: '6.0.0' },
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
