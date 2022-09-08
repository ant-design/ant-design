import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import omit from 'rc-util/lib/omit';
import React, { useContext } from 'react';
import type { MouseEventHandler } from 'react';
import BackTop from '../back-top';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import { cloneElement } from '../_util/reactNode';
import useStyle from './style';

export interface FloatButtonProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  type?: 'default' | 'primary';
  shape?: 'circle' | 'square';
  tooltip?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

interface ContentProps {
  prefixCls: string;
  rootPrefixCls: string;
  children?: React.ReactNode;
}

const FloatButtonContent: React.FC<ContentProps> = props => {
  const { prefixCls, rootPrefixCls, children } = props;
  const defaultElement = (
    <div className={`${prefixCls}-content`}>
      <div className={`${prefixCls}-icon`}>
        <FileTextOutlined />
      </div>
    </div>
  );
  return (
    <CSSMotion motionName={`${rootPrefixCls}-fade`}>
      {options =>
        cloneElement(children || defaultElement, ({ className }) => ({
          className: classNames(options.className, className),
        }))
      }
    </CSSMotion>
  );
};

interface BackTopProps {
  BackTop: typeof BackTop;
}

const FloatButton: React.FC<FloatButtonProps> & BackTopProps = props => {
  const {
    prefixCls: customizePrefixCls,
    className = '',
    type = 'default',
    shape = 'circle',
    onClick,
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('float-button', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classString = classNames(hashId, prefixCls, className, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-${shape}`]: shape === 'square',
    [`${prefixCls}-${type}`]: type,
  });

  const divProps = omit<FloatButtonProps, 'prefixCls' | 'className'>(props, [
    'prefixCls',
    'className',
  ]);

  return wrapSSR(
    <div {...divProps} className={classString} onClick={onClick}>
      <FloatButtonContent prefixCls={prefixCls} rootPrefixCls={rootPrefixCls}>
        {props.children}
      </FloatButtonContent>
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  FloatButton.displayName = 'FloatButton';
}

FloatButton.BackTop = BackTop;

export default React.memo(FloatButton);
