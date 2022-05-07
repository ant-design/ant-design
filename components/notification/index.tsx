// import * as React from 'react';
// import Notification from 'rc-notification';
// import { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification';
// import CloseOutlined from '@ant-design/icons/CloseOutlined';
// import classNames from 'classnames';
// import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
// import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
// import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
// import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
// import createUseNotification from './hooks/useNotification';
// import ConfigProvider, { globalConfig } from '../config-provider';

// export type NotificationPlacement =
//   | 'top'
//   | 'topLeft'
//   | 'topRight'
//   | 'bottom'
//   | 'bottomLeft'
//   | 'bottomRight';

// export type IconType = 'success' | 'info' | 'error' | 'warning';

// const notificationInstance: {
//   [key: string]: Promise<RCNotificationInstance>;
// } = {};
// let defaultDuration = 4.5;
// let defaultTop = 24;
// let defaultBottom = 24;
// let defaultPrefixCls = '';
// let defaultPlacement: NotificationPlacement = 'topRight';
// let defaultGetContainer: () => HTMLElement;
// let defaultCloseIcon: React.ReactNode;
// let rtl = false;
// let maxCount: number;

// export interface ConfigProps {
//   top?: number;
//   bottom?: number;
//   duration?: number;
//   prefixCls?: string;
//   placement?: NotificationPlacement;
//   getContainer?: () => HTMLElement;
//   closeIcon?: React.ReactNode;
//   rtl?: boolean;
//   maxCount?: number;
// }

// function setNotificationConfig(options: ConfigProps) {
//   const { duration, placement, bottom, top, getContainer, closeIcon, prefixCls } = options;
//   if (prefixCls !== undefined) {
//     defaultPrefixCls = prefixCls;
//   }
//   if (duration !== undefined) {
//     defaultDuration = duration;
//   }
//   if (placement !== undefined) {
//     defaultPlacement = placement;
//   } else if (options.rtl) {
//     defaultPlacement = 'topLeft';
//   }
//   if (bottom !== undefined) {
//     defaultBottom = bottom;
//   }
//   if (top !== undefined) {
//     defaultTop = top;
//   }
//   if (getContainer !== undefined) {
//     defaultGetContainer = getContainer;
//   }
//   if (closeIcon !== undefined) {
//     defaultCloseIcon = closeIcon;
//   }
//   if (options.rtl !== undefined) {
//     rtl = options.rtl;
//   }
//   if (options.maxCount !== undefined) {
//     maxCount = options.maxCount;
//   }
// }

// function getPlacementStyle(
//   placement: NotificationPlacement,
//   top: number = defaultTop,
//   bottom: number = defaultBottom,
// ) {
//   let style;
//   switch (placement) {
//     case 'top':
//       style = {
//         left: '50%',
//         transform: 'translateX(-50%)',
//         right: 'auto',
//         top,
//         bottom: 'auto',
//       };
//       break;
//     case 'topLeft':
//       style = {
//         left: 0,
//         top,
//         bottom: 'auto',
//       };
//       break;
//     case 'topRight':
//       style = {
//         right: 0,
//         top,
//         bottom: 'auto',
//       };
//       break;
//     case 'bottom':
//       style = {
//         left: '50%',
//         transform: 'translateX(-50%)',
//         right: 'auto',
//         top: 'auto',
//         bottom,
//       };
//       break;
//     case 'bottomLeft':
//       style = {
//         left: 0,
//         top: 'auto',
//         bottom,
//       };
//       break;
//     default:
//       style = {
//         right: 0,
//         top: 'auto',
//         bottom,
//       };
//       break;
//   }
//   return style;
// }

// function getNotificationInstance(
//   args: ArgsProps,
//   callback: (info: {
//     prefixCls: string;
//     iconPrefixCls: string;
//     instance: RCNotificationInstance;
//   }) => void,
// ) {
//   const {
//     placement = defaultPlacement,
//     top,
//     bottom,
//     getContainer = defaultGetContainer,
//     prefixCls: customizePrefixCls,
//   } = args;
//   const { getPrefixCls, getIconPrefixCls } = globalConfig();
//   const prefixCls = getPrefixCls('notification', customizePrefixCls || defaultPrefixCls);
//   const iconPrefixCls = getIconPrefixCls();

