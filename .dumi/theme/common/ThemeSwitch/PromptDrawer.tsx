import React, { useRef, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Bubble, Sender } from '@ant-design/x';
import type { SenderRef } from '@ant-design/x/es/sender';
import type { BubbleProps } from '@ant-design/x';
import { Button, Drawer, Flex, Space, Splitter, Typography } from 'antd';

import type { SiteContextProps } from '../../../theme/slots/SiteContext';
import useLocale from '../../../hooks/useLocale';
import ComponentsBlock from '../../../pages/index/components/ThemePreview/ComponentsBlock';
import usePromptTheme from './usePromptTheme';
import usePromptRecommend from './usePromptRecommend';

const antdLogoSrc = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const locales = {
  cn: {
    title: 'AI 生成主题',
    finishTips: '生成完成，对话以重新生成。',
    placeholder: '描述你想要的主题风格，如：温暖阳光、清新自然、科技感...',
    recommendTitle: 'AI 推荐主题',
    loading: '加载中...',
  },
  en: {
    title: 'AI Theme Generator',
    finishTips: 'Completed. Regenerate by start a new conversation.',
    placeholder: 'Describe your desired theme style, e.g., warm sunny, fresh natural, tech feel...',
    recommendTitle: 'AI Recommended',
    loading: 'Loading...',
  },
};

export interface PromptDrawerProps {
  open: boolean;
  onClose: () => void;
  onThemeChange?: (themeConfig: SiteContextProps['dynamicTheme']) => void;
}

const PromptDrawer: React.FC<PromptDrawerProps> = ({ open, onClose, onThemeChange }) => {
  // @ts-ignore - useLocale returns type with proper locale key
  const locale = useLocale(locales) as typeof locales.cn;
  const localeKey = locale.title === 'AI 生成主题' ? 'cn' : 'en';
  const [inputValue, setInputValue] = useState('');

  const senderRef = useRef<SenderRef>(null);

  const [submitPrompt, loading, prompt, resText, cancelRequest] = usePromptTheme(onThemeChange);
  const { recommendations, loading: recommendLoading, fetch: fetchRecommendations } =
    usePromptRecommend(localeKey);

  const handleSubmit = (value: string) => {
    submitPrompt(value);
    setInputValue('');
  };

  const handleAfterOpenChange = (isOpen: boolean) => {
    if (isOpen && senderRef.current) {
      // Focus the Sender component when drawer opens
      senderRef.current.focus?.();
    }
    // Fetch AI recommendations when drawer opens
    if (isOpen) {
      fetchRecommendations(`prompt-drawer-${Date.now()}`);
    }
  };

  const items = React.useMemo<BubbleProps['ListProps']['items']>(() => {
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
        placement: 'start',
        content: resText,
        avatar: <img src={antdLogoSrc} alt="Ant Design" style={{ width: 28, height: 28 }} />,
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
        avatar: <img src={antdLogoSrc} alt="Ant Design" style={{ width: 28, height: 28 }} />,
        shape: 'corner',
      });
    }

    return nextItems;
  }, [prompt, resText, loading, locale.finishTips]);

  const prompts = React.useMemo<string[]>(() => recommendations, [recommendations]);

  return (
    <Drawer
      title={locale.title}
      open={open}
      onClose={onClose}
      width="75vw"
      placement="right"
      afterOpenChange={handleAfterOpenChange}
    >
      <Splitter style={{ height: '100%' }}>
        {/* 左侧预览区域 */}
        <Splitter.Panel defaultSize="50%" min="30%" max="70%">
          <Flex vertical style={{ height: '100%', padding: '0 8px' }}>
            <div
              style={{
                flex: 1,
                padding: '24px 8px 8px',
                overflow: 'auto',
              }}
            >
              <ComponentsBlock className="prompt-drawer-preview" />
            </div>
          </Flex>
        </Splitter.Panel>

        {/* 右侧对话区域 */}
        <Splitter.Panel defaultSize="50%" min="30%" max="70%">
          <Flex vertical gap={12} style={{ height: '100%', padding: '0 8px' }}>
            {!prompt && (
              <Flex vertical gap={8}>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {locale.recommendTitle}
                </Typography.Text>
                <Space wrap size="small">
                  {recommendLoading && (
                    <Button size="small" disabled>
                      {locale.loading}
                    </Button>
                  )}
                  {prompts.map((theme) => (
                    <Button
                      key={theme}
                      size="small"
                      onClick={() => handleSubmit(theme)}
                      style={{ borderRadius: 6 }}
                    >
                      {theme}
                    </Button>
                  ))}
                </Space>
              </Flex>
            )}
            <Bubble.List style={{ flex: 1, overflow: 'auto' }} items={items} />
            <Sender
              ref={senderRef}
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              loading={loading}
              onCancel={cancelRequest}
              placeholder={locale.placeholder}
            />
          </Flex>
        </Splitter.Panel>
      </Splitter>
    </Drawer>
  );
};

export default PromptDrawer;