import React, { useRef, useState } from 'react';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Bubble, Sender } from '@ant-design/x';
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
  const senderRef = useRef<any>(null);

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
        placement: 'end',
        content: prompt,
        avatar: { icon: <UserOutlined /> },
        shape: 'corner',
      },
      {
        placement: 'start',
        content: resText,
        avatar: { icon: <AntDesignOutlined /> },
        loading: !resText,
        messageRender: (content: string) => (
          <Typography>
            <pre style={{ margin: 0 }}>{content}</pre>
          </Typography>
        ),
      },
    ];

    if (!loading) {
      nextItems.push({
        placement: 'start',
        content: locale.finishTips,
        avatar: { icon: <AntDesignOutlined /> },
        shape: 'corner',
      });
    }

    return nextItems;
  }, [prompt, resText, loading]);

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
