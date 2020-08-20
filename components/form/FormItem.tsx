import * as React from 'react';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { Field, FormInstance } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/lib/Field';
import FieldContext from 'rc-field-form/lib/FieldContext';
import { Meta, NamePath } from 'rc-field-form/lib/interface';
import { supportRef } from 'rc-util/lib/ref';
import omit from 'omit.js';
import Row from '../grid/row';
import { ConfigContext } from '../config-provider';
import { tuple } from '../_util/type';
import devWarning from '../_util/devWarning';
import FormItemLabel, { FormItemLabelProps } from './FormItemLabel';
import FormItemInput, { FormItemInputProps } from './FormItemInput';
import { FormContext, FormItemContext } from './context';
import { toArray, getFieldId } from './util';
import { cloneElement, isValidElement } from '../_util/reactNode';
import useFrameState from './hooks/useFrameState';
import useItemRef from './hooks/useItemRef';

const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');
export type ValidateStatus = typeof ValidateStatuses[number];

type RenderChildren = (form: FormInstance) => React.ReactNode;
type RcFieldProps = Omit<FieldProps, 'children'>;
type ChildrenType = RenderChildren | React.ReactNode;

interface MemoInputProps {
  value: any;
  update: number;
  children: React.ReactNode;
}

const MemoInput = React.memo(
  ({ children }: MemoInputProps) => children as JSX.Element,
  (prev, next) => {
    return prev.value === next.value && prev.update === next.update;
  },
);

export interface FormItemProps extends FormItemLabelProps, FormItemInputProps, RcFieldProps {
  prefixCls?: string;
  noStyle?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children?: ChildrenType;
  id?: string;
  hasFeedback?: boolean;
  validateStatus?: ValidateStatus;
  required?: boolean;
  hidden?: boolean;
  initialValue?: any;

  /** Auto passed by List render props. User should not use this. */
  fieldKey?: React.Key | React.Key[];
}

