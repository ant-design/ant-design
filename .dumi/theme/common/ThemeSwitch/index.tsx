import React from 'react';
import { BgColorsOutlined, SmileOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useTheme } from 'antd-style';
import { CompactTheme, DarkTheme } from 'antd-token-previewer/es/icons';
// import { Motion } from 'antd-token-previewer/es/icons';
import { FormattedMessage, Link, useLocation } from 'dumi';

import useThemeAnimation from '../../../hooks/useThemeAnimation';
import { getLocalizedPathname, isZhCN } from '../../utils';
import ThemeIcon from './ThemeIcon';

export type ThemeName = 'light' | 'dark' | 'compact' | 'motion-off' | 'happy-work';

export interface ThemeSwitchProps {
  value?: ThemeName[];
  onChange: (value: ThemeName[]) => void;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = (props) => {
  const { value = ['light'], onChange } = props;
  const token = useTheme();
  const { pathname, search } = useLocation();

  // const isMotionOff = value.includes('motion-off');
  const isHappyWork = value.includes('happy-work');
  const isDark = value.includes('dark');

  const toggleAnimationTheme = useThemeAnimation();

  return (
    <FloatButton.Group
      trigger="click"
      icon={<ThemeIcon />}
      aria-label="Theme Switcher"
      badge={{ dot: true }}
      style={{ zIndex: 1010 }}
    >
      <Link
        to={getLocalizedPathname('/theme-editor', isZhCN(pathname), search)}
        style={{ display: 'block', marginBottom: token.margin }}
      >
        <FloatButton
          icon={<BgColorsOutlined />}
          tooltip={<FormattedMessage id="app.footer.theme" />}
        />
      </Link>
      <FloatButton
        icon={<DarkTheme />}
        type={isDark ? 'primary' : 'default'}
        onClick={(e) => {
          // Toggle animation when switch theme
          toggleAnimationTheme(e, isDark);

          if (isDark) {
            onChange(value.filter((theme) => theme !== 'dark'));
          } else {
            onChange([...value, 'dark']);
          }
        }}
        tooltip={<FormattedMessage id="app.theme.switch.dark" />}
      />
      <FloatButton
        icon={<CompactTheme />}
        type={value.includes('compact') ? 'primary' : 'default'}
        onClick={() => {
          if (value.includes('compact')) {
            onChange(value.filter((theme) => theme !== 'compact'));
          } else {
            onChange([...value, 'compact']);
          }
        }}
        tooltip={<FormattedMessage id="app.theme.switch.compact" />}
      />
      <FloatButton
        badge={{ dot: true }}
        icon={<SmileOutlined />}
        type={isHappyWork ? 'primary' : 'default'}
        onClick={() => {
          if (isHappyWork) {
            onChange(value.filter((theme) => theme !== 'happy-work'));
          } else {
            onChange([...value, 'happy-work']);
          }
        }}
        tooltip={
          <FormattedMessage
            id={isHappyWork ? 'app.theme.switch.happy-work.off' : 'app.theme.switch.happy-work.on'}
          />
        }
      />
    </FloatButton.Group>
  );
};

export default ThemeSwitch;
