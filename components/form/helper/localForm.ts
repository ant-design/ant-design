import type {
  InternalNamePath,
  NamePath,
  InternalFormInstance,
  InternalHooks,
  Meta,
} from 'rc-field-form/es/interface';
import { HOOK_MARK } from 'rc-field-form/es/FieldContext';
import * as valueUtil from 'rc-field-form/es/utils/valueUtil';
import type { FormInstance } from '../hooks/useForm';

const { getNamePath, getValue, setValues } = valueUtil;

type IntelnalForm = Pick<
  FormInstance,
  'getFieldValue' | 'getFieldsValue' | 'validateFields' | 'resetFields' | 'setFieldsValue'
>;

export interface ILocalFormInstance extends IntelnalForm {
  namePath: InternalNamePath;
  dispatchValue(name: NamePath, value?: any): void;
}

function mergePrifixName(prefixName: InternalNamePath, nameList: NamePath[]): InternalNamePath[] {
  return nameList.map(name => [...prefixName, ...getNamePath(name)]);
}

function getLocalForm(
  originForm: InternalFormInstance,
  prefixPath: InternalNamePath,
  basePath?: NamePath,
): ILocalFormInstance {
  const fullPrefix = [...(prefixPath || []), ...getNamePath(basePath ?? [])];

  function getLocalNameList() {
    const hooks = originForm.getInternalHooks(HOOK_MARK) as InternalHooks;
    const fields = hooks.getFields();

    return fields.reduce((acc: InternalNamePath[], field) => {
      const { name } = field;

      if (!Array.isArray(name) || name.length < fullPrefix.length) {
        return acc;
      }

      if (fullPrefix.every((prefix, i) => prefix === name[i])) {
        acc.push(name);
      }

      return acc;
    }, []);
  }

  /** The same as "getFieldValue" */
  function getLocalFieldValue(name: NamePath) {
    return originForm.getFieldValue([...fullPrefix, ...getNamePath(name)]);
  }

  /** The same as "getFieldsValue" */
  function getLocalFieldsValue(nameList?: NamePath[] | true, filterFunc?: (meta: Meta) => boolean) {
    if (!nameList || nameList === true) {
      const value = originForm.getFieldsValue([fullPrefix], filterFunc);
      return getValue(value, fullPrefix);
    }

    const value = originForm.getFieldsValue(mergePrifixName(fullPrefix, nameList), filterFunc);
    return getValue(value, fullPrefix);
  }

  /** The same as "setFieldsValue" */
  function setLocalFieldsValue(value: Record<string, any>) {
    const hooks = originForm.getInternalHooks(HOOK_MARK) as InternalHooks;
    const localValue = originForm.getFieldValue(fullPrefix);
    const mergedValue = Array.isArray(value) ? value : setValues(localValue, value);

    return hooks.dispatch({
      type: 'updateValue',
      namePath: fullPrefix,
      value: mergedValue,
    });
  }

  /** The same as "validateFields" */
  function validateLocalFields(nameList?: NamePath[]) {
    if (!fullPrefix.length) {
      return originForm.validateFields(nameList);
    }

    if (nameList && nameList.length > 0) {
      return originForm.validateFields(mergePrifixName(fullPrefix, nameList));
    }

    return originForm.validateFields(getLocalNameList());
  }

  /** The same as 'resetFields' */
  function resetLocalFields(fields?: NamePath[]) {
    if (fields && fields.length > 0) {
      return originForm.resetFields(mergePrifixName(fullPrefix, fields));
    }

    return originForm.resetFields([fullPrefix]);
  }

  /** The same as 'onChange' */
  function dispatchLocalValue(name: NamePath, value?: any) {
    const hooks = originForm.getInternalHooks(HOOK_MARK) as InternalHooks;
    hooks.dispatch({
      type: 'updateValue',
      namePath: [...fullPrefix, ...getNamePath(name)],
      value,
    });
  }

  return {
    getFieldValue: getLocalFieldValue,
    getFieldsValue: getLocalFieldsValue,
    setFieldsValue: setLocalFieldsValue,
    validateFields: validateLocalFields,
    resetFields: resetLocalFields,
    dispatchValue: dispatchLocalValue,
    namePath: fullPrefix.slice(),
  };
}

export default getLocalForm;
