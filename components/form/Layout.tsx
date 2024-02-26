import * as React from 'react';
import { useMemo } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { FormContextProps } from './context';
import { FormContext } from './context';
import type { FormProps } from './Form';
import useStyle from './style';

export interface FormLayoutProps
  extends Pick<
    FormProps,
    | 'prefixCls'
    | 'labelAlign'
    | 'labelWrap'
    | 'labelCol'
    | 'wrapperCol'
    | 'className'
    | 'style'
    | 'layout'
  > {
  children?: React.ReactNode;
}

const InternalFormLayout = (props: FormLayoutProps) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const formContext = React.useContext(FormContext);

  const {
    className,
    style,
    children,
    prefixCls: customizePrefixCls,
    layout = 'horizontal',
    labelAlign = formContext.labelAlign,
    labelCol = formContext.labelCol,
    labelWrap = formContext.labelWrap,
    wrapperCol = formContext.wrapperCol,
  } = props;

  const prefixCls = getPrefixCls('form', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const formClassName = classNames(
    { [`${prefixCls}-${layout}`]: !!layout },
    cssVarCls,
    rootCls,
    hashId,
    className,
  );

  const formContextValue = useMemo<FormContextProps>(
    () => ({
      ...formContext,
      labelAlign,
      labelCol,
      labelWrap,
      wrapperCol,
      vertical: layout === 'vertical',
    }),
    [labelAlign, labelCol, wrapperCol, layout],
  );

  return wrapCSSVar(
    <FormContext.Provider value={formContextValue}>
      <div style={style} className={formClassName}>
        {children}
      </div>
    </FormContext.Provider>,
  );
};

const Layout = InternalFormLayout as ((props: FormLayoutProps) => React.ReactElement) &
  Pick<React.FC, 'displayName'>;

if (process.env.NODE_ENV !== 'production') {
  Layout.displayName = 'Form';
}

export default Layout;