//   const cacheKey = `${prefixCls}-${placement}`;
//   const cacheInstance = notificationInstance[cacheKey];

//   if (cacheInstance) {
//     Promise.resolve(cacheInstance).then(instance => {
//       callback({ prefixCls: `${prefixCls}-notice`, iconPrefixCls, instance });
//     });

//     return;
//   }

//   const notificationClass = classNames(`${prefixCls}-${placement}`, {
//     [`${prefixCls}-rtl`]: rtl === true,
//   });

//   notificationInstance[cacheKey] = new Promise(resolve => {
//     Notification.newInstance(
//       {
//         prefixCls,
//         className: notificationClass,
//         style: getPlacementStyle(placement, top, bottom),
//         getContainer,
//         maxCount,
//       },
//       notification => {
//         resolve(notification);
//         callback({
//           prefixCls: `${prefixCls}-notice`,
//           iconPrefixCls,
//           instance: notification,
//         });
//       },
//     );
//   });
// }

// const typeToIcon = {
//   success: CheckCircleOutlined,
//   info: InfoCircleOutlined,
//   error: CloseCircleOutlined,
//   warning: ExclamationCircleOutlined,
// };

// export interface ArgsProps {
//   message: React.ReactNode;
//   description?: React.ReactNode;
//   btn?: React.ReactNode;
//   key?: string;
//   onClose?: () => void;
//   duration?: number | null;
//   icon?: React.ReactNode;
//   placement?: NotificationPlacement;
//   style?: React.CSSProperties;
//   prefixCls?: string;
//   className?: string;
//   readonly type?: IconType;
//   onClick?: () => void;
//   top?: number;
//   bottom?: number;
//   getContainer?: () => HTMLElement;
//   closeIcon?: React.ReactNode;
// }

// function getRCNoticeProps(args: ArgsProps, prefixCls: string, iconPrefixCls?: string) {
//   const {
//     duration: durationArg,
//     icon,
//     type,
//     description,
//     message,
//     btn,
//     onClose,
//     onClick,
//     key,
//     style,
//     className,
//     closeIcon = defaultCloseIcon,
//   } = args;

//   const duration = durationArg === undefined ? defaultDuration : durationArg;

//   let iconNode: React.ReactNode = null;
//   if (icon) {
//     iconNode = <span className={`${prefixCls}-icon`}>{args.icon}</span>;
//   } else if (type) {
//     iconNode = React.createElement(typeToIcon[type] || null, {
//       className: `${prefixCls}-icon ${prefixCls}-icon-${type}`,
//     });
//   }

//   const closeIconToRender = (
//     <span className={`${prefixCls}-close-x`}>
//       {closeIcon || <CloseOutlined className={`${prefixCls}-close-icon`} />}
//     </span>
//   );

//   const autoMarginTag =
//     !description && iconNode ? (
//       <span className={`${prefixCls}-message-single-line-auto-margin`} />
//     ) : null;

//   return {
//     content: (
//       <ConfigProvider iconPrefixCls={iconPrefixCls}>
//         <div className={iconNode ? `${prefixCls}-with-icon` : ''} role="alert">
//           {iconNode}
//           <div className={`${prefixCls}-message`}>
//             {autoMarginTag}
//             {message}
//           </div>
//           <div className={`${prefixCls}-description`}>{description}</div>
//           {btn ? <span className={`${prefixCls}-btn`}>{btn}</span> : null}
//         </div>
//       </ConfigProvider>
//     ),
//     duration,
//     closable: true,
//     closeIcon: closeIconToRender,
//     onClose,
//     onClick,
//     key,
//     style: style || {},
//     className: classNames(className, {
//       [`${prefixCls}-${type}`]: !!type,
//     }),
//   };
// }

// function notice(args: ArgsProps) {
//   getNotificationInstance(args, ({ prefixCls, iconPrefixCls, instance }) => {
//     instance.notice(getRCNoticeProps(args, prefixCls, iconPrefixCls));
//   });
// }

// const api: any = {
//   open: notice,
//   close(key: string) {
//     Object.keys(notificationInstance).forEach(cacheKey =>
//       Promise.resolve(notificationInstance[cacheKey]).then(instance => {
//         instance.removeNotice(key);
//       }),
//     );
//   },
//   config: setNotificationConfig,
//   destroy() {
//     Object.keys(notificationInstance).forEach(cacheKey => {
//       Promise.resolve(notificationInstance[cacheKey]).then(instance => {
//         instance.destroy();
//       });
//       delete notificationInstance[cacheKey]; // lgtm[js/missing-await]
//     });
//   },
// };

