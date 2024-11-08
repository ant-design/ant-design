import * as React from 'react';
import classNames from 'classnames';
import { set } from 'rc-util';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';

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
    const formLabelCol = formContext.labelCol;
    let mergedWrapperCol: ColProps = { ...(wrapperCol || formContext.wrapperCol || {}) };
    if (label === null && !wrapperCol && formLabelCol) {
      // base size
      if ('span' in formLabelCol) {
        mergedWrapperCol.offset = formLabelCol.span;
      }
      // more size
      const list = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
      list.forEach((size) => {
        if (typeof formLabelCol[size] === 'object' && 'span' in formLabelCol[size]) {
          mergedWrapperCol = set(mergedWrapperCol, [size, 'offset'], formLabelCol[size].span);
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

  const extraRef = React.useRef<HTMLDivElement>(null);
  const [extraHeight, setExtraHeight] = React.useState<number>(0);
  useLayoutEffect(() => {
    if (extra && extraRef.current) {
      setExtraHeight(extraRef.current.clientHeight);
    } else {
      setExtraHeight(0);
    }
  }, [extra]);

  const inputDom: React.ReactNode = (
    <div className={`${baseClassName}-control-input`}>
      <div className={`${baseClassName}-control-input-content`}>{children}</div>
    </div>
  );
  const formItemContext = React.useMemo(() => ({ prefixCls, status }), [prefixCls, status]);
  const errorListDom: React.ReactNode =
    marginBottom !== null || errors.length || warnings.length ? (
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
    ) : null;

  const extraProps: { id?: string } = {};

  if (fieldId) {
    extraProps.id = `${fieldId}_extra`;
  }

  // If extra = 0, && will goes wrong
  // 0&&error -> 0
  const extraDom: React.ReactNode = extra ? (
    <div {...extraProps} className={`${baseClassName}-extra`} ref={extraRef}>
      {extra}
    </div>
  ) : null;

  const additionalDom: React.ReactNode =
    errorListDom || extraDom ? (
      <div
        className={`${baseClassName}-additional`}
        style={marginBottom ? { minHeight: marginBottom + extraHeight } : {}}
      >
        {errorListDom}
        {extraDom}
      </div>
    ) : null;

  const dom: React.ReactNode =
    formItemRender && formItemRender.mark === 'pro_table_render' && formItemRender.render ? (
      formItemRender.render(props, { input: inputDom, errorList: errorListDom, extra: extraDom })
    ) : (
      <>
        {inputDom}
        {additionalDom}
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
