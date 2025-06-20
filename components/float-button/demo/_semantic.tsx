import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素',
    content: '内容元素',
    icon: '图标元素',
  },
  en: {
    root: 'Root element',
    content: 'Content element',
    icon: 'Icon element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="FloatButton"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'icon', desc: locale.icon },
        { name: 'content', desc: locale.content },
      ]}
    >
      <FloatButton._InternalPanelDoNotUseOrYouWillBeFired
        type="primary"
        shape="square"
        icon={<QuestionCircleOutlined />}
        content="HELP"
      />
    </SemanticPreview>
  );
};

export default App;
