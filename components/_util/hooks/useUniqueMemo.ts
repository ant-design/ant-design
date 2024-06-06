import React from 'react';

const BEAT_LIMIT = 1000 * 60 * 10;

/**
 * A helper class to map keys to values.
 * It supports both primitive keys and object keys.
 */
class ArrayKeyMap {
  map = new Map();

  // Use WeakMap to avoid memory leak
  objectIDMap = new WeakMap();

  nextID = 0;

  lastAccessBeat = new Map();

  // We will clean up the cache when reach the limit
  accessBeat = 0;

  set(keys: any[], value: any) {
    // New set will trigger clear
    this.clear();

    // Set logic
    const compositeKey = this.getCompositeKey(keys);
    this.map.set(compositeKey, value);
    this.lastAccessBeat.set(compositeKey, Date.now());
  }

  get(keys: any[]) {
    const compositeKey = this.getCompositeKey(keys);

    const cache = this.map.get(compositeKey);
    this.lastAccessBeat.set(compositeKey, Date.now());
    this.accessBeat += 1;

    return cache;
  }

  getCompositeKey(keys: any[]) {
    const ids = keys.map((key) => {
      if (key && typeof key === 'object') {
        return `obj_${this.getObjectID(key)}`;
      }
      return `${typeof key}_${key}`;
    });
    return ids.join('|');
  }

  getObjectID(obj: object) {
    if (this.objectIDMap.has(obj)) {
      return this.objectIDMap.get(obj);
    }
    const id = this.nextID;
    this.objectIDMap.set(obj, id);

    this.nextID += 1;

    return id;
  }

  clear() {
    if (this.accessBeat > 10000) {
      const now = Date.now();

      this.lastAccessBeat.forEach((beat, key) => {
        if (now - beat > BEAT_LIMIT) {
          this.map.delete(key);
          this.lastAccessBeat.delete(key);
        }
      });

      this.accessBeat = 0;
    }
  }
}

const uniqueMap = new ArrayKeyMap();

/**
 * Like `useMemo`, but this hook result will be shared across all instances.
 */
export default function useUniqueMemo<T>(memoFn: () => T, deps: any[]): T {
  return React.useMemo(() => {
    const cachedValue = uniqueMap.get(deps);
    if (cachedValue) {
      return cachedValue;
    }

    const newValue = memoFn();
    uniqueMap.set(deps, newValue);
    return newValue;
  }, deps);
}
