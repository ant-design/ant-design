import { render } from 'rc-util/lib/React/render';
import * as React from 'react';
import ConfigProvider, { globalConfig, warnContext } from '../config-provider';
import PurePanel from './PurePanel';
import type { ArgsProps, GlobalConfigProps, NotificationInstance } from './interface';
import useNotification, { useInternalNotification } from './useNotification';

let notification: GlobalNotification | null = null;

let act: (callback: VoidFunction) => Promise<void> | void = (callback: VoidFunction) => callback();

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
      type: 'destroy';
      key: React.Key;
    };

let taskQueue: Task[] = [];

let defaultGlobalConfig: GlobalConfigProps = {};

function getGlobalContext() {
  const {
    prefixCls: globalPrefixCls,
    getContainer: globalGetContainer,
    rtl,
    maxCount,
    top,
    bottom,
  } = defaultGlobalConfig;
  const mergedPrefixCls = globalPrefixCls ?? globalConfig().getPrefixCls('notification');
  const mergedContainer = globalGetContainer?.() || document.body;

  return {
    prefixCls: mergedPrefixCls,
    container: mergedContainer,
    rtl,
    maxCount,
    top,
    bottom,
  };
}

interface GlobalHolderRef {
  instance: NotificationInstance;
  sync: () => void;
}

const GlobalHolder = React.forwardRef<GlobalHolderRef, {}>((_, ref) => {
  const [prefixCls, setPrefixCls] = React.useState<string>();
  const [container, setContainer] = React.useState<HTMLElement | ShadowRoot>();
  const [maxCount, setMaxCount] = React.useState<number>();
  const [rtl, setRTL] = React.useState<boolean>();
  const [top, setTop] = React.useState<number>();
  const [bottom, setBottom] = React.useState<number>();

  const [api, holder] = useInternalNotification({
    prefixCls,
    getContainer: () => container!,
    maxCount,
    rtl,
    top,
    bottom,
  });

  const global = globalConfig();
  const rootPrefixCls = global.getRootPrefixCls();
  const rootIconPrefixCls = global.getIconPrefixCls();
  const theme = global.getTheme();

  const sync = () => {
    const {
      prefixCls: nextGlobalPrefixCls,
      container: nextGlobalContainer,
      maxCount: nextGlobalMaxCount,
      rtl: nextGlobalRTL,
      top: nextTop,
      bottom: nextBottom,
    } = getGlobalContext();

    setPrefixCls(nextGlobalPrefixCls);
    setContainer(nextGlobalContainer);
    setMaxCount(nextGlobalMaxCount);
    setRTL(nextGlobalRTL);
    setTop(nextTop);
    setBottom(nextBottom);
  };

  React.useEffect(sync, []);

  React.useImperativeHandle(ref, () => {
    const instance: NotificationInstance = { ...api };

    Object.keys(instance).forEach((method: keyof NotificationInstance) => {
      instance[method] = (...args: any[]) => {
        sync();
        return (api as any)[method](...args);
      };
    });

    return {
      instance,
      sync,
    };
  });

  return (
    <ConfigProvider prefixCls={rootPrefixCls} iconPrefixCls={rootIconPrefixCls} theme={theme}>
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
          ref={(node) => {
            const { instance, sync } = node || {};

            Promise.resolve().then(() => {
              if (!newNotification.instance && instance) {
                newNotification.instance = instance;
                newNotification.sync = sync;
                flushNotice();
              }
            });
          }}
        />,
        holderFragment,
      );
    });

    return;
  }

  // Notification not ready
  if (!notification.instance) {
    return;
  }

  // >>> Execute task
  taskQueue.forEach((task) => {
    // eslint-disable-next-line default-case
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

      case 'destroy':
        act(() => {
          notification?.instance!.destroy(task.key);
        });
        break;
    }
  });

  // Clean up
  taskQueue = [];
}

// ==============================================================================
// ==                                  Export                                  ==
// ==============================================================================

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
  // Warning if exist theme
  if (process.env.NODE_ENV !== 'production') {
    warnContext('notification');
  }

  taskQueue.push({
    type: 'open',
    config,
  });
  flushNotice();
}

function destroy(key: React.Key) {
  taskQueue.push({
    type: 'destroy',
    key,
  });
  flushNotice();
}

interface BaseMethods {
  open: (config: ArgsProps) => void;
  destroy: (key?: React.Key) => void;
  config: any;
  useNotification: typeof useNotification;
  /** @private Internal Component. Do not use in your production. */
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
}

type StaticFn = (config: ArgsProps) => void;

interface NoticeMethods {
  success: StaticFn;
  info: StaticFn;
  warning: StaticFn;
  error: StaticFn;
}

const methods: (keyof NoticeMethods)[] = ['success', 'info', 'warning', 'error'];

const baseStaticMethods: BaseMethods = {
  open,
  destroy,
  config: setNotificationGlobalConfig,
  useNotification,
  _InternalPanelDoNotUseOrYouWillBeFired: PurePanel,
};

const staticMethods = baseStaticMethods as NoticeMethods & BaseMethods;

methods.forEach((type: keyof NoticeMethods) => {
  staticMethods[type] = (config) => open({ ...config, type });
});

// ==============================================================================
// ==                                   Test                                   ==
// ==============================================================================
const noop = () => {};

/** @internal Only Work in test env */
// eslint-disable-next-line import/no-mutable-exports
export let actWrapper: (wrapper: any) => void = noop;

if (process.env.NODE_ENV === 'test') {
  actWrapper = (wrapper) => {
    act = wrapper;
  };
}

export default staticMethods;
