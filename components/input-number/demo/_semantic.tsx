import React from 'react';
import { InputNumber } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    input: '输入框元素',
    prefix: '前缀的包裹元素',
    suffix: '后缀的包裹元素',
    actions: '操作元素',
  },
  en: {
    root: 'root element',
    input: 'input element',
    prefix: 'prefix element',
    suffix: 'suffix element',
    actions: 'actions element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="InputNumber"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'prefix', desc: locale.prefix },
        { name: 'input', desc: locale.input },
        { name: 'suffix', desc: locale.suffix },
        { name: 'actions', desc: locale.actions },
      ]}
    >
      <InputNumber prefix="￥" suffix="RMB" defaultValue={100} style={{ width: 200 }} />
    </SemanticPreview>
  );
};

export default App;
