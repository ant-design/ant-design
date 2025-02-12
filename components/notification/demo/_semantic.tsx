import React from 'react';
import { Button, notification } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = notification;

const locales = {
  cn: {
    root: '根元素',
    content: '内容元素',
    icon: '图标元素',
    title: '标题元素',
    description: '描述元素',
    actions: '操作组元素',
  },
  en: {
    root: 'Root element',
    content: 'Content element',
    icon: 'Icon element',
    title: 'title element',
    description: 'Description element',
    actions: 'Actions element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'title', desc: locale.title, version: '6.0.0' },
        { name: 'description', desc: locale.description, version: '6.0.0' },
        { name: 'actions', desc: locale.actions, version: '6.0.0' },
      ]}
    >
      <InternalPanel
        title="Hello World!"
        description="Hello World?"
        type="success"
        actions={
          <Button type="primary" size="small">
            My Button
          </Button>
        }
      />
    </SemanticPreview>
  );
};

export default App;
