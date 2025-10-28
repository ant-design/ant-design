import React, { useCallback, useEffect } from 'react';

const ANT_SYNC_STORAGE_EVENT_KEY = 'ANT_SYNC_STORAGE_EVENT_KEY';

const isFunction = (val: any): val is (...args: any[]) => any => {
  return typeof val === 'function';
};

interface Options<T> {
  defaultValue?: T;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: unknown) => void;
}

const useLocalStorage = <T>(key: string, options: Options<T> = {}) => {
  const storage = typeof window !== 'undefined' ? localStorage : null;

  const { serializer, deserializer, onError, defaultValue } = options;

  const mergedSerializer = typeof serializer === 'function' ? serializer : JSON.stringify;

  const mergedDeserializer = typeof deserializer === 'function' ? deserializer : JSON.parse;

  const mergedHandleError = typeof onError === 'function' ? onError : console.error;

  const getStoredValue = () => {
    try {
      const rawData = storage?.getItem(key);
      if (rawData) {
        return mergedDeserializer(rawData);
      }
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        mergedHandleError(e);
      }
      return defaultValue;
    }
    return defaultValue;
  };

  const [state, setState] = React.useState<T>(getStoredValue);

  useEffect(() => {
    setState(getStoredValue());
  }, [key]);

  const updateState: React.Dispatch<React.SetStateAction<T>> = (value) => {
    const currentState = isFunction(value) ? value(state) : value;
    setState(currentState);
    try {
      let newValue: string | null;
      const oldValue = storage?.getItem(key);
      if (typeof currentState === 'undefined') {
        newValue = null;
        storage?.removeItem(key);
      } else {
        newValue = mergedSerializer(currentState);
        storage?.setItem(key, newValue);
      }
      dispatchEvent(
        new CustomEvent(ANT_SYNC_STORAGE_EVENT_KEY, {
          detail: { key, newValue, oldValue, storageArea: storage },
        }),
      );
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        mergedHandleError(e);
      }
    }
  };

  const shouldSync = (ev: StorageEvent) => {
    return ev && ev.key === key && ev.storageArea === storage;
  };

  const onNativeStorage = useCallback(
    (event: StorageEvent) => {
      if (shouldSync(event)) {
        setState(getStoredValue());
      }
    },
    [key],
  );

  const onCustomStorage = useCallback(
    (event: Event) => {
      if (shouldSync(event as StorageEvent)) {
        setState(getStoredValue());
      }
    },
    [key],
  );

  useEffect(() => {
    window?.addEventListener('storage', onNativeStorage);
    window?.addEventListener(ANT_SYNC_STORAGE_EVENT_KEY, onCustomStorage);
    return () => {
      window?.removeEventListener('storage', onNativeStorage);
      window?.removeEventListener(ANT_SYNC_STORAGE_EVENT_KEY, onCustomStorage);
    };
  }, [key, onNativeStorage, onCustomStorage]);

  return [state, updateState] as const;
};

export default useLocalStorage;
