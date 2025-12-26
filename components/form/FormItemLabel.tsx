import * as React from 'react';
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import { omit } from '@rc-component/util';
import { clsx } from 'clsx';

import type { ColProps } from '../grid/col';
import Col from '../grid/col';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';
import type { TooltipProps } from '../tooltip';
import Tooltip from '../tooltip';
import type { FormContextProps } from './context';
import { FormContext } from './context';
import type { RequiredMark } from './Form';
import type { FormLabelAlign } from './interface';

export interface FormItemLabelProps {
  colon?: boolean;
  htmlFor?: string;
  label?: React.ReactNode;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  /**
   * @internal Used for pass `requiredMark` from `<Form />`
   */
  requiredMark?: RequiredMark;
  tooltip?: React.ReactNode;
  tooltipIcon?: React.ReactNode;
  tooltipProps?: TooltipProps;
  vertical?: boolean;
}

const FormItemLabel: React.FC<FormItemLabelProps & { required?: boolean; prefixCls: string }> = ({
  prefixCls,
  label,
  htmlFor,
  labelCol,
  labelAlign,
  colon,
  required,
  requiredMark,
  tooltip,
  tooltipIcon,
  tooltipProps,
  vertical,
}) => {
  const [formLocale] = useLocale('Form');

  const {
    labelAlign: contextLabelAlign,
    labelCol: contextLabelCol,
    labelWrap,
    colon: contextColon,
    classNames: contextClassNames,
    styles: contextStyles,
    tooltipIcon: contextTooltipIcon,
    tooltipProps: contextTooltipProps,
  } = React.useContext<FormContextProps>(FormContext);

  if (!label) {
    return null;
  }

  const mergedLabelCol: ColProps = labelCol || contextLabelCol || {};

  const mergedLabelAlign: FormLabelAlign | undefined = labelAlign || contextLabelAlign;

  let mergedTooltip: TooltipProps['title'] = tooltip ?? tooltipProps?.title;
  let mergedTooltipIcon = tooltipIcon ?? contextTooltipIcon;
  let mergedTooltipProps = { ...contextTooltipProps, ...tooltipProps };

  const labelClsBasic = `${prefixCls}-item-label`;
  const labelColClassName = clsx(
    labelClsBasic,
    mergedLabelAlign === 'left' && `${labelClsBasic}-left`,
    mergedLabelCol.className,
    {
      [`${labelClsBasic}-wrap`]: !!labelWrap,
    },
  );

  let labelChildren: React.ReactNode = label;

  // Keep label is original where there should have no colon
  const computedColon = colon === true || (contextColon !== false && colon !== false);
  const haveColon = computedColon && !vertical;

  // Remove duplicated user input colon
  if (haveColon && typeof label === 'string' && label.trim()) {
    labelChildren = label.replace(/[:|：]\s*$/, '');
  }

  if (tooltip || tooltipProps?.title) {
    // tooltip prop can be either a React node or a TooltipProps object
    // but we will only allow React node in v7
    const deprecated = !React.isValidElement(tooltip);
    if (deprecated) {
      mergedTooltip = (tooltip as TooltipProps).title;
      mergedTooltipIcon = (tooltip as { icon?: React.ReactNode }).icon;
      mergedTooltipProps = omit(tooltip as TooltipProps & { icon?: React.ReactNode }, [
        'title',
        'icon',
      ]);
    }

    const tooltipNode: React.ReactNode = (
      <Tooltip {...mergedTooltipProps} title={mergedTooltip}>
        <span
          className={`${prefixCls}-item-tooltip`}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
          }}
          tabIndex={-1}
        >
          {mergedTooltipIcon || <QuestionCircleOutlined />}
        </span>
      </Tooltip>
    );

    labelChildren = (
      <>
        {labelChildren}
        {tooltipNode}
      </>
    );
  }

  // Required Mark
  const isOptionalMark = requiredMark === 'optional';
  const isRenderMark = typeof requiredMark === 'function';
  const hideRequiredMark = requiredMark === false;

  if (isRenderMark) {
    labelChildren = requiredMark(labelChildren, { required: !!required });
  } else if (isOptionalMark && !required) {
    labelChildren = (
      <>
        {labelChildren}
        <span className={`${prefixCls}-item-optional`} title="">
          {formLocale?.optional || defaultLocale.Form?.optional}
        </span>
      </>
    );
  }

  // https://github.com/ant-design/ant-design/pull/52950#discussion_r1980880316
  let markType: string | undefined;
  if (hideRequiredMark) {
    markType = 'hidden';
  } else if (isOptionalMark || isRenderMark) {
    markType = 'optional';
  }

  const labelClassName = clsx(contextClassNames?.label, {
    [`${prefixCls}-item-required`]: required,
    [`${prefixCls}-item-required-mark-${markType}`]: markType,
    [`${prefixCls}-item-no-colon`]: !computedColon,
  });

  return (
    <Col {...mergedLabelCol} className={labelColClassName}>
      <label
        htmlFor={htmlFor}
        className={labelClassName}
        style={contextStyles?.label}
        title={typeof label === 'string' ? label : ''}
      >
        {labelChildren}
      </label>
    </Col>
  );
};

export default FormItemLabel;
