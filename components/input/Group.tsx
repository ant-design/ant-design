import classNames from 'classnames';
import * as React from 'react';
import { useContext, useMemo } from 'react';
import { ConfigContext } from '../config-provider';
import { FormItemInputContext } from '../form/context';

export interface GroupProps {
  className?: string;
  size?: 'large' | 'small' | 'default';
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLSpanElement>;
  onFocus?: React.FocusEventHandler<HTMLSpanElement>;
  onBlur?: React.FocusEventHandler<HTMLSpanElement>;
  prefixCls?: string;
  compact?: boolean;
}

const Group: React.FC<GroupProps> = props => {
  const { getPrefixCls, direction } = useContext(ConfigContext);
  const { prefixCls: customizePrefixCls, className = '' } = props;
  const prefixCls = getPrefixCls('input-group', customizePrefixCls);
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-lg`]: props.size === 'large',
      [`${prefixCls}-sm`]: props.size === 'small',
      [`${prefixCls}-compact`]: props.compact,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const formItemContext = useContext(FormItemInputContext);
  const groupFormItemContext = useMemo(
    () => ({
      ...formItemContext,
      isFormItemInput: false,
    }),
    [formItemContext],
  );

  return (
    <span
      className={cls}
      style={props.style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      <FormItemInputContext.Provider value={groupFormItemContext}>
        {props.children}
      </FormItemInputContext.Provider>
    </span>
  );
};

export default Group;
