import React, { useEffect, useRef, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Bubble, Prompts, Sender, Welcome } from '@ant-design/x';
import type { PromptsItemType } from '@ant-design/x';
import type { BubbleItemType } from '@ant-design/x/es/bubble/interface';
import type { SenderRef } from '@ant-design/x/es/sender';
import { Button, Divider, Drawer, Flex, Skeleton, Splitter, Typography } from 'antd';

import useLocale from '../../../hooks/useLocale';
import ComponentsBlock from '../../../pages/index/components/ThemePreview/ComponentsBlock';
import type { SiteContextProps } from '../../../theme/slots/SiteContext';
import SiteContext from '../../../theme/slots/SiteContext';
import usePromptRecommend from './usePromptRecommend';
import usePromptTheme from './usePromptTheme';

const antdLogoSrc = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const THEME_EMOJIS = ['🌅', '🌊', '🌿', '🍂', '🌸', '🌌', '🎨', '⚡', '🔮', '🪐'];

const getEmojiForTheme = (index: number) => THEME_EMOJIS[index % THEME_EMOJIS.length];

const locales = {
  cn: {
    title: '🎨 AI 生成主题',
    finishTips: '生成主题完成，已应用',
    placeholder: '描述你想要的主题风格，如：温暖阳光、清新自然、科技感...',
    welcomeTitle: 'AI 主题生成器',
    welcomeDescription: '描述你想要的风格，我会为你生成专属主题',
    recommendTitle: '推荐主题',
    loading: '加载中...',
    refresh: '换一换',
    resetToDefault: '恢复默认主题',
  },
  en: {
    title: '🎨 AI Theme Generator',
    finishTips: 'Theme generated and applied',
    placeholder: 'Describe your desired theme style, e.g., warm sunny, fresh natural, tech feel...',
    welcomeTitle: 'AI Theme Generator',
    welcomeDescription: 'Describe your desired style and I will generate a custom theme for you',
    recommendTitle: 'Recommended Themes',
    loading: 'Loading...',
    refresh: 'Refresh',
    resetToDefault: 'Reset to default theme',
  },
};

export interface PromptDrawerProps {
  open: boolean;
  onClose: () => void;
  onThemeChange?: (themeConfig: SiteContextProps['dynamicTheme']) => void;
}

// Extended type for Prompts items with additional properties
interface ExtendedPromptsItemType extends PromptsItemType {
  originalDescription?: string;
  isRefresh?: boolean;
}

