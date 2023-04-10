import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import type { Meta } from 'rc-field-form/lib/interface';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import isVisible from 'rc-util/lib/Dom/isVisible';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import type { FormItemProps, ValidateStatus } from '.';
import { Row } from '../../grid';
import FormItemInput from '../FormItemInput';
import FormItemLabel from '../FormItemLabel';
import type { FormItemStatusContextProps, ReportMetaChange } from '../context';
import { FormContext, FormItemInputContext, NoStyleItemContext } from '../context';
import useDebounce from '../hooks/useDebounce';

const iconMap = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined,
};

export interface ItemHolderProps extends FormItemProps {
  prefixCls: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  errors: React.ReactNode[];
  warnings: React.ReactNode[];
  meta: Meta;
  children?: React.ReactNode;
  fieldId?: string;
  isRequired?: boolean;
  onSubItemMetaChange: ReportMetaChange;
}

export default function ItemHolder(props: ItemHolderProps) {
  const {
    prefixCls,
    className,
    rootClassName,
    style,
    help,
    errors,
    warnings,
    validateStatus,
    meta,
    hasFeedback,
    hidden,
    children,
    fieldId,
    required,
    isRequired,
    onSubItemMetaChange,
    ...restProps
  } = props;

  const itemPrefixCls = `${prefixCls}-item`;
  const { requiredMark } = React.useContext(FormContext);

  // ======================== Margin ========================
  const itemRef = React.useRef<HTMLDivElement>(null);
  const debounceErrors = useDebounce(errors);
  const debounceWarnings = useDebounce(warnings);
  const hasHelp = help !== undefined && help !== null;
  const hasError = !!(hasHelp || errors.length || warnings.length);
  const isOnScreen = !!itemRef.current && isVisible(itemRef.current);
  const [marginBottom, setMarginBottom] = React.useState<number | null>(null);

  useLayoutEffect(() => {
    if (hasError && itemRef.current) {
      // The element must be part of the DOMTree to use getComputedStyle
      // https://stackoverflow.com/questions/35360711/getcomputedstyle-returns-a-cssstyledeclaration-but-all-properties-are-empty-on-a
      const itemStyle = getComputedStyle(itemRef.current);
      setMarginBottom(parseInt(itemStyle.marginBottom, 10));
    }
  }, [hasError, isOnScreen]);

  const onErrorVisibleChanged = (nextVisible: boolean) => {
    if (!nextVisible) {
      setMarginBottom(null);
    }
  };

  // ======================== Status ========================

  const getValidateState = (isDebounce = false) => {
    let status: ValidateStatus = '';
    const _errors = isDebounce ? debounceErrors : meta.errors;
    const _warnings = isDebounce ? debounceWarnings : meta.warnings;
    if (validateStatus !== undefined) {
      status = validateStatus;
    } else if (meta.validating) {
      status = 'validating';
    } else if (_errors.length) {
      status = 'error';
    } else if (_warnings.length) {
      status = 'warning';
    } else if (meta.touched || (hasFeedback && meta.validated)) {
      // success feedback should display when pass hasFeedback prop and current value is valid value
      status = 'success';
    }
    return status;
  };

  const mergedValidateStatus = getValidateState();

  const formItemStatusContext = React.useMemo<FormItemStatusContextProps>(() => {
    let feedbackIcon: React.ReactNode;
    if (hasFeedback) {
      const IconNode = mergedValidateStatus && iconMap[mergedValidateStatus];
      feedbackIcon = IconNode ? (
        <span
          className={classNames(
            `${itemPrefixCls}-feedback-icon`,
            `${itemPrefixCls}-feedback-icon-${mergedValidateStatus}`,
          )}
        >
          <IconNode />
        </span>
      ) : null;
    }

    return {
      status: mergedValidateStatus,
      errors,
      warnings,
      hasFeedback,
      feedbackIcon,
      isFormItemInput: true,
    };
  }, [mergedValidateStatus, hasFeedback]);

  // ======================== Render ========================
  const itemClassName = classNames(itemPrefixCls, className, rootClassName, {
    [`${itemPrefixCls}-with-help`]: hasHelp || debounceErrors.length || debounceWarnings.length,

    // Status
    [`${itemPrefixCls}-has-feedback`]: mergedValidateStatus && hasFeedback,
    [`${itemPrefixCls}-has-success`]: mergedValidateStatus === 'success',
    [`${itemPrefixCls}-has-warning`]: mergedValidateStatus === 'warning',
    [`${itemPrefixCls}-has-error`]: mergedValidateStatus === 'error',
    [`${itemPrefixCls}-is-validating`]: mergedValidateStatus === 'validating',
    [`${itemPrefixCls}-hidden`]: hidden,
  });

  return (
    <div className={itemClassName} style={style} ref={itemRef}>
      <Row
        className={`${itemPrefixCls}-row`}
        {...omit(restProps, [
          '_internalItemRender' as any,
          'colon',
          'dependencies',
          'extra',
          'fieldKey',
          'getValueFromEvent',
          'getValueProps',
          'htmlFor',
          'id', // It is deprecated because `htmlFor` is its replacement.
          'initialValue',
          'isListField',
          'label',
          'labelAlign',
          'labelCol',
          'labelWrap',
          'messageVariables',
          'name',
          'normalize',
          'noStyle',
          'preserve',
          'requiredMark',
          'rules',
          'shouldUpdate',
          'trigger',
          'tooltip',
          'validateFirst',
          'validateTrigger',
          'valuePropName',
          'wrapperCol',
        ])}
      >
        {/* Label */}
        <FormItemLabel
          htmlFor={fieldId}
          {...props}
          requiredMark={requiredMark}
          required={required ?? isRequired}
          prefixCls={prefixCls}
        />
        {/* Input Group */}
        <FormItemInput
          {...props}
          {...meta}
          errors={debounceErrors}
          warnings={debounceWarnings}
          prefixCls={prefixCls}
          status={mergedValidateStatus}
          help={help}
          marginBottom={marginBottom}
          onErrorVisibleChanged={onErrorVisibleChanged}
        >
          <NoStyleItemContext.Provider value={onSubItemMetaChange}>
            <FormItemInputContext.Provider value={formItemStatusContext}>
              {children}
            </FormItemInputContext.Provider>
          </NoStyleItemContext.Provider>
        </FormItemInput>
      </Row>

      {!!marginBottom && (
        <div
          className={`${itemPrefixCls}-margin-offset`}
          style={{
            marginBottom: -marginBottom,
          }}
        />
      )}
    </div>
  );
}
