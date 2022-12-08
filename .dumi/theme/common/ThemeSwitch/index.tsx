import React from 'react';
import { FloatButton } from 'antd';
import { FormattedMessage } from 'dumi';
import { DarkTheme, Light, CompactTheme } from 'antd-token-previewer/es/icons';
import ThemeIcon from './ThemeIcon';

export type ThemeSwitchProps = {
  value?: 'light' | 'dark' | 'compact';
  onChange: (value: 'light' | 'dark' | 'compact') => void;
};

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ value, onChange }) => (
  <FloatButton.Group trigger="click" icon={<ThemeIcon />}>
    <FloatButton
      icon={<Light />}
      type={value === 'light' || !value ? 'primary' : 'default'}
      onClick={() => onChange('light')}
      tooltip={<FormattedMessage id="app.theme.switch.default" />}
    />
    <FloatButton
      icon={<DarkTheme />}
      type={value === 'dark' ? 'primary' : 'default'}
      onClick={() => onChange('dark')}
      tooltip={<FormattedMessage id="app.theme.switch.dark" />}
    />
    <FloatButton
      icon={<CompactTheme />}
      type={value === 'compact' ? 'primary' : 'default'}
      onClick={() => onChange('compact')}
      tooltip={<FormattedMessage id="app.theme.switch.compact" />}
    />
  </FloatButton.Group>
);

export default ThemeSwitch;
