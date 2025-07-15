import React, { use, useRef, useState } from 'react';
import {
  BgColorsOutlined,
  LinkOutlined,
  ShopOutlined,
  SmileOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { Badge, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CompactTheme, DarkTheme } from 'antd-token-previewer/es/icons';
import { FormattedMessage, useLocation } from 'dumi';

import useThemeAnimation from '../../../hooks/useThemeAnimation';
import type { SiteContextProps } from '../../slots/SiteContext';
import SiteContext from '../../slots/SiteContext';
import { getLocalizedPathname, isZhCN } from '../../utils';
import Link from '../Link';
import PromptDrawer from './PromptDrawer';
import ThemeIcon from './ThemeIcon';

export type ThemeName = 'light' | 'dark' | 'compact' | 'motion-off' | 'happy-work';

export interface ThemeSwitchProps {
  value?: ThemeName[];
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = () => {
  const { pathname, search } = useLocation();
  const { theme, updateSiteConfig } = use<SiteContextProps>(SiteContext);
  const toggleAnimationTheme = useThemeAnimation();
  const lastThemeKey = useRef<string>(theme.includes('dark') ? 'dark' : 'light');
  const [isMarketDrawerOpen, setIsMarketDrawerOpen] = useState(false);

  const badge = <Badge color="blue" style={{ marginTop: -1 }} />;

  // 主题选项配置
  const themeOptions = [
    {
      id: 'app.theme.switch.default',
      icon: <SunOutlined />,
      key: 'light',
      showBadge: () => theme.includes('light') || theme.length === 0,
    },
    {
      id: 'app.theme.switch.dark',
      icon: <DarkTheme />,
      key: 'dark',
      showBadge: () => theme.includes('dark'),
    },
    {
      type: 'divider',
    },
    {
      id: 'app.theme.switch.compact',
      icon: <CompactTheme />,
      key: 'compact',
      showBadge: () => theme.includes('compact'),
    },
    {
      type: 'divider',
    },
    {
      id: 'app.theme.switch.happy-work',
      icon: <SmileOutlined />,
      key: 'happy-work',
      showBadge: () => theme.includes('happy-work'),
    },
    {
      type: 'divider',
    },
    {
      id: 'app.theme.switch.market',
      icon: <ShopOutlined />,
      key: 'market',
    },
    {
      id: 'app.footer.theme',
      icon: <BgColorsOutlined />,
      key: 'theme-editor',
      extra: <LinkOutlined />,
      isLink: true,
      linkPath: '/theme-editor',
    },
  ];

  // 构建下拉菜单项
  const items = themeOptions.map((option, i) => {
    if (option.type === 'divider') {
      return { type: 'divider' as const, key: `divider-${i}` };
    }

    const { id, icon, key, showBadge, extra, isLink, linkPath } = option;

    return {
      label: isLink ? (
        <Link to={getLocalizedPathname(linkPath!, isZhCN(pathname), search)}>
          <FormattedMessage id={id} />
        </Link>
      ) : (
        <FormattedMessage id={id} />
      ),
      icon,
      key: key || i,
      extra: showBadge ? (showBadge() ? badge : null) : extra,
    };
  });

  // 处理主题切换
  const handleThemeChange = (key: string, domEvent: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // 查找对应的选项配置
    const option = themeOptions.find((opt) => opt.key === key);

    // 链接类型的菜单项特殊处理，不执行主题切换逻辑
    if (option?.isLink) {
      return;
    }

    // Market 选项特殊处理，打开 Drawer
    if (key === 'market') {
      setIsMarketDrawerOpen(true);
      return;
    }

    const themeKey = key as ThemeName;

    // 亮色/暗色模式是互斥的
    if (['light', 'dark'].includes(key)) {
      // 校验当前主题是否包含要切换的主题（避免 timeout in DOM update）
      if (theme.includes(themeKey)) {
        return;
      }

      // 亮色/暗色模式切换时应用动画效果
      lastThemeKey.current = key;
      toggleAnimationTheme(domEvent, theme.includes('dark'));

      const filteredTheme = theme.filter((t) => !['light', 'dark'].includes(t));
      updateSiteConfig({
        theme: [...filteredTheme, themeKey],
      });
    } else {
      // 其他主题选项是开关式的
      const hasTheme = theme.includes(themeKey);
      updateSiteConfig({
        theme: hasTheme ? theme.filter((t) => t !== themeKey) : [...theme, themeKey],
      });
    }
  };

  const onClick: MenuProps['onClick'] = ({ key, domEvent }) => {
    handleThemeChange(key, domEvent as React.MouseEvent<HTMLElement, MouseEvent>);
  };
  return (
    <>
      <Dropdown menu={{ items, onClick }} arrow={{ pointAtCenter: true }} placement="bottomRight">
        <Button type="text" icon={<ThemeIcon />} style={{ fontSize: 16 }} />
      </Dropdown>

      <PromptDrawer open={isMarketDrawerOpen} onClose={() => setIsMarketDrawerOpen(false)} />
    </>
  );
};

export default ThemeSwitch;
