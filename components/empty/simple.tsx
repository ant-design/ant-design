import * as React from 'react';
import { useMemo } from 'react';
import { FastColor } from '@ant-design/fast-color';

import { useLocale } from '../locale';
import { useToken } from '../theme/internal';

const Simple: React.FC = () => {
  const [, token] = useToken();
  const [locale] = useLocale('Empty');

  const { colorFill, colorFillTertiary, colorFillQuaternary, colorBgContainer } = token;

  const { borderColor, shadowColor, contentColor } = useMemo(
    () => ({
      borderColor: new FastColor(colorFill).onBackground(colorBgContainer).toHexString(),
      shadowColor: new FastColor(colorFillTertiary).onBackground(colorBgContainer).toHexString(),
      contentColor: new FastColor(colorFillQuaternary).onBackground(colorBgContainer).toHexString(),
    }),
    [colorFill, colorFillTertiary, colorFillQuaternary, colorBgContainer],
  );

  return /*#__PURE__*/ React.createElement('svg', {
    width: '64',
    height: '41',
    viewBox: '0 0 64 41',
    xmlns: 'http://www.w3.org/2000/svg',
    // biome-ignore lint/security/noDangerouslySetInnerHtml: SVG content is static and safe
    dangerouslySetInnerHTML: {
      __html: `<title>${locale?.description || 'Empty'}</title><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="${shadowColor}" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="${borderColor}"><path d="M55 12.8 44.9 1.3Q44 0 42.9 0H21.1q-1.2 0-2 1.3L9 12.8V22h46z"></path><path d="M41.6 16c0-1.7 1-3 2.2-3H55v18.1c0 2.2-1.3 3.9-3 3.9H12c-1.7 0-3-1.7-3-3.9V13h11.2c1.2 0 2.2 1.3 2.2 3s1 2.9 2.2 2.9h14.8c1.2 0 2.2-1.4 2.2-3" fill="${contentColor}"></path></g></g>`,
    },
  });
};

if (process.env.NODE_ENV !== 'production') {
  Simple.displayName = 'SimpleImage';
}

export default Simple;
