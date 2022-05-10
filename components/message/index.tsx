// import * as React from 'react';
// import classNames from 'classnames';
// import RCNotification from 'rc-notification';
// import {
//   NotificationInstance as RCNotificationInstance,
//   NoticeContent,
// } from 'rc-notification/lib/Notification';
// import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
// import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
// import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
// import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
// import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
// import createUseMessage from './hooks/useMessage';
// import ConfigProvider, { globalConfig } from '../config-provider';

// let messageInstance: RCNotificationInstance | null;
// let defaultDuration = 3;
// let defaultTop: number;
// let key = 1;
// let localPrefixCls = '';
// let transitionName = 'move-up';
// let hasTransitionName = false;
// let getContainer: () => HTMLElement;
// let maxCount: number;
// let rtl = false;

// export function getKeyThenIncreaseKey() {
//   return key++;
// }

// export interface ConfigOptions {
//   top?: number;
//   duration?: number;
//   prefixCls?: string;
//   getContainer?: () => HTMLElement;
//   transitionName?: string;
//   maxCount?: number;
//   rtl?: boolean;
// }

// function setMessageConfig(options: ConfigOptions) {
//   if (options.top !== undefined) {
//     defaultTop = options.top;
//     messageInstance = null; // delete messageInstance for new defaultTop
//   }
//   if (options.duration !== undefined) {
//     defaultDuration = options.duration;
//   }

//   if (options.prefixCls !== undefined) {
//     localPrefixCls = options.prefixCls;
//   }
//   if (options.getContainer !== undefined) {
//     getContainer = options.getContainer;
//     messageInstance = null; // delete messageInstance for new getContainer
//   }
//   if (options.transitionName !== undefined) {
//     transitionName = options.transitionName;
//     messageInstance = null; // delete messageInstance for new transitionName
//     hasTransitionName = true;
//   }
//   if (options.maxCount !== undefined) {
//     maxCount = options.maxCount;
//     messageInstance = null;
//   }
//   if (options.rtl !== undefined) {
//     rtl = options.rtl;
//   }
// }

// function getRCNotificationInstance(
//   args: ArgsProps,
//   callback: (info: {
//     prefixCls: string;
//     rootPrefixCls: string;
//     iconPrefixCls: string;
//     instance: RCNotificationInstance;
//   }) => void,
// ) {
//   const { prefixCls: customizePrefixCls, getPopupContainer: getContextPopupContainer } = args;
//   const { getPrefixCls, getRootPrefixCls, getIconPrefixCls } = globalConfig();
//   const prefixCls = getPrefixCls('message', customizePrefixCls || localPrefixCls);
//   const rootPrefixCls = getRootPrefixCls(args.rootPrefixCls, prefixCls);
//   const iconPrefixCls = getIconPrefixCls();

//   if (messageInstance) {
//     callback({ prefixCls, rootPrefixCls, iconPrefixCls, instance: messageInstance });
//     return;
//   }

//   const instanceConfig = {
//     prefixCls,
//     transitionName: hasTransitionName ? transitionName : `${rootPrefixCls}-${transitionName}`,
//     style: { top: defaultTop }, // 覆盖原来的样式
//     getContainer: getContainer || getContextPopupContainer,
//     maxCount,
//   };

//   RCNotification.newInstance(instanceConfig, (instance: any) => {
//     if (messageInstance) {
//       callback({ prefixCls, rootPrefixCls, iconPrefixCls, instance: messageInstance });
//       return;
//     }
//     messageInstance = instance;

//     if (process.env.NODE_ENV === 'test') {
//       (messageInstance as any).config = instanceConfig;
//     }

//     callback({ prefixCls, rootPrefixCls, iconPrefixCls, instance });
//   });
// }

// export interface ThenableArgument {
//   (val: any): void;
// }

// export interface MessageType extends PromiseLike<any> {
//   (): void;
// }

// const typeToIcon = {
//   info: InfoCircleFilled,
//   success: CheckCircleFilled,
//   error: CloseCircleFilled,
//   warning: ExclamationCircleFilled,
//   loading: LoadingOutlined,
// };

