import React, { use } from 'react';
import { BgColorsOutlined, LinkOutlined, SmileOutlined, SunOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CompactTheme, DarkTheme } from 'antd-token-previewer/es/icons';
import { FormattedMessage, useLocation } from 'dumi';

import useThemeAnimation from '../../../hooks/useThemeAnimation';
import type { SiteContextProps } from '../../slots/SiteContext';
import SiteContext from '../../slots/SiteContext';
import { getLocalizedPathname, isZhCN } from '../../utils';
import Link from '../Link';
import ThemeIcon from './ThemeIcon';

export type ThemeName = 'light' | 'dark' | 'compact' | 'motion-off' | 'happy-work';

export interface ThemeSwitchProps {
  value?: ThemeName[];
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = () => {
  const { pathname, search } = useLocation();
  const { theme, updateSiteConfig } = use<SiteContextProps>(SiteContext);
  const toggleAnimationTheme = useThemeAnimation();

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
    // 主题编辑器特殊处理
    if (key === 'theme-editor') {
      return;
    }

    // 亮色/暗色模式切换时应用动画效果
    if (key === 'dark' || key === 'light') {
      toggleAnimationTheme(domEvent, theme.includes('dark'));
    }

    const themeKey = key as ThemeName;

    // 亮色/暗色模式是互斥的
    if (['light', 'dark'].includes(key)) {
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
    <Dropdown menu={{ items, onClick }} arrow={{ pointAtCenter: true }} placement="bottomRight">
      <Button type="text" icon={<ThemeIcon />} style={{ fontSize: 16 }} />
    </Dropdown>
  );
};

export default ThemeSwitch;
