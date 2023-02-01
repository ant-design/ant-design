import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { useContext } from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import type { ConfigOptions as MessageConfig } from '../message/interface';
import useMessage from '../message/useMessage';
import useModal from '../modal/useModal';
import type { NotificationConfig } from '../notification/interface';
import useNotification from '../notification/useNotification';
import type { useAppProps } from './context';
import AppContext from './context';
import useStyle from './style';

export type AppProps = {
  className?: string;
  rootClassName?: string;
  prefixCls?: string;
  children?: ReactNode;
} & AppConfig;

export type AppConfig = {
  messageConfig?: MessageConfig;
  notificationConfig?: NotificationConfig;
};

export type InternalUseAppProps = useAppProps & {
  /** @internal: internal usage only for nested app */
  __INTERNAL__?: AppConfig;
};

function useApp<UseAppPropsType extends useAppProps = useAppProps>() {
  return React.useContext(AppContext) as UseAppPropsType;
}

const App: React.FC<AppProps> & { useApp: typeof useApp } = (props) => {
  const {
    prefixCls: customizePrefixCls,
    children,
    className,
    rootClassName,
    messageConfig,
    notificationConfig,
  } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('app', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const customClassName = classNames(hashId, prefixCls, className, rootClassName);

  const { __INTERNAL__ } = useApp<InternalUseAppProps>();
  const mergedMessageConfig = React.useMemo(
    () => ({ ...messageConfig, ...__INTERNAL__?.messageConfig }),
    [messageConfig, __INTERNAL__?.messageConfig],
  );
  const mergedNotificationConfig = React.useMemo(
    () => ({ ...notificationConfig, ...__INTERNAL__?.notificationConfig }),
    [notificationConfig, __INTERNAL__?.notificationConfig],
  );

  const [messageApi, messageContextHolder] = useMessage(mergedMessageConfig);
  const [notificationApi, notificationContextHolder] = useNotification(mergedNotificationConfig);
  const [ModalApi, ModalContextHolder] = useModal();

  const memoizedContextValue = React.useMemo<InternalUseAppProps>(
    () => ({
      message: messageApi,
      notification: notificationApi,
      modal: ModalApi,
      __INTERNAL__: {
        messageConfig: mergedMessageConfig,
        notificationConfig: mergedNotificationConfig,
      },
    }),
    [messageApi, notificationApi, ModalApi],
  );

  return wrapSSR(
    <AppContext.Provider value={memoizedContextValue}>
      <div className={customClassName}>
        {ModalContextHolder}
        {messageContextHolder}
        {notificationContextHolder}
        {children}
      </div>
    </AppContext.Provider>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  App.displayName = 'App';
}

App.useApp = useApp;

export default App;
