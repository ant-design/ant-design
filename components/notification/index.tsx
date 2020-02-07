import * as React from 'react';
import Notification from 'rc-notification';
import { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/useNotification';
import {
  CloseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type IconType = 'success' | 'info' | 'error' | 'warning';

const notificationInstance: { [key: string]: any } = {};
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPlacement: NotificationPlacement = 'topRight';
let defaultGetContainer: () => HTMLElement;
let defaultCloseIcon: React.ReactNode;

export interface ConfigProps {
  top?: number;
  bottom?: number;
  duration?: number;
  placement?: NotificationPlacement;
  getContainer?: () => HTMLElement;
  closeIcon?: React.ReactNode;
}

function setNotificationConfig(options: ConfigProps) {
  const { duration, placement, bottom, top, getContainer, closeIcon } = options;
  if (duration !== undefined) {
    defaultDuration = duration;
  }
  if (placement !== undefined) {
    defaultPlacement = placement;
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
}

function getPlacementStyle(
  placement: NotificationPlacement,
  top: number = defaultTop,
  bottom: number = defaultBottom,
) {
  let style;
  switch (placement) {
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

type NotificationInstanceProps = {
  prefixCls: string;
  placement?: NotificationPlacement;
  getContainer?: () => HTMLElement;
  top?: number;
  bottom?: number;
  closeIcon?: React.ReactNode;
};

function getNotificationInstance({
  prefixCls,
  placement = defaultPlacement,
  getContainer = defaultGetContainer,
  top,
  bottom,
  closeIcon = defaultCloseIcon,
}: NotificationInstanceProps): Promise<RCNotificationInstance> {
  return new Promise(resolve => {
    const cacheKey = `${prefixCls}-${placement}`;
    if (notificationInstance[cacheKey]) {
      resolve(notificationInstance[cacheKey]);
      return;
    }

    const closeIconToRender = (
      <span className={`${prefixCls}-close-x`}>
        {closeIcon || <CloseOutlined className={`${prefixCls}-close-icon`} />}
      </span>
    );

    Notification.newInstance(
      {
        prefixCls,
        className: `${prefixCls}-${placement}`,
        style: getPlacementStyle(placement, top, bottom),
        getContainer,
        closeIcon: closeIconToRender,
      },
      notification => {
        notificationInstance[cacheKey] = notification;
        resolve(notification);
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

function getNoticeProps(args: ArgsProps) {
  const { placement, top, bottom, getContainer, closeIcon } = args;
  const outerPrefixCls = args.prefixCls || 'ant-notification';
  const prefixCls = `${outerPrefixCls}-notice`;

  return {
    prefixCls,
    outerPrefixCls,
    placement,
    top,
    bottom,
    getContainer,
    closeIcon,
  };
}

function notice(args: ArgsProps) {
  const {
    outerPrefixCls,
    prefixCls,
    placement,
    top,
    bottom,
    getContainer,
    closeIcon,
  } = getNoticeProps(args);
  const duration = args.duration === undefined ? defaultDuration : args.duration;

  let iconNode: React.ReactNode = null;
  if (args.icon) {
    iconNode = <span className={`${prefixCls}-icon`}>{args.icon}</span>;
  } else if (args.type) {
    iconNode = React.createElement(typeToIcon[args.type] || null, {
      className: `${prefixCls}-icon ${prefixCls}-icon-${args.type}`,
    });
  }

  const autoMarginTag =
    !args.description && iconNode ? (
      <span className={`${prefixCls}-message-single-line-auto-margin`} />
    ) : null;

  getNotificationInstance({
    prefixCls: outerPrefixCls,
    placement,
    top,
    bottom,
    getContainer,
    closeIcon,
  }).then(instance => {
    instance.notice({
      content: (
        <div className={iconNode ? `${prefixCls}-with-icon` : ''}>
          {iconNode}
          <div className={`${prefixCls}-message`}>
            {autoMarginTag}
            {args.message}
          </div>
          <div className={`${prefixCls}-description`}>{args.description}</div>
          {args.btn ? <span className={`${prefixCls}-btn`}>{args.btn}</span> : null}
        </div>
      ),
      duration,
      closable: true,
      onClose: args.onClose,
      onClick: args.onClick,
      key: args.key,
      style: args.style || {},
      className: args.className,
    });
  });
}

const api: any = {
  open: notice,
  close(key: string) {
    Object.keys(notificationInstance).forEach(cacheKey =>
      notificationInstance[cacheKey].removeNotice(key),
    );
  },
  config: setNotificationConfig,
  destroy() {
    Object.keys(notificationInstance).forEach(cacheKey => {
      notificationInstance[cacheKey].destroy();
      delete notificationInstance[cacheKey];
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
api.useNotification = (): [NotificationInstance, React.ReactElement] => {
  function notify(args: ArgsProps) {
    notice(args);
  }

  // Fill functions
  const instance: any = {
    open: notify,
  };
  ['success', 'info', 'warning', 'error'].forEach(type => {
    instance[type] = (args: ArgsProps) =>
      instance.open({
        ...args,
        type,
      });
  });

  return [instance, <></>];
};

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

export default api as NotificationApi;
