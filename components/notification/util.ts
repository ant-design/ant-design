import type * as React from 'react';
import type { CSSMotionProps } from 'rc-motion';
import type { NotificationPlacement } from './interface';

export function getPlacementStyle(placement: NotificationPlacement, top: number, bottom: number) {
  let style: React.CSSProperties;

  switch (placement) {
    case 'top':
      style = {
        left: '50%',
        transform: 'translateX(-50%)',
        right: 'auto',
        top,
        bottom: 'auto',
      };
      break;

    case 'topLeft':
      style = {
        left: 0,
        top,
        bottom: 'auto',
      };
      break;

    case 'topRight':
      style = {
        right: 0,
        top,
        bottom: 'auto',
      };
      break;

    case 'bottom':
      style = {
        left: '50%',
        transform: 'translateX(-50%)',
        right: 'auto',
        top: 'auto',
        bottom,
      };
      break;

    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom,
      };
      break;

    default:
      style = {
        right: 0,
        top: 'auto',
        bottom,
      };
      break;
  }
  return style;
}

export function getMotion(prefixCls: string): CSSMotionProps {
  return {
    motionName: `${prefixCls}-fade`,
  };
}
