import * as React from 'react';
import { useMemo } from 'react';

import { useLocale } from '../locale';
import { useToken } from '../theme/internal';
import { getAsSolidColor } from './utils';

const Empty: React.FC = () => {
  const [, token] = useToken();
  const [locale] = useLocale('Empty');

  const {
    colorBgContainer,
    colorFill,
    colorFillSecondary,
    colorFillTertiary,
    colorTextQuaternary,
  } = token;

  const { panelBgColor, borderColor, detailColor, shadowColor, iconColor } = useMemo(
    () => ({
      panelBgColor: getAsSolidColor(colorFillTertiary, colorBgContainer),
      borderColor: getAsSolidColor(colorTextQuaternary, colorBgContainer),
      detailColor: getAsSolidColor(colorFill, colorBgContainer),
      shadowColor: getAsSolidColor(colorFillSecondary, colorBgContainer),
      iconColor: colorBgContainer,
    }),
    [colorBgContainer, colorFill, colorFillSecondary, colorFillTertiary, colorTextQuaternary],
  );

  return (
    <svg width="184" height="152" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg">
      <title>{locale?.description || 'Empty'}</title>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(24 31.7)">
          <ellipse fillOpacity=".8" fill={shadowColor} cx="67.8" cy="106.9" rx="67.8" ry="12.7" />
          <path
            fill={borderColor}
            d="M122 69.7 98.1 40.2a6 6 0 0 0-4.6-2.2H42.1a6 6 0 0 0-4.6 2.2l-24 29.5V85H122z"
          />
          <path
            fill={panelBgColor}
            d="M33.8 0h68a4 4 0 0 1 4 4v93.3a4 4 0 0 1-4 4h-68a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4"
          />
          <path
            fill={detailColor}
            d="M42.7 10h50.2a2 2 0 0 1 2 2v25a2 2 0 0 1-2 2H42.7a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2m.2 39.8h49.8a2.3 2.3 0 1 1 0 4.5H42.9a2.3 2.3 0 0 1 0-4.5m0 11.7h49.8a2.3 2.3 0 1 1 0 4.6H42.9a2.3 2.3 0 0 1 0-4.6m79 43.5a7 7 0 0 1-6.8 5.4H20.5a7 7 0 0 1-6.7-5.4l-.2-1.8V69.7h26.3c2.9 0 5.2 2.4 5.2 5.4s2.4 5.4 5.3 5.4h34.8c2.9 0 5.3-2.4 5.3-5.4s2.3-5.4 5.2-5.4H122v33.5q0 1-.2 1.8"
          />
        </g>
        <path
          fill={detailColor}
          d="m149.1 33.3-6.8 2.6a1 1 0 0 1-1.3-1.2l2-6.2q-4.1-4.5-4.2-10.4c0-10 10.1-18.1 22.6-18.1S184 8.1 184 18.1s-10.1 18-22.6 18q-6.8 0-12.3-2.8"
        />
        <g fill={iconColor} transform="translate(149.7 15.4)">
          <circle cx="20.7" cy="3.2" r="2.8" />
          <path d="M5.7 5.6H0L2.9.7zM9.3.7h5v5h-5z" />
        </g>
      </g>
    </svg>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Empty.displayName = 'EmptyImage';
}

export default Empty;