// ['success', 'info', 'warning', 'error'].forEach(type => {
//   api[type] = (args: ArgsProps) =>
//     api.open({
//       ...args,
//       type,
//     });
// });

// api.warn = api.warning;
// api.useNotification = createUseNotification(getNotificationInstance, getRCNoticeProps);

// export interface NotificationInstance {
//   success(args: ArgsProps): void;
//   error(args: ArgsProps): void;
//   info(args: ArgsProps): void;
//   warning(args: ArgsProps): void;
//   open(args: ArgsProps): void;
// }

// export interface NotificationApi extends NotificationInstance {
//   warn(args: ArgsProps): void;
//   close(key: string): void;
//   config(options: ConfigProps): void;
//   destroy(): void;

//   // Hooks
//   useNotification: () => [NotificationInstance, React.ReactElement];
// }

// /** @private test Only function. Not work on production */
// export const getInstance = async (cacheKey: string) =>
//   process.env.NODE_ENV === 'test' ? notificationInstance[cacheKey] : null;

// export default api as NotificationApi;

import * as React from 'react';
import { render } from 'rc-util/lib/React/render';
import useNotification, { useInternalNotification } from './useNotification';
import type { ArgsProps, NotificationInstance, ConfigProps } from './interface';
import ConfigProvider, { globalConfig } from '../config-provider';

let notificationList: GlobalNotification[] = [];

let act = (callback: VoidFunction) => callback();

interface GlobalNotification {
  prefixCls: string;
  container: HTMLElement;
  fragment: DocumentFragment;
  instance?: NotificationInstance | null;
  setMaxCount?: (maxCount: number) => void;
  setRTL?: (rtl: boolean) => void;
}

type Task =
  | {
      type: 'open';
      config: ArgsProps;
    }
  | {
      type: 'close';
      key: React.Key;
    }
  | {
      type: 'destroy';
    };

let taskQueue: Task[] = [];

let defaultGlobalConfig: ConfigProps = {};

interface GlobalHolderProps {
  prefixCls: string;
  container: HTMLElement;
  defaultRTL?: boolean;
  defaultMaxCount?: number;
}

interface GlobalHolderRef {
  instance: NotificationInstance;
  setMaxCount: (maxCount: number) => void;
  setRTL: (rtl: boolean) => void;
}

const GlobalHolder = React.forwardRef<GlobalHolderRef, GlobalHolderProps>(
  ({ prefixCls, container, defaultRTL, defaultMaxCount }, ref) => {
    const [rtl, setRTL] = React.useState<boolean | undefined>(defaultRTL);
    const [maxCount, setMaxCount] = React.useState<number | undefined>(defaultMaxCount);
    const [api, holder] = useInternalNotification({ prefixCls, container, maxCount, rtl });

    const global = globalConfig();
    const rootPrefixCls = global.getRootPrefixCls();
    const rootIconPrefixCls = global.getIconPrefixCls();

    React.useImperativeHandle(ref, () => ({
      instance: api,
      setMaxCount,
      setRTL,
    }));

    return (
      <ConfigProvider prefixCls={rootPrefixCls} iconPrefixCls={rootIconPrefixCls}>
        {holder}
      </ConfigProvider>
    );
  },
);

/** Get unique notification mark of `prefixCls` and `container` */
function getNotificationMark(config: ArgsProps): [string, HTMLElement] {
  const { prefixCls: globalPrefixCls, getContainer: globalGetContainer } = defaultGlobalConfig;
  const { prefixCls, getContainer } = config || {};
  const mergedPrefixCls = globalPrefixCls ?? globalConfig().getPrefixCls('notification', prefixCls);
  const mergedContainer = globalGetContainer?.() || getContainer?.() || document.body;

  return [mergedPrefixCls, mergedContainer];
}

function findNotification(config: ArgsProps) {
  const [prefixCls, container] = getNotificationMark(config);

  return notificationList.find(notification => {
    const { prefixCls: comparePrefixCls, container: compareContainer } = notification;
    return comparePrefixCls === prefixCls && compareContainer === container;
  });
}

