import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';
import type * as React from 'react';

import type { NotificationToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import type { NotificationPlacement } from '../interface';

type AxisProperty = 'top' | 'bottom' | 'left' | 'right';

type PlacementStyleConfig = {
  placement: NotificationPlacement;
  vertical: Extract<AxisProperty, 'top' | 'bottom'>;
  horizontal: Extract<AxisProperty, 'left' | 'right'>;
  transformOrigin: React.CSSProperties['transformOrigin'];
  motionOffset: {
    x?: string;
    y?: string;
  };
};

const getMotionTransform = (motionOffset?: PlacementStyleConfig['motionOffset']) => {
  const x = motionOffset?.x ?? '0';
  const y = motionOffset?.y ?? '0';

  return `translate3d(${x}, ${y}, 0) scale(var(--notification-scale, 1))`;
};

const getPlacementFlexDirection = (
  placement: NotificationPlacement,
): React.CSSProperties['flexDirection'] =>
  placement.startsWith('bottom') ? 'column-reverse' : 'column';

const getPlacementStackClipPath = (vertical: PlacementStyleConfig['vertical']) =>
  vertical === 'bottom' ? 'inset(-50% -50% 50% -50%)' : 'inset(50% -50% -50% -50%)';

const genPlacementStyle = (token: NotificationToken, config: PlacementStyleConfig): CSSObject => {
  const { componentCls } = token;
  const { placement, vertical, horizontal, transformOrigin } = config;
  const noticeCls = `${componentCls}-notice`;
  const enterTransform = getMotionTransform(config.motionOffset);
  const baseTransform = getMotionTransform();

  return {
    [`&${componentCls}-${placement}`]: {
      display: 'flex',
      flexDirection: getPlacementFlexDirection(placement),

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
          clipPath: getPlacementStackClipPath(vertical),
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
  const placementStyleConfigs: PlacementStyleConfig[] = [
    {
      placement: 'topRight',
      vertical: 'top',
      horizontal: 'right',
      transformOrigin: 'center bottom',
      motionOffset: { x: motionOffset },
    },
    {
      placement: 'bottomRight',
      vertical: 'bottom',
      horizontal: 'right',
      transformOrigin: 'center top',
      motionOffset: { x: motionOffset },
    },
    {
      placement: 'topLeft',
      vertical: 'top',
      horizontal: 'left',
      transformOrigin: 'center bottom',
      motionOffset: { x: `-${motionOffset}` },
    },
    {
      placement: 'bottomLeft',
      vertical: 'bottom',
      horizontal: 'left',
      transformOrigin: 'center top',
      motionOffset: { x: `-${motionOffset}` },
    },
    {
      placement: 'top',
      vertical: 'top',
      horizontal: 'left',
      transformOrigin: 'center bottom',
      motionOffset: { y: `-${motionOffset}` },
    },
    {
      placement: 'bottom',
      vertical: 'bottom',
      horizontal: 'left',
      transformOrigin: 'center top',
      motionOffset: { y: motionOffset },
    },
  ];

  return {
    [componentCls]: {
      [`&${componentCls}-top, &${componentCls}-bottom`]: {
        marginInline: 0,
      },
      ...placementStyleConfigs.reduce<CSSObject>(
        (styles, config) => ({
          ...styles,
          ...genPlacementStyle(token, config),
        }),
        {},
      ),
    },
  };
};

export default genNotificationPlacementStyle;