// export type NoticeType = keyof typeof typeToIcon;

// export const typeList = Object.keys(typeToIcon) as NoticeType[];

// export interface ArgsProps {
//   content: any;
//   duration?: number;
//   type?: NoticeType;
//   prefixCls?: string;
//   rootPrefixCls?: string;
//   getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
//   onClose?: () => void;
//   icon?: React.ReactNode;
//   key?: string | number;
//   style?: React.CSSProperties;
//   className?: string;
//   onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
// }

// function getRCNoticeProps(
//   args: ArgsProps,
//   prefixCls: string,
//   iconPrefixCls?: string,
// ): NoticeContent {
//   const duration = args.duration !== undefined ? args.duration : defaultDuration;
//   const IconComponent = typeToIcon[args.type!];
//   const messageClass = classNames(`${prefixCls}-custom-content`, {
//     [`${prefixCls}-${args.type}`]: args.type,
//     [`${prefixCls}-rtl`]: rtl === true,
//   });
//   return {
//     key: args.key,
//     duration,
//     style: args.style || {},
//     className: args.className,
//     content: (
//       <ConfigProvider iconPrefixCls={iconPrefixCls}>
//         <div className={messageClass}>
//           {args.icon || (IconComponent && <IconComponent />)}
//           <span>{args.content}</span>
//         </div>
//       </ConfigProvider>
//     ),
//     onClose: args.onClose,
//     onClick: args.onClick,
//   };
// }

// function notice(args: ArgsProps): MessageType {
//   const target = args.key || getKeyThenIncreaseKey();
//   const closePromise = new Promise(resolve => {
//     const callback = () => {
//       if (typeof args.onClose === 'function') {
//         args.onClose();
//       }
//       return resolve(true);
//     };

//     getRCNotificationInstance(args, ({ prefixCls, iconPrefixCls, instance }) => {
//       instance.notice(
//         getRCNoticeProps({ ...args, key: target, onClose: callback }, prefixCls, iconPrefixCls),
//       );
//     });
//   });
//   const result: any = () => {
//     if (messageInstance) {
//       messageInstance.removeNotice(target);
//     }
//   };
//   result.then = (filled: ThenableArgument, rejected: ThenableArgument) =>
//     closePromise.then(filled, rejected);
//   result.promise = closePromise;
//   return result;
// }

// type ConfigContent = React.ReactNode;
// type ConfigDuration = number | (() => void);
// type JointContent = ConfigContent | ArgsProps;
// export type ConfigOnClose = () => void;

// function isArgsProps(content: JointContent): content is ArgsProps {
//   return (
//     Object.prototype.toString.call(content) === '[object Object]' &&
//     !!(content as ArgsProps).content
//   );
// }

// const api: any = {
//   open: notice,
//   config: setMessageConfig,
//   destroy(messageKey?: React.Key) {
//     if (messageInstance) {
//       if (messageKey) {
//         const { removeNotice } = messageInstance;
//         removeNotice(messageKey);
//       } else {
//         const { destroy } = messageInstance;
//         destroy();
//         messageInstance = null;
//       }
//     }
//   },
// };

// export function attachTypeApi(originalApi: MessageApi, type: NoticeType) {
//   originalApi[type] = (
//     content: JointContent,
//     duration?: ConfigDuration,
//     onClose?: ConfigOnClose,
//   ) => {
//     if (isArgsProps(content)) {
//       return originalApi.open({ ...content, type });
//     }

//     if (typeof duration === 'function') {
//       onClose = duration;
//       duration = undefined;
//     }

//     return originalApi.open({ content, duration, type, onClose });
//   };
// }

// typeList.forEach(type => attachTypeApi(api, type));

// api.warn = api.warning;
// api.useMessage = createUseMessage(getRCNotificationInstance, getRCNoticeProps);

// export interface MessageInstance {
//   info(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
//   success(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
//   error(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
//   warning(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
//   loading(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
//   open(args: ArgsProps): MessageType;
// }