function flushNotice() {
  // >>> Check for all instances exist. Or we will create and return.
  for (let i = 0; i < taskQueue.length; i += 1) {
    const task = taskQueue[i];
    if (task.type === 'open') {
      const matchInstance = findNotification(task.config);

      // Return if not ready
      if (matchInstance && !matchInstance.instance) {
        return;
      }

      // Create if not exist
      if (!matchInstance) {
        const holderFragment = document.createDocumentFragment();

        const [prefixCls, container] = getNotificationMark(task.config);
        const { maxCount, rtl } = defaultGlobalConfig;

        const notification: GlobalNotification = {
          prefixCls,
          container,
          fragment: holderFragment,
        };

        notificationList.push(notification);

        // Delay render to avoid sync issue
        act(() => {
          render(
            <GlobalHolder
              ref={node => {
                const { instance, setMaxCount, setRTL } = node || {};
                notification.instance = instance;
                notification.setMaxCount = setMaxCount;
                notification.setRTL = setRTL;
                flushNotice();
              }}
              prefixCls={prefixCls}
              container={container}
              defaultMaxCount={maxCount}
              defaultRTL={rtl}
            />,
            holderFragment,
          );
        });

        return;
      }
    }
  }

  // >>> Execute task
  taskQueue.forEach(task => {
    switch (task.type) {
      case 'open': {
        act(() => {
          const globalNotification = findNotification(task.config);
          globalNotification!.instance!.open({
            ...defaultGlobalConfig,
            ...task.config,
          });
        });
        break;
      }

      case 'close':
        act(() => {
          notificationList.forEach(globalNotification => {
            globalNotification.instance!.close(task.key);
          });
        });
        break;

      case 'destroy':
        act(() => {
          notificationList.forEach(globalNotification => {
            globalNotification.instance!.destroy();
          });
        });
        break;

      default:
      // Do nothing
    }
  });

  // Clean up
  taskQueue = [];
}

// ==============================================================================
// ==                                  Export                                  ==
// ==============================================================================
const methods = ['success', 'info', 'warning', 'error'] as const;
type MethodType = typeof methods[number];

function setNotificationGlobalConfig(config: ConfigProps) {
  defaultGlobalConfig = {
    ...defaultGlobalConfig,
    ...config,
  };

  // Refresh data
  const { maxCount, rtl } = defaultGlobalConfig;
  notificationList.forEach(notification => {
    act(() => {
      if (maxCount !== undefined && notification.setMaxCount) {
        notification.setMaxCount(maxCount);
      }
      if (rtl !== undefined && notification.setRTL) {
        notification.setRTL(rtl);
      }
    });
  });
}

function open(config: ArgsProps) {
  taskQueue.push({
    type: 'open',
    config,
  });
  flushNotice();
}

function close(key: React.Key) {
  taskQueue.push({
    type: 'close',
    key,
  });
  flushNotice();
}

function destroy() {
  taskQueue.push({
    type: 'destroy',
  });
  flushNotice();
}

const baseStaticMethods: {
  open: (config: ArgsProps) => void;
  close: (key: React.Key) => void;
  destroy: () => void;
  config: any;
  useNotification: typeof useNotification;
} = {
  open,
  close,
  destroy,
  config: setNotificationGlobalConfig,
  useNotification,
};

const staticMethods: typeof baseStaticMethods & Record<MethodType, (config: ArgsProps) => void> =
  baseStaticMethods as any;

methods.forEach(type => {
  staticMethods[type] = config =>
    open({
      ...config,
      type,
    });
});

// ==============================================================================
// ==                                   Test                                   ==
// ==============================================================================
const noop = () => {};

/** @private Only Work in test env */
// eslint-disable-next-line import/no-mutable-exports
export let actWrapper: (wrapper: VoidFunction) => void = noop;

if (process.env.NODE_ENV === 'test') {
  actWrapper = wrapper => {
    act = wrapper;
  };
}

/** @private Only Work in test env */
// eslint-disable-next-line import/no-mutable-exports
export let actDestroy = noop;

if (process.env.NODE_ENV === 'test') {
  actDestroy = () => {
    staticMethods.destroy();
    notificationList = [];
  };
}

export default staticMethods;
