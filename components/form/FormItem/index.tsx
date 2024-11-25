import * as React from 'react';
import classNames from 'classnames';
import { Field, FieldContext, ListContext } from 'rc-field-form';
import type { FieldProps } from 'rc-field-form/lib/Field';
import type { InternalNamePath, Meta } from 'rc-field-form/lib/interface';
import useState from 'rc-util/lib/hooks/useState';
import { supportRef } from 'rc-util/lib/ref';

import { cloneElement } from '../../_util/reactNode';
import { devUseWarning } from '../../_util/warning';
import { ConfigContext } from '../../config-provider';
import useCSSVarCls from '../../config-provider/hooks/useCSSVarCls';
import { FormContext, NoStyleItemContext } from '../context';
import type { FormInstance, FormItemLayout } from '../Form';
import type { FormItemInputProps } from '../FormItemInput';
import type { FormItemLabelProps, LabelTooltipType } from '../FormItemLabel';
import useChildren from '../hooks/useChildren';
import useFormItemStatus from '../hooks/useFormItemStatus';
import useFrameState from '../hooks/useFrameState';
import useItemRef from '../hooks/useItemRef';
import useStyle from '../style';
import { getFieldId, toArray } from '../util';
import type { ItemHolderProps } from './ItemHolder';
import ItemHolder from './ItemHolder';
import StatusProvider from './StatusProvider';

const NAME_SPLIT = '__SPLIT__';

interface FieldError {
  errors: string[];
  warnings: string[];
}

const _ValidateStatuses = ['success', 'warning', 'error', 'validating', ''] as const;
export type ValidateStatus = (typeof _ValidateStatuses)[number];

type RenderChildren<Values = any> = (form: FormInstance<Values>) => React.ReactNode;
type RcFieldProps<Values = any> = Omit<FieldProps<Values>, 'children'>;
type ChildrenType<Values = any> = RenderChildren<Values> | React.ReactNode;

export type FeedbackIcons = (itemStatus: {
  status: ValidateStatus;
  errors?: React.ReactNode[];
  warnings?: React.ReactNode[];
}) => { [key in ValidateStatus]?: React.ReactNode };

interface MemoInputProps {
  control: object;
  update: any;
  children: React.ReactNode;
  childProps: any[];
}

// https://github.com/ant-design/ant-design/issues/46417
// `getValueProps` may modify the value props name,
// we should check if the control is similar.
function isSimilarControl(a: object, b: object) {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  return (
    keysA.length === keysB.length &&
    keysA.every((key) => {
      const propValueA = (a as any)[key];
      const propValueB = (b as any)[key];

      return (
        propValueA === propValueB ||
        typeof propValueA === 'function' ||
        typeof propValueB === 'function'
      );
    })
  );
}

const MemoInput = React.memo(
  ({ children }: MemoInputProps) => children as JSX.Element,
  (prev, next) =>
    isSimilarControl(prev.control, next.control) &&
    prev.update === next.update &&
    prev.childProps.length === next.childProps.length &&
    prev.childProps.every((value, index) => value === next.childProps[index]),
);

export interface FormItemProps<Values = any>
  extends Omit<FormItemLabelProps, 'requiredMark'>,
    FormItemInputProps,
    RcFieldProps<Values> {
  prefixCls?: string;
  noStyle?: boolean;
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  children?: ChildrenType<Values>;
  id?: string;
  hasFeedback?: boolean | { icons: FeedbackIcons };
  validateStatus?: ValidateStatus;
  required?: boolean;
  hidden?: boolean;
  initialValue?: any;
  messageVariables?: Record<string, string>;
  tooltip?: LabelTooltipType;
  /** @deprecated No need anymore */
  fieldKey?: React.Key | React.Key[];
  layout?: FormItemLayout;
}

function genEmptyMeta(): Meta {
  return {
    errors: [],
    warnings: [],
    touched: false,
    validating: false,
    name: [],
    validated: false,
  };
}

