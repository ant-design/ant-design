import React from 'react';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    input: '输入框元素',
    prefix: '前缀的包裹元素',
    suffix: '后缀的包裹元素',
    count: '文字计数元素',
  },
  en: {
    root: 'root element',
    input: 'input element',
    prefix: 'prefix element',
    suffix: 'suffix element',
    count: 'count element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Password"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'input', desc: locale.input, version: '6.0.0' },
        { name: 'prefix', desc: locale.prefix, version: '6.0.0' },
        { name: 'suffix', desc: locale.suffix, version: '6.0.0' },
        { name: 'count', desc: locale.count, version: '6.0.0' },
      ]}
    >
      <Input.Password
        showCount
        prefix={<UserOutlined />}
        suffix={<EditOutlined />}
        defaultValue="Hello, Ant Design"
      />
    </SemanticPreview>
  );
};

export default App;
