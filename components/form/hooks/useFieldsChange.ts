import { useCallback, useContext, useEffect, useRef } from 'react';
import type { InternalHooks, InternalNamePath, NamePath } from 'rc-field-form/es/interface';
import FieldContext, { HOOK_MARK } from 'rc-field-form/es/FieldContext';
import * as valueUtil from 'rc-field-form/es/utils/valueUtil';
import type { ChangeInfo, ChangeType, Trigger } from '../helper/fieldEntity';
import { FakeField } from '../helper/fieldEntity';
import { lookUpward } from '../util';
import useMounted from '../helper/useMounted';

export interface IUseFieldsChangeOptions {
  /** Global 则从顶层开始，和 antd form 没太大区别; local 则是从本级开始；默认 local */
  mode?: 'global' | 'local';
  /** 触发时机 */
  trigger?: Trigger;
  /** 是否立即触发回调（同步），或在下次更新触发；默认 false */
  immediate?: boolean;
  /** 监听的路径不存在是否触发回调 */
  requirePathExist?: boolean;
  /** 从本级开始向上回溯 upward 级，默认 0 */
  upward?: number;
  /** 是否支持动态依赖（即 dependencies 可变化），默认 false */
  dynamic?: boolean;
}
export interface IExtraInfo {
  namePathList: InternalNamePath[];
  type: ChangeType;
}
const DEFAULT_ARRAY: any[] = [];
const { getNamePath, getValue } = valueUtil;
function useFieldsChange<T extends any[] = any[]>(
  callback: (current: T, prev: T, info: IExtraInfo) => void,
  dependencies: NamePath[],
  options: IUseFieldsChangeOptions = {},
) {
  const {
    mode = 'local',
    immediate = false,
    upward = 0,
    dynamic = false,
    requirePathExist,
    trigger,
  } = options;
  const { prefixName = DEFAULT_ARRAY, getInternalHooks } = useContext(FieldContext);
  const dependenciesCache = useRef(dependencies);
  const mounted = useMounted();
  if (dynamic) {
    dependenciesCache.current = dependencies;
  }
  const getValues = useCallback(
    (store: any) => {
      if (mode === 'global') {
        return dependenciesCache.current.map(name => getValue(store, getNamePath(name)));
      }
      return dependenciesCache.current.map(name =>
        getValue(store, [...lookUpward(prefixName, upward), ...getNamePath(name)]),
      );
    },
    [mode, prefixName, upward],
  );
  const handleChange = useCallback(
    (e: ChangeInfo) => {
      const { prevStore, curStore, namePathList, type } = e;
      const current = getValues(curStore) as T;
      const prev = getValues(prevStore) as T;
      // 如果手动设置 immediate 为 true，则直接触发回调，FormList 中会把此项置为 true，优先执行
      if (immediate) {
        callback(current, prev, { namePathList, type });
        // 默认情况下放到微任务中执行，等待 FormList 回调先执行，这样可能可以避免不必要的回调执行
      } else {
        Promise.resolve().then(() => {
          if (mounted.current) {
            callback(current, prev, { namePathList, type });
          }
        });
      }
    },
    [callback, getValues, immediate, mounted],
  );
  useEffect(() => {
    const isGlobal = mode === 'global';
    const { registerField } = getInternalHooks(HOOK_MARK) as InternalHooks;
    const unregister = registerField(
      new FakeField(handleChange, {
        names: dependenciesCache.current.map(dep =>
          isGlobal ? getNamePath(dep) : [...lookUpward(prefixName, upward), ...getNamePath(dep)],
        ),
        trigger,
        requirePathExist,
      }),
    );
    return () => {
      unregister();
    };
  }, [requirePathExist, handleChange, getInternalHooks, dynamic && dependencies]);
}
export default useFieldsChange;
