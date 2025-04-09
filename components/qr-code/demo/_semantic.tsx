import React from 'react';
import { QRCode } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    cover: '遮罩层元素',
  },
  en: {
    root: 'Root element',
    cover: 'Cover element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  const value = 'https://ant.design';
  return (
    <SemanticPreview
      componentName="QRCode"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'cover', desc: locale.cover },
      ]}
    >
      <QRCode value={value} status="loading" />
    </SemanticPreview>
  );
};

export default App;
