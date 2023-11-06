import type { GenerateStyle } from '../../theme/internal';
import type { NotificationToken } from '.';
import type { CSSObject } from '@ant-design/cssinjs';
import type { NotificationPlacement } from '../interface';
import { NotificationPlacements } from '../interface';

const placementAlignProperty: Record<NotificationPlacement, 'left' | 'right'> = {
  topLeft: 'left',
  topRight: 'right',
  bottomLeft: 'left',
  bottomRight: 'right',
  top: 'left',
  bottom: 'left',
};

const genPlacementStackStyle = (
  token: NotificationToken,
  placement: NotificationPlacement,
): CSSObject => {
  const { componentCls } = token;

  return {
    [`${componentCls}-${placement}`]: {
      [`&${componentCls}-stack > ${componentCls}-notice-wrapper`]: {
        [placement.startsWith('top') ? 'top' : 'bottom']: 0,
        [placementAlignProperty[placement]]: { value: 0, _skip_check_: true },
      },
    },
  };
};

const genStackChildrenStyle = (token: NotificationToken): CSSObject => {
  const childrenStyle: CSSObject = {};
  for (let i = 1; i < token.notificationStackLayer; i++) {
    childrenStyle[`&:nth-last-child(${i + 1})`] = {
      overflow: 'hidden',

      [`& > ${token.componentCls}-notice`]: {
        opacity: 0,
        transition: `opacity ${token.motionDurationMid}`,
      },
    };
  }

  return {
    [`&:not(:nth-last-child(-n+${token.notificationStackLayer}))`]: {
      opacity: 0,
      overflow: 'hidden',
      color: 'transparent',
      pointerEvents: 'none',
    },
    ...childrenStyle,
  };
};

const genStackedNoticeStyle = (token: NotificationToken): CSSObject => {
  const childrenStyle: CSSObject = {};
  for (let i = 1; i < token.notificationStackLayer; i++) {
    childrenStyle[`&:nth-last-child(${i + 1})`] = {
      background: token.colorBgBlur,
      backdropFilter: 'blur(10px)',
      '-webkit-backdrop-filter': 'blur(10px)',
    };
  }

  return {
    ...childrenStyle,
  };
};

const genStackStyle: GenerateStyle<NotificationToken> = (token) => {
  const { componentCls } = token;
  return {
    [`${componentCls}-stack`]: {
      [`& > ${componentCls}-notice-wrapper`]: {
        transition: `all ${token.motionDurationSlow}, backdrop-filter 0s`,
        position: 'absolute',

        ...genStackChildrenStyle(token),
      },
    },
    [`${componentCls}-stack:not(${componentCls}-stack-expanded)`]: {
      [`& > ${componentCls}-notice-wrapper`]: {
        ...genStackedNoticeStyle(token),
      },
    },
    [`${componentCls}-stack${componentCls}-stack-expanded`]: {
      [`& > ${componentCls}-notice-wrapper`]: {
        '&:not(:nth-last-child(-n + 1))': {
          opacity: 1,
          overflow: 'unset',
          color: 'inherit',
          pointerEvents: 'auto',

          [`& > ${token.componentCls}-notice`]: {
            opacity: 1,
          },
        },

        '&:after': {
          content: '""',
          position: 'absolute',
          height: token.margin,
          width: '100%',
          insetInline: 0,
          bottom: -token.margin,
          background: 'transparent',
          pointerEvents: 'auto',
        },
      },
    },
    ...NotificationPlacements.map((placement) => genPlacementStackStyle(token, placement)).reduce(
      (acc, cur) => ({ ...acc, ...cur }),
      {},
    ),
  };
};

export default genStackStyle;