const PromptDrawer: React.FC<PromptDrawerProps> = ({ open, onClose, onThemeChange }) => {
  const { updateSiteConfig, isDark } = React.use(SiteContext) as SiteContextProps;
  const [locale, localeKey] = useLocale(locales);
  const [inputValue, setInputValue] = useState('');

  const senderRef = useRef<SenderRef>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  const [submitPrompt, loading, prompt, resText, cancelRequest] = usePromptTheme(onThemeChange);

  const {
    recommendations,
    loading: recommendLoading,
    fetch: fetchRecommendations,
  } = usePromptRecommend(localeKey);

  const handleScroll = React.useCallback(() => {
    if (!scrollContainerRef.current) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    shouldAutoScrollRef.current = distanceToBottom <= 10;
  }, []);

  const handleSubmit = React.useCallback(
    (value: string) => {
      shouldAutoScrollRef.current = true;
      requestAnimationFrame(() => {
        scrollContainerRef.current?.scrollTo({
          behavior: 'smooth',
          top: Number.MAX_SAFE_INTEGER,
        });
      });
      submitPrompt(value);
      setInputValue('');
    },
    [submitPrompt],
  );

  const handleRefreshRecommendations = React.useCallback(() => {
    fetchRecommendations(`prompt-drawer-refresh-${Date.now()}`);
  }, [fetchRecommendations]);

  const handleResetToDefaultTheme = () => {
    updateSiteConfig({ dynamicTheme: undefined });
  };

  const handleAfterOpenChange = (isOpen: boolean) => {
    if (isOpen && senderRef.current) {
      // Focus the Sender component when drawer opens
      senderRef.current.focus?.();
    }
    // Fetch AI recommendations when drawer opens
    if (isOpen) {
      fetchRecommendations('prompt-drawer-init');
    }
  };

  const items = React.useMemo<BubbleItemType[]>(() => {
    if (!prompt) {
      return [];
    }

    const nextItems: BubbleItemType[] = [
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
        role: 'ai',
        placement: 'start',
        content: resText,
        avatar: (
          <img
            draggable={false}
            src={antdLogoSrc}
            alt="Ant Design"
            style={{ width: 28, height: 28 }}
          />
        ),
        loading: !resText,
        contentRender: (content: string) => (
          <Typography>
            <pre
              style={{
                margin: 0,
                padding: '16px',
                borderRadius: 8,
                background: isDark
                  ? 'linear-gradient(135deg, rgba(90,196,255,0.08) 0%, rgba(174,136,255,0.08) 100%)'
                  : 'linear-gradient(135deg, #f2f9fe 0%, #f7f3ff 100%)',
                fontSize: 13,
                lineHeight: 1.6,
                border: 'none',
                color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)',
              }}
            >
              {content}
            </pre>
          </Typography>
        ),
        styles: {
          content: {
            background: 'transparent',
            padding: 0,
            border: 'none',
          },
        },
      },
    ];

    if (!loading) {
      nextItems.push({
        key: 3,
        role: 'system',
        placement: 'start',
        shape: 'round',
        content: locale.finishTips,
      });

      // Add recommended themes prompts
      const recommendedPrompts = recommendations
        .slice(0, 4)
        .map<ExtendedPromptsItemType>((text, index) => ({
          key: `rec-${text}`,
          description: `${getEmojiForTheme(index)} ${text}`,
          originalDescription: text,
        }));

      // Add refresh button
      recommendedPrompts.push({
        key: 'refresh',
        description: `🔄 ${locale.refresh}`,
        isRefresh: true,
      });

      nextItems.push({
        key: 4,
        role: 'ai',
        placement: 'start',
        content: '',
        avatar: (
          <img
            draggable={false}
            src={antdLogoSrc}
            alt="Ant Design"
            style={{ width: 28, height: 28 }}
          />
        ),
        contentRender: () =>
          recommendLoading ? (
            <Flex gap={8} wrap style={{ justifyContent: 'center' }}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton.Input
                  key={index}
                  active
                  size="small"
                  style={{ width: 140, borderRadius: 8 }}
                />
              ))}
            </Flex>
          ) : (
            <Prompts
              wrap
              items={recommendedPrompts}
              onItemClick={({ data }) => {
                if ('isRefresh' in data && data.isRefresh) {
                  handleRefreshRecommendations();
                } else {
                  handleSubmit(
                    String(
                      (data as ExtendedPromptsItemType).originalDescription ?? data.description,
                    ),
                  );
                }
              }}
              styles={{ root: { marginTop: 8 } }}
            />
          ),
        styles: { content: { padding: 0, background: 'transparent' } },
      });
    }

    return nextItems;
  }, [
    prompt,
    resText,
    loading,
    recommendLoading,
    locale.finishTips,
    isDark,
    recommendations,
    handleSubmit,
    handleRefreshRecommendations,
    locale.refresh,
  ]);

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      scrollContainerRef.current?.scrollTo({
        behavior: 'smooth',
        top: Number.MAX_SAFE_INTEGER,
      });
    }
  }, [resText, items, prompt]);

  // Limit to 3 recommendations for Prompts component + refresh button
  const prompts = React.useMemo(() => {
    const themePrompts = recommendations
      .slice(0, 3)
      .map<ExtendedPromptsItemType>((text, index) => ({
        key: text,
        description: `${getEmojiForTheme(index)} ${text}`,
        originalDescription: text,
      }));

    // Add refresh button as last item only when we have recommendations
    if (themePrompts.length > 0) {
      themePrompts.push({
        key: 'refresh',
        description: `🔄 ${locale.refresh}`,
        isRefresh: true,
      });
    }

    return themePrompts;
  }, [recommendations, locale.refresh]);

  const renderedWelcome = React.useMemo(
    () => (
      <div style={{ padding: '0 0 16px' }}>
        <Welcome
          icon={
            <img
              draggable={false}
              src={antdLogoSrc}
              alt="Ant Design"
              style={{ width: 48, height: 48 }}
            />
          }
          title={locale.welcomeTitle}
          description={locale.welcomeDescription}
          styles={{
            root: {
              background: isDark
                ? 'linear-gradient(97deg, rgba(90,196,255,0.12) 0%, rgba(174,136,255,0.12) 100%)'
                : 'linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)',
            },
          }}
        />
      </div>
    ),
    [locale.welcomeTitle, locale.welcomeDescription, isDark],
  );

  const renderedPrompts = React.useMemo(
    () => (
      <div style={{ padding: '0 0 32px' }}>
        <Flex vertical gap={12} align="center">
          <Divider titlePlacement="center" style={{ margin: 0, fontSize: 12 }}>
            {locale.recommendTitle}
          </Divider>
          {recommendLoading ? (
            <Flex gap={8} wrap style={{ justifyContent: 'center' }}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton.Input
                  key={index}
                  active
                  size="small"
                  style={{ width: 140, borderRadius: 8 }}
                />
              ))}
            </Flex>
          ) : (
            prompts.length > 0 && (
              <Prompts
                wrap
                items={prompts}
                onItemClick={({ data }) => {
                  if ('isRefresh' in data && data.isRefresh) {
                    handleRefreshRecommendations();
                  } else {
                    handleSubmit(
                      String(
                        (data as ExtendedPromptsItemType).originalDescription ?? data.description,
                      ),
                    );
                  }
                }}
                styles={{
                  root: {
                    marginTop: 4,
                  },
                  item: {
                    borderRadius: 8,
                  },
                }}
              />
            )
          )}
        </Flex>
      </div>
    ),
    [locale.recommendTitle, recommendLoading, prompts, handleSubmit, handleRefreshRecommendations],
  );

  return (
    <Drawer
      title={locale.title}
      open={open}
      onClose={onClose}
      width="80vw"
      placement="right"
      afterOpenChange={handleAfterOpenChange}
      extra={
        <Button type="text" size="small" onClick={handleResetToDefaultTheme}>
          {locale.resetToDefault}
        </Button>
      }
    >
      <Splitter style={{ height: '100%' }}>
        {/* 左侧预览区域 */}
        <Splitter.Panel defaultSize="50%" min="30%" max="70%">
          <Flex vertical style={{ height: '100%', padding: '0 8px' }}>
            <div
              style={{
                flex: 1,
                padding: '16px 8px',
                overflow: 'auto',
              }}
            >
              <ComponentsBlock style={{ padding: 16 }} className="prompt-drawer-preview" />
            </div>
          </Flex>
        </Splitter.Panel>

        {/* 右侧对话区域 */}
        <Splitter.Panel defaultSize="50%" min="30%" max="70%">
          <Flex vertical gap={0} style={{ height: '100%', padding: '0 8px' }}>
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              style={{ flex: 1, padding: 0, overflow: 'auto' }}
            >
              {!prompt ? (
                <>
                  {renderedWelcome}
                  {renderedPrompts}
                </>
              ) : (
                <Bubble.List items={items} />
              )}
            </div>
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
