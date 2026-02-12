import React, { useRef, useState } from 'react';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Bubble, Sender } from '@ant-design/x';
import type { SenderRef } from '@ant-design/x/es/sender';
import { Drawer, Flex, Typography } from 'antd';
import type { GetProp } from 'antd';

import useLocale from '../../../hooks/useLocale';
import type { SiteContextProps } from '../../../theme/slots/SiteContext';
import usePromptTheme from './usePromptTheme';

const locales = {
  cn: {
    title: 'AI 生成主题',
    finishTips: '生成完成，对话以重新生成。',
  },
  en: {
    title: 'AI Theme Generator',
    finishTips: 'Completed. Regenerate by start a new conversation.',
  },
};

export interface PromptDrawerProps {
  open: boolean;
  onClose: () => void;
  onThemeChange?: (themeConfig: SiteContextProps['dynamicTheme']) => void;
}

const PromptDrawer: React.FC<PromptDrawerProps> = ({ open, onClose, onThemeChange }) => {
  const [locale] = useLocale(locales);
  const [inputValue, setInputValue] = useState('');

  const senderRef = useRef<SenderRef>(null);

  const [submitPrompt, loading, prompt, resText, cancelRequest] = usePromptTheme(onThemeChange);

  const handleSubmit = (value: string) => {
    submitPrompt(value);
    setInputValue('');
  };

  const handleAfterOpenChange = (isOpen: boolean) => {
    if (isOpen && senderRef.current) {
      // Focus the Sender component when drawer opens
      senderRef.current.focus?.();
    }
  };

  const items = React.useMemo<GetProp<typeof Bubble.List, 'items'>>(() => {
    if (!prompt) {
      return [];
    }

    const nextItems: GetProp<typeof Bubble.List, 'items'> = [
      {
        key: 1,
        role: 'user',
        placement: 'end',
        content: prompt,
        avatar: <UserOutlined />,
        shape: 'corner',
      },
      {
        key: 2,
        role: 'system',
        placement: 'start',
        content: resText,
        avatar: <AntDesignOutlined />,
        loading: !resText,
        contentRender: (content: string) => (
          <Typography>
            <pre style={{ margin: 0 }}>{content}</pre>
          </Typography>
        ),
      },
    ];

    if (!loading) {
      nextItems.push({
        key: 3,
        role: 'divider',
        placement: 'start',
        content: locale.finishTips,
        avatar: <AntDesignOutlined />,
        shape: 'corner',
      });
    }

    return nextItems;
  }, [prompt, resText, loading, locale.finishTips]);

  return (
    <Drawer
      title={locale.title}
      open={open}
      onClose={onClose}
      size={480}
      placement="right"
      afterOpenChange={handleAfterOpenChange}
    >
      <Flex vertical style={{ height: '100%' }}>
        <Bubble.List style={{ flex: 1, overflow: 'auto' }} items={items} />
        <Sender
          ref={senderRef}
          style={{ flex: 0 }}
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          loading={loading}
          onCancel={cancelRequest}
        />
      </Flex>
    </Drawer>
  );
};

export default PromptDrawer;
