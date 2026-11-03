import React from 'react';
import { isFunction } from 'antd/lib/_util/is';

const CHANGE_EVENT = 'antd:local-storage-change';

const readRaw = (key: string): string | null => {
  try {
    if (typeof window === 'undefined') {
      return null;
    } else {
      return window.localStorage.getItem(key);
    }
  } catch {
    return null;
  }
};

const deserializer = <T>(raw: string | null, fallback: T): T => {
  if (raw === null) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const serializer = <T>(value: T): string | undefined => {
  try {
    return JSON.stringify(value);
  } catch {
    return undefined;
  }
};

const notifyChange = (key: string) => {
  window.dispatchEvent(new CustomEvent<string>(CHANGE_EVENT, { detail: key }));
};

interface Options<T> {
  initialValue: T;
  onError?: (err: any) => void;
}

type UseLocalStorageReturn<T> = readonly [
  value: T,
  setValue: React.Dispatch<React.SetStateAction<T>>,
  removeValue: () => void,
];

const useLocalStorage = <T>(key: string, options: Options<T>): UseLocalStorageReturn<T> => {
  const { initialValue, onError } = options;

  const subscribe = React.useCallback(
    (onChange: () => void) => {
      // 其他同源页面的修改；clear() 对应的 key 为 null。
      const onStorage = (event: StorageEvent) => {
        if (event.key === key || event.key === null) {
          onChange();
        }
      };
      // 当前页面通过本 Hook 进行的修改。
      const onLocalChange = (event: Event) => {
        if ((event as CustomEvent<string>).detail === key) {
          onChange();
        }
      };
      window.addEventListener('storage', onStorage);
      window.addEventListener(CHANGE_EVENT, onLocalChange);
      return () => {
        window.removeEventListener('storage', onStorage);
        window.removeEventListener(CHANGE_EVENT, onLocalChange);
      };
    },
    [key],
  );

  // 客户端渲染时，使用 readRaw 的值作为快照
  const getSnapshot = React.useCallback(() => readRaw(key), [key]);

  // 服务端渲染时，统一使用 null 作为快照
  const getServerSnapshot = React.useCallback(() => null, []);

  const raw = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = React.useMemo(() => deserializer<T>(raw, initialValue), [raw, initialValue]);

  const setValue = React.useCallback<React.Dispatch<React.SetStateAction<T>>>(
    (next) => {
      if (typeof window === 'undefined') {
        return;
      }
      // 从存储读取最新值，连续调用函数式更新时不会使用旧闭包值。
      const previous = deserializer<T>(readRaw(key), initialValue);

      const nextValue = isFunction(next) ? next(previous) : next;

      const serialized = serializer(nextValue);

      if (serialized === undefined) {
        throw new TypeError('useLocalStorage 的值必须可以序列化为 JSON');
      }

      // 存储不可用时不阻断调用方流程，成功后再通知订阅者。
      try {
        window.localStorage.setItem(key, serialized);
        notifyChange(key);
      } catch (err) {
        onError?.(err);
      }
    },
    [key, initialValue],
  );

  const removeValue = React.useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.removeItem(key);
      notifyChange(key);
    } catch (err) {
      onError?.(err);
    }
  }, [key]);

  return [value, setValue, removeValue] as const;
};

export default useLocalStorage;
