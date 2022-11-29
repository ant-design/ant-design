import React, { useContext } from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import message from '../message';
import notification from '../notification';
import Modal from '../modal';
import AppContext from './context';
import type { useAppProps } from './context';

export type AppProps = {
  className?: string;
  prefixCls?: string;
  children?: ReactNode;
};

const App: React.ForwardRefRenderFunction<HTMLDivElement, AppProps> & {
  useApp: () => useAppProps | undefined;
} = (props) => {
  const { prefixCls: customizePrefixCls, children, className } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('app', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const customClassName = classNames(hashId, className);

  const [messageApi, messageContextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] = notification.useNotification();
  const [ModalApi, ModalContextHolder] = Modal.useModal();

  const memoizedContextValue = React.useMemo(
    () => ({
      message: messageApi,
      notification: notificationApi,
      Modal: ModalApi,
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

App.useApp = () => useContext(AppContext);
export default App;
