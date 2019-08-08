/* eslint-disable camelcase */
import * as React from 'react';
import AntdIcon, { createFromIconfontCN } from '@ant-design/icons';
import { ThemeType } from '@ant-design/icons-svg/lib/types';

import { withThemeSuffix, removeTypeTheme, getThemeFromTypeName, alias } from './utils';
import warning from '../_util/warning';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1329669_t1u72b9zk8s.js',
});

const OldIcon: React.FC<{
  type: string;
  theme: ThemeType;
}> = props => {
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
  computedType = withThemeSuffix(
    removeTypeTheme(alias(computedType)),
    theme || ('outlined' as ThemeType),
  );
  return <IconFont {...props} type={`icon-${computedType}`} />;
};

const Icon = (props: any) => {
  if (typeof props.type === 'string') {
    return <OldIcon {...props} />;
  }
  return <AntdIcon {...props} />;
};

Icon.createFromIconfontCN = createFromIconfontCN;

export default Icon;
