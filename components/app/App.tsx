import type { ReactNode } from 'react';
import React, { useContext } from 'react';
import { clsx } from 'clsx';

import type { AnyObject, CustomComponent } from '../_util/type';
import { useDevWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
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

const App = React.forwardRef<HTMLElement, AppProps>((props, ref) => {
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

  const {
    direction,
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
  } = useComponentConfig('app');

  const prefixCls = getPrefixCls('app', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const customClassName = clsx(hashId, prefixCls, className, rootClassName, cssVarCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });

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

  const devWarning = useDevWarning('App');

  const hasRootProps = Boolean(
    className || rootClassName || style || contextClassName || contextStyle,
  );

  // https://github.com/ant-design/ant-design/issues/48802#issuecomment-2097813526
  // https://github.com/ant-design/ant-design/issues/58876
  devWarning(
    !(cssVarCls && component === false && hasRootProps),
    'usage',
    'When using cssVar, ensure `component` is assigned a valid React component string.',
  );

  devWarning(
    !ref || component !== false,
    'usage',
    '`ref` is not supported when `component` is `false`. Please provide a valid `component` instead.',
  );

  // ============================ Render ============================
  const Component = component === false ? React.Fragment : component;

  const rootProps: AppProps = {
    className: clsx(contextClassName, customClassName),
    style: { ...contextStyle, ...style },
  };

  return (
    <AppContext.Provider value={memoizedContextValue}>
      <AppConfigContext.Provider value={mergedAppConfig}>
        <Component {...(component === false ? undefined : { ...rootProps, ref })}>
          {ModalContextHolder}
          {messageContextHolder}
          {notificationContextHolder}
          {children}
        </Component>
      </AppConfigContext.Provider>
    </AppContext.Provider>
  );
});

if (process.env.NODE_ENV !== 'production') {
  App.displayName = 'App';
}

export default App;