// export interface MessageApi extends MessageInstance {
//   warn(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
//   config(options: ConfigOptions): void;
//   destroy(messageKey?: React.Key): void;
//   useMessage(): [MessageInstance, React.ReactElement];
// }

// /** @private test Only function. Not work on production */
// export const getInstance = () => (process.env.NODE_ENV === 'test' ? messageInstance : null);

// export default api as MessageApi;

import * as React from 'react';
import { render, unmount } from 'rc-util/lib/React/render';
import useMessage, { useInternalMessage } from './useMessage';
import type {
  ArgsProps,
  MessageInstance,
  ConfigOptions,
  NoticeType,
  TypeOpen,
  MessageType,
} from './interface';
import ConfigProvider, { globalConfig } from '../config-provider';
import { wrapPromiseFn } from './util';

let message: GlobalMessage | null = null;

let act = (callback: VoidFunction) => callback();

interface GlobalMessage {
  fragment: DocumentFragment;
  instance?: MessageInstance | null;
  sync?: VoidFunction;
}

interface OpenTask {
  type: 'open';
  config: ArgsProps;
  resolve: VoidFunction;
  setCloseFn: (closeFn: VoidFunction) => void;
  skipped?: boolean;
}

interface TypeTask {
  type: NoticeType;
  args: Parameters<TypeOpen>;
  resolve: VoidFunction;
  setCloseFn: (closeFn: VoidFunction) => void;
  skipped?: boolean;
}

type Task =
  | OpenTask
  | TypeTask
  | {
      type: 'destroy';
      key: React.Key;
      skipped?: boolean;
    };

let taskQueue: Task[] = [];

let defaultGlobalConfig: ConfigOptions = {};

function getGlobalContext() {
  const {
    prefixCls: globalPrefixCls,
    getContainer: globalGetContainer,
    rtl,
    maxCount,
    top,
  } = defaultGlobalConfig;
  const mergedPrefixCls = globalPrefixCls ?? globalConfig().getPrefixCls('message');
  const mergedContainer = globalGetContainer?.() || document.body;

  return {
    prefixCls: mergedPrefixCls,
    container: mergedContainer,
    rtl,
    maxCount,
    top,
  };
}

interface GlobalHolderRef {
  instance: MessageInstance;
  sync: () => void;
}

const GlobalHolder = React.forwardRef<GlobalHolderRef, { onAllRemoved: VoidFunction }>(
  ({ onAllRemoved }, ref) => {
    const [prefixCls, setPrefixCls] = React.useState<string>();
    const [container, setContainer] = React.useState<HTMLElement>();
    const [maxCount, setMaxCount] = React.useState<number | undefined>();
    const [rtl, setRTL] = React.useState<boolean | undefined>();
    const [top, setTop] = React.useState<number | undefined>();

    const [api, holder] = useInternalMessage({
      prefixCls,
      getContainer: () => container!,
      maxCount,
      rtl,
      top,
      onAllRemoved,
    });

    const global = globalConfig();
    const rootPrefixCls = global.getRootPrefixCls();
    const rootIconPrefixCls = global.getIconPrefixCls();

    const sync = () => {
      const {
        prefixCls: nextGlobalPrefixCls,
        container: nextGlobalContainer,
        maxCount: nextGlobalMaxCount,
        rtl: nextGlobalRTL,
        top: nextTop,
      } = getGlobalContext();

      setPrefixCls(nextGlobalPrefixCls);
      setContainer(nextGlobalContainer);
      setMaxCount(nextGlobalMaxCount);
      setRTL(nextGlobalRTL);
      setTop(nextTop);
    };

    React.useEffect(sync, []);

    React.useImperativeHandle(ref, () => ({
      instance: api,
      sync,
    }));

    return (
      <ConfigProvider prefixCls={rootPrefixCls} iconPrefixCls={rootIconPrefixCls}>
        {holder}
      </ConfigProvider>
    );
  },
);

