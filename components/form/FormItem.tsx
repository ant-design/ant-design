import * as React from 'react';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { Field, FormInstance } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/lib/Field';
import { Meta, NamePath } from 'rc-field-form/lib/interface';
import omit from 'omit.js';
import Row from '../grid/row';
import { ConfigContext } from '../config-provider';
import { tuple } from '../_util/type';
import warning from '../_util/warning';
import FormItemLabel, { FormItemLabelProps } from './FormItemLabel';
import FormItemInput, { FormItemInputProps } from './FormItemInput';
import { FormContext, FormItemContext } from './context';
import { toArray, getFieldId } from './util';

const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');
export type ValidateStatus = typeof ValidateStatuses[number];

type RenderChildren = (form: FormInstance) => React.ReactElement;
type RcFieldProps = Omit<FieldProps, 'children'>;
type ChildrenType = React.ReactElement | RenderChildren | React.ReactElement[] | null;
type ChildrenNodeType = Exclude<ChildrenType, RenderChildren>;

export interface FormItemProps
  extends FormItemLabelProps,
    FormItemInputProps,
    Omit<RcFieldProps, 'children'> {
  prefixCls?: string;
  noStyle?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children: ChildrenType;
  id?: string;
  hasFeedback?: boolean;
  validateStatus?: ValidateStatus;
  required?: boolean;

  /** Auto passed by List render props. User should not use this. */
  fieldKey?: number;
}

function hasValidName(name?: NamePath): Boolean {
  if (name === null) {
    warning(false, 'Form.Item', '`null` is passed as `name` property');
  }
  return !(name === undefined || name === null);
}

