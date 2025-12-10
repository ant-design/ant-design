import type { ReactNode } from 'react';
import React, { useContext } from 'react';
import { clsx } from 'clsx';

import type { AnyObject, CustomComponent } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useMessage from '../message/useMessage';
import useModal from '../modal/useModal';
import useNotification from '../notification/useNotification';
import type { AppConfig, useAppProps } from './context';
import AppContext, { AppConfigContext } from './context';
import useStyle from './style';
import useApp from './useApp';

export interface AppProps<P = AnyObject> extends AppConfig {
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  prefixCls?: string;
  children?: ReactNode;
  component?: CustomComponent<P> | false;
}

const App: React.FC<AppProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    children,
    className,
    rootClassName,
    message,
    notification,
    breadcrumb,
    style,
    component = 'div',
  } = props;
  const { direction, getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('app', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const customClassName = clsx(hashId, prefixCls, className, rootClassName, cssVarCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });

  const appConfig = useApp();

  const mergedAppConfig = React.useMemo<AppConfig>(
    () => ({
      message: { ...appConfig.message, ...message },
      notification: { ...appConfig.notification, ...notification },
      breadcrumb: {
        items: [...(appConfig.breadcrumb?.items || []), ...(breadcrumb?.items || [])],
      },
    }),
    [
      message,
      notification,
      breadcrumb?.items,
      appConfig.message,
      appConfig.notification,
      appConfig.breadcrumb?.items,
    ],
  );

  const [messageApi, messageContextHolder] = useMessage(mergedAppConfig.message);
  const [notificationApi, notificationContextHolder] = useNotification(
    mergedAppConfig.notification,
  );
  const [ModalApi, ModalContextHolder] = useModal();

  const memoizedContextValue = React.useMemo<useAppProps>(
    () => ({
      message: messageApi,
      notification: notificationApi,
      modal: ModalApi,
      breadcrumb: { items: mergedAppConfig.breadcrumb?.items || [] },
    }),
    [messageApi, notificationApi, ModalApi, mergedAppConfig.breadcrumb],
  );

  // https://github.com/ant-design/ant-design/issues/48802#issuecomment-2097813526
  devUseWarning('App')(
    !(cssVarCls && component === false),
    'usage',
    'When using cssVar, ensure `component` is assigned a valid React component string.',
  );

  // ============================ Render ============================
  const Component = component === false ? React.Fragment : component;

  const rootProps: AppProps = {
    className: customClassName,
    style,
  };

  return (
    <AppContext.Provider value={memoizedContextValue}>
      <AppConfigContext.Provider value={mergedAppConfig}>
        <Component {...(component === false ? undefined : rootProps)}>
          {ModalContextHolder}
          {messageContextHolder}
          {notificationContextHolder}
          {children}
        </Component>
      </AppConfigContext.Provider>
    </AppContext.Provider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  App.displayName = 'App';
}

export default App;
