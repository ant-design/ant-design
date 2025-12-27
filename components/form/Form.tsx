import * as React from 'react';
import FieldForm, { List, useWatch } from '@rc-component/form';
import type { FormProps as RcFormProps } from '@rc-component/form/lib/Form';
import type {
  FormRef,
  InternalNamePath,
  ValidateErrorEntity,
} from '@rc-component/form/lib/interface';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import type { Variant } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import DisabledContext, { DisabledContextProvider } from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import SizeContext from '../config-provider/SizeContext';
import type { ColProps } from '../grid/col';
import type { TooltipProps } from '../tooltip';
import type { FormContextProps } from './context';
import { FormContext, FormProvider, NoFormStyle, VariantContext } from './context';
import type { FeedbackIcons } from './FormItem';
import useForm from './hooks/useForm';
import type { FormInstance } from './hooks/useForm';
import useFormWarning from './hooks/useFormWarning';
import type { FormLabelAlign, ScrollFocusOptions } from './interface';
import useStyle from './style';
import ValidateMessagesContext from './validateMessagesContext';

export type RequiredMark =
  | boolean
  | 'optional'
  | ((labelNode: React.ReactNode, info: { required: boolean }) => React.ReactNode);
export type FormLayout = 'horizontal' | 'inline' | 'vertical';
export type FormItemLayout = 'horizontal' | 'vertical';

export type { ScrollFocusOptions };

export type FormSemanticName = keyof FormSemanticClassNames & keyof FormSemanticStyles;

export type FormSemanticClassNames = {
  root?: string;
  label?: string;
  content?: string;
};

export type FormSemanticStyles = {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  content?: React.CSSProperties;
};

export type FormClassNamesType = SemanticClassNamesType<FormProps, FormSemanticClassNames>;

export type FormStylesType = SemanticStylesType<FormProps, FormSemanticStyles>;

export interface FormProps<Values = any> extends Omit<RcFormProps<Values>, 'form'> {
  classNames?: FormClassNamesType;
  styles?: FormStylesType;
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
  scrollToFirstError?: ScrollFocusOptions | boolean;
  requiredMark?: RequiredMark;
  rootClassName?: string;
  variant?: Variant;
  tooltipIcon?: React.ReactNode;
  tooltipProps?: TooltipProps;
}

const InternalForm: React.ForwardRefRenderFunction<FormRef, FormProps> = (props, ref) => {
  const contextDisabled = React.useContext(DisabledContext);
  const {
    getPrefixCls,
    direction,
    requiredMark: contextRequiredMark,
    colon: contextColon,
    scrollToFirstError: contextScrollToFirstError,
    className: contextClassName,
    style: contextStyle,
    styles: contextStyles,
    classNames: contextClassNames,
    tooltipIcon: contextTooltipIcon,
    tooltipProps: contextTooltipProps,
  } = useComponentConfig('form');

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
    layout = 'horizontal',
    scrollToFirstError,
    requiredMark,
    onFinishFailed,
    name,
    style,
    feedbackIcons,
    variant,
    classNames,
    styles,
    tooltipIcon,
    tooltipProps,
    ...restFormProps
  } = props;

  const mergedSize = useSize(size);

  const contextValidateMessages = React.useContext(ValidateMessagesContext);

  /* eslint-disable react-hooks/rules-of-hooks */
  if (process.env.NODE_ENV !== 'production') {
    // biome-ignore lint/correctness/useHookAtTopLevel: Development-only warning hook called conditionally
    useFormWarning(props);
  }
  /* eslint-enable */

  const mergedRequiredMark = React.useMemo(() => {
    if (requiredMark !== undefined) {
      return requiredMark;
    }

    if (contextRequiredMark !== undefined) {
      return contextRequiredMark;
    }

    return true;
  }, [requiredMark, contextRequiredMark]);

  const mergedColon = colon ?? contextColon;

  const mergedTooltipIcon = tooltipIcon ?? contextTooltipIcon;
  const mergedTooltipProps = { ...contextTooltipProps, ...tooltipProps };

  const prefixCls = getPrefixCls('form', customizePrefixCls);

  // Style
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // =========== Merged Props for Semantic ===========
  const mergedProps: FormProps = {
    ...props,
    size: mergedSize,
    disabled,
    layout,
    colon: mergedColon,
    requiredMark: mergedRequiredMark,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    FormClassNamesType,
    FormStylesType,
    FormProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  const formClassName = clsx(
    prefixCls,
    `${prefixCls}-${layout}`,
    {
      [`${prefixCls}-hide-required-mark`]: mergedRequiredMark === false, // todo: remove in next major version
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${mergedSize}`]: mergedSize,
    },
    cssVarCls,
    rootCls,
    hashId,
    contextClassName,
    className,
    rootClassName,
    mergedClassNames.root,
  );

  const [wrapForm] = useForm(form);
  const { __INTERNAL__ } = wrapForm;
  __INTERNAL__.name = name;

  const formContextValue = React.useMemo<FormContextProps>(
    () => ({
      name,
      labelAlign,
      labelCol,
      labelWrap,
      wrapperCol,
      layout,
      colon: mergedColon,
      requiredMark: mergedRequiredMark,
      itemRef: __INTERNAL__.itemRef,
      form: wrapForm,
      feedbackIcons,
      tooltipIcon: mergedTooltipIcon,
      tooltipProps: mergedTooltipProps,
      classNames: mergedClassNames,
      styles: mergedStyles,
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
      mergedClassNames,
      mergedStyles,
      mergedTooltipIcon,
      mergedTooltipProps,
    ],
  );

  const nativeElementRef = React.useRef<FormRef>(null);
  React.useImperativeHandle(ref, () => ({
    ...wrapForm,
    nativeElement: nativeElementRef.current?.nativeElement,
  }));

  const scrollToField = (options: ScrollFocusOptions | boolean, fieldName: InternalNamePath) => {
    if (options) {
      let defaultScrollToFirstError: ScrollFocusOptions = { block: 'nearest' };
      if (typeof options === 'object') {
        defaultScrollToFirstError = { ...defaultScrollToFirstError, ...options };
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

      if (contextScrollToFirstError !== undefined) {
        scrollToField(contextScrollToFirstError, fieldName);
      }
    }
  };

  return (
    <VariantContext.Provider value={variant}>
      <DisabledContextProvider disabled={disabled}>
        <SizeContext.Provider value={mergedSize}>
          <FormProvider
            {...{
              // This is not list in API, we pass with spread
              validateMessages: contextValidateMessages,
            }}
          >
            <FormContext.Provider value={formContextValue}>
              <NoFormStyle status>
                <FieldForm
                  id={name}
                  {...restFormProps}
                  name={name}
                  onFinishFailed={onInternalFinishFailed}
                  form={wrapForm}
                  ref={nativeElementRef}
                  style={{ ...mergedStyles?.root, ...contextStyle, ...style }}
                  className={formClassName}
                />
              </NoFormStyle>
            </FormContext.Provider>
          </FormProvider>
        </SizeContext.Provider>
      </DisabledContextProvider>
    </VariantContext.Provider>
  );
};

const Form = React.forwardRef<FormRef, FormProps>(InternalForm) as (<Values = any>(
  props: React.PropsWithChildren<FormProps<Values>> & React.RefAttributes<FormRef<Values>>,
) => React.ReactElement) &
  Pick<React.FC, 'displayName'>;

if (process.env.NODE_ENV !== 'production') {
  Form.displayName = 'Form';
}

export { type FormInstance, List, useForm, useWatch };

export default Form;
