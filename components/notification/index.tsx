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
