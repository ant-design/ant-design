import type { GenerateStyle } from '../../theme/internal';
import type { NotificationToken } from '.';
import type { CSSObject } from '@ant-design/cssinjs';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { NotificationPlacements } from 'antd/es/notification/interface';

const placementAlignProperty: Record<NotificationPlacement, 'left' | 'right' | null> = {
  topLeft: 'left',
  topRight: 'right',
  bottomLeft: 'left',
  bottomRight: 'right',
  top: null,
  bottom: null,
};

const genPlacementStackChildrenStyle = (
  token: NotificationToken,
  placement: NotificationPlacement,
): CSSObject => {
  const childrenStyle: CSSObject = {};
  for (let i = 1; i < token.notificationStackLayer; i++) {
    childrenStyle[`&:nth-last-child(${i + 1})`] = {
      ...(placementAlignProperty[placement]
        ? {
            [placementAlignProperty[placement]!]: {
              value: token.paddingXS * i,
              _skip_check_: true,
            },
          }
        : {
            left: {
              value: -(token.width - token.paddingXS * i * 2) / 2,
              _skip_check_: true,
            },
          }),
    };
  }

  return {
    [`&:not(:nth-last-child(-n+${token.notificationStackLayer}))`]: {
      ...(placementAlignProperty[placement]
        ? {
            [placementAlignProperty[placement]!]: {
              value: token.paddingXS * token.notificationStackLayer,
              _skip_check_: true,
            },
          }
        : {
            left: {
              value: -(token.width - token.paddingXS * token.notificationStackLayer * 2) / 2,
              _skip_check_: true,
            },
          }),
    },
    [`&:nth-last-child(1)`]: {
      ...(placementAlignProperty[placement]
        ? {
            [placementAlignProperty[placement]!]: { value: 0, _skip_check_: true },
          }
        : {
            left: {
              value: -token.width / 2,
              _skip_check_: true,
            },
          }),
    },
    ...childrenStyle,
  };
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
        ...genPlacementStackChildrenStyle(token, placement),
      },

      [`&${componentCls}-stack${componentCls}-stack-expanded > ${componentCls}-notice-wrapper`]: {
        ...(placementAlignProperty[placement]
          ? {
              [placementAlignProperty[placement]!]: { value: 0, _skip_check_: true },
            }
          : {
              left: {
                value: -token.width / 2,
                _skip_check_: true,
              },
            }),
      },
    },
  };
};

const genStackChildrenStyle = (token: NotificationToken): CSSObject => {
  const childrenStyle: CSSObject = {};
  for (let i = 1; i < token.notificationStackLayer; i++) {
    childrenStyle[`&:nth-last-child(${i + 1})`] = {
      width: token.width - token.paddingXS * 2 * i,
      color: 'transparent',
      overflow: 'hidden',
    };
  }

  return {
    [`&:not(:nth-last-child(-n+${token.notificationStackLayer}))`]: {
      opacity: 0,
      width: token.width - token.paddingXS * 2 * 3,
      overflow: 'hidden',
      color: 'transparent',
      pointerEvents: 'none',
    },
    ...childrenStyle,
  };
};

const genStackStyle: GenerateStyle<NotificationToken> = (token) => {
  const { componentCls } = token;
  return {
    [`${componentCls}-stack`]: {
      [`& > ${componentCls}-notice-wrapper`]: {
        transition: 'all 0.3s',
        position: 'absolute',

        ...genStackChildrenStyle(token),
      },
    },
    [`${componentCls}-stack${componentCls}-stack-expanded`]: {
      [`& > ${componentCls}-notice-wrapper`]: {
        '&:not(:nth-last-child(-n + 1))': {
          opacity: 1,
          width: token.width,
          // right: 0,
          overflow: 'unset',
          color: 'inherit',
          pointerEvents: 'auto',
        },

        '&:after': {
          content: '""',
          position: 'absolute',
          height: token.margin,
          width: '100%',
          left: 0,
          right: 0,
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
