import React from 'react';
import { FloatButton } from 'antd';
import { FormattedMessage, useNavigate } from 'dumi';
import { DarkTheme, CompactTheme } from 'antd-token-previewer/es/icons';
import { BgColorsOutlined } from '@ant-design/icons';
import ThemeIcon from './ThemeIcon';

export type ThemeName = 'light' | 'dark' | 'compact';

export type ThemeSwitchProps = {
  value?: ThemeName[];
  onChange: (value: ThemeName[]) => void;
};

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ value, onChange }) => {
  const navigate = useNavigate();
  return (
    <FloatButton.Group trigger="click" icon={<ThemeIcon />}>
      <FloatButton
        icon={<BgColorsOutlined />}
        tooltip={<FormattedMessage id="app.footer.theme" />}
        onClick={() => {
          navigate('/theme-editor');
        }}
      />
      <FloatButton
        icon={<DarkTheme />}
        type={value.includes('dark') ? 'primary' : 'default'}
        onClick={() => {
          if (value.includes('dark')) {
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
    </FloatButton.Group>
  );
};

export default ThemeSwitch;
