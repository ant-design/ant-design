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

const serializer = <T>(value: T): string => {
  try {
    return JSON.stringify(value);
  } catch {
    return undefined as any;
  }
};

const notifyChange = (key: string) => {
  window.dispatchEvent(new CustomEvent<string>(CHANGE_EVENT, { detail: key }));
};

interface Options<T> {
  initialValue: T;
}

const useLocalStorage = <T>(key: string, options: Options<T>) => {
  const { initialValue } = options;

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

  const setValue = React.useCallback(
    (next: React.SetStateAction<T>) => {
      if (typeof window === 'undefined') {
        return;
      }
      // 从存储读取最新值，连续调用函数式更新时不会使用旧闭包值。
      const previous = deserializer<T>(readRaw(key), initialValue);

      const nextValue = isFunction(next) ? next(previous) : next;

      const serialized = serializer(nextValue);

      if (serialized === null) {
        throw new TypeError('useLocalStorage 的值必须可以序列化为 JSON');
      }

      // 写入失败时向调用方抛出错误；成功后再通知订阅者。
      window.localStorage.setItem(key, serialized);
      notifyChange(key);
    },
    [key, initialValue],
  );

  const removeValue = React.useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.removeItem(key);
    notifyChange(key);
  }, [key]);

  return [value, setValue, removeValue] as const;
};

export default useLocalStorage;
