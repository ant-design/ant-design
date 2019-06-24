import * as React from 'React';
import classNames from 'classnames';
import { Field, FormInstance } from 'rc-field-form';
import { FieldProps as RcFieldProps } from 'rc-field-form/lib/Field';
import { Meta } from 'rc-field-form/lib/interface';
import Row from '../grid/row';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import { tuple } from '../_util/type';
import warning from '../_util/warning';
import FormItemLabel, { FormItemLabelProps } from './FormItemLabel';
import FormItemInput, { FormItemInputProps } from './FormItemInput';
import { FormContext } from './context';

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
  inline?: boolean;
}

const FormItem: React.FC<FormItemProps> = (props: FormItemProps) => {
  const {
    name,
    inline,
    dependencies,
    prefixCls: customizePrefixCls,
    style,
    className,
    shouldUpdate,
    hasFeedback,
    rules,
    validateStatus,
    children,
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const { name: formName } = React.useContext(FormContext);
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
        const mergedControl = {
          ...control,
          id: `${formName}_${Array.isArray(name) ? name.join('_') : name}`,
        };

        let childNode;
        if (!name && !shouldUpdate && !dependencies) {
          childNode = children;
        } else if (React.isValidElement(children)) {
          childNode = React.cloneElement(children, mergedControl);
        } else if (typeof children === 'function') {
          warning(
            false,
            'Form.Item',
            'render props is a dev test api. Not works on production env.',
          );
          if (process.env.NODE_ENV === 'production') {
            throw new Error('render props of Form.Item do not work on production env.');
          }
          childNode = children(mergedControl, meta, context);
        }

        if (inline) {
          return childNode;
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
