import React, { useContext } from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import useMessage from '../message/useMessage';
import useNotification from '../notification/useNotification';
import useModal from '../modal/useModal';
import AppContext from './context';
import type { useAppProps } from './context';

export type AppProps = {
  className?: string;
  prefixCls?: string;
  children?: ReactNode;
};

const useApp = () => React.useContext<useAppProps>(AppContext);

const App: React.FC<AppProps> & { useApp: () => useAppProps } = (props) => {
  const { prefixCls: customizePrefixCls, children, className } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('app', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const customClassName = classNames(hashId, prefixCls, className);

  const [messageApi, messageContextHolder] = useMessage();
  const [notificationApi, notificationContextHolder] = useNotification();
  const [ModalApi, ModalContextHolder] = useModal();

  const memoizedContextValue = React.useMemo<useAppProps>(
    () => ({
      message: messageApi,
      notification: notificationApi,
      modal: ModalApi,
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
