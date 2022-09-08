import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import omit from 'rc-util/lib/omit';
import type { MouseEventHandler } from 'react';
import React from 'react';
import BackTop from '../back-top';
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

const FloatButton: React.FC<FloatButtonProps> & { BackTop: typeof BackTop } = props => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const { prefixCls: customizePrefixCls, className = '', onClick } = props;
  const prefixCls = getPrefixCls('float-button', customizePrefixCls);

  const rootPrefixCls = getPrefixCls();

  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classString = classNames(hashId, prefixCls, className, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });

  const divProps = omit(props, ['prefixCls', 'className']);

  return wrapSSR(
    <div {...divProps} className={classString} onClick={onClick}>
      <FloatButtonContent prefixCls={prefixCls} rootPrefixCls={rootPrefixCls}>
        {props.children}
      </FloatButtonContent>
    </div>,
  );
};

FloatButton.BackTop = BackTop;

export default React.memo(FloatButton);
