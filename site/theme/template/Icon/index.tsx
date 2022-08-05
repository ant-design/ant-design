/* eslint-disable camelcase */
import React from 'react';
import AntdIcon, { createFromIconfontCN } from '@ant-design/icons';
import { withThemeSuffix, removeTypeTheme, getThemeFromTypeName } from './utils';
import warning from '../../../../components/_util/warning';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1329669_t1u72b9zk8s.js',
});

interface IconProps {
  type: string;
  theme: string;
}

interface CreateIconfont {
  createFromIconfontCN: typeof createFromIconfontCN;
}

const OldIcon: React.FC<IconProps> = props => {
  const { type, theme } = props;
  let computedType = type;
  if (theme) {
    const themeInName = getThemeFromTypeName(type);
    warning(
      !themeInName || theme === themeInName,
      'Icon',
      `The icon name '${type}' already specify a theme '${themeInName}',` +
        ` the 'theme' prop '${theme}' will be ignored.`,
    );
  }
  computedType = withThemeSuffix(removeTypeTheme(computedType), theme || 'outlined');
  return <IconFont {...props} type={`icon-${computedType}`} />;
};

const Icon: React.FC<IconProps> & CreateIconfont = props =>
  typeof props.type === 'string' ? <OldIcon {...props} /> : <AntdIcon {...props} />;

Icon.createFromIconfontCN = createFromIconfontCN;

export default Icon;
