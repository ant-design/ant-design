import type * as React from 'react';
import { unit } from '@ant-design/cssinjs';
import type { CSSMotionProps } from '@rc-component/motion';

import type { NotificationConfig as CPNotificationConfig } from '../config-provider/context';
import type { NotificationConfig } from './interface';

export function getPlacementOffsetStyle(
  top?: number | string,
  bottom?: number | string,
): React.CSSProperties {
  return {
    ...(top !== undefined && { '--notification-top': unit(top) }),
    ...(bottom !== undefined && { '--notification-bottom': unit(bottom) }),
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
