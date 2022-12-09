import React from 'react';
import { FloatButton } from 'antd';
import { FormattedMessage } from 'dumi';
import { DarkTheme, Light, CompactTheme } from 'antd-token-previewer/es/icons';
import ThemeIcon from './ThemeIcon';

export type ThemeName = 'light' | 'dark' | 'compact';

export type ThemeSwitchProps = {
  value?: ThemeName[];
  onChange: (value: ThemeName[]) => void;
};

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ value, onChange }) => (
  <FloatButton.Group trigger="click" icon={<ThemeIcon />}>
    <FloatButton
      icon={<Light />}
      type={!value.includes('dark') ? 'primary' : 'default'}
      onClick={() => {
        if (value.includes('dark')) {
          onChange(value.filter((theme) => theme !== 'dark'));
        }
      }}
      tooltip={<FormattedMessage id="app.theme.switch.default" />}
    />
    <FloatButton
      icon={<DarkTheme />}
      type={value.includes('dark') ? 'primary' : 'default'}
      onClick={() => {
        if (!value.includes('dark')) {
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
  </FloatButton.Group>
);

export default ThemeSwitch;
