import classNames from 'classnames';
import * as React from 'react';
import { useContext, useMemo } from 'react';
import { ConfigContext } from '../config-provider';
import type { FormItemStatusContextProps } from '../form/context';
import { FormItemInputContext } from '../form/context';
import warning from '../_util/warning';
import useStyle from './style';

export interface GroupProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'large' | 'small' | 'default';
  prefixCls?: string;
  compact?: boolean;
}

const Group: React.FC<GroupProps> = ({
  prefixCls: customizePrefixCls,
  size,
  compact,
  className,
  children,
  ...htmlAttributes
}) => {
  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('input-group', customizePrefixCls);
  const inputPrefixCls = getPrefixCls('input');
  const [wrapSSR, hashId] = useStyle(inputPrefixCls);
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-compact`]: compact,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    hashId,
    className,
  );

  const formItemContext = useContext(FormItemInputContext);

  const groupFormItemContext = useMemo<FormItemStatusContextProps>(
    () => ({
      ...formItemContext,
      isFormItemInput: false,
    }),
    [formItemContext],
  );

  if (process.env.NODE_ENV !== 'production') {
    warning(
      false,
      'Input.Group',
      `'Input.Group' is deprecated. Please use 'Space.Compact' instead.`,
    );
  }

  return wrapSSR(
    <div className={cls} {...htmlAttributes}>
      <FormItemInputContext.Provider value={groupFormItemContext}>
        {children}
      </FormItemInputContext.Provider>
    </div>,
  );
};

export default Group;
