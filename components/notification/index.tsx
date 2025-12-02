import React, { useContext } from 'react';

import { AppConfigContext } from '../app/context';
import ConfigProvider, { ConfigContext, globalConfig, warnContext } from '../config-provider';
import { unstableSetRender } from '../config-provider/UnstableContext';
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
      key?: React.Key;
    };

let taskQueue: Task[] = [];

let defaultGlobalConfig: GlobalConfigProps = {};

function getGlobalContext() {
  const { getContainer, rtl, maxCount, top, bottom, showProgress, pauseOnHover } =
    defaultGlobalConfig;
  const mergedContainer = getContainer?.() || document.body;

  return {
    getContainer: () => mergedContainer,
    rtl,
    maxCount,
    top,
    bottom,
    showProgress,
    pauseOnHover,
  };
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

    Object.keys(instance).forEach((method) => {
      instance[method as keyof NotificationInstance] = (...args: any[]) => {
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

const GlobalHolderWrapper = React.forwardRef<GlobalHolderRef, unknown>((_, ref) => {
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

  // https://github.com/ant-design/ant-design/issues/55649
  // Static Methods do not use ThemeProvider, we need to reset these color variables to avoid
  theme.token = {
    ...(theme.token || {}),
    colorSuccessBg: '',
    colorErrorBg: '',
    colorInfoBg: '',
    colorWarningBg: '',
  };

  const dom = <GlobalHolder ref={ref} sync={sync} notificationConfig={notificationConfig} />;
  return (
    <ConfigProvider prefixCls={rootPrefixCls} iconPrefixCls={rootIconPrefixCls} theme={theme}>
      {global.holderRender ? global.holderRender(dom) : dom}
    </ConfigProvider>
  );
});

const flushNotificationQueue = () => {
  if (!notification) {
    const holderFragment = document.createDocumentFragment();

    const newNotification: GlobalNotification = {
      fragment: holderFragment,
    };

    notification = newNotification;

    // Delay render to avoid sync issue
    act(() => {
      const reactRender = unstableSetRender();

      reactRender(
        <GlobalHolderWrapper
          ref={(node) => {
            const { instance, sync } = node || {};

            Promise.resolve().then(() => {
              if (!newNotification.instance && instance) {
                newNotification.instance = instance;
                newNotification.sync = sync;
                flushNotificationQueue();
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
          notification?.instance?.destroy(task.key);
        });
        break;
    }
  });

  // Clean up
  taskQueue = [];
};

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

  taskQueue.push({ type: 'open', config });
  flushNotificationQueue();
}

const destroy: BaseMethods['destroy'] = (key) => {
  taskQueue.push({ type: 'destroy', key });
  flushNotificationQueue();
};

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

let _actWrapper: (wrapper: any) => void = noop;
if (process.env.NODE_ENV === 'test') {
  _actWrapper = (wrapper) => {
    act = wrapper;
  };
}
const actWrapper = _actWrapper;
export { actWrapper };

let _actDestroy = noop;
if (process.env.NODE_ENV === 'test') {
  _actDestroy = () => {
    notification = null;
  };
}
const actDestroy = _actDestroy;
export { actDestroy };

export default staticMethods;
