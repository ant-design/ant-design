import React from 'react';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

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
      componentName="Input.Password"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'prefix', desc: locale.prefix },
        { name: 'input', desc: locale.input },
        { name: 'suffix', desc: locale.suffix },
        { name: 'count', desc: locale.count },
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