function destroyInstance() {
  act(() => {
    if (message?.fragment) {
      unmount(message.fragment);
    }
  });

  message = null;
}

function flushNotice() {
  if (!message) {
    const holderFragment = document.createDocumentFragment();

    const newMessage: GlobalMessage = {
      fragment: holderFragment,
    };

    message = newMessage;

    // Delay render to avoid sync issue
    act(() => {
      render(
        <GlobalHolder
          ref={node => {
            const { instance, sync } = node || {};
            newMessage.instance = instance;
            newMessage.sync = sync;
            flushNotice();
          }}
          onAllRemoved={destroyInstance}
        />,
        holderFragment,
      );
    });

    return;
  }

  // Notification not ready
  if (message && !message.instance) {
    return;
  }

  // >>> Execute task
  taskQueue.forEach(task => {
    const { type, skipped } = task;

    // Only `skipped` when user call notice but cancel it immediately
    // and instance not ready
    if (!skipped) {
      switch (type) {
        case 'open': {
          act(() => {
            const closeFn = message!.instance!.open({
              ...defaultGlobalConfig,
              ...task.config,
            });

            closeFn?.then(task.resolve);
            task.setCloseFn(closeFn);
          });
          break;
        }

        case 'destroy':
          act(() => {
            message?.instance!.destroy(task.key);
          });
          break;

        // Other type open
        default: {
          act(() => {
            const closeFn = message!.instance![type](...task.args);

            closeFn?.then(task.resolve);
            task.setCloseFn(closeFn);
          });
        }
      }
    }
  });

  // Clean up
  taskQueue = [];
}

// ==============================================================================
// ==                                  Export                                  ==
// ==============================================================================
const methods: NoticeType[] = ['success', 'info', 'warning', 'error', 'loading'];
type MethodType = typeof methods[number];

function setMessageGlobalConfig(config: ConfigOptions) {
  defaultGlobalConfig = {
    ...defaultGlobalConfig,
    ...config,
  };

  // Trigger sync for it
  act(() => {
    message?.sync?.();
  });
}

function open(config: ArgsProps): MessageType {
  const result = wrapPromiseFn(resolve => {
    let closeFn: VoidFunction;

    const task: OpenTask = {
      type: 'open',
      config,
      resolve,
      setCloseFn: fn => {
        closeFn = fn;
      },
    };
    taskQueue.push(task);

    return () => {
      if (closeFn) {
        act(() => {
          closeFn();
        });
      } else {
        task.skipped = true;
      }
    };
  });

  flushNotice();

  return result;
}

function typeOpen(type: NoticeType, args: Parameters<TypeOpen>): MessageType {
  const result = wrapPromiseFn(resolve => {
    let closeFn: VoidFunction;

    const task: TypeTask = {
      type,
      args,
      resolve,
      setCloseFn: fn => {
        closeFn = fn;
      },
    };

    taskQueue.push(task);

    return () => {
      if (closeFn) {
        act(() => {
          closeFn();
        });
      } else {
        task.skipped = true;
      }
    };
  });

  flushNotice();

  return result;
}

function destroy(key: React.Key) {
  taskQueue.push({
    type: 'destroy',
    key,
  });
  flushNotice();
}

const baseStaticMethods: {
  open: (config: ArgsProps) => void;
  destroy: (key?: React.Key) => void;
  config: any;
  useMessage: typeof useMessage;
} = {
  open,
  destroy,
  config: setMessageGlobalConfig,
  useMessage,
};

const staticMethods: typeof baseStaticMethods & Record<MethodType, TypeOpen> =
  baseStaticMethods as any;

methods.forEach(type => {
  staticMethods[type] = (...args: Parameters<TypeOpen>) => typeOpen(type, args);
});

// ==============================================================================
// ==                                   Test                                   ==
// ==============================================================================
const noop = () => {};

/** @private Only Work in test env */
// eslint-disable-next-line import/no-mutable-exports
export let actWrapper: (wrapper: any) => void = noop;

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

    destroyInstance();
  };
}

export default staticMethods;