function hasValidName(name?: NamePath): Boolean {
  if (name === null) {
    devWarning(false, 'Form.Item', '`null` is passed as `name` property');
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
    label,
    trigger = 'onChange',
    validateTrigger,
    hidden,
    ...restProps
  } = props;
  const destroyRef = React.useRef(false);
  const { getPrefixCls } = React.useContext(ConfigContext);
  const { name: formName, requiredMarkType } = React.useContext(FormContext);
  const { updateItemErrors } = React.useContext(FormItemContext);
  const [domErrorVisible, innerSetDomErrorVisible] = React.useState(!!help);
  const prevValidateStatusRef = React.useRef<ValidateStatus | undefined>(validateStatus);
  const [inlineErrors, setInlineErrors] = useFrameState<Record<string, string[]>>({});

  const { validateTrigger: contextValidateTrigger } = React.useContext(FieldContext);
  const mergedValidateTrigger =
    validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;

  function setDomErrorVisible(visible: boolean) {
    if (!destroyRef.current) {
      innerSetDomErrorVisible(visible);
    }
  }

  const hasName = hasValidName(name);

  // Cache Field NamePath
  const nameRef = React.useRef<(string | number)[]>([]);

  // Should clean up if Field removed
  React.useEffect(() => {
    return () => {
      destroyRef.current = true;
      updateItemErrors(nameRef.current.join('__SPLIT__'), []);
    };
  }, []);

  const prefixCls = getPrefixCls('form', customizePrefixCls);

  // ======================== Errors ========================
  // Collect noStyle Field error to the top FormItem
  const updateChildItemErrors = noStyle
    ? updateItemErrors
    : (subName: string, subErrors: string[]) => {
        setInlineErrors((prevInlineErrors = {}) => {
          if (!isEqual(prevInlineErrors[subName], subErrors)) {
            return {
              ...prevInlineErrors,
              [subName]: subErrors,
            };
          }
          return prevInlineErrors;
        });
      };

  // ===================== Children Ref =====================
  const getItemRef = useItemRef();

  function renderLayout(
    baseChildren: React.ReactNode,
    fieldId?: string,
    meta?: Meta,
    isRequired?: boolean,
  ): React.ReactNode {
    if (noStyle && !hidden) {
      return baseChildren;
    }

    // ======================== Errors ========================
    // >>> collect sub errors
    let subErrorList: string[] = [];
    Object.keys(inlineErrors).forEach(subName => {
      subErrorList = [...subErrorList, ...(inlineErrors[subName] || [])];
    });

    // >>> merged errors
    let mergedErrors: React.ReactNode[];
    if (help !== undefined && help !== null) {
      mergedErrors = toArray(help);
    } else {
      mergedErrors = meta ? meta.errors : [];
      mergedErrors = [...mergedErrors, ...subErrorList];
    }

    // ======================== Status ========================
    let mergedValidateStatus: ValidateStatus = '';
    if (validateStatus !== undefined) {
      mergedValidateStatus = validateStatus;
    } else if (meta?.validating) {
      mergedValidateStatus = 'validating';
    } else if (meta?.errors?.length || subErrorList.length) {
      mergedValidateStatus = 'error';
    } else if (meta?.touched) {
      mergedValidateStatus = 'success';
    }

    if (domErrorVisible && help) {
      prevValidateStatusRef.current = mergedValidateStatus;
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
        !help && domErrorVisible && prevValidateStatusRef.current === 'error',
      [`${prefixCls}-item-is-validating`]: mergedValidateStatus === 'validating',
      [`${prefixCls}-item-hidden`]: hidden,
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
          'getValueProps',
          'hasFeedback',
          'help',
          'htmlFor',
          'id', // It is deprecated because `htmlFor` is its replacement.
          'initialValue',
          'isListField',
          'label',
          'labelAlign',
          'labelCol',
          'normalize',
          'preserve',
          'required',
          'validateFirst',
          'validateStatus',
          'valuePropName',
          'wrapperCol',
        ])}
      >
        {/* Label */}
        <FormItemLabel
          htmlFor={fieldId}
          required={isRequired}
          requiredMarkType={requiredMarkType}
          {...props}
          prefixCls={prefixCls}
        />
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

  // Record for real component render
  const updateRef = React.useRef(0);
  updateRef.current += 1;

  if (!hasName && !isRenderProps && !dependencies) {
    return renderLayout(children) as JSX.Element;
  }

  const variables: Record<string, string> = {};
  if (typeof label === 'string') {
    variables.label = label;
  }

  return (
    <Field
      {...props}
      messageVariables={variables}
      trigger={trigger}
      validateTrigger={mergedValidateTrigger}
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
            const fieldKeys = Array.isArray(fieldKey) ? fieldKey : [fieldKey];
            nameRef.current = [...mergedName.slice(0, -1), ...fieldKeys];
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
        };

        let childNode: React.ReactNode = null;

        devWarning(
          !(shouldUpdate && dependencies),
          'Form.Item',
          "`shouldUpdate` and `dependencies` shouldn't be used together. See https://ant.design/components/form/#dependencies.",
        );
        if (Array.isArray(children) && hasName) {
          devWarning(false, 'Form.Item', '`children` is array of render props cannot have `name`.');
          childNode = children;
        } else if (isRenderProps && (!(shouldUpdate || dependencies) || hasName)) {
          devWarning(
            !!(shouldUpdate || dependencies),
            'Form.Item',
            '`children` of render props only work with `shouldUpdate` or `dependencies`.',
          );
          devWarning(
            !hasName,
            'Form.Item',
            "Do not use `name` with `children` of render props since it's not a field.",
          );
        } else if (dependencies && !isRenderProps && !hasName) {
          devWarning(
            false,
            'Form.Item',
            'Must set `name` or use render props when `dependencies` is set.',
          );
        } else if (isValidElement(children)) {
          devWarning(
            children.props.defaultValue === undefined,
            'Form.Item',
            '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.',
          );

          const childProps = { ...children.props, ...mergedControl };
          if (!childProps.id) {
            childProps.id = fieldId;
          }

          if (supportRef(children)) {
            childProps.ref = getItemRef(mergedName, children);
          }

          // We should keep user origin event handler
          const triggers = new Set<string>([
            ...toArray(trigger),
            ...toArray(mergedValidateTrigger),
          ]);

          triggers.forEach(eventName => {
            childProps[eventName] = (...args: any[]) => {
              mergedControl[eventName]?.(...args);
              children.props[eventName]?.(...args);
            };
          });

          childNode = (
            <MemoInput
              value={mergedControl[props.valuePropName || 'value']}
              update={updateRef.current}
            >
              {cloneElement(children, childProps)}
            </MemoInput>
          );
        } else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) {
          childNode = (children as RenderChildren)(context);
        } else {
          devWarning(
            !mergedName.length,
            'Form.Item',
            '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.',
          );
          childNode = children;
        }

        return renderLayout(childNode, fieldId, meta, isRequired);
      }}
    </Field>
  );
}

export default FormItem;
