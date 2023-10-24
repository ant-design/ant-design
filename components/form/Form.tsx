import classNames from 'classnames';
import FieldForm, { List, useWatch } from 'rc-field-form';
import type { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import type { InternalNamePath, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import * as React from 'react';
import { useMemo } from 'react';
import type { Options } from 'scroll-into-view-if-needed';
import { ConfigContext } from '../config-provider';
import DisabledContext, { DisabledContextProvider } from '../config-provider/DisabledContext';
import type { SizeType } from '../config-provider/SizeContext';
import SizeContext from '../config-provider/SizeContext';
import useSize from '../config-provider/hooks/useSize';
import type { ColProps } from '../grid/col';
import type { FormContextProps } from './context';
import { FormContext, FormProvider } from './context';
import useForm, { type FormInstance } from './hooks/useForm';
import useFormWarning from './hooks/useFormWarning';
import type { FormLabelAlign } from './interface';
import useStyle from './style';
import ValidateMessagesContext from './validateMessagesContext';
import type { FeedbackIcons } from './FormItem';

export type RequiredMark =
  | boolean
  | 'optional'
  | ((labelNode: React.ReactNode, info: { required: boolean }) => React.ReactNode);
export type FormLayout = 'horizontal' | 'inline' | 'vertical';

export interface FormProps<Values = any> extends Omit<RcFormProps<Values>, 'form'> {
  prefixCls?: string;
  colon?: boolean;
  name?: string;
  layout?: FormLayout;
  labelAlign?: FormLabelAlign;
  labelWrap?: boolean;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  form?: FormInstance<Values>;
  feedbackIcons?: FeedbackIcons;
  size?: SizeType;
  disabled?: boolean;
  scrollToFirstError?: Options | boolean;
  requiredMark?: RequiredMark;
  /** @deprecated Will warning in future branch. Pls use `requiredMark` instead. */
  hideRequiredMark?: boolean;
  rootClassName?: string;
}

const InternalForm: React.ForwardRefRenderFunction<FormInstance, FormProps> = (props, ref) => {
  const contextDisabled = React.useContext(DisabledContext);
  const { getPrefixCls, direction, form: contextForm } = React.useContext(ConfigContext);

  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    size,
    disabled = contextDisabled,
    form,
    colon,
    labelAlign,
    labelWrap,
    labelCol,
    wrapperCol,
    hideRequiredMark,
    layout = 'horizontal',
    scrollToFirstError,
    requiredMark,
    onFinishFailed,
    name,
    style,
    feedbackIcons,
    ...restFormProps
  } = props;

  const mergedSize = useSize(size);

  const contextValidateMessages = React.useContext(ValidateMessagesContext);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFormWarning(props);
  }

  const mergedRequiredMark = useMemo(() => {
    if (requiredMark !== undefined) {
      return requiredMark;
    }

    if (contextForm && contextForm.requiredMark !== undefined) {
      return contextForm.requiredMark;
    }

    if (hideRequiredMark) {
      return false;
    }

    return true;
  }, [hideRequiredMark, requiredMark, contextForm]);

  const mergedColon = colon ?? contextForm?.colon;

  const prefixCls = getPrefixCls('form', customizePrefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const formClassName = classNames(
    prefixCls,
    `${prefixCls}-${layout}`,
    {
      [`${prefixCls}-hide-required-mark`]: mergedRequiredMark === false,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${mergedSize}`]: mergedSize,
    },
    hashId,
    contextForm?.className,
    className,
    rootClassName,
  );

  const [wrapForm] = useForm(form);
  const { __INTERNAL__ } = wrapForm;
  __INTERNAL__.name = name;

  const formContextValue = useMemo<FormContextProps>(
    () => ({
      name,
      labelAlign,
      labelCol,
      labelWrap,
      wrapperCol,
      vertical: layout === 'vertical',
      colon: mergedColon,
      requiredMark: mergedRequiredMark,
      itemRef: __INTERNAL__.itemRef,
      form: wrapForm,
      feedbackIcons,
    }),
    [
      name,
      labelAlign,
      labelCol,
      wrapperCol,
      layout,
      mergedColon,
      mergedRequiredMark,
      wrapForm,
      feedbackIcons,
    ],
  );

  React.useImperativeHandle(ref, () => wrapForm);

  const scrollToField = (options: boolean | Options, fieldName: InternalNamePath) => {
    if (options) {
      let defaultScrollToFirstError: Options = { block: 'nearest' };
      if (typeof options === 'object') {
        defaultScrollToFirstError = options;
      }
      wrapForm.scrollToField(fieldName, defaultScrollToFirstError);
    }
  };

  const onInternalFinishFailed = (errorInfo: ValidateErrorEntity) => {
    onFinishFailed?.(errorInfo);
    if (errorInfo.errorFields.length) {
      const fieldName = errorInfo.errorFields[0].name;
      if (scrollToFirstError !== undefined) {
        scrollToField(scrollToFirstError, fieldName);
        return;
      }

      if (contextForm && contextForm.scrollToFirstError !== undefined) {
        scrollToField(contextForm.scrollToFirstError, fieldName);
      }
    }
  };

  return wrapSSR(
    <DisabledContextProvider disabled={disabled}>
      <SizeContext.Provider value={mergedSize}>
        <FormProvider
          {...{
            // This is not list in API, we pass with spread
            validateMessages: contextValidateMessages,
          }}
        >
          <FormContext.Provider value={formContextValue}>
            <FieldForm
              id={name}
              {...restFormProps}
              name={name}
              onFinishFailed={onInternalFinishFailed}
              form={wrapForm}
              style={{ ...contextForm?.style, ...style }}
              className={formClassName}
            />
          </FormContext.Provider>
        </FormProvider>
      </SizeContext.Provider>
    </DisabledContextProvider>,
  );
};

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm) as (<Values = any>(
  props: React.PropsWithChildren<FormProps<Values>> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement) & { displayName?: string };

if (process.env.NODE_ENV !== 'production') {
  Form.displayName = 'Form';
}

export { List, useForm, useWatch, type FormInstance };

export default Form;
