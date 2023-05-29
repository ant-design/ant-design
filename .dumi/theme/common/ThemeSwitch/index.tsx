import { BgColorsOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { CompactTheme, DarkTheme, Motion } from 'antd-token-previewer/es/icons';
import { FormattedMessage, Link, useLocation } from 'dumi';
import React from 'react';
import useSiteToken from '../../../hooks/useSiteToken';
import { getLocalizedPathname, isZhCN } from '../../utils';
import ThemeIcon from './ThemeIcon';

export type ThemeName = 'light' | 'dark' | 'compact' | 'motion-off';

export type ThemeSwitchProps = {
  value?: ThemeName[];
  onChange: (value: ThemeName[]) => void;
};

const ThemeSwitch: React.FC<ThemeSwitchProps> = (props: ThemeSwitchProps) => {
  const { value = ['light'], onChange } = props;
  const { token } = useSiteToken();
  const { pathname, search } = useLocation();

  const isMotionOff = value.includes('motion-off');

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
      <FloatButton
        icon={<Motion />}
        type={!isMotionOff ? 'primary' : 'default'}
        onClick={() => {
          if (isMotionOff) {
            onChange(value.filter((theme) => theme !== 'motion-off'));
          } else {
            onChange([...value, 'motion-off']);
          }
        }}
        tooltip={
          <FormattedMessage
            id={isMotionOff ? 'app.theme.switch.motion.off' : 'app.theme.switch.motion.on'}
          />
        }
      />
    </FloatButton.Group>
  );
};

export default ThemeSwitch;
