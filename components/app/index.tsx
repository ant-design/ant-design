import React, { useContext } from 'react';
import classNames from 'classnames';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { TourProps } from './interface';
import message from '../message';
import notification from '../notification';
import Modal from '../modal';

const AntdApp: React.ForwardRefRenderFunction<HTMLDivElement, TourProps> & {
  useApp: Function;
} = (props) => {
  const { prefixCls: customizePrefixCls, type, rootClassName, children, ...restProps } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('app', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const customClassName = classNames(
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    {
      [`${prefixCls}-primary`]: type === 'primary',
    },
    hashId,
    rootClassName,
  );
  return wrapSSR(<div className={customClassName}>{children}</div>);
};

const useApp = () => ({
  message,
  notification,
  Modal,
});

if (process.env.NODE_ENV !== 'production') {
  AntdApp.displayName = 'AntdApp';
}

AntdApp.useApp = useApp;
export default AntdApp;
