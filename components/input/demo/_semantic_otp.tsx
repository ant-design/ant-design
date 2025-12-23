import React from 'react';
import { Input } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置行内flex布局、对齐方式、列间距和包装样式',
    input: '输入框元素，设置文本居中、内边距和数字输入样式',
    separator: '分隔符元素，设置OTP输入框之间的分隔符显示样式',
  },
  en: {
    root: 'Root element, set inline flex layout, alignment, column gap and wrapper styles',
    input: 'Input element, set text center, padding and number input styles',
    separator: 'Separator element, set separator display styles between OTP input boxes',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Input.OTP"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'input', desc: locale.input },
        { name: 'separator', desc: locale.separator },
      ]}
    >
      <Input.OTP separator="-" />
    </SemanticPreview>
  );
};

export default App;
