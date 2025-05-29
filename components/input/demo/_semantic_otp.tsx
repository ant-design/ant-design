import React from 'react';
import { Input } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    input: '输入框元素',
    separator: '分隔符',
  },
  en: {
    root: 'root element',
    input: 'input element',
    separator: 'separator element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="OTPInput"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'input', desc: locale.input, version: '6.0.0' },
        { name: 'separator', desc: locale.separator, version: '6.0.0' },
      ]}
    >
      <Input.OTP separator="-" />
    </SemanticPreview>
  );
};

export default App;
