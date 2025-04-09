import React from 'react';
import { QRCode } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    mask: '遮罩层元素',
  },
  en: {
    root: 'Root element',
    mask: 'Mask element',
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
        { name: 'mask', desc: locale.mask },
      ]}
    >
      <QRCode value={value} status="loading" />
    </SemanticPreview>
  );
};

export default App;
