import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import classNames from 'classnames';
import Notification from 'rc-notification';
import type { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification';
import * as React from 'react';
import ConfigProvider, { globalConfig } from '../config-provider';
import createUseNotification from './hooks/useNotification';

export type NotificationPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight';

export type IconType = 'success' | 'info' | 'error' | 'warning';

const notificationInstance: {
  [key: string]: Promise<RCNotificationInstance>;
} = {};
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPrefixCls = '';
let defaultPlacement: NotificationPlacement = 'topRight';
let defaultGetContainer: () => HTMLElement;
let defaultCloseIcon: React.ReactNode;
let rtl = false;
let maxCount: number;

export interface ConfigProps {
  top?: number;
  bottom?: number;
  duration?: number;
  prefixCls?: string;
  placement?: NotificationPlacement;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
  rtl?: boolean;
  maxCount?: number;
}

function setNotificationConfig(options: ConfigProps) {
  const { duration, placement, bottom, top, getContainer, closeIcon, prefixCls } = options;
  if (prefixCls !== undefined) {
    defaultPrefixCls = prefixCls;
  }
  if (duration !== undefined) {
    defaultDuration = duration;
  }
  if (placement !== undefined) {
    defaultPlacement = placement;
  } else if (options.rtl) {
    defaultPlacement = 'topLeft';
  }
  if (bottom !== undefined) {
    defaultBottom = bottom;
  }
  if (top !== undefined) {
    defaultTop = top;
  }
  if (getContainer !== undefined) {
    defaultGetContainer = getContainer;
  }
  if (closeIcon !== undefined) {
    defaultCloseIcon = closeIcon;
  }
  if (options.rtl !== undefined) {
    rtl = options.rtl;
  }
  if (options.maxCount !== undefined) {
    maxCount = options.maxCount;
  }
}

function getPlacementStyle(
  placement: NotificationPlacement,
  top: number = defaultTop,
  bottom: number = defaultBottom,
) {
  let style;
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

function getNotificationInstance(
  args: ArgsProps,
  callback: (info: {
    prefixCls: string;
    iconPrefixCls: string;
    instance: RCNotificationInstance;
  }) => void,
) {
  const {
    placement = defaultPlacement,
    top,
    bottom,
    getContainer = defaultGetContainer,
    prefixCls: customizePrefixCls,
  } = args;
  const { getPrefixCls, getIconPrefixCls } = globalConfig();
  const prefixCls = getPrefixCls('notification', customizePrefixCls || defaultPrefixCls);
  const iconPrefixCls = getIconPrefixCls();

  const cacheKey = `${prefixCls}-${placement}`;
  const cacheInstance = notificationInstance[cacheKey];

  if (cacheInstance) {
    Promise.resolve(cacheInstance).then(instance => {
      callback({ prefixCls: `${prefixCls}-notice`, iconPrefixCls, instance });
    });

    return;
  }

  const notificationClass = classNames(`${prefixCls}-${placement}`, {
    [`${prefixCls}-rtl`]: rtl === true,
  });

  notificationInstance[cacheKey] = new Promise(resolve => {
    Notification.newInstance(
      {
        prefixCls,
        className: notificationClass,
        style: getPlacementStyle(placement, top, bottom),
        getContainer,
        maxCount,
      },
      notification => {
        resolve(notification);
        callback({
          prefixCls: `${prefixCls}-notice`,
          iconPrefixCls,
          instance: notification,
        });
      },
    );
  });
}

const typeToIcon = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined,
};

export interface ArgsProps {
  message: React.ReactNode;
  description?: React.ReactNode;
  btn?: React.ReactNode;
  key?: string;
  onClose?: () => void;
  duration?: number | null;
  icon?: React.ReactNode;
  placement?: NotificationPlacement;
  maxCount?: number;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  readonly type?: IconType;
  onClick?: () => void;
  top?: number;
  bottom?: number;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
}

function getRCNoticeProps(args: ArgsProps, prefixCls: string, iconPrefixCls?: string) {
  const {
    duration: durationArg,
    icon,
    type,
    description,
    message,
    btn,
    onClose,
    onClick,
    key,
    style,
    className,
    closeIcon = defaultCloseIcon,
  } = args;

  const duration = durationArg === undefined ? defaultDuration : durationArg;

  let iconNode: React.ReactNode = null;
  if (icon) {
    iconNode = <span className={`${prefixCls}-icon`}>{args.icon}</span>;
  } else if (type) {
    iconNode = React.createElement(typeToIcon[type] || null, {
      className: `${prefixCls}-icon ${prefixCls}-icon-${type}`,
    });
  }

  const closeIconToRender = (
    <span className={`${prefixCls}-close-x`}>
      {closeIcon || <CloseOutlined className={`${prefixCls}-close-icon`} />}
    </span>
  );

  const autoMarginTag =
    !description && iconNode ? (
      <span className={`${prefixCls}-message-single-line-auto-margin`} />
    ) : null;

  return {
    content: (
      <ConfigProvider iconPrefixCls={iconPrefixCls}>
        <div className={iconNode ? `${prefixCls}-with-icon` : ''} role="alert">
          {iconNode}
          <div className={`${prefixCls}-message`}>
            {autoMarginTag}
            {message}
          </div>
          <div className={`${prefixCls}-description`}>{description}</div>
          {btn ? <span className={`${prefixCls}-btn`}>{btn}</span> : null}
        </div>
      </ConfigProvider>
    ),
    duration,
    closable: true,
    closeIcon: closeIconToRender,
    onClose,
    onClick,
    key,
    style: style || {},
    className: classNames(className, {
      [`${prefixCls}-${type}`]: !!type,
    }),
  };
}

function notice(args: ArgsProps) {
  getNotificationInstance(args, ({ prefixCls, iconPrefixCls, instance }) => {
    instance.notice(getRCNoticeProps(args, prefixCls, iconPrefixCls));
  });
}

const api: any = {
  open: notice,
  close(key: string) {
    Object.keys(notificationInstance).forEach(cacheKey =>
      Promise.resolve(notificationInstance[cacheKey]).then(instance => {
        instance.removeNotice(key);
      }),
    );
  },
  config: setNotificationConfig,
  destroy() {
    Object.keys(notificationInstance).forEach(cacheKey => {
      Promise.resolve(notificationInstance[cacheKey]).then(instance => {
        instance.destroy();
      });
      delete notificationInstance[cacheKey]; // lgtm[js/missing-await]
    });
  },
};

['success', 'info', 'warning', 'error'].forEach(type => {
  api[type] = (args: ArgsProps) =>
    api.open({
      ...args,
      type,
    });
});

api.warn = api.warning;
api.useNotification = createUseNotification(getNotificationInstance, getRCNoticeProps);

export interface NotificationInstance {
  success(args: ArgsProps): void;
  error(args: ArgsProps): void;
  info(args: ArgsProps): void;
  warning(args: ArgsProps): void;
  open(args: ArgsProps): void;
}

export interface NotificationApi extends NotificationInstance {
  warn(args: ArgsProps): void;
  close(key: string): void;
  config(options: ConfigProps): void;
  destroy(): void;

  // Hooks
  useNotification: () => [NotificationInstance, React.ReactElement];
}

/** @private test Only function. Not work on production */
export const getInstance = async (cacheKey: string) =>
  process.env.NODE_ENV === 'test' ? notificationInstance[cacheKey] : null;

export default api as NotificationApi;
