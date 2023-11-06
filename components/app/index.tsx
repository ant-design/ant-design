import type { ReactNode } from 'react';
import React, { useContext } from 'react';
import classNames from 'classnames';

import type { AnyObject, CustomComponent } from '../_util/type';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useMessage from '../message/useMessage';
import useModal from '../modal/useModal';
import useNotification from '../notification/useNotification';
import type { AppConfig, useAppProps } from './context';
import AppContext, { AppConfigContext } from './context';
import useStyle from './style';

export interface AppProps<P = AnyObject> extends AppConfig {
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  prefixCls?: string;
  children?: ReactNode;
  component?: CustomComponent<P> | false;
}

const useApp = () => React.useContext<useAppProps>(AppContext);

const App: React.FC<AppProps> & { useApp: () => useAppProps } = (props) => {
  const {
    prefixCls: customizePrefixCls,
    children,
    className,
    rootClassName,
    message,
    notification,
    style,
    component = 'div',
  } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('app', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const customClassName = classNames(hashId, prefixCls, className, rootClassName);

  const appConfig = useContext<AppConfig>(AppConfigContext);

  const mergedAppConfig = React.useMemo<AppConfig>(
    () => ({
      message: { ...appConfig.message, ...message },
      notification: { ...appConfig.notification, ...notification },
    }),
    [message, notification, appConfig.message, appConfig.notification],
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
    }),
    [messageApi, notificationApi, ModalApi],
  );

  // ============================ Render ============================
  const Component = component === false ? React.Fragment : component;
  const rootProps: AppProps = {
    className: customClassName,
    style,
  };

  return wrapSSR(
    <AppContext.Provider value={memoizedContextValue}>
      <AppConfigContext.Provider value={mergedAppConfig}>
        <Component {...(component === false ? undefined : rootProps)}>
          {ModalContextHolder}
          {messageContextHolder}
          {notificationContextHolder}
          {children}
        </Component>
      </AppConfigContext.Provider>
    </AppContext.Provider>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  App.displayName = 'App';
}

App.useApp = useApp;

export default App;
