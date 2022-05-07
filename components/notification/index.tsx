import * as React from 'react';
import { render, unmount } from 'rc-util/lib/React/render';
import useNotification from './useNotification';
import type { ArgsProps, NotificationInstance, GlobalConfigProps } from './interface';
import ConfigProvider, { globalConfig } from '../config-provider';

let notification: GlobalNotification | null = null;

let act = (callback: VoidFunction) => callback();

interface GlobalNotification {
  fragment: DocumentFragment;
  instance?: NotificationInstance | null;
  sync?: VoidFunction;
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

let defaultGlobalConfig: GlobalConfigProps = {};

function getGlobalContext() {
  const {
    prefixCls: globalPrefixCls,
    getContainer: globalGetContainer,
    rtl,
    maxCount,
  } = defaultGlobalConfig;
  const mergedPrefixCls = globalPrefixCls ?? globalConfig().getPrefixCls('notification');
  const mergedContainer = globalGetContainer?.() || document.body;

  return {
    prefixCls: mergedPrefixCls,
    container: mergedContainer,
    rtl,
    maxCount,
  };
}

interface GlobalHolderRef {
  instance: NotificationInstance;
  sync: () => void;
}

const GlobalHolder = React.forwardRef<GlobalHolderRef, {}>((_, ref) => {
  const [prefixCls, setPrefixCls] = React.useState<string>();
  const [container, setContainer] = React.useState<HTMLElement>();
  const [maxCount, setMaxCount] = React.useState<number | undefined>();
  const [rtl, setRTL] = React.useState<boolean | undefined>();

  const [api, holder] = useNotification({
    prefixCls,
    getContainer: () => container!,
    maxCount,
    rtl,
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
    } = getGlobalContext();

    setPrefixCls(nextGlobalPrefixCls);
    setContainer(nextGlobalContainer);
    setMaxCount(nextGlobalMaxCount);
    setRTL(nextGlobalRTL);
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
});

function flushNotice() {
  if (!notification) {
    const holderFragment = document.createDocumentFragment();

    const newNotification: GlobalNotification = {
      fragment: holderFragment,
    };

    notification = newNotification;

    // Delay render to avoid sync issue
    act(() => {
      render(
        <GlobalHolder
          ref={node => {
            const { instance, sync } = node || {};
            newNotification.instance = instance;
            newNotification.sync = sync;
            flushNotice();
          }}
        />,
        holderFragment,
      );
    });

    return;
  }

  // Notification not ready
  if (notification && !notification.instance) {
    return;
  }

  // >>> Execute task
  taskQueue.forEach(task => {
    switch (task.type) {
      case 'open': {
        act(() => {
          notification!.instance!.open({
            ...defaultGlobalConfig,
            ...task.config,
          });
        });
        break;
      }

      case 'close':
        act(() => {
          notification?.instance!.close(task.key);
        });
        break;

      case 'destroy':
        act(() => {
          notification?.instance!.destroy();
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

function setNotificationGlobalConfig(config: GlobalConfigProps) {
  defaultGlobalConfig = {
    ...defaultGlobalConfig,
    ...config,
  };

  // Trigger sync for it
  act(() => {
    notification?.sync?.();
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

    act(() => {
      if (notification?.fragment) {
        unmount(notification.fragment);
      }
    });

    notification = null;
  };
}

export default staticMethods;
