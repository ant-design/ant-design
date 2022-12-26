import React from 'react';
import { FloatButton } from 'antd';
import { FormattedMessage, Link, useLocation } from 'dumi';
import { DarkTheme, CompactTheme } from 'antd-token-previewer/es/icons';
import { BgColorsOutlined } from '@ant-design/icons';
import useSiteToken from '../../../hooks/useSiteToken';
import { getLocalizedPathname, isZhCN } from '../../utils';
import ThemeIcon from './ThemeIcon';

export type ThemeName = 'light' | 'dark' | 'compact';

export type ThemeSwitchProps = {
  value?: ThemeName[];
  onChange: (value: ThemeName[]) => void;
};

const ThemeSwitch: React.FC<ThemeSwitchProps> = (props: ThemeSwitchProps) => {
  const { value = ['light'], onChange } = props;
  const { token } = useSiteToken();
  const { pathname, search } = useLocation();
  return (
    <FloatButton.Group trigger="click" icon={<ThemeIcon />}>
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
