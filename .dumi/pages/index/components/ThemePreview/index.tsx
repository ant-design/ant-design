import * as React from 'react';

import useLocale from '../../../../hooks/useLocale';
import Group from '../Group';
import ComponentsBlock from './ComponentsBlock';

const locales = {
  cn: {
    themeTitle: '定制主题，随心所欲',
    themeDesc: 'Ant Design 开放更多样式算法，让你定制主题更简单',
  },
  en: {
    themeTitle: 'Flexible theme customization',
    themeDesc: 'Ant Design enable extendable algorithm, make custom theme easier',
  },
};

export default function ThemePreview() {
  const [locale] = useLocale(locales);

  return (
    <Group title={locale.themeTitle} description={locale.themeDesc}>
      <ComponentsBlock config={{}} style={{ width: 420 }} />
    </Group>
  );
}
