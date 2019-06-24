import * as React from 'React';
import classNames from 'classnames';
import { Field, FormInstance } from 'rc-field-form';
import { FieldProps as RcFieldProps } from 'rc-field-form/lib/Field';
import { Meta } from 'rc-field-form/lib/interface';
import Row from '../grid/row';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import { tuple } from '../_util/type';
import FormItemLabel, { FormItemLabelProps } from './FormItemLabel';
import FormItemInput, { FormItemInputProps } from './FormItemInput';

const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');
type ValidateStatus = (typeof ValidateStatuses)[number];

type RenderChildren = (
  control: {
    value?: any;
    onChange?: (...args: any[]) => void;
    [name: string]: any;
  },
  meta: Meta,
  context: FormInstance,
) => React.ReactElement;

interface FormItemProps extends FormItemLabelProps, FormItemInputProps, RcFieldProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactElement | RenderChildren;
  id?: string;
  hasFeedback?: boolean;
  validateStatus?: ValidateStatus;
}

const FormItem: React.FC<FormItemProps> = (props: FormItemProps) => {
  const {
    prefixCls: customizePrefixCls,
    style,
    className,
    hasFeedback,
    rules,
    validateStatus,
    children,
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const [domErrorVisible, setDomErrorVisible] = React.useState(false);

  const prefixCls = getPrefixCls('form', customizePrefixCls);

  return (
    <Field {...props}>
      {(control, meta, context) => {
        // Status
        let mergedValidateStatus: ValidateStatus = '';
        if (validateStatus !== undefined) {
          mergedValidateStatus = validateStatus;
        } else if (meta.validating) {
          mergedValidateStatus = 'validating';
        } else if (meta.errors.length) {
          mergedValidateStatus = 'error';
        } else if (meta.touched) {
          mergedValidateStatus = 'success';
        }

        // ClassName
        const itemClassName = {
          [`${prefixCls}-item`]: true,
          [`${prefixCls}-item-with-help`]: domErrorVisible || !!meta.errors.length, // TODO: handle this
          [`${className}`]: !!className,

          // Status
          'has-feedback': hasFeedback || mergedValidateStatus === 'validating',
          'has-success': mergedValidateStatus === 'success',
          'has-warning': mergedValidateStatus === 'warning',
          'has-error': mergedValidateStatus === 'error',
          'is-validating': mergedValidateStatus === 'validating',
        };

        // TODO: Check if user add `required` in RuleRender
        const isRequired: boolean = !!(
          rules && rules.some(rule => typeof rule === 'object' && rule.required)
        );

        // Children
        let childNode;
        if (React.isValidElement(children)) {
          childNode = React.cloneElement(children, control);
        } else if (typeof children === 'function') {
          childNode = children(control, meta, context);
        }

        return (
          <Row type="flex" className={classNames(itemClassName)} style={style} key="row">
            {/* Label */}
            <FormItemLabel {...props} required={isRequired} prefixCls={prefixCls} />
            {/* Input Group */}
            <FormItemInput
              {...meta}
              prefixCls={prefixCls}
              onDomErrorVisibleChange={setDomErrorVisible}
            >
              {childNode}
            </FormItemInput>
          </Row>
        );
      }}
    </Field>
  );
};

export default FormItem;