function FormItem(props: FormItemProps): React.ReactElement {
  const {
    name,
    fieldKey,
    noStyle,
    dependencies,
    prefixCls: customizePrefixCls,
    style,
    className,
    shouldUpdate,
    hasFeedback,
    help,
    rules,
    validateStatus,
    children,
    required,
    trigger = 'onChange',
    validateTrigger = 'onChange',
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const formContext = React.useContext(FormContext);
  const { updateItemErrors } = React.useContext(FormItemContext);
  const [domErrorVisible, setDomErrorVisible] = React.useState(!!help);
  const [inlineErrors, setInlineErrors] = React.useState<Record<string, string[]>>({});

  const { name: formName } = formContext;
  const hasName = hasValidName(name);

  // Cache Field NamePath
  const nameRef = React.useRef<(string | number)[]>([]);

  // Should clean up if Field removed
  React.useEffect(() => {
    return () => {
      updateItemErrors(nameRef.current.join('__SPLIT__'), []);
    };
  }, []);

  const prefixCls = getPrefixCls('form', customizePrefixCls);

  // ======================== Errors ========================
  // Collect noStyle Field error to the top FormItem
  const updateChildItemErrors = noStyle
    ? updateItemErrors
    : (subName: string, subErrors: string[]) => {
        if (!isEqual(inlineErrors[subName], subErrors)) {
          setInlineErrors({
            ...inlineErrors,
            [subName]: subErrors,
          });
        }
      };

  function renderLayout(
    baseChildren: ChildrenNodeType,
    fieldId?: string,
    meta?: Meta,
    isRequired?: boolean,
  ): any {
    if (noStyle) {
      return baseChildren;
    }

    // ======================== Errors ========================
    let mergedErrors: React.ReactNode[];
    if (help !== undefined && help !== null) {
      mergedErrors = toArray(help);
    } else {
      mergedErrors = meta ? meta.errors : [];
      Object.keys(inlineErrors).forEach(subName => {
        const subErrors = inlineErrors[subName] || [];
        if (subErrors.length) {
          mergedErrors = [...mergedErrors, ...subErrors];
        }
      });
    }

    // ======================== Status ========================
    let mergedValidateStatus: ValidateStatus = '';
    if (validateStatus !== undefined) {
      mergedValidateStatus = validateStatus;
    } else if (meta && meta.validating) {
      mergedValidateStatus = 'validating';
    } else if (!help && mergedErrors.length) {
      mergedValidateStatus = 'error';
    } else if (meta && meta.touched) {
      mergedValidateStatus = 'success';
    }

    const itemClassName = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-with-help`]: domErrorVisible || help,
      [`${className}`]: !!className,

      // Status
      [`${prefixCls}-item-has-feedback`]: mergedValidateStatus && hasFeedback,
      [`${prefixCls}-item-has-success`]: mergedValidateStatus === 'success',
      [`${prefixCls}-item-has-warning`]: mergedValidateStatus === 'warning',
      [`${prefixCls}-item-has-error`]: mergedValidateStatus === 'error',
      [`${prefixCls}-item-has-error-leave`]:
        !help && domErrorVisible && mergedValidateStatus !== 'error',
      [`${prefixCls}-item-is-validating`]: mergedValidateStatus === 'validating',
    };

    // ======================= Children =======================
    return (
      <Row
        className={classNames(itemClassName)}
        style={style}
        key="row"
        {...omit(restProps, [
          'colon',
          'extra',
          'getValueFromEvent',
          'hasFeedback',
          'help',
          'htmlFor',
          'id', // It is deprecated because `htmlFor` is its replacement.
          'label',
          'labelAlign',
          'labelCol',
          'normalize',
          'required',
          'validateFirst',
          'validateStatus',
          'valuePropName',
          'wrapperCol',
        ])}
      >
        {/* Label */}
        <FormItemLabel htmlFor={fieldId} required={isRequired} {...props} prefixCls={prefixCls} />
        {/* Input Group */}
        <FormItemInput
          {...props}
          {...meta}
          errors={mergedErrors}
          prefixCls={prefixCls}
          onDomErrorVisibleChange={setDomErrorVisible}
          validateStatus={mergedValidateStatus}
        >
          <FormItemContext.Provider value={{ updateItemErrors: updateChildItemErrors }}>
            {baseChildren}
          </FormItemContext.Provider>
        </FormItemInput>
      </Row>
    );
  }

  const isRenderProps = typeof children === 'function';

  if (!hasName && !isRenderProps && !dependencies) {
    return renderLayout(children as ChildrenNodeType);
  }

  return (
    <Field
      {...props}
      trigger={trigger}
      validateTrigger={validateTrigger}
      onReset={() => {
        setDomErrorVisible(false);
      }}
    >
      {(control, meta, context) => {
        const { errors } = meta;

        const mergedName = toArray(name).length && meta ? meta.name : [];
        const fieldId = getFieldId(mergedName, formName);

        if (noStyle) {
          nameRef.current = [...mergedName];
          if (fieldKey) {
            nameRef.current[nameRef.current.length - 1] = fieldKey;
          }
          updateItemErrors(nameRef.current.join('__SPLIT__'), errors);
        }

        const isRequired =
          required !== undefined
            ? required
            : !!(
                rules &&
                rules.some(rule => {
                  if (rule && typeof rule === 'object' && rule.required) {
                    return true;
                  }
                  if (typeof rule === 'function') {
                    const ruleEntity = rule(context);
                    return ruleEntity && ruleEntity.required;
                  }
                  return false;
                })
              );

        // ======================= Children =======================
        const mergedControl: typeof control = {
          ...control,
          id: fieldId,
        };

        let childNode: ChildrenNodeType = null;
        if (Array.isArray(children) && hasName) {
          warning(false, 'Form.Item', '`children` is array of render props cannot have `name`.');
          childNode = children;
        } else if (isRenderProps && (!shouldUpdate || hasName)) {
          warning(
            !!shouldUpdate,
            'Form.Item',
            '`children` of render props only work with `shouldUpdate`.',
          );
          warning(
            !hasName,
            'Form.Item',
            "Do not use `name` with `children` of render props since it's not a field.",
          );
        } else if (dependencies && !isRenderProps && !hasName) {
          warning(
            false,
            'Form.Item',
            'Must set `name` or use render props when `dependencies` is set.',
          );
        } else if (React.isValidElement(children)) {
          const childProps = { ...children.props, ...mergedControl };

          // We should keep user origin event handler
          const triggers = new Set<string>();
          [...toArray(trigger), ...toArray(validateTrigger)].forEach(eventName => {
            triggers.add(eventName);
          });

          triggers.forEach(eventName => {
            if (eventName in mergedControl && eventName in children.props) {
              childProps[eventName] = (...args: any[]) => {
                mergedControl[eventName](...args);
                children.props[eventName](...args);
              };
            }
          });

          childNode = React.cloneElement(children, childProps);
        } else if (isRenderProps && shouldUpdate && !hasName) {
          childNode = (children as RenderChildren)(context);
        } else {
          warning(
            !mergedName.length,
            'Form.Item',
            '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.',
          );
          childNode = children as any;
        }

        return renderLayout(childNode, fieldId, meta, isRequired);
      }}
    </Field>
  );
}

export default FormItem;
