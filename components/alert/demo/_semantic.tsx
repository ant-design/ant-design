import React from 'react';
import { Alert, Button, Space } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    content: '内容元素',
    icon: '图标元素',
    message: '消息元素',
    description: '描述元素',
    action: '操作组元素',
  },
  en: {
    root: 'Root element',
    content: 'Content element',
    icon: 'Icon element',
    message: 'Message element',
    description: 'Description element',
    action: 'Actions element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
        { name: 'message', desc: locale.message, version: '6.0.0' },
        { name: 'description', desc: locale.description, version: '6.0.0' },
        { name: 'action', desc: locale.action, version: '6.0.0' },
      ]}
    >
      <Alert
        message="Info Text"
        showIcon
        description="Info Description Info Description Info Description Info Description"
        type="info"
        action={
          <Space direction="vertical">
            <Button size="small" type="primary">
              Accept
            </Button>
            <Button size="small" danger ghost>
              Decline
            </Button>
          </Space>
        }
      />
    </SemanticPreview>
  );
};

export default App;