function InternalFormItem<Values = any>(props: FormItemProps<Values>): React.ReactElement {
  const {
    name,
    noStyle,
    className,
    dependencies,
    prefixCls: customizePrefixCls,
    shouldUpdate,
    rules,
    children,
    required,
    label,
    messageVariables,
    trigger = 'onChange',
    validateTrigger,
    hidden,
    help,
    layout,
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const { name: formName } = React.useContext(FormContext);

  const mergedChildren = useChildren(children);

  const isRenderProps = typeof mergedChildren === 'function';
  const notifyParentMetaChange = React.useContext(NoStyleItemContext);

  const { validateTrigger: contextValidateTrigger } = React.useContext(FieldContext);
  const mergedValidateTrigger =
    validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;

  const hasName = !(name === undefined || name === null);

  const prefixCls = getPrefixCls('form', customizePrefixCls);

  // Style
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // ========================= Warn =========================
  const warning = devUseWarning('Form.Item');

  if (process.env.NODE_ENV !== 'production') {
    warning(name !== null, 'usage', '`null` is passed as `name` property');
  }

  // ========================= MISC =========================
  // Get `noStyle` required info
  const listContext = React.useContext(ListContext);
  const fieldKeyPathRef = React.useRef<InternalNamePath>();

  // ======================== Errors ========================
  // >>>>> Collect sub field errors
  const [subFieldErrors, setSubFieldErrors] = useFrameState<Record<string, FieldError>>({});

  // >>>>> Current field errors
  const [meta, setMeta] = useState<Meta>(() => genEmptyMeta());

  const onMetaChange = (nextMeta: Meta & { destroy?: boolean }) => {
    // This keyInfo is not correct when field is removed
    // Since origin keyManager no longer keep the origin key anymore
    // Which means we need cache origin one and reuse when removed
    const keyInfo = listContext?.getKey(nextMeta.name);

    // Destroy will reset all the meta
    setMeta(nextMeta.destroy ? genEmptyMeta() : nextMeta, true);

    // Bump to parent since noStyle
    if (noStyle && help !== false && notifyParentMetaChange) {
      let namePath = nextMeta.name;

      if (!nextMeta.destroy) {
        if (keyInfo !== undefined) {
          const [fieldKey, restPath] = keyInfo;
          namePath = [fieldKey, ...restPath];
          fieldKeyPathRef.current = namePath;
        }
      } else {
        // Use origin cache data
        namePath = fieldKeyPathRef.current || namePath;
      }
      notifyParentMetaChange(nextMeta, namePath);
    }
  };

  // >>>>> Collect noStyle Field error to the top FormItem
  const onSubItemMetaChange: ItemHolderProps['onSubItemMetaChange'] = (subMeta, uniqueKeys) => {
    // Only `noStyle` sub item will trigger
    setSubFieldErrors((prevSubFieldErrors) => {
      const clone = {
        ...prevSubFieldErrors,
      };

      // name: ['user', 1] + key: [4] = ['user', 4]
      const mergedNamePath = [...subMeta.name.slice(0, -1), ...uniqueKeys];
      const mergedNameKey = mergedNamePath.join(NAME_SPLIT);

      if ((subMeta as any).destroy) {
        // Remove
        delete clone[mergedNameKey];
      } else {
        // Update
        clone[mergedNameKey] = subMeta;
      }

      return clone;
    });
  };

  // >>>>> Get merged errors
  const [mergedErrors, mergedWarnings] = React.useMemo(() => {
    const errorList: string[] = [...meta.errors];
    const warningList: string[] = [...meta.warnings];

    Object.values(subFieldErrors).forEach((subFieldError) => {
      errorList.push(...(subFieldError.errors || []));
      warningList.push(...(subFieldError.warnings || []));
    });

    return [errorList, warningList];
  }, [subFieldErrors, meta.errors, meta.warnings]);

  // ===================== Children Ref =====================
  const getItemRef = useItemRef();

  // ======================== Render ========================
  function renderLayout(
    baseChildren: React.ReactNode,
    fieldId?: string,
    isRequired?: boolean,
  ): React.ReactNode {
    if (noStyle && !hidden) {
      return (
        <StatusProvider
          prefixCls={prefixCls}
          hasFeedback={props.hasFeedback}
          validateStatus={props.validateStatus}
          meta={meta}
          errors={mergedErrors}
          warnings={mergedWarnings}
          noStyle
        >
          {baseChildren}
        </StatusProvider>
      );
    }

    return (
      <ItemHolder
        key="row"
        {...props}
        className={classNames(className, cssVarCls, rootCls, hashId)}
        prefixCls={prefixCls}
        fieldId={fieldId}
        isRequired={isRequired}
        errors={mergedErrors}
        warnings={mergedWarnings}
        meta={meta}
        onSubItemMetaChange={onSubItemMetaChange}
        layout={layout}
      >
        {baseChildren}
      </ItemHolder>
    );
  }

  if (!hasName && !isRenderProps && !dependencies) {
    return wrapCSSVar(renderLayout(mergedChildren) as JSX.Element);
  }

  let variables: Record<string, string> = {};
  if (typeof label === 'string') {
    variables.label = label;
  } else if (name) {
    variables.label = String(name);
  }
  if (messageVariables) {
    variables = { ...variables, ...messageVariables };
  }

  // >>>>> With Field
  return wrapCSSVar(
    <Field
      {...props}
      messageVariables={variables}
      trigger={trigger}
      validateTrigger={mergedValidateTrigger}
      onMetaChange={onMetaChange}
    >
      {(control, renderMeta, context) => {
        const mergedName = toArray(name).length && renderMeta ? renderMeta.name : [];
        const fieldId = getFieldId(mergedName, formName);

        const isRequired =
          required !== undefined
            ? required
            : !!rules?.some((rule) => {
                if (rule && typeof rule === 'object' && rule.required && !rule.warningOnly) {
                  return true;
                }
                if (typeof rule === 'function') {
                  const ruleEntity = rule(context);
                  return ruleEntity?.required && !ruleEntity?.warningOnly;
                }
                return false;
              });

        // ======================= Children =======================
        const mergedControl: typeof control = {
          ...control,
        };

        let childNode: React.ReactNode = null;

        warning(
          !(shouldUpdate && dependencies),
          'usage',
          "`shouldUpdate` and `dependencies` shouldn't be used together. See https://u.ant.design/form-deps.",
        );
        if (Array.isArray(mergedChildren) && hasName) {
          warning(
            false,
            'usage',
            'A `Form.Item` with a `name` prop must have a single child element. For information on how to render more complex form items, see https://u.ant.design/complex-form-item.',
          );
          childNode = mergedChildren;
        } else if (isRenderProps && (!(shouldUpdate || dependencies) || hasName)) {
          warning(
            !!(shouldUpdate || dependencies),
            'usage',
            'A `Form.Item` with a render function must have either `shouldUpdate` or `dependencies`.',
          );
          warning(
            !hasName,
            'usage',
            'A `Form.Item` with a render function cannot be a field, and thus cannot have a `name` prop.',
          );
        } else if (dependencies && !isRenderProps && !hasName) {
          warning(
            false,
            'usage',
            'Must set `name` or use a render function when `dependencies` is set.',
          );
        } else if (React.isValidElement(mergedChildren)) {
          warning(
            mergedChildren.props.defaultValue === undefined,
            'usage',
            '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.',
          );

          const childProps = { ...mergedChildren.props, ...mergedControl };
          if (!childProps.id) {
            childProps.id = fieldId;
          }

          if (help || mergedErrors.length > 0 || mergedWarnings.length > 0 || props.extra) {
            const describedbyArr = [];
            if (help || mergedErrors.length > 0) {
              describedbyArr.push(`${fieldId}_help`);
            }
            if (props.extra) {
              describedbyArr.push(`${fieldId}_extra`);
            }
            childProps['aria-describedby'] = describedbyArr.join(' ');
          }

          if (mergedErrors.length > 0) {
            childProps['aria-invalid'] = 'true';
          }

          if (isRequired) {
            childProps['aria-required'] = 'true';
          }

          if (supportRef(mergedChildren)) {
            childProps.ref = getItemRef(mergedName, mergedChildren);
          }

          // We should keep user origin event handler
          const triggers = new Set<string>([
            ...toArray(trigger),
            ...toArray(mergedValidateTrigger),
          ]);

          triggers.forEach((eventName) => {
            childProps[eventName] = (...args: any[]) => {
              mergedControl[eventName]?.(...args);
              mergedChildren.props[eventName]?.(...args);
            };
          });

          // List of props that need to be watched for changes -> if changes are detected in MemoInput -> rerender
          const watchingChildProps = [
            childProps['aria-required'],
            childProps['aria-invalid'],
            childProps['aria-describedby'],
          ];

          childNode = (
            <MemoInput
              control={mergedControl}
              update={mergedChildren}
              childProps={watchingChildProps}
            >
              {cloneElement(mergedChildren, childProps)}
            </MemoInput>
          );
        } else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) {
          childNode = mergedChildren(context as any);
        } else {
          warning(
            !mergedName.length || !!noStyle,
            'usage',
            '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.',
          );
          childNode = mergedChildren as React.ReactNode;
        }

        return renderLayout(childNode, fieldId, isRequired);
      }}
    </Field>,
  );
}

type InternalFormItemType = typeof InternalFormItem;

type CompoundedComponent = InternalFormItemType & {
  useStatus: typeof useFormItemStatus;
};

const FormItem = InternalFormItem as CompoundedComponent;
FormItem.useStatus = useFormItemStatus;

export default FormItem;
