import type * as React from 'react';
import type { CSSMotionProps } from '@rc-component/motion';

import type { NotificationConfig as CPNotificationConfig } from '../config-provider/context';
import type { NotificationConfig } from './interface';

const toOffset = (value: number) => `${value}px`;

export function getPlacementOffsetStyle(top?: number, bottom?: number): React.CSSProperties {
  return {
    ...(top !== undefined && { '--notification-top': toOffset(top) }),
    ...(bottom !== undefined && { '--notification-bottom': toOffset(bottom) }),
  } as React.CSSProperties;
}

export function getMotion(prefixCls: string): CSSMotionProps {
  return {
    motionName: `${prefixCls}-fade`,
  };
}

export function getCloseIconConfig(
  closeIcon: React.ReactNode,
  notificationConfig?: NotificationConfig,
  notification?: CPNotificationConfig,
) {
  if (typeof closeIcon !== 'undefined') {
    return closeIcon;
  }
  if (typeof notificationConfig?.closeIcon !== 'undefined') {
    return notificationConfig.closeIcon;
  }
  return notification?.closeIcon;
}
