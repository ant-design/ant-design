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
    [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-${type}`]: type,
  });

  const divProps = omit(props, ['prefixCls', 'className']);

  const defaultElement = (
    <div className={`${prefixCls}-content ${prefixCls}-${shape}`}>
      <div className={`${prefixCls}-icon`}>
        <FileTextOutlined />
      </div>
    </div>
  );

  return wrapSSR(
    <div {...divProps} className={classString} onClick={onClick}>
      <CSSMotion motionName={`${rootPrefixCls}-fade`}>
        {options =>
          cloneElement(props.children || defaultElement, contextProps => ({
            className: classNames(options.className, contextProps.className),
          }))
        }
      </CSSMotion>
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  FloatButton.displayName = 'FloatButton';
}

FloatButton.BackTop = BackTop;

export default React.memo(FloatButton);
