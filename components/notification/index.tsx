import React, { useContext } from 'react';
import { render } from 'rc-util/lib/React/render';

import { AppConfigContext } from '../app/context';
import ConfigProvider, { ConfigContext, globalConfig, warnContext } from '../config-provider';
import type { ArgsProps, GlobalConfigProps, NotificationInstance } from './interface';
import PurePanel from './PurePanel';
import useNotification, { useInternalNotification } from './useNotification';

export type { ArgsProps };

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

type DelayTask = () => Promise<void> | void;

let taskQueue: Task[] = [];

let delayTaskQueue: DelayTask[] = [];

let defaultGlobalConfig: GlobalConfigProps = {};

let isLock = false;

function getGlobalContext() {
  const { getContainer, rtl, maxCount, top, bottom } = defaultGlobalConfig;
  const mergedContainer = getContainer?.() || document.body;

  return { getContainer: () => mergedContainer, rtl, maxCount, top, bottom };
}

interface GlobalHolderRef {
  instance: NotificationInstance;
  sync: () => void;
}

const GlobalHolder = React.forwardRef<
  GlobalHolderRef,
  { notificationConfig: GlobalConfigProps; sync: () => void }
>((props, ref) => {
  const { notificationConfig, sync } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = defaultGlobalConfig.prefixCls || getPrefixCls('notification');
  const appConfig = useContext(AppConfigContext);

  const [api, holder] = useInternalNotification({
    ...notificationConfig,
    prefixCls,
    ...appConfig.notification,
  });

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

  return holder;
});

const GlobalHolderWrapper = React.forwardRef<GlobalHolderRef, {}>((_, ref) => {
  const [notificationConfig, setNotificationConfig] =
    React.useState<GlobalConfigProps>(getGlobalContext);

  const sync = () => {
    setNotificationConfig(getGlobalContext);
  };

  React.useEffect(sync, []);

  const global = globalConfig();
  const rootPrefixCls = global.getRootPrefixCls();
  const rootIconPrefixCls = global.getIconPrefixCls();
  const theme = global.getTheme();

  const dom = <GlobalHolder ref={ref} sync={sync} notificationConfig={notificationConfig} />;
  return (
    <ConfigProvider prefixCls={rootPrefixCls} iconPrefixCls={rootIconPrefixCls} theme={theme}>
      {global.holderRender ? global.holderRender(dom) : dom}
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
        <GlobalHolderWrapper
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

  processTaskQueue(taskQueue);
  runPromiseInSequence();
}

const addDelayTask = (task: () => Promise<void> | void) => {
  delayTaskQueue.push(task);
};

const delayFunction = (task: () => void, delay: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      task();
      resolve();
    }, delay);
  });
};

function runPromiseInSequence() {
  if (delayTaskQueue.length === 0) {
    isLock = false;
    return Promise.resolve();
  }

  const task = delayTaskQueue.shift();
  delayFunction(task!, 300).then(() => {
    runPromiseInSequence();
  });
}

function processTaskQueue(taskQueue: Task[]) {
  while (taskQueue.length > 0) {
    const task = taskQueue.shift()!;
    // eslint-disable-next-line default-case
    switch (task.type) {
      case 'open': {
        addDelayTask(() =>
          act(() => {
            notification!.instance!.open({
              ...defaultGlobalConfig,
              ...task.config,
            });
          }),
        );
        break;
      }

      case 'destroy':
        addDelayTask(() =>
          act(() => {
            notification?.instance!.destroy(task.key);
          }),
        );
        break;
    }
  }
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
  const global = globalConfig();

  if (process.env.NODE_ENV !== 'production' && !global.holderRender) {
    warnContext('notification');
  }
  taskQueue.push({
    type: 'open',
    config,
  });
  if (!isLock) {
    Promise.resolve().then(() => {
      flushNotice();
    });
  }
  isLock = true;
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
  config: (config: GlobalConfigProps) => void;
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

/** @internal Only Work in test env */
// eslint-disable-next-line import/no-mutable-exports
export let actDestroy = noop;

if (process.env.NODE_ENV === 'test') {
  actDestroy = () => {
    notification = null;
  };
}

export default staticMethods;
