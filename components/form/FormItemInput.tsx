import * as React from 'react';
import classNames from 'classnames';
import { set } from 'rc-util';

import type { ColProps } from '../grid/col';
import Col from '../grid/col';
import { FormContext, FormItemPrefixContext } from './context';
import ErrorList from './ErrorList';
import type { ValidateStatus } from './FormItem';
import FallbackCmp from './style/fallbackCmp';

interface FormItemInputMiscProps {
  prefixCls: string;
  children: React.ReactNode;
  errors: React.ReactNode[];
  warnings: React.ReactNode[];
  marginBottom?: number | null;
  onErrorVisibleChanged?: (visible: boolean) => void;
  /** @internal do not use in any of your production. */
  _internalItemRender?: {
    mark: string;
    render: (
      props: FormItemInputProps & FormItemInputMiscProps,
      domList: {
        input: JSX.Element;
        errorList: JSX.Element | null;
        extra: JSX.Element | null;
      },
    ) => React.ReactNode;
  };
}

export interface FormItemInputProps {
  wrapperCol?: ColProps;
  extra?: React.ReactNode;
  status?: ValidateStatus;
  help?: React.ReactNode;
  fieldId?: string;
  label?: React.ReactNode;
}

const FormItemInput: React.FC<FormItemInputProps & FormItemInputMiscProps> = (props) => {
  const {
    prefixCls,
    status,
    wrapperCol,
    children,
    errors,
    warnings,
    _internalItemRender: formItemRender,
    extra,
    help,
    fieldId,
    marginBottom,
    onErrorVisibleChanged,
    label,
  } = props;
  const baseClassName = `${prefixCls}-item`;

  const formContext = React.useContext(FormContext);

  const mergedWrapperCol = React.useMemo(() => {
    const mergedWrapperCol: ColProps = { ...(wrapperCol || formContext.wrapperCol || {}) };
    if (label === null && !wrapperCol && formContext.labelCol) {
      // base size
      if ('span' in formContext.labelCol) {
        mergedWrapperCol.offset = formContext.labelCol.span;
      }
      // more size
      const list = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
      list.forEach((size) => {
        if (typeof mergedWrapperCol[size] === 'object' && 'span' in mergedWrapperCol[size]) {
          set(mergedWrapperCol, [size, 'offset'], mergedWrapperCol[size].span);
        }
      });
    }
    return mergedWrapperCol;
  }, [wrapperCol, formContext]);

  const className = classNames(`${baseClassName}-control`, mergedWrapperCol.className);

  // Pass to sub FormItem should not with col info
  const subFormContext = React.useMemo(() => {
    const { labelCol, wrapperCol, ...rest } = formContext;
    return rest;
  }, [formContext]);

  const inputDom: React.ReactNode = (
    <div className={`${baseClassName}-control-input`}>
      <div className={`${baseClassName}-control-input-content`}>{children}</div>
    </div>
  );
  const formItemContext = React.useMemo(() => ({ prefixCls, status }), [prefixCls, status]);
  const errorListDom: React.ReactNode =
    marginBottom !== null || errors.length || warnings.length ? (
      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <FormItemPrefixContext.Provider value={formItemContext}>
          <ErrorList
            fieldId={fieldId}
            errors={errors}
            warnings={warnings}
            help={help}
            helpStatus={status}
            className={`${baseClassName}-explain-connected`}
            onVisibleChanged={onErrorVisibleChanged}
          />
        </FormItemPrefixContext.Provider>
        {!!marginBottom && <div style={{ width: 0, height: marginBottom }} />}
      </div>
    ) : null;

  const extraProps: { id?: string } = {};

  if (fieldId) {
    extraProps.id = `${fieldId}_extra`;
  }

  // If extra = 0, && will goes wrong
  // 0&&error -> 0
  const extraDom: React.ReactNode = extra ? (
    <div {...extraProps} className={`${baseClassName}-extra`}>
      {extra}
    </div>
  ) : null;

  const dom: React.ReactNode =
    formItemRender && formItemRender.mark === 'pro_table_render' && formItemRender.render ? (
      formItemRender.render(props, { input: inputDom, errorList: errorListDom, extra: extraDom })
    ) : (
      <>
        {inputDom}
        {errorListDom}
        {extraDom}
      </>
    );
  return (
    <FormContext.Provider value={subFormContext}>
      <Col {...mergedWrapperCol} className={className}>
        {dom}
      </Col>
      <FallbackCmp prefixCls={prefixCls} />
    </FormContext.Provider>
  );
};

export default FormItemInput;
