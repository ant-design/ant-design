import React, { useContext } from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import message from '../message';
import notification from '../notification';
import Modal from '../modal';

export type AppProps = {
  className?: string;
  prefixCls?: string;
  children?: ReactNode;
};

const App: React.ForwardRefRenderFunction<HTMLDivElement, AppProps> & {
  useApp: Function;
} = (props) => {
  const { prefixCls: customizePrefixCls, children, className } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('app', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const customClassName = classNames(hashId, className);

  const [, messageContextHolder] = message.useMessage();
  const [, notificationContextHolder] = notification.useNotification();
  const [, ModalContextHolder] = Modal.useModal();

  return wrapSSR(
    <div className={customClassName}>
      {ModalContextHolder}
      {messageContextHolder}
      {notificationContextHolder}
      {children}
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  App.displayName = 'App';
}

const useApp = () => ({
  message,
  notification,
  Modal,
});

App.useApp = useApp;

export default App;
