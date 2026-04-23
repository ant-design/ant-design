import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';
import type * as React from 'react';

import type { NotificationToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import type { NotificationPlacement } from '../interface';

type AxisProperty = 'top' | 'bottom' | 'left' | 'right';

const getMotionTransform = (translate: string) =>
  `${translate} scale(var(--notification-scale, 1))`;

const genPlacementStyle = (
  token: NotificationToken,
  placement: NotificationPlacement,
  vertical: Extract<AxisProperty, 'top' | 'bottom'>,
  horizontal: Extract<AxisProperty, 'left' | 'right'>,
  flexDirection: React.CSSProperties['flexDirection'],
  transformOrigin: React.CSSProperties['transformOrigin'],
  stackClipPath: string,
  enterTranslate: string,
): CSSObject => {
  const { componentCls } = token;
  const noticeCls = `${componentCls}-notice`;
  const enterTransform = getMotionTransform(enterTranslate);
  const baseTransform = getMotionTransform('translateX(0)');

  return {
    [`&${componentCls}-${placement}`]: {
      display: 'flex',
      flexDirection,

      [noticeCls]: {
        [vertical]: 'var(--notification-y, 0)',
        [horizontal]: 'var(--notification-x, 0)',
        transformOrigin,
      },

      [`${componentCls}-fade-appear-prepare, ${componentCls}-fade-enter-prepare`]: {
        opacity: 0,
        transform: enterTransform,
        transition: 'none',
      },

      [`${componentCls}-fade-appear-start, ${componentCls}-fade-enter-start`]: {
        opacity: 0,
        transform: enterTransform,
      },

      [`${componentCls}-fade-appear-active, ${componentCls}-fade-enter-active`]: {
        opacity: 1,
        transform: baseTransform,
      },

      [`${componentCls}-fade-leave-start`]: {
        opacity: 1,
        transform: baseTransform,
      },

      [`${componentCls}-fade-leave-active`]: {
        opacity: 0,
        transform: enterTransform,
      },

      [`&${componentCls}-stack:not(${componentCls}-stack-expanded)`]: {
        [noticeCls]: {
          clipPath: stackClipPath,
        },

        [`${noticeCls}[data-notification-index='0']`]: {
          clipPath: 'inset(-50% -50% -50% -50%)',
        },
      },
    },
  };
};

const genNotificationPlacementStyle: GenerateStyle<NotificationToken, CSSObject> = (token) => {
  const { componentCls, notificationMotionOffset } = token;
  const motionOffset = unit(notificationMotionOffset);

  return {
    [componentCls]: {
      [`&${componentCls}-top, &${componentCls}-bottom`]: {
        marginInline: 0,
      },
      ...genPlacementStyle(
        token,
        'topRight',
        'top',
        'right',
        'column',
        'center bottom',
        'inset(50% -50% -50% -50%)',
        `translateX(${motionOffset})`,
      ),
      ...genPlacementStyle(
        token,
        'bottomRight',
        'bottom',
        'right',
        'column-reverse',
        'center top',
        'inset(-50% -50% 50% -50%)',
        `translateX(${motionOffset})`,
      ),
      ...genPlacementStyle(
        token,
        'topLeft',
        'top',
        'left',
        'column',
        'center bottom',
        'inset(50% -50% -50% -50%)',
        `translateX(-${motionOffset})`,
      ),
      ...genPlacementStyle(
        token,
        'bottomLeft',
        'bottom',
        'left',
        'column-reverse',
        'center top',
        'inset(-50% -50% 50% -50%)',
        `translateX(-${motionOffset})`,
      ),
      ...genPlacementStyle(
        token,
        'top',
        'top',
        'left',
        'column',
        'center bottom',
        'inset(50% -50% -50% -50%)',
        `translateY(-${motionOffset})`,
      ),
      ...genPlacementStyle(
        token,
        'bottom',
        'bottom',
        'left',
        'column-reverse',
        'center top',
        'inset(-50% -50% 50% -50%)',
        `translateY(${motionOffset})`,
      ),
    },
  };
};

export default genNotificationPlacementStyle;
