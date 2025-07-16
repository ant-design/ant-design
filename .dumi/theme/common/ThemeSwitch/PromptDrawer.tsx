import React, { useRef, useState } from 'react';
import { Bubble, Sender } from '@ant-design/x';
import { Drawer, Flex } from 'antd';

import useLocale from '../../../hooks/useLocale';
import type { SiteContextProps } from '../../../theme/slots/SiteContext';
import usePromptTheme from './usePromptTheme';

const locales = {
  cn: {
    title: 'AI 生成主题',
  },
  en: {
    title: 'AI Theme Generator',
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

  const [submitPrompt] = usePromptTheme(onThemeChange);

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

  return (
    <Drawer
      title={locale.title}
      open={open || true}
      onClose={onClose}
      width={480}
      placement="right"
      afterOpenChange={handleAfterOpenChange}
    >
      <Flex vertical style={{ height: '100%' }}>
        <Bubble.List style={{ flex: 1, overflow: 'auto' }} />
        <Sender
          ref={senderRef}
          style={{ flex: 0 }}
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
        />
      </Flex>
    </Drawer>
  );
};

export default PromptDrawer;
