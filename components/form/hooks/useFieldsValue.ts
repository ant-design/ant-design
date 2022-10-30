import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { NamePath } from 'rc-field-form/es/interface';
import FieldContext from 'rc-field-form/es/FieldContext';
import * as valueUtil from 'rc-field-form/es/utils/valueUtil';
import type { Trigger } from '../helper/fieldEntity';
import { lookUpward } from '../util';
import useFieldsChange from './useFieldsChange';

export interface IUseFieldsValueOptions {
  /** 要取的值 */
  names?: NamePath[];
  /** Global 则从顶层开始，和 antd form 没太大区别; local 则是从本级开始；默认 local */
  mode?: 'global' | 'local';
  /** 触发时机 */
  trigger?: Trigger;
  /** 从本级开始向上回溯 upward 级，默认 0 */
  upward?: number;
  /** 是否支持动态依赖（即 names 可变化），默认 false */
  dynamic?: boolean;
}
const DEFAULT_ARRAY: any[] = [];
const { getNamePath } = valueUtil;
function useFieldsValue<T extends any[] = any[]>(props: IUseFieldsValueOptions = {}): T {
  const { upward = 0, mode = 'local', dynamic = false, names = DEFAULT_ARRAY, trigger } = props;
  const { getFieldValue, prefixName = DEFAULT_ARRAY } = useContext(FieldContext);
  const dependencies = useRef(names);
  const [payload, forceUpdate] = useState({});
  if (dynamic) {
    dependencies.current = names;
  }
  const handleFieldsChange = useCallback(() => {
    forceUpdate({});
  }, []);
  useFieldsChange(handleFieldsChange, names, {
    trigger,
    dynamic,
    mode,
    upward,
  });
  return useMemo(() => {
    if (mode === 'global') {
      return dependencies.current.map(name => getFieldValue(name)) as T;
    }
    return dependencies.current.map(name =>
      getFieldValue([...lookUpward(prefixName, upward), ...getNamePath(name)]),
    ) as T;
  }, [prefixName, upward, mode, payload, getFieldValue, dynamic && names]);
}
export default useFieldsValue;
