import React, { useCallback, useEffect } from 'react';
import { useEvent } from '@rc-component/util';
import { isFunction } from 'antd/lib/_util/is';

const ANT_SYNC_STORAGE_EVENT_KEY = 'ANT_SYNC_STORAGE_EVENT_KEY';

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

  const handleError = typeof onError === 'function' ? onError : console.error;

  const getStoredValue = useEvent((): T => {
    try {
      const rawData = storage?.getItem(key);
      if (rawData) {
        return mergedDeserializer(rawData);
      }
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        handleError(e);
      }
      return defaultValue as T;
    }
    return defaultValue as T;
  });

  const [state, setState] = React.useState<T>(getStoredValue);

  const updateState = useEvent<React.Dispatch<React.SetStateAction<T>>>((updater) => {
    setState((originState) => {
      const currentState = isFunction(updater) ? updater(originState) : updater;
      if (Object.is(currentState, originState)) {
        return originState;
      }
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
          handleError(e);
        }
      }
      return currentState;
    });
  });

  const shouldSync = useCallback(
    (ev: StorageEvent) => {
      return ev.key === key && ev.storageArea === storage;
    },
    [key, storage],
  );

  const shouldSyncCustomEvent = useCallback(
    (ev: CustomEvent<{ key: string; storageArea: Storage }>) => {
      return ev?.detail?.key === key && ev?.detail?.storageArea === storage;
    },
    [key, storage],
  );

  const syncState = useEvent(() => {
    const nextState = getStoredValue();
    setState((originState) => {
      if (Object.is(nextState, originState)) {
        return originState;
      }
      return nextState;
    });
  });

  const onNativeStorage = useEvent((event: StorageEvent) => {
    if (shouldSync(event)) {
      syncState();
    }
  });

  const onCustomStorage = useEvent((event: Event) => {
    const customEvent = event as CustomEvent;
    if (shouldSyncCustomEvent(customEvent)) {
      syncState();
    }
  });

  useEffect(() => {
    syncState();
  }, [key, syncState]);

  useEffect(() => {
    window?.addEventListener('storage', onNativeStorage);
    window?.addEventListener(ANT_SYNC_STORAGE_EVENT_KEY, onCustomStorage);
    return () => {
      window?.removeEventListener('storage', onNativeStorage);
      window?.removeEventListener(ANT_SYNC_STORAGE_EVENT_KEY, onCustomStorage);
    };
  }, [onNativeStorage, onCustomStorage]);

  return [state, updateState] as const;
};

export default useLocalStorage;
