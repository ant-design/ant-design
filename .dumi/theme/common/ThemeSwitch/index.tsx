import React from 'react';
import { BgColorsOutlined, SmileOutlined, SunOutlined, LinkOutlined } from '@ant-design/icons';
import { Dropdown, Button } from 'antd';
import { CompactTheme, DarkTheme } from 'antd-token-previewer/es/icons';
import { FormattedMessage, useLocation } from 'dumi';

// import useThemeAnimation from '../../../hooks/useThemeAnimation';
import { getLocalizedPathname, isZhCN } from '../../utils';
import Link from '../Link';
import ThemeIcon from './ThemeIcon';
export type ThemeName = 'light' | 'dark' | 'compact' | 'motion-off' | 'happy-work';
export interface ThemeSwitchProps {
  value?: ThemeName[];
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = () => {
  // const { value = ['light'] } = props;
  const { pathname, search } = useLocation();

  // const isHappyWork = value.includes('happy-work');
  // const isDark = value.includes('dark');

  // const toggleAnimationTheme = useThemeAnimation();

  const items = [
    {
      label: <FormattedMessage id="app.theme.switch.default" />,
      icon: <SunOutlined />,
      key: 'light',
    },
    {
      label: <FormattedMessage id="app.theme.switch.dark" />,
      icon: <DarkTheme />,
      key: 'dark',
    },
    {
      label: <FormattedMessage id="app.theme.switch.compact" />,
      icon: <CompactTheme />,
      key: 'compact',
    },
    {
      type: 'divider' as const,
    },
    {
      label: <FormattedMessage id="app.theme.switch.happy-work" />,
      icon: <SmileOutlined />,
      key: 'happy-work',
    },
    {
      type: 'divider' as const,
    },
    {
      label: (
        <Link to={getLocalizedPathname('/theme-editor', isZhCN(pathname), search)}>
          <FormattedMessage id="app.footer.theme" />
        </Link>
      ),
      key: 'theme-editor',
      icon: <BgColorsOutlined />,
      extra: <LinkOutlined />,
    },
  ];

  return (
    <Dropdown menu={{ items }} arrow={{ pointAtCenter: true }} placement="bottomRight">
      <Button type="text" icon={<ThemeIcon />} style={{ fontSize: 16 }} />
    </Dropdown>
  );
};

export default ThemeSwitch;
