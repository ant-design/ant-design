import type * as React from 'react';
import { unit } from '@ant-design/cssinjs';
import type { CSSMotionProps } from '@rc-component/motion';

import { isNonNullable } from '../_util/is';
import type { NotificationConfig as CPNotificationConfig } from '../config-provider/context';
import type { NotificationConfig } from './interface';

export function getPlacementOffsetStyle(
  top?: number | string,
  bottom?: number | string,
): React.CSSProperties {
  return {
    ...(isNonNullable(top) && {
      '--notification-top': unit(top),
    }),
    ...(isNonNullable(bottom) && {
      '--notification-bottom': unit(bottom),
    }),
  };
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
